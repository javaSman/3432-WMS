<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse
        :form-items="AllocationOrderQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="AllocationOrderCrud"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
      />
      <div style="height: 400px">
        <ColDesign :col-list="column" style="margin-top: 20px" :table-show.sync="tableShow" @resetCol="resetCol" />
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :data-list="list"
          :column="column"
          :height="380"
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
      <div style="height: 300px">
        <h4>{{ $t('dialogHeader.PurchaseOrderDetail') }}</h4>
        <ColDesign
          tid="DetailTable"
          :col-list="columnDetail"
          :table-show.sync="detailTableShow"
          @resetColDetail="resetColDetail"
        />
        <CrudOperation />
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :height="250"
          :has-selection="false"
          :page-hidden="true"
          :dict-gather="dictGather"
          :has-index="true"
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
import { AllocationOrderQueryItems, AllocationOrderCrud } from './config'
export default {
  name: 'PurchaseOrder',
  components: {
    Table,
    CrudOperation
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PurchaseOrder',
      detailColName: 'PurchaseOrderDetail',
      apiName: 'PurchaseOrder',
      AllocationOrderQueryItems,
      AllocationOrderCrud,

      layout: { span: 8 },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        PO: null
        // SupplierCode: null
      },
      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    // this.getList()
    this.getDict()
  },
  methods: {
    // getList() {
    //   this.listQuery.SkipCount = (this.page - 1) * 10
    //   API.get('InApplyforPo', this.listQuery, 'GetAll').then(res => {
    //     this.totalCount = res.totalCount
    //     this.list = res.items
    //   })
    // },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.PO = row.po
      // this.detailQuery.SupplierCode = row.supplierCode
      API.getData('purchaseorder', this.detailQuery, 'GetOrderDetails').then(res => {
        this.detailTable = res.data.details
        this.detailListLoading = false
      })
    },
    getDict() {
      API.getDict('dict', { name: 'PurchaseOrderType' }).then(res => {
        this.AllocationOrderQueryItems[3].options = res.details
      })
    }
  }
}
</script>
