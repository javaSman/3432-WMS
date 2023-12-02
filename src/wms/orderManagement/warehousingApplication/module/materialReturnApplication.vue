<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="MaterialItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation :permission-crud="Crud" :selection="multipleSelection" :download-loading.sync="downloadLoading" />
      <ColDesign :col-list="column" style="margin-top: 20px" :table-show.sync="tableShow" @resetCol="resetCol" />
      <div style="height: 350px">
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
      <h4>退货单明细</h4>
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
          :show-summary="true"
          :summary-method="getTotal"
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
import { MaterialItems, Crud } from '../config'
export default {
  name: 'MaterialReturnApplication',
  components: {
    Table,
    CrudOperation
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PoInApplyforreturn',
      detailColName: 'PoInApplyforMaterialreturn',
      apiName: 'returnorder',
      MaterialItems,
      Crud,

      layout: { span: 8 },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        ReturnID: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity']
    }
  },
  created() {
    // this.getList()
    this.getDict()
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
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
      this.detailQuery.ReturnID = row.returnID
      API.get('returnorder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.detailListLoading = false
      })
    },
    getDict() {
      // 状态
      API.getDict('dict', { name: 'ReturnStatus' }).then(res => {
        this.MaterialItems[4].options = res.details
      })
    }
  }
}
</script>
