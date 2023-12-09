<template>
  <div class="app-container">
    <div class="head-container" style="position: relative">
      <filter-container
        :form-items="inventoryReportItems"
        :more-items="InventoryQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        style="display: inline-block"
        :selection="multipleSelection"
        :permission-crud="inventoryReportCrud"
        :button-items="inventoryReportBtnItems"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownloadPast()"
        @toopeningImport="handleOpeningImport()"
        @toGenerateQuality="handleGenerateQuality()"
        @toSaleOrder="handleSaleOrder()"
        @toGenerateReturnOrder="handleGenerateReturnOrder"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
      <!-- <CrudOperation
      :permission-crud="costomerCrud"
      :selection="multipleSelection"
      :button-items="BtnItems"
      :download-loading.sync="downloadLoading"
      @toAdd="handleCreate"
      @toEdit="handleUpdate()"
      @toDelete="handleDelete()"
      @toPrint="handlePrints()"
    /> -->
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
        :dict-gather="dictGather"
        :sorting.sync="listQuery.Sorting"
        @pagination="getList"
        @tableSort="getList"
      />
      <UploadDialog
        :dialog-visible.sync="uploadDialogVisible"
        :api-name="apiNames"
        :has-template="true"
        :template-path="templatePath"
        @reset="reset"
        @cancel="dialogCancel"
      />
      <EditForm
        :dialog-form-visible="dialogFormVisible"
        :form-title="formTitle"
        :form-list="formList"
        :form-data="form"
        :is-edit="isEdit"
        :submit="confirm"
        @cancel="dialogCancel"
      />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import colDesign from '@/mixins/colDesign'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import UploadDialog from '@/components/Upload/UploadDialog'
import { inventoryReportItems, inventoryReportCrud, inventoryReportBtnItems, InventoryQuery, formList } from './config'
export default {
  name: 'InventoryReport',
  components: {
    Table,
    CrudOperation,
    UploadDialog,
    EditForm
  },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'InventoryReportDto',
      apiName: 'inventoryreport',
      apiNames: 'inventoryreport/ImportInventory',
      dialogTitle: '库存报表', // '库存报表',
      inventoryReportItems,
      inventoryReportCrud,
      inventoryReportBtnItems,
      InventoryQuery,
      exportParams: { IsPage: false },
      templatePath: '/Temp/box.xlsx',
      downloadLoading: false,
      uploadDialogVisible: false,
      dialogFormVisible: false,
      formTitle: '',
      formList,
      form: {},
      isEdit: true
    }
  },
  watch: {},
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'Freeze' }).then(res => {
        this.InventoryQuery[1].options = res.details
      })
      API.getDict('dict', { name: 'BarcodeStatus' }).then(res => {
        this.InventoryQuery[2].options = res.details
      })
      API.getDict('dict', { name: 'QcState' }).then(res => {
        this.InventoryQuery[3].options = res.details
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.InventoryQuery[0].options = res.items
      })
    },
    handleOpeningImport() {
      this.uploadDialogVisible = true
    },
    /** 批量下架对话框关闭 */
    dialogCancel() {
      this.uploadDialogVisible = false
      this.dialogFormVisible = false
    },
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('inventoryreport', { Ids: Ids }, 'Export')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('inventoryreport', this.exportParams, 'Export')
      }
    },
    handleGenerateQuality() {
      let params = []
      this.multipleSelection.forEach(item => {
        params.push(item.barcode)
      })
      let data = {
        barcodes: params,
        repeatCheck: 'ZKNG'
      }
      this.$confirm('确定选中的' + this.multipleSelection.length + '条数据生成质检单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('recheckorder', data, 'CreateOrder').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    },
    handleSaleOrder() {
      this.dialogFormVisible = true
      let row = this.multipleSelection[0].po
      this.$set(this.form, 'Po', row.toString())
    },
    confirm() {
      let array = []
      this.multipleSelection.forEach(item => {
        array.push(item.id)
      })
      let data = {
        id: array,
        po: this.form.Po
      }
      API.dataPost('inventoryreport', data, 'SaleschangeOrder')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(e => {
          console.log(e)
          this.dialogFormVisible = false
        })
      return true
    },
    handleGenerateReturnOrder() {
      let Array = []
      this.multipleSelection.forEach(item => {
        Array.push(item.barcode)
      })
      this.$confirm('确定选中的' + this.multipleSelection.length + '条数据生成退货单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('inventoryreport', { BarCodeList: Array }, 'PurchaseOrderReturn').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success'),
              message: res.message,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure'),
              message: res.message,
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>
