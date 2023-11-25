<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse
        :form-items="safetyStockAlertItems"
        :list-query.sync="listQuery"
        @query="getList"
        @reset="reset"
      />
      <CrudOperation
        :selection="multipleSelection"
        :button-items="arrivalReportBtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadPast()"
      />
    </div>
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
</template>
<script>
import Table from '@/components/Table'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { safetyStockAlertItems, arrivalReportBtnItems } from './config'
export default {
  name: 'MESLog',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'MESLog',
      apiName: 'inventoryreport/GetAllSafetyQuantity',
      safetyStockAlertItems,
      arrivalReportBtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false },
      isData: false
    }
  },
  created() {
    // this.getDict()
    // this.getWarehouse()
  },
  methods: {
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseName
    //       item.value = item.warehouseID
    //       item.asign = item.warehouseID
    //     })
    //     this.safetyStockAlertItems[6].options = res.items
    //   })
    // },

    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('inventoryreport', { Ids: Ids }, 'ExportSafetyReport')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('inventoryreport', this.exportParams, 'ExportSafetyReport')
      }
    }
    // getDict() {
    //   // 获取条码状态
    //   API.getDict('dict', { name: 'BarCodestate' }).then(res => {
    //     this.safetyStockAlertItems[0].options = res.details
    //   })
    //   // 质检状态
    //   API.getDict('dict', { name: 'QcState' }).then(res => {
    //     this.safetyStockAlertItems[11].options = res.details
    //   })
    // },
    /**
     * 表格列以红色标识行
     * 当 materialStatus:30，当行颜色变为红色; materialStatus:20，当行颜色变为黄色； materialStatus:0，当行颜色变为蓝色
     */
    // rowStyle(row) {
    //   let styleJson = {}
    //   // console.log(row)
    //   if (row.row.materialStatus === '30') {
    //     styleJson = { background: '#ff7373' }
    //   } else if (row.row.materialStatus === '15') {
    //     styleJson = { background: '#ffe70082' }
    //   } else if (row.row.materialStatus === '0') {
    //     styleJson = { background: '#71b2fe' }
    //   }
    //   return styleJson
    // }
  }
}
</script>
