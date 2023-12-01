<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadPast()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
      <Table
        v-if="tableShow"
        ref="table"
        v-loading="listLoading"
        :has-selection="true"
        :height="-1"
        :data-list="list"
        :column="column"
        :selection.sync="multipleSelection"
        :total="totalCount"
        :page.sync="page"
        :limit.sync="listQuery.MaxResultCount"
        :is-sort="true"
        :sorting.sync="listQuery.Sorting"
        @pagination="getList"
        @tableSort="getList"
      />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
// import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { queryItems, BtnItems } from './config/boxCleanLog'
export default {
  name: 'BoxCleanLog',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'BoxCleanLog',
      apiName: 'boxCleanLog',
      queryItems,
      BtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false },
      isData: false
    }
  },
  created() {},
  methods: {
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        this.exportPast('boxCleanLog', { Ids: Ids }, 'Export')
      } else {
        this.exportPast('boxCleanLog', this.exportParams, 'Export')
      }
    }
  }
}
</script>
