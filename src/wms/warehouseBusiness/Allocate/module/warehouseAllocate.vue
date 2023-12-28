<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="WarehouseItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="WarehouseCrud"
        :selection="multipleSelection"
        :button-items="WarehouseBtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @todeleteSing="handleDeletessss()"
        @toOutShelves="handleOutShelves()"
        @toprintBarcode="handleprintBarcode()"
      />
      <div style="height: 350px">
        <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :data-list="list"
          :column="column"
          :height="320"
          :selection.sync="multipleSelection"
          :total="totalCount"
          :page.sync="page"
          :limit.sync="listQuery.MaxResultCount"
          :is-sort="true"
          :sorting.sync="listQuery.Sorting"
          :dict-gather="dictGather"
          @getDetail="getDetail"
          @pagination="getList"
          @tableSort="getList"
        />
      </div>
    </div>
    <div class="content-container" style="margin-top: 10px">
      <div style="height: 400px">
        <el-tabs type="border-card" style="border">
          <el-tab-pane label="调拨单明细">
            <ColDesign
              tid="DetailTable"
              :col-list="columnDetail"
              :table-show.sync="detailTableShow"
              style="margin-top: 50px"
              @resetColDetail="resetColDetail"
            />
            <Table
              v-if="detailTableShow"
              ref="tableDetail"
              v-loading="detailListLoading"
              :height="300"
              :data-list="multipleSelection.length === 1 ? detailTable : []"
              :column="columnDetail"
              :has-selection="false"
              :page-hidden="true"
              :dict-gather="dictGather"
              :has-index="true"
              :show-summary="true"
              :summary-method="getTotal"
            />
          </el-tab-pane>
          <el-tab-pane label="标签明细">
            <CrudOperation
              style="padding-left: 20px"
              :selection="treeSelection"
              :button-items="WarehouseDetailBtn"
              @toOffShelf="handleOffShelf()"
            />
            <ColDesign
              tid="DetailTable"
              :col-list="columnDetailTwo"
              :table-show.sync="detailTableShowTwo"
              @resetColDetail="resetColDetail"
            />
            <Table
              v-if="detailTableShowTwo"
              ref="tableDetail"
              v-loading="detailListLoading"
              :height="300"
              :data-list="multipleSelection.length === 1 ? detailTable : []"
              :column="columnDetailTwo"
              :has-selection="true"
              :selection.sync="treeSelection"
              :page-hidden="true"
              :dict-gather="dictGather"
              :has-index="true"
              :show-summary="true"
              :summary-method="getTotal"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <EditDetailOptDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="isEdit"
      :form-list="WarehouseList"
      :table-list="WarehouseTabelList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="WarehosueQueryItems"
      :check-params="checkParams"
      :dict-gather="dictGather"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
    <EditForm
      :dialog-form-visible="EditDialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="FormData"
      :is-edit="true"
      :dialog-width="850"
      :submit="confirm"
      @cancel="cancel"
    />
    <div v-if="printBegin" id="allocate" ref="allocate" style="display: none">
      <AllocateTransfer :data="allocate" :thead="multipleSelection[0]" :page="allocate.length" />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditDetailOptDialog from './EditDetailOptDialog.vue'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
import { getLodop } from '@/utils/lodop'
import AllocateTransfer from '@/views/printable-template/allocateTransfer'
import {
  WarehouseItems,
  WarehouseCrud,
  WarehouseBtnItems,
  WarehouseDetailBtn,
  WarehouseList,
  WarehosueQueryItems,
  WarehouseTabelList,
  formList
} from '../config'
export default {
  name: 'WarehouseAllocate',
  components: {
    Table,
    EditDetailOptDialog,
    CrudOperation,
    EditForm,
    AllocateTransfer
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'AllocationOrder',
      detailColName: 'AllocationOrderDetail',
      detailColNameTwo: 'AllocationOrderDetail',
      apiName: 'allocationOrder',
      WarehouseItems,
      WarehouseCrud,
      WarehouseBtnItems,
      WarehouseDetailBtn,
      WarehouseList,
      WarehouseTabelList,
      WarehosueQueryItems,
      dialogTitle: this.$t('dialogHeader.OtherRequisition'),
      layout: { span: 8 },
      detailTable: [],
      formTitle: '',
      detailTitle: this.$t('dialogHeader.OtherRequisition'),
      form: {},
      printBegin: false,
      allocate: [],
      API,
      isEdit: false,
      editDetailTable: [],
      dialogFormVisible: false,
      checkParams: '',
      colDetailName: 'GetAllocateInventory',
      apiDetailName: 'inventoryreport/GetAllInventory',
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderID: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity'],
      treeSelection: [],
      EditDialogFormVisible: false,
      formList,
      FormData: {}
    }
  },
  created() {
    this.getWarehouse()
    this.fromChange()
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    fromChange() {
      this.WarehouseList.forEach(item => {
        switch (item.prop) {
          case 'inWarehouseCode': {
            item.change = row => {
              if (this.form.inWarehouseCode !== undefined && this.form.outWarehouseCode !== undefined) {
                if (this.form.inWarehouseCode === this.form.outWarehouseCode) {
                  this.$message({ type: 'warning', message: '转入仓库与转出仓库不可相同' })
                  this.form.inWarehouseCode = ''
                }
                // else {
                // this.nextClick()
                // }
              }
              // else {
              //   this.form.inWarehouseCode = ''
              //   this.$message({ type: 'error', message: '请先选择转出仓库' })
              // }
            }
            break
          }
          case 'outWarehouseCode': {
            item.change = row => {
              if (this.form.inWarehouseCode !== undefined && this.form.outWarehouseCode !== undefined) {
                if (this.form.inWarehouseCode === this.form.outWarehouseCode) {
                  this.$message({ type: 'warning', message: '转入仓库与转出仓库不可相同' })
                  this.form.outWarehouseCode = ''
                }
              }
            }
            break
          }
        }
      })
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getDetail(this.multipleSelection[0])
    },
    // 非标删除
    handleDeletessss() {
      let row = this.multipleSelection[0]
      this.$confirm(this.$t('dialog.deleteTips'), this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      })
        .then(() => {
          API.dataPost(this.apiName, [row.id], 'Delete').then(res => {
            // this.$notify({
            //   title: this.$t('notify.success'), // '成功'
            //   message: this.$t('notify.delSuccess'), // '删除成功'
            //   type: 'success',
            //   duration: 2000
            // })

            if (res.success) {
              this.getList()
              this.$notify({
                title: this.$t('notify.success'), // '成功'
                message: this.$t('notify.delSuccess'), // '删除成功'
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure'), // '失败'
                message: res.message, // '操作失败',
                type: 'error',
                duration: 2000
              })
            }
            // 组织机构重置查询条件，重新获取树形控件数据
            // if (isReset) {
            //   if (this.listQuery.id === params[0]) {
            //     this.listQuery = {
            //       Sorting: null,
            //       SkipCount: 0,
            //       MaxResultCount: 20
            //     }
            //   }
            //   this.getList()
            //   this.getOrgs()
            // } else {
            //   this.getList()
            // }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('notify.delFailure') // '未删除成功'
          })
        })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
        })
        this.WarehouseList[0].options = this.WarehouseList[1].options = res.items
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderID = row.allocationID
      API.get('allocationorder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.editDetailTable = res.details
        this.detailListLoading = false
      })
    },
    handleOutShelves() {
      this.formTitle = '下架位置'
      this.EditDialogFormVisible = true
      this.getLocationOpts()
    },
    getLocationOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.wharfName
          item.value = item.wharfID
        })
        this.formList[0].options = res.items
      })
    },
    confirm() {
      let Array = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        Array.push(this.multipleSelection[i].id)
      }
      let params = {
        id: Array,
        endPostion: this.FormData.wharfID
      }
      API.dataPost('allocationorder', params, 'AllocationOrderSale')
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
        .catch(() => {
          this.EditDialogFormVisible = false
        })
      return true
    },
    cancel() {
      this.EditDialogFormVisible = false
      this.dialogFormVisible = false
    },
    handleOffShelf() {
      this.handleOutShelves()
    },
    handleprintBarcode() {
      // let row = this.multipleSelection
      // this.printBegin = true
      // this.printData = Functions.splitArray(row, 1)
      // console.log(this.printData)
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        this.printBegin = true
        this.allocate = this.detailTable
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 200mm; height: 139mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 10mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 10mm;border: 1px solid #000; }'
        strStyle +=
          ' .main-title { height: 18mm !important; line-height: 18mm; font-size: 20pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom: 1px solid #000!important;}'
        strStyle +=
          '.top-right {text-align: left;font-size: 10pt;font-weight: normal;position: absolute;right:19mm;top: 8mm;}'
        strStyle += '.qrcodestyle {position: absolute; right: 1mm;top:1mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {height: 10mm;line-height: 10mm;text-align:left;border: none !important;}'
        strStyle += '.tb-footer1 td {height: 10mm;line-height: 10mm;text-align:left;border: none !important;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.tb-footer2 td {height:10mm;line-height: 10mm !important;text-align: center;border: none;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('allocate').innerHTML
          LODOP.PRINT_INIT('调拨单打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2400, 1420, '') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '201mm', '140mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    }
  }
}
</script>

<style scoped>
::v-deep .el-tabs__nav-scroll {
  background-color: white !important;
}
::v-deep .opts {
  background-color: white;
}
::v-deep .el-tabs__content {
  background-color: white;
}
</style>
