<template>
  <div class="components-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="InventoryOrderCrud"
        :button-items="inventoryBtnItems"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toDelete="handleDelete()"
        @toPosting="handlePosting()"
        @toPrintReceipt="handlePrint()"
      />
      <!-- @toOAprint="handleOAprint()" -->

      <!-- @toInventory="handleInventory()"
      @toUndercarriage="handleCarriage()"
      @toPosting="handlePosting()"
      @toPostingPrint="hanldePostingPrint()"
      @toCreatevarianceReport="handCreatevariance()" -->
      <div style="height: 350px">
        <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :height="330"
          :data-list="list"
          :column="column"
          :selection.sync="multipleSelection"
          :table-btn="TableBtn"
          :total="totalCount"
          :page.sync="page"
          :limit.sync="listQuery.MaxResultCount"
          :is-sort="true"
          :sorting.sync="listQuery.Sorting"
          :dict-gather="dictGather"
          @getDetail="getDetail"
          @pagination="getList"
          @tableSort="getList"
          @toDownload="handletoDownload"
          @toUpload="handletoUpload"
        />
      </div>
    </div>
    <div class="content-container" style="margin-top: 10px">
      <h4>{{ $t('dialogHeader.scrapInStockChangeDetails') }}</h4>
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
          :height="250"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :has-selection="false"
          :page-hidden="true"
          :dict-gather="dictGather"
          :show-summary="true"
          :summary-method="getTotal"
        />
      </div>
    </div>
    <EditDetailOptDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="isEdit"
      :form-list="inventoryFormList"
      :table-list="inventoryTableList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="stockQueryItems"
      :check-params="checkParams"
      :submit="submit"
      @regainDetail="regainDetail"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
    <!-- 盘点操作对话框 -->
    <!-- <editDialog
      :dialog-visible="dialogVisible"
      :form-title="formTitle"
      :form-data.sync="form"
      :table-data-list.sync="dataList"
      :form-list="inventoryHeadList"
      :is-edit="isEdit"
      :api="API"
      :api-name="apiName"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <OutShelves
      :form-title="dialogTitle"
      :dialog-form-visible="outShelvesDialogVisible"
      :form-list="outShelvesForm"
      :is-edit="true"
      :form-data="batchData"
      :submit="submitOutShelves"
      @cancel="dialogCancel"
    /> -->
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :form-data="form"
      :api-name="apiName"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <div v-if="printBeginCountSheet" id="IssueDocPrintsZKBF" ref="IssueDocPrintsZKBF" style="display: none">
      <IssueDocPrintsZKBF
        :data="printDataCountSheet"
        :thead="multipleSelection[0]"
        :page="printDataCountSheet.length"
      />
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
// import OutShelves from '@/components/EditDialog'
import EditDetailOptDialog from './module/index'
// import EditDetailOptDialog from './module/EditDetailOptDialog'
// import EditDialog from './module/inventoryDialog'
import API from '@/api/base'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import IssueDocPrintsZKBF from '@/views/printable-template/IssueDocPrintsZKBF'
import UploadDialog from './module/UploadDialog'

import { getLodop } from '@/utils/lodop'

import {
  queryItems,
  inventoryFormList,
  inventoryHeadList,
  inventoryTableList,
  stockQueryItems,
  InventoryOrderCrud,
  inventoryBtnItems,
  outShelvesForm,
  TableBtn
} from './config'
export default {
  name: 'InventoryOrder',
  components: { Table, EditDetailOptDialog, CrudOperation, IssueDocPrintsZKBF, UploadDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'scraporder',
      detailColName: 'ScrapOrderDetail',
      apiName: 'scraporder',
      dialogTitle: this.$t('dialogHeader.scrapInStockChange'), // '盘点单',
      outShelvesForm,
      queryItems,
      inventoryFormList,
      inventoryHeadList,
      inventoryTableList,
      InventoryOrderCrud,
      inventoryBtnItems,

      API,

      checkParams: 'boxID',
      detailTitle: this.$t('dialogHeader.stock'), // '库存',
      colDetailName: 'InventoryReportDto',
      apiDetailName: 'inventoryreport',
      stockQueryItems,

      layout: { span: 8 },

      form: {},
      dialogFormVisible: false,
      dialogVisible: false,

      formTitle: '',
      isEdit: false,
      editDetailTable: [],

      detailQuery: {
        stocktakingID: null
      },
      detailTable: [],
      detailListLoading: false,
      listLoading: true,

      dataList: [],
      outShelvesDialogVisible: false,
      batchData: {},
      printBeginCountSheet: false,
      printDataCountSheet: [],
      multipleData: [],
      TableBtn,
      uploadDialogVisible: false,
      totalCol: ['quantity']
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    /** 新增提交确认的数据校验为空*/
    submit() {
      if (this.editDetailTable.length === 0) {
        this.$message({ type: 'error', message: '当前盘点单新增明细为空，请选择明细后再进行提交！' })
        return true
      }
    },
    /** 添加明细的数据方法-自定义事件-载具中状态与盘点单据状态字段一致，需覆盖数据 */
    regainDetail(data) {
      data.forEach(item => {
        item.statusID = null
      })
    },
    /** 获取数据字典 */
    getDict() {
      // API.getDict('dict', { name: 'StocktakingOrderType' }).then(res => {
      //   this.inventoryFormList[2].options = this.queryItems[1].options = this.inventoryHeadList[2].options = res.details
      // })
      API.getDict('dict', { name: 'ScrapStockType' }).then(res => {
        this.queryItems[1].options = res.details
      })
    },

    /** 重写获取明细方法 */
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.orderID = row.orderID
      API.getData('scraporder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.editDetailTable = res.items
        this.detailListLoading = false
      })
    },
    /** 盘点按钮 */
    handleInventory() {
      this.formTitle = '盘点单过账'
      if (this.multipleSelection[0].statusID === 'Finish') {
        this.dialogVisible = false
        this.$message.warning('当前盘点单已完成')
      } else {
        API.getData('stocktakingdetail', this.detailQuery).then(res => {
          this.dataList = res.items
        })
        API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
          this.form = res
        })
        this.dialogVisible = true
      }
    },
    // 下架按钮
    handleCarriage() {
      // console.log(111)
      this.detailTitle = '下架位置'
      this.outShelvesDialogVisible = true
      this.getLocationOpts()
    },
    // /** 下架对话框关闭 */
    // dialogCancel() {
    //   this.outShelvesDialogVisible = false
    // },
    /** 获取下拉位置 下拉选项 */
    getLocationOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.wharfName
          item.value = item.wharfID
        })

        this.outShelvesForm[0].options = res.items
      })
    },

    async submitOutShelves() {
      // 批量下架载具
      let params = {
        stocktakingID: '',
        wharfID: ''
      }

      params.stocktakingID = this.multipleSelection[0].stocktakingID
      params.wharfID = this.batchData.wharfID
      await API.dataPost('stocktaking', params, 'StocktakingOutShelves')
        .then(res => {
          if (res.success) {
            this.outShelvesDialogVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.batchData = {}
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.outShelvesDialogVisible = false
        })
      return true
    },
    /** 弹窗关闭 */
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.outShelvesDialogVisible = false
      this.dialogVisible = false
      this.batchData = {}
      if (val.isSave) {
        this.reset(1)
      }
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.inventoryFormList[0].options = res.items
      })
    },
    // handlePosting() {
    //   let row = this.multipleSelection[0]
    //   // console.log(row)
    //   // let dataP = { stocktakingID: row.stocktakingID }
    //   if (row.stocktakingType === '月盘点') {
    //     API.dataPost('stocktaking', { stocktakingID: row.stocktakingID }, 'StocktakingPost').then(res => {
    //       if (res.success) {
    //         this.$notify({
    //           title: this.$t('notify.success'), // '成功'
    //           message: this.$t('notify.operateSuccess'), // '操作成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       } else {
    //         this.$notify({
    //           title: this.$t('notify.failure'), // '失败'
    //           // 接口返回数据，待中英配置
    //           message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
    //           type: 'error',
    //           duration: 2000
    //         })
    //       }
    //     })
    //   } else {
    //     this.$message.error('只有月盘点才可以过账。')
    //   }
    // },
    // 生成差异表单按钮
    handCreatevariance() {
      let row = this.multipleSelection
      let skReportIDs = []
      row.forEach(item => {
        skReportIDs.push(item.stocktakingID)
      })
      API.dataPost('stocktakingreport', { skReportIDs: skReportIDs }, 'GenerateReport').then(res => {
        if (res.success) {
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.operateSuccess'), // '操作成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',// 接口返回数据，待中英配置
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleOAprint() {
      let row = this.multipleSelection[0]
      if (row.statusID !== 'Create') {
        this.$message.warning('只有状态为创建，才能进行OA审批！')
        return
      } else {
        API.dataPost('scraporder', { orderID: row.orderID }, 'ScrapAudit').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.showGenerate = false
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',// 接口返回数据，待中英配置
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    handlePosting() {
      let row = this.multipleSelection[0]
      // if (row.statusID === 'Create') {
      //   this.$message.warning('请先进行OA审批，在执行过账审核！')
      //   return
      // }
      // else
      if (row.statusID === 'Finish') {
        this.$message.warning('该单据已完成，请选择其他单据进行过账！')
        return
      } else {
        this.$confirm('确定执行该操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.dataPost('scraporder', { orderID: row.orderID }, 'ScrapPost').then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success'), // '成功'
                message: this.$t('notify.operateSuccess'), // '操作成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.showGenerate = false
            } else {
              this.$notify({
                title: this.$t('notify.failure'), // '失败'
                message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',// 接口返回数据，待中英配置
                type: 'error',
                duration: 2000
              })
            }
          })
        })
      }
    },
    async handlePrint() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择至少一条数据进行打印')
        return
      }
      let row = this.multipleSelection[0]
      let res = await API.getData('scraporder', { orderID: row.orderID }, 'GetDetails')
      if (res.details.length === 0) {
        this.$message.warning('该单据当前明细为空，请选择其他单据进行打印！')
        return
      }
      this.multipleData = res.details
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        this.printBeginCountSheet = true
        this.printDataCountSheet = this.multipleData
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 202mm; height: 130mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 10mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 10mm;border: 1px solid #000; }'
        strStyle +=
          ' .main-title { height: 18mm !important; line-height: 18mm; font-size: 20pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom: 1px solid #000!important;}'
        strStyle += '.top-right {text-align: left;font-size: 10pt;font-weight: normal;position: absolute;right:19mm}'
        strStyle += '.qrcodestyle {position: absolute; right: 1mm;top:1mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {line-height: 7mm;text-align:left;  border: none !important;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.tb-footer1 td {height:10mm;line-height: 10mm !important;text-align: center;border: none;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('IssueDocPrintsZKBF').innerHTML
          LODOP.PRINT_INIT('领料单打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2200, 1420, '') // 1纵向、2横向，纸宽，纸高，A4规格
          // LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_TABLE('1mm', '4mm', '220mm', '142mm', printTemplate) // Top,Left,Width,Height
          LODOP.NewPageA() // 强制分页，前面的自动分页，后面的页面会在自动分页的后面添加新页面。
          LODOP.PREVIEW()
          this.printBeginCountSheet = false
        })
      }
    },
    handletoDownload(val) {
      if (val.row.fileUrl === null) {
        this.$message.error('当前单号暂无附件，请先上传！')
      } else {
        this.downloadLoading = true
        let url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + val.row.fileUrl
        // window.location.href = url
        window.open(url)
        this.downloadLoading = false
      }
    },

    handletoUpload(val) {
      this.form = {}
      this.uploadDialogVisible = true
      this.$set(this.form, 'id', val.row.id)
    }
  }
}
</script>
