<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="inventorySummaryItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :selection="multipleSelection"
        :button-items="inventorySummaryBtnItems"
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
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { inventorySummaryItems, inventorySummaryBtnItems } from './config'
export default {
  name: 'InventorySummary',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'GetAllInventory',
      apiName: 'inventoryreport/GetAllInventory',
      inventorySummaryItems,
      inventorySummaryBtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false },
      isData: false
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
    // this.getActual()
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false, IsRealWarehouse: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.inventorySummaryItems[5].options = res.items
      })
    },
    // 获取物理仓库数据
    // getActual() {
    //   API.get('warehouse', { IsPage: false, IsRealWarehouse: true }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseName
    //       item.value = item.warehouseID
    //       item.asign = item.warehouseID
    //     })
    //     this.inventorySummaryItems[7].options = res.items
    //   })
    // },
    handleDownloadPast() {
      this.exportPast('inventoryreport', this.exportParams, 'ExportAll')
    },
    getDict() {
      // 获取条码状态
      API.getDict('dict', { name: 'AllInventoryType' }).then(res => {
        this.inventorySummaryItems[0].options = res.details
      })
    }
  }
}
</script>
