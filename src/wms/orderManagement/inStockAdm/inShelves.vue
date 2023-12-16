<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="inShelvesQueryItems"
        :more-items="inShelvesQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        :list-query.sync="listQuery"
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
      <!-- <div ref="splitArea" class="splitArea">
      <split-pane split="horizontal" :min-percent="25.5" :default-percent="55" @resize="resize">
        <template slot="paneL"> -->
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
        :has-selection="false"
        :dict-gather="dictGather"
        @getDetail="getDetail"
        @pagination="getList"
        @tableSort="getList"
      />
      <!-- </template>
        <template slot="paneR"> -->
      <!-- '上架单明细' -->
      <!-- <h4>{{ $t('dialogHeader.inShelvesOrderDetails') }}</h4>
          <ColDesign
            tid="DetailTable"
            :col-list="columnDetail"
            :table-show.sync="detailTableShow"
            @resetColDetail="resetColDetail"
          /> -->
      <!-- <Table
            v-if="detailTableShow"
            v-loading="detailListLoading"
            :height="bottomTableH"
            :data-list="multipleSelection.length === 1 ? detailTable : []"
            :column="columnDetail"
            :has-selection="false"
            :page-hidden="true"
            :dict-gather="dictGather"
          />
        </template>
      </split-pane>
    </div> -->
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'

import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
// import splitPane from '@/mixins/splitPane'
import basics from '@/mixins'
import { inShelvesQueryItems, ReportsCrud, inShelvesQuery } from './config'
export default {
  name: 'InShelves',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'InShelves',
      detailColName: 'InShelvesDetails',
      apiName: 'inshelves',
      ReportsCrud,
      inShelvesQueryItems,
      inShelvesQuery,

      detailListLoading: false,
      detailTable: [], // 主页明细表，也存放原始明细数据
      downloadLoading: false,
      topH: 40
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'ShelvesType' }).then(res => {
        this.inShelvesQuery[2].options = res.details
      })
    },
    // getDetail(row) {
    //   this.detailListLoading = true
    //   API.getData('inshelvesdetails', { InShelvesID: row.inShelvesID }).then(res => {
    //     this.detailTable = res
    //     this.detailListLoading = false
    //   })
    // },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.inShelvesQuery[5].options = res.items
      })
    },
    handleDownload() {
      this.export('inshelves', this.exportParams, 'Export')
    }
  }
}
</script>
