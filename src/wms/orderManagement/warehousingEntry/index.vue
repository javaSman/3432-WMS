<template>
  <div class="components-container">
    <el-tabs type="border-card">
      <el-tab-pane label="采购入库单">
        <div class="head-container">
          <filter-container :form-items="QueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
        </div>
        <div class="content-container">
          <CrudOperation
            :permission-crud="Crud"
            :button-items="BtnItems"
            :selection="multipleSelection"
            :download-loading.sync="downloadLoading"
            @toPosting="handlePosting()"
            @toCancelReceipt="handleCancel()"
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
          <h4>{{ $t('dialogHeader.productionCompletion') }}</h4>
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          />
          <CrudOperation
            :button-items="ButtonItems"
            :selection="treeSelection"
            @toCancelReceipt="handleCancelDetails()"
          />
          <div style="height: 200px">
            <Table
              v-if="detailTableShow"
              ref="tableDetail"
              v-loading="detailListLoading"
              :height="190"
              :data-list="multipleSelection.length === 1 ? detailTable : []"
              :column="columnDetail"
              :has-selection="true"
              :selection.sync="treeSelection"
              :page-hidden="true"
              :dict-gather="dictGather"
              :has-index="true"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="生成完工入库单"><productionCompletion /></el-tab-pane>
      <el-tab-pane label="退料入库单"><materialReturnApplication /></el-tab-pane>
      <el-tab-pane label="其他入库单"><otherWarehousingApplications /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Table from '@/components/Table'
import productionCompletion from './module/productionCompletion'
import materialReturnApplication from './module/materialReturnApplication'
import otherWarehousingApplications from './module/otherWarehousingApplications'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { QueryItems, BtnItems, Crud, ButtonItems, List } from './config'
export default {
  name: 'PurchaseReceipt',
  components: {
    Table,
    CrudOperation,
    productionCompletion,
    materialReturnApplication,
    otherWarehousingApplications
  },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'InStockOrder',
      detailColName: 'InStockOrderDetail',
      apiName: 'InStockOrder',
      QueryItems,
      BtnItems,
      Crud,
      List,
      ButtonItems,

      layout: { span: 8 },
      detailTable: [],
      treeSelection: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderId: null
      },
      downloadLoading: false,
      exportParams: {},
      listQuery: {
        OrderType: 'InStock'
      }
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderId = row.orderID
      API.get('InStockOrder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.detailListLoading = false
      })
    },
    getDict() {
      API.getDict('dict', { name: 'InStockType' }).then(res => {
        this.QueryItems[1].options = res.details
      })
      API.getDict('dict', { name: 'StockStatus' }).then(res => {
        this.QueryItems[2].options = res.details
      })
    },
    handlePosting() {
      this.$confirm('确认过账选中' + this.multipleSelection.length + ' 的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('', '', '')
          .then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                druation: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                druation: 2000
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    handleCancel() {
      let data = []
      this.multipleSelection.forEach(item => {
        data.push(item.orderID)
      })
      let params = {
        orderID: data
      }
      this.$confirm('确定取消选中' + this.multipleSelection.length + '的数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('instockorder', params, 'CancelReceipt')
          .then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                druation: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                druation: 2000
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    handleCancelDetails() {
      let Array = []
      let params = {
        id: Array
      }
      this.multipleSelection.forEach(item => {
        Array.push(item.id)
      })
      this.$confirm('确定取消选中' + this.multipleSelection.length + '的数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('instockorder', params, 'CancelOrderDetailReceipt')
          .then(res => {
            if (res.success) {
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                druation: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                druation: 2000
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
    }
  }
}
</script>
