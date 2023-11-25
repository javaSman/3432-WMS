<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="outStockReqQueryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :permission-crud="outStockReqCrud"
        :download-loading.sync="downloadLoading"
        :selection="multipleSelection"
        @toExport="handleDownload()"
        @toDelete="handleDelete()"
      />
    </div>
    <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
    <Table
      v-if="tableShow"
      ref="table"
      v-loading="listLoading"
      :height="-1"
      :data-list="list"
      :column="column"
      :total="totalCount"
      :selection.sync="multipleSelection"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      :is-sort="true"
      :sorting.sync="listQuery.Sorting"
      :has-selection="true"
      :dict-gather="dictGather"
      @pagination="getList"
      @tableSort="getList"
    />
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'

import Table from '@/components/Table'
// import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { outStockReqQueryItems, outStockReqCrud } from './config'
export default {
  name: 'OutShelves',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'OutStockRequest',
      apiName: 'OutStockRequest',
      outStockReqQueryItems,
      outStockReqCrud,
      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    // this.getDict()
    // this.getWarehouse()
  },
  methods: {
    // getDict() {
    //   API.getDict('dict', { name: 'ShelvesType' }).then(res => {
    //     this.outShelvesQueryItems[7].options = res.details
    //   })
    // },
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseID
    //       item.value = item.warehouseID
    //     })
    //     this.outShelvesQueryItems[1].options = res.items
    //   })
    // },
    handleDownload() {
      this.export('OutStockRequest', this.exportParams, 'Export')
    }
  }
}
</script>
