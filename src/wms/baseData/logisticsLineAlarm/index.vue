<template>
  <div class="app-container">
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
  </div>
</template>
<script>
import Table from '@/components/Table'
// import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
export default {
  name: 'LogisticsLineAlarm',
  components: { Table },
  mixins: [colDesign, basics],
  data() {
    return {
      colName: 'FaultException',
      apiName: 'FaultException'
    }
  },
  created() {},
  methods: {}
}
</script>
