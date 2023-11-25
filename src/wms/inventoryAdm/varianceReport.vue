<template>
  <div class="components-container">
    <div class="head-container">
      <filter-container
        :form-items="varianceReportItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="returnCrud"
        :selection="multipleSelection"
        :button-items="varianceBtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toPosting="handlePosting()"
        @toExamine="handleExamine()"
        @toPostingPrint="hanldePostingPrint()"
      />
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
      <!-- '差异报表明细' -->
      <h4>{{ $t('dialogHeader.varianceReport') }}</h4>
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
          :dict-gather="dictGather"
          :page-hidden="true"
        />
      </div>
    </div>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="950"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :form-data="formData"
      api-name="Stocktaking"
      @reset="reset"
      @cancel="dialogCancel"
    />

    <div v-if="printBeginCountVarianceDoc" id="CountVarianceDoc" ref="CountVarianceDoc" style="display: none">
      <CountVarianceDoc
        :data="printDataCountVarianceDoc"
        :thead="multipleSelection[0]"
        :page="printDataCountVarianceDoc.length"
      />
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import API from '@/api/base'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import CountVarianceDoc from '@/views/printable-template/CountVarianceDoc'
import { getLodop } from '@/utils/lodop'
import UploadDialog from './module/UploadDialog'

import { varianceReportItems, returnCrud, formList, varianceBtnItems, TableBtn } from './config'
export default {
  name: 'VarianceReport',
  components: { Table, CrudOperation, EditForm, CountVarianceDoc, UploadDialog },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'StocktakingReport',
      detailColName: 'StocktakingReportDetail',
      apiName: 'stocktakingreport',
      dialogTitle: this.$t('dialogHeader.varianceReport'), // '退货单',
      varianceBtnItems,
      varianceReportItems,
      returnCrud,
      API,

      form: {},
      dialogFormVisible: false,
      dialogVisible: false,
      formList,

      formTitle: '',
      isEdit: false,

      detailQuery: {
        boxID: null
      },
      detailTable: [],
      detailListLoading: false,
      listLoading: true,

      dataList: [],
      printDataCountVarianceDoc: [],
      printBeginCountVarianceDoc: false,
      TableBtn,
      uploadDialogVisible: false,
      formData: {}
    }
  },
  created() {},
  methods: {
    /** 添加明细的数据方法-自定义事件-载具中状态与盘点单据状态字段一致，需覆盖数据 */
    regainDetail(data) {
      data.forEach(item => {
        item.statusID = null
      })
    },
    /** 编辑 */
    handleUpdate() {
      this.getDetail(this.multipleSelection[0])
      if (this.multipleSelection[0].statusID === '完成') {
        this.$notify({
          title: this.$t('notify.failure'), // '失败'
          dangerouslyUseHTMLString: true,
          message: this.$t('notify.banEdit'), // '该单据已完成，无法进行修改',
          type: 'error',
          duration: 3000
        })
        this.dialogFormVisible = false
      } else {
        this.dialogFormVisible = true
        this.getForm(this.multipleSelection[0].id)
      }
    },
    /** 重写获取明细方法 */
    getDetail(row) {
      this.detailListLoading = true
      // this.detailQuery.OrderID = row.inventoryID
      API.getData('stocktakingreport', { OrderID: row.skReportID }, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.detailListLoading = false
      })
    },
    handlePosting() {
      let row = this.multipleSelection[0]
      this.$confirm('确定执行该操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('stocktakingreport', { OrderID: row.skReportID }, 'StocktakingPost').then(res => {
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
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    },
    handleExamine() {
      let row = this.multipleSelection[0]
      if (row.statusID === 'Reject' || row.statusID === 'Create') {
        API.dataPost('stocktakingreport', { skReportID: row.skReportID }, 'OAAudit').then(res => {
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
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      } else {
        this.$message.warning('只允许状态为创建或驳回的进行审核！')
      }
    },
    async hanldePostingPrint() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择至少一条数据进行打印')
        return
      }
      let row = this.multipleSelection[0]

      let res = await API.getData('stocktakingreport', { OrderID: row.skReportID }, 'GetDetails')
      if (res.details.length === 0) {
        this.$message.warning('该单据当前明细为空，请选择其他单据进行打印！')
        return
      }
      this.multipleData = res.details
      // console.log(row._orderType)
      // this.$set(this.multipleData[0], 'stocktakingType', row.stocktakingType)
      // this.$set(this.multipleData[0], 'warehouseID', row.warehouseID)
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        this.printBeginCountVarianceDoc = true
        this.printDataCountVarianceDoc = this.multipleData
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 202mm; height: 297mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 10mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 10mm;border: 1px solid #000; }'
        strStyle +=
          ' .main-title { height: 18mm !important; line-height: 18mm; font-size: 20pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom: 1px solid #000!important;}'
        strStyle += '.top-right {text-align: left;font-size: 10pt;font-weight: normal;position: absolute;right:1mm}'
        strStyle += '.qrcodestyle {position: absolute; right: 1mm;top:1mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {height: 10mm;line-height: 10mm;text-align:left;border: none !important;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.tb-footer1 td {height:10mm;line-height: 10mm !important;text-align: center;border: none;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('CountVarianceDoc').innerHTML
          LODOP.PRINT_INIT('盘点单打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, '') // 1纵向、2横向，纸宽，纸高，A4规格
          // LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_TABLE('1mm', '4mm', '210mm', '297mm', printTemplate) // Top,Left,Width,Height
          LODOP.NewPageA() // 强制分页，前面的自动分页，后面的页面会在自动分页的后面添加新页面。
          LODOP.PREVIEW()
          this.printBeginCountVarianceDoc = false
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
    },
    dialogCancel() {
      this.uploadDialogVisible = false
    }
  }
}
</script>

