<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="CancelReceiptItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="CancelReceiptCrud"
        :selection="multipleSelection"
        :button-items="CancelReceiptBtnItems"
        :download-loading.sync="downloadLoading"
        @toOutShelves="handleOutShelves()"
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
      <h4>{{ $t('dialogHeader.CancelReceiptReturnApplication') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="CancelReceiptDetailBtn" :selection="treeSelection" @toOffShelf="handleOffShelf()" />
      <div style="height: 250px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="220"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :has-selection="true"
          :selection.sync="treeSelection"
          :page-hidden="true"
          :dict-gather="dictGather"
          :has-index="true"
          :show-summary="true"
          :summary-method="getTotal"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
import { CancelReceiptItems, CancelReceiptCrud, CancelReceiptBtnItems, CancelReceiptDetailBtn } from '../config'
export default {
  name: 'CancelReceipt',
  components: {
    Table,
    CrudOperation
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PoInApplyforreturn',
      detailColName: 'PoInApplyforMaterialreturn',
      apiName: 'pickorder',
      listQuery: { ApplyType: 'ArriveReturn' },
      CancelReceiptItems,
      CancelReceiptCrud,
      CancelReceiptBtnItems,
      CancelReceiptDetailBtn,
      layout: { span: 8 },
      detailTable: [],
      treeSelection: [],
      formTitle: '',
      form: {},
      isEdit: false,
      dialogFormVisible: false,
      formData: {},
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderID: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity']
    }
  },
  created() {},
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderID = row.pickID
      API.get('pickorder', this.detailQuery, 'GetCancelReceiptDetails').then(res => {
        this.detailTable = res.details
        this.detailListLoading = false
      })
    },
    handleOutShelves() {
      this.$confirm('确认执行下架操作', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        API.dataPost('', {}, '').then(res => {
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
      })
    },
    handleOffShelf() {
      this.$confirm('确认执行下架操作', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        API.dataPost('', {}, '').then(res => {
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
      })
    }
  }
}
</script>
