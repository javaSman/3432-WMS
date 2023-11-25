<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="TagListQueryItems"
        :list-query.sync="listQuery"
        :more-items="MoreQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="TagListCrud"
        :button-items="TagLsitBtn"
        :selection="multipleSelection"
        @toprintBarcode="handleprintBarcode()"
        @toDownload="handleDownloadPast()"
        @toFrozen="handleFrozen()"
        @toThaw="handleThaw()"
        @toEdit="handleEdit()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
      <Table
        v-if="tableShow"
        ref="table"
        v-loading="listLoading"
        :height="-1"
        :data-list="list"
        :column="column"
        :selection.sync="multipleSelection"
        :total="totalCount"
        :page.sync="page"
        :limit.sync="listQuery.MaxResultCount"
        :is-sort="true"
        :sorting.sync="listQuery.Sorting"
        :dict-gather="dictGather"
        @pagination="getList"
        @tableSort="getList"
      />
      <EditForm
        :dialog-form-visible="dialogFormVisible"
        :form-title="formTitle"
        :form-list="formList"
        :form-data="form"
        :is-edit="isEdit"
        :submit="confirm"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
      <DeleteForm
        :dialog-form-visible="DeleteDialogFormVisible"
        :form-title="formTitle"
        :form-list="DeleteFormList"
        :form-data="FormData"
        :is-edit="isEdit"
        :submit="submit"
        @cancel="cancel"
      />
    </div>
    <div v-if="printBegin" id="inventoryTable" ref="printTable" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import DeleteForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
// import boxBarcode from '@/views/printable-template/boxBarcode'
import PrintTable from '@/views/printable-template/inventoryTableStock'
import { formList, TagListQueryItems, TagListCrud, TagLsitBtn, MoreQuery, DeleteFormList } from './config'
export default {
  name: 'TagList',
  components: { Table, EditForm, CrudOperation, PrintTable, DeleteForm },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'MaterialsBarcode',
      apiName: 'materialsbarcode',

      formList,
      TagListQueryItems,
      TagListCrud,
      TagLsitBtn,
      MoreQuery,

      form: {},
      dialogFormVisible: false,

      exportParams: {},
      changeNum: 0,
      formTitle: '',
      isEdit: true,
      printBegin: false,
      printData: [],
      DeleteDialogFormVisible: false,
      DeleteFormList,
      FormData: {}
    }
  },
  created() {},
  methods: {
    handleChange() {
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.multipleSelection.length) {
        this.print()
        this.changeNum = 0
      }
    },
    print() {
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.page { width: 94mm; height: 69mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 7pt;table-layout: fixed;word-break: break-all;page-break-after:always;  table-layout: fixed;  margin-left: 5mm;}'
        strStyle += '.table td {text-align: left;height: 7mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 7mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 7mm;border: none !important;}'
        // strStyle +=
        //   ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
        strStyle +=
          '.top-right {text-align: left;font-size: 7pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.newTitle {font-size: 20px;font-weight: 800;text-align: center;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '.qrcodestyle {margin-left: 18px; margin-top: 5px;}'
        strStyle += '.textSt {margin: 10px 40px;font-size: 12px;}'
        strStyle +=
          '.ruleStyle {   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('inventoryTable').innerHTML
          LODOP.PRINT_INIT('标签打印')
          LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('4mm', '0mm', '100mm', '70mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    handleprintBarcode() {
      let row = this.multipleSelection
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
      // this.print()
      // let row = this.multipleSelection
      // for (let i = 0; i < row.length; i++) {
      //   let trueL = this.getByteLen(row[i].specs)
      //   if (trueL > 24) {
      //     let sliceWord = row[i].specs.slice(0, 24) + '...'
      //     // console.log(row[i].specs.indexOf('家'))
      //     this.$set(row[i], 'specsNew', sliceWord)
      //     // console.log(row)
      //   } else {
      //     this.$set(row[i], 'specsNew', row[i].specs)
      //   }

      //   if (row[i].grossWeight === 0) {
      //     // console.log(111)
      //     console.log(row[i])
      //     this.$set(row[i], 'grossWeight', '')
      //   }
      // }
      // this.printBegin = true
      // this.printData = Functions.splitArray(row, 1)
      // this.print()
    },
    // 识别字符串长度
    getByteLen(str) {
      var len = 0
      if (str !== null) {
        for (var i = 0; i < str.length; i++) {
          var a = str.charAt(i)
          if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2
          } else {
            len += 1
          }
        }
        return len
      }
    },
    // handleprintBarcode() {
    //   /* 接口未配置  此处的x需要更换为打印次数字段 */
    //   this.$confirm('此标签已打印' + this.multipleSelection[0].netWeight + '次,是否要继续打印', '提示', {
    //     confirmButtonText: this.$t('button.confirm'), // '确认'
    //     cancelButtonText: this.$t('button.cancel'), // '取消'
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       API.dataGet('materialsbarcode', { barcode: this.multipleSelection[0].barcode }, 'CreateLabel').then(res => {
    //         if (res.success) {
    //           this.$notify({
    //             title: this.$t('notify.success'), // 成功
    //             message: res.message, // 成功信息
    //             type: 'success',
    //             duration: 2000
    //           })
    //         } else {
    //           this.$notify({
    //             title: this.$t('notify.failure'), // 失败
    //             message: res.message, // 失败信息
    //             type: 'error',
    //             duration: 2000
    //           })
    //         }
    //       })
    //     })
    //     .catch(e => {
    //       console.log(e)
    //     })
    // },
    /* 导出 */
    handleDownloadPast() {
      this.exportPast('materialsbarcode', this.exportParams, 'Export')
    },
    /* 冻结 */
    handleFrozen() {
      this.dialogFormVisible = true
      this.formList[1].isHide = true
      this.formList[0].isHide = false
    },
    /* 解冻 */
    handleThaw() {
      this.dialogFormVisible = true
      this.formList[0].isHide = true
      this.formList[1].isHide = false
    },
    confirm() {
      let ids = []
      let row = this.multipleSelection
      row.forEach(item => {
        ids.push(item.id)
      })
      if (this.formList[1].isHide === true) {
        let params = {
          ids: ids,
          freezeReason: this.form.freezeReason
        }
        API.dataPost('materialsbarcode', params, 'MaterialFreeze').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        return true
      } else {
        let params = {
          ids: ids,
          freezeReason: this.form.thaw
        }
        API.dataPost('materialsbarcode', params, 'MaterialUnFreeze').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        return true
      }
    },
    handleEdit() {
      this.formTitle = '修改'
      this.DeleteDialogFormVisible = true
      this.BarcodeBad()
    },
    BarcodeBad() {
      API.getDict('dict', { name: 'BarcodeFlag' }).then(res => {
        let items = res.details.splice(3, 2)
        this.DeleteFormList[0].options = items
      })
    },
    submit() {
      let array = []
      this.multipleSelection.forEach(item => {
        array.push(item.barcode)
      })
      API.dataPost('materialsbarcode', { barcodeFlag: this.FormData.BarcodeFlag, barcodeList: array }, 'UpdateBarcodeFlag').then(
        res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
            this.DeleteDialogFormVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        }
      )
      return true
    },
    cancel() {
      this.DeleteDialogFormVisible = false
      this.dialogFormVisible = false
    }
  }
}
</script>
