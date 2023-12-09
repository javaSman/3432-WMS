<template>
  <div>
    <div class="head-container">
      <filter-container
        :form-items="ProdItems"
        :list-query.sync="listQuery"
        :more-items="MoreListQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        style="margin-top: 20px"
        :permission-crud="Crud"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
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
      <CrudOperation />
      <div style="height: 250px">
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
import { ProdItems, Crud, MoreListQuery } from '../config'
export default {
  name: 'ProductionCompletion',
  components: {
    Table,
    CrudOperation
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PoInApplyforproduct',
      detailColName: 'PoInApplyforMaterialproduct',
      apiName: 'productorder',
      ProdItems,
      Crud,
      MoreListQuery,

      layout: { span: 8 },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderId: null
      },
      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    // this.getList()
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
      this.detailQuery.OrderId = row.productOrderID
      API.get('productorder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
      })
    }
  }
}
</script>
