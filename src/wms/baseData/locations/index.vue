<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="LocationsCrud"
        :button-items="locationsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toImport="handleImport()"
        @toExport="handleDownload()"
        @toprintBarcode="handleprintBarcode()"
        @todownSet="handleDownSet()"
      />
      <!-- @toImport="handleImport()" -->
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
        :api-name="apiName"
        :dialog-width="950"
        :layout="layout"
        :cbg-remote="cbgRemote"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
      <EditBatchDialog
        :dialog-visible.sync="batchDialogVisible"
        :form-title="formTitle"
        :form-data="form"
        :batch-form-list="batchFormList"
        :data-list="tableList"
        :detail-table.sync="list"
        :api-name="apiName"
        :batch-table-list="column"
        :dict-gather="dictGather"
        @reset="reset"
        @cancel="dialogCancel"
      />
      <UploadDialog
        :dialog-visible.sync="uploadDialogVisible"
        :api-name="apiName"
        :has-template="true"
        :template-path="templatePath"
        @reset="reset"
        @cancel="dialogCancel"
      />
      <!-- 下架弹窗 -->
      <EditForm
        :dialog-form-visible="downSetFormVisible"
        :form-title="formTitle"
        :form-list="downSetFormList"
        :form-data="downSetForm"
        :is-edit="true"
        :api-name="apiName"
        :dialog-width="750"
        :layout="layout"
        :submit="handleDownSetSave"
        @cancel="dialogCancel"
        @reset="reset"
      />
      <div v-if="printBegin" id="boxBarcode" ref="boxBarcode" style="display: none">
        <boxBarcode v-for="(item, index) in printData" :key="index" :data="item" />
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditBatchDialog from '@/components/EditBatchDialog'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import Functions from '@/utils/functions'
import boxBarcode from '@/views/printable-template/locationsBarcode'
import { getLodop } from '@/utils/lodop'
import { formList, batchFormList, queryItems, LocationsCrud, locationsBtnItems, downSetFormList } from './config'
export default {
  name: 'Locations',
  components: { Table, EditForm, CrudOperation, EditBatchDialog, UploadDialog, boxBarcode },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Locations',
      apiName: 'locations',
      dialogTitle: this.$t('dialogHeader.locations'), // '货位',
      templatePath: '/Temp/Locations.xlsx',
      locationsBtnItems,
      formList,
      queryItems,
      batchFormList,
      LocationsCrud,
      downSetFormList,

      tableList: [],
      form: {},
      dialogFormVisible: false,
      uploadDialogVisible: false,
      batchDialogVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      downloadLoading: false,
      exportParams: {},
      boxcbgAttr: formList[3], // 远程
      warehousecbgAttr: formList[2], // 远程
      printBegin: false,
      printData: [],
      downSetFormVisible: false, // 下架弹窗显示标识
      downSetForm: {},
      wharfLocationId: ''
    }
  },
  created() {
    this.formChange()
    this.getDict()
    this.getWarehouse()
    this.getRegion()
  },
  methods: {
    /** 下拉框失焦获值*/
    formChange() {
      this.formList.forEach(item => {
        switch (item.prop) {
          case 'warehouseID': {
            item.change = row => {
              this.inputWHName(row)
            }
            break
          }
        }
      })
    },
    getDict() {
      API.getDict('dict', { name: 'LocationsState' }).then(res => {
        this.formList[1].options = this.queryItems[1].options = this.batchFormList[0].options = res.details
      })
      API.getDict('dict', { name: 'LocalType' }).then(res => {
        this.queryItems[4].options = this.formList[9].options = res.details
      })
      API.getDict('dict', { name: 'OutWharf' }).then(res => {
        this.downSetFormList[0].options = res.details
      })
    },
    handleCreate() {
      this.form = {}
      this.getOpts()
      this.dialogOpen()
      this.getNewWarehouse()
      // this.getNewBox()
    },
    handleUpdate() {
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
      // this.getNewWarehouse()
      // this.getNewBox()
    },
    getOpts() {
      this.getCbgRemoteOpts(this.warehousecbgAttr, 'warehouse')
      // this.getCbgOpts('warehouse', { IsPage: false })
    },
    // 给区域和仓库赋值
    // inputWarehouse(val) {
    //   this.formList[2].options.forEach(item => {
    //     if (item.name === val) {
    //       this.form.whId = item.whid
    //     }
    //   })
    // },
    handleImport() {
      this.uploadDialogVisible = true // 导入
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
      this.downSetFormVisible = false
    },
    inputWHName(val) {
      this.formList[2].options.forEach(item => {
        if (item.value === val) {
          this.form.whName = item.warehouseName
        } else if (val === '') {
          this.form.whName = ''
          this.getNewWarehouse()
        }
      })
    },
    cbgRemote(node, str) {
      // if (node === this.boxcbgAttr.prop) {
      //   this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
      // }
      if (node === this.warehousecbgAttr.prop) {
        this.getCbgRemoteSearch(this.warehousecbgAttr, 'warehouse', { warehouseID: str })
      }
    },

    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.queryItems[2].options = res.items
      })
    },
    getRegion() {
      API.get('Region', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.regionName
          item.value = item.regionID
        })
        this.formList[3].options = res.items
      })
    },
    // 下拉框获取新的仓库编码options
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.formList[2].options = res.items
      })
    },
    // getNewBox() {
    //   API.get('box', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       // arr.push(item.warehouseID)
    //       item.label = item.boxID
    //       item.value = item.boxID
    //     })
    //     this.formList[3].options = res.items
    //   })
    // }
    handleprintBarcode() {
      let row = this.multipleSelection
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
      console.log(this.printData)
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
        strStyle += '.page { width: 99mm;height: 68mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          '.barcode {width: 99mm;height: 68mm;border: 1px soild #000; left: 8mm;  top: 14mm; position: absolute;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('boxBarcode').innerHTML
          LODOP.PRINT_INIT('载具条码打印')
          LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '100mm', '68mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },

    // 下架按钮
    handleDownSet() {
      // 判断是否选中同一个仓库
      let samewarehouseID = this.multipleSelection.every(
        item => item.warehouseID === this.multipleSelection[0].warehouseID
      )
      if (!samewarehouseID) {
        this.$message({
          message: '请选择同一仓库',
          type: 'warning'
        })
      } else {
        this.downSetForm = {}
        this.downSetFormVisible = true
      }
    },
    // 下架保存
    handleDownSetSave() {
      let row = this.multipleSelection
      let multipeResult = row.map(item => {
        return { locationID: item.locationID, warehouseID: item.warehouseID }
      })
      API.dataPost(
        'locations',
        { locationList: multipeResult, destination: this.downSetForm.destination },
        'CreateOutTask'
      ).then(res => {
        if (res.success) {
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: '下架成功', // '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
            type: 'error',
            duration: 2000
          })
        }
      })
      return true
    }
  }
}
</script>
