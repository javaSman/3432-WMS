<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="outShelvesQueryItems"
        :list-query.sync="listQuery"
        :more-items="outShelvesQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="ReportsCrud"
        :download-loading.sync="downloadLoading"
        @toExport="handleDownload()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
      <Table
        v-if="tableShow"
        ref="table"
        v-loading="listLoading"
        :height="-1"
        :data-list="list"
        :column="column"
        :total="totalCount"
        :page.sync="page"
        :limit.sync="listQuery.MaxResultCount"
        :is-sort="true"
        :sorting.sync="listQuery.Sorting"
        :has-selection="false"
        :dict-gather="dictGather"
        @pagination="getList"
        @tableSort="getList"
      />
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'

import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { outShelvesQueryItems, ReportsCrud, outShelvesQuery } from './config'
export default {
  name: 'OutShelves',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OutShelves',
      apiName: 'outshelves',
      outShelvesQueryItems,
      ReportsCrud,
      outShelvesQuery,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'ShelvesType' }).then(res => {
        this.outShelvesQuery[2].options = res.details
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.outShelvesQuery[5].options = res.items
      })
    },
    handleDownload() {
      this.export('outshelves', this.exportParams, 'Export')
    }
  }
}
</script>
