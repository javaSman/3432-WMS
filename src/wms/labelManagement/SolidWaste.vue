<template>
  <div class="components-container">
    <div class="head-container">
      <filter-container :form-items="SolidQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation :permission-crud="Crud" :selection="multipleSelection" />
      <div style="height: 350px">
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :height="320"
          :data-list="list"
          :column="SolidTableList"
          :table-btn="SolidTableBtn"
          :selection.sync="multipleSelection"
          :total="totalCount"
          :page.sync="page"
          :limit.sync="listQuery.MaxResultCount"
          :is-sort="true"
          :has-selection="false"
          :sorting.sync="listQuery.Sorting"
          :dict-gather="dictGather"
          @getDetail="getDetail"
          @pagination="getList"
          @tableSort="getList"
          @toGenerateLabel="handleGenerateLabel"
        />
      </div>
    </div>
    <div class="content-container" style="margin-top: 10px">
      <CrudOperation
        :button-items="BtnItems"
        :selection="treeSelection"
        @toprintBarcode="handleprintBarcode()"
        @toDelete="handleDelete()"
      />
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <div style="height: 270px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="260"
          :data-list="detailTable"
          :column="columnDetail"
          :selection.sync="treeSelection"
          :has-selection="true"
          :page-hidden="true"
          :dict-gather="dictGather"
          :has-index="true"
          :show-summary="true"
          :summary-method="getTotal"
        />
      </div>
    </div>
    <div v-if="printBegin" id="inventoryTableTwo" ref="printTableTwo" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div>
  </div>
</template>
<script>
// import SingleTable from '@/components/singleTable'
import Table from '@/components/Table'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { API } from '@/api/generalAPI'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import { SolidQueryItems, Crud, BtnItems, SolidTableList, SolidTableBtn } from './config'
import PrintTable from '@/views/printable-template/SolidWasteTableStock'
export default {
  name: 'SolidWaste',
  components: { Table, CrudOperation, PrintTable },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Warehouse',
      apiName: 'GetGenerateLabelList',
      detailColName: 'BarcodeDetails',
      SolidQueryItems,
      BtnItems,
      SolidTableList,
      SolidTableBtn,
      Crud,
      loading: false,
      layout: { gutter: 10, span: 24, xs: 24, sm: 12, md: 8, xl: 6 },
      detailListLoading: false,
      detailTable: [],
      treeSelection: [],
      totalCol: ['quantity'],
      changeNum: 0,
      printBegin: false,
      printData: [],
      nNum: []
      // Datas: []
    }
  },
  computed: {
    Datas() {
      return this.list
    }
  },
  watch: {
    Datas: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.calculateSum()
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    //  this.SolidTableList.forEach(item => {
    //   switch (item.prop) {
    //     case 'labelMantelNum': {
    //       item.keyup = (index, row) => {
    //         debugger
    //         row.total = Number(row.labelMantelNum) * Number(row.labelNum)
    //         // console.log(row.total>Number(row.remainder),'he')
    //         // console.log(typeof(row.total))
    //         if(row.total>Number(row.remainder)){
    //            row.total = ''
    //            this.$message.error('数量合计不能超过待生成标签数量！');
    //         }
    //       }
    //       break
    //     }
    //     case 'labelNum': {
    //       item.keyup = (index, row) => {
    //         row.total = Number(row.labelMantelNum) * Number(row.labelNum)
    //         if(row.total>Number(row.remainder)){
    //            row.total = ''
    //            this.$message.error('数量合计不能超过待生成标签数量！');
    //         }
    //       }
    //       break
    //     }
    //     //  case 'total': {
    //     //   item.change = (index, row) => {
    //     //    row.total = row.labelMantelNum * row.labelNum
    //     //    if(row.total>Number(row.remainder)){
    //     //        row.total = ''
    //     //        this.$message.error('数量合计不能超过待生成标签数量！');
    //     //     }
    //     //   }
    //     //   break
    //     // }
    //   }
    // })
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    /* 接口未配置 */
    // getDetail(row) {
    //   this.detailListLoading = true
    //   this.detailQuery.DeliverynoteID = row.DeliverynoteID
    //   API.getData('materialsbarcode', this.detailQuery, 'all').then(res => {
    //     this.detailTable = res.items
    //     this.detailListLoading = false
    //   })
    // },
    // 计算求和
    calculateSum() {
      this.list.forEach(item => {
        item.total = item.labelMantelNum * item.labelNum
        //  if(item.total>item.remainder){
        //          item.total = ''
        //          this.$message.error('数量合计不能超过待生成标签数量！');
        //       }
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.SkipCount = (this.page - 1) * 10
      API.getData('wasteorder', this.listQuery, 'GetAllDetails').then(res => {
        console.log(res)
        // 待生成的标签数=总数-已生成的数
        res.items.map(item => {
          item.remainder = Number(item.quantity) - Number(item.lableNum)
          // 转换时间格式
          item.creationTime = item.creationTime.split('T')[0] + ' ' + item.creationTime.split('T')[1]
        })
        this.list = res.items
        this.totalCount = res.totalCount
        this.listLoading = false
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      API.get(
        'materialsbarcode',
        { DeliverynoteNo: row.itemNo, IsPage: 'false', DeliverynoteID: row.orderID, BarcodeType: 'Waste' },
        'all'
      ).then(res => {
        this.detailTable = res.items
        this.detailListLoading = false
      })
    },
    // handleprintBarcode() {
    //   /* 接口未配置  此处的x需要更换为打印次数字段 */
    //   this.$confirm('此标签已打印' + this.treeSelection[0].netWeight + '次,是否要继续打印', '提示', {
    //     confirmButtonText: this.$t('button.confirm'), // '确认'
    //     cancelButtonText: this.$t('button.cancel'), // '取消'
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       API.dataPost('', {}, '').then(res => {
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
    handleDelete() {
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        let params = []
        this.treeSelection.forEach(item => {
          params.push(item.id)
        })
        API.dataPost('materialsbarcode', params, 'DelMaterialsBarcode')
          .then(res => {
            let data = this.detailTable
            this.treeSelection.forEach(item => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].id === item.id) {
                  data.splice(i, 1)
                }
              }
            })
            this.$notify({
              title: this.$t('notify.success'), // 成功
              message: this.$t('notify.delSuccess'), // 返回成功信息
              type: 'success',
              druation: 2000
            })
            this.getList()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('notify.delFailure') // '未删除成功'
            })
          })
      })
    },
    handleGenerateLabel({ row, $index }) {
      this.$set(this.SolidTableBtn.btnItem[0].btnLoding, $index, true)
      if (!row.labelMantelNum || row.labelMantelNum === 0 || !row.labelNum || row.labelNum === 0) {
        this.$message.error('请输入物料标签数量和标签个数！')
        this.$set(this.SolidTableBtn.btnItem[0].btnLoding, $index, false)
        return
      }
      if (row.total > row.remainder) {
        row.total = 0
        row.labelMantelNum = null
        row.labelNum = null
        this.$message.error('数量合计不能超过待生成标签数量！')
        this.$set(this.SolidTableBtn.btnItem[0].btnLoding, $index, false)
        return
      }
      this.detailListLoading = true
      let params = {
        orderID: row.orderID,
        labelMantelNum: row.labelMantelNum,
        labelNum: row.labelNum,
        itemNo: row.itemNo,
        materialID: row.materialID
      }
      API.dataPost('materialsbarcode', params, 'CreateWasteLabel')
        .then(res => {
          if (res.success) {
            API.get('materialsbarcode', { DeliverynoteID: row.receiptID }, 'all').then(res => {
              if (res) {
                this.detailTable = res.items
                this.getList()
              }
            })
            row.total = 0
            this.detailListLoading = false
          } else {
            this.$set(this.SolidTableBtn.btnItem[0].btnLoding, $index, false)
            this.detailListLoading = false
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .finally(() => {
          this.$set(this.SolidTableBtn.btnItem[0].btnLoding, $index, false)
        })
    },
    handleChange() {
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.treeSelection.length) {
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
        strStyle += '.page { width: 94mm; height: 63mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 7pt;table-layout: fixed;word-break: break-all;page-break-after:always;  table-layout: fixed;  margin-left: 5mm;}'
        strStyle += '.table td {text-align: left;height: 6mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 6mm !important;}'
        strStyle += '.table tr {height: 5mm;}'
        strStyle += '.top-title td { height: 5mm;border: none !important;}'
        // strStyle +=
        //   ' .main-title { height: 12mm !important; line-height: 12mm; font-size: 16pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom:1px solid}'
        strStyle +=
          '.top-right {text-align: left;font-size: 7pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.newTitle {font-size: 20px;font-weight: 800;text-align: center;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '.qrcodestyle {margin-left: 18px; margin-top: 5px;}'
        strStyle += '.textSt {margin: 7px 40px;font-size: 12px;}'
        strStyle +=
          '.ruleStyle {   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('inventoryTableTwo').innerHTML
          LODOP.PRINT_INIT('固废标签打印')
          LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('4mm', '0mm', '100mm', '70mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    handleprintBarcode() {
      let row = this.treeSelection
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
    }
  }
}
</script>
