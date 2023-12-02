<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="queryItems"
        :list-query.sync="listQuery"
        :more-items="OutMoreQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="Crud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
      />
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
  </div>
</template>
<script>
import Table from '@/components/Table'
// import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { API } from '@/api/generalAPI'

import { queryItems, Crud, OutMoreQuery } from './config'
export default {
  name: 'OutinStockReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'OutStockReport',
      apiName: 'barcodeLog',
      dialogTitle: this.$t('dialogHeader.outinStockReport'),

      queryItems,
      Crud,
      OutMoreQuery,
      // listQuery: {
      //   BussinessType: 'PostInStock,PostOutStock'
      // },
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      // 标签状态
      API.getDict('dict', { name: 'BarCodestate' }).then(res => {
        this.OutMoreQuery[4].options = res.details
      })
      // 业务类型
      API.getDict('dict', { name: 'BLogBussinessType' }).then(res => {
        this.OutMoreQuery[2].options = res.details
      })
      // 质检类型
      API.getDict('dict', { name: 'QcState' }).then(res => {
        this.OutMoreQuery[3].options = res.details
      })
    },
    /** 获取仓库编码下拉框值 */
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.OutMoreQuery[5].options = res.items
      })
    }
  }
}
</script>
