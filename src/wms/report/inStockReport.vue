<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="inStockReportItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :has-selection="false"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { inStockReportItems } from './config'
export default {
  name: 'InStockReport',
  components: { Table },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'InStockReport',
      apiName: 'report/InStock',
      inStockReportItems,
      isEdit: true
    }
  },
  created() {},
  methods: {}
}
</script>
