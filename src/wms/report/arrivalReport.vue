<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container
        :form-items="arrivalReportItems"
        :list-query.sync="listQuery"
        :more-items="ArrMoreQuery"
        :more-query.sync="listQuery"
        :more-search="true"
        @query="getList"
        @reset="reset"
      />
    </div>
    <div class="content-container">
      <CrudOperation
        style="display: inline-block"
        :selection="multipleSelection"
        :button-items="arrivalReportBtnItems"
        :download-loading.sync="downloadLoading"
        @toDownload="handleDownloadPast()"
        @toGenerateQuality="handleGenerateQuality()"
      />
      <!-- <div style="display: inline-block; position: absolute; right: 4%">当前页面数量总计:{{ arrSum }}</div> -->
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
        :row-style="rowStyle"
        :dict-gather="dictGather"
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
import { arrivalReportItems, arrivalReportBtnItems, ArrMoreQuery } from './config'
export default {
  name: 'ArrivalReport',
  components: { Table, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'arrivalReport',
      apiName: 'inventoryreport/GetAllReceived',
      arrivalReportItems,
      ArrMoreQuery,
      arrivalReportBtnItems,
      downloadLoading: false,
      isEdit: true,
      exportParams: { IsPage: false },
      arrSum: 0,
      isData: true
    }
  },
  watch: {
    // list() {
    //   // console.log(this.list)
    //   let arrSums = 0
    //   this.list.forEach(item => {
    //     // console.log(item.quantity)
    //     arrSums += Number(item.quantity.toFixed(2))
    //   })
    //   this.arrSum = arrSums.toFixed(2)
    // }
  },
  created() {
    this.getDict()
    // this.getWarehouse()
    // this.getActual()
  },
  methods: {
    // 获取物理仓库数据
    // getActual() {
    //   API.get('warehouse', { IsPage: false, IsRealWarehouse: true }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseName
    //       item.value = item.warehouseID
    //       item.asign = item.warehouseID
    //     })
    //     this.arrivalReportItems[13].options = res.items
    //   })
    // },
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false, IsRealWarehouse: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       item.label = item.warehouseName
    //       item.value = item.warehouseID
    //       item.asign = item.warehouseID
    //     })
    //     this.arrivalReportItems[6].options = res.items
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
        this.exportPast('inventoryreport', { Ids: Ids }, 'ExportReceived')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('inventoryreport', this.exportParams, 'ExportReceived')
      }
    },
    getDict() {
      // 获取条码状态
      API.getDict('dict', { name: 'BarCodestate' }).then(res => {
        this.arrivalReportItems[0].options = res.details
      })
      // 质检状态
      API.getDict('dict', { name: 'QcState' }).then(res => {
        this.arrivalReportItems[5].options = res.details
      })
    },
    /**
     * 表格列以红色标识行
     * 当 materialStatus:30，当行颜色变为红色; materialStatus:20，当行颜色变为黄色； materialStatus:0，当行颜色变为蓝色
     */
    rowStyle(row) {
      let styleJson = {}
      // console.log(row)
      if (row.row.materialStatus === '30') {
        styleJson = { background: '#ff7373' }
      } else if (row.row.materialStatus === '15') {
        styleJson = { background: '#ffe70082' }
      } else if (row.row.materialStatus === '0') {
        styleJson = { background: '#71b2fe' }
      }
      return styleJson
    },
    handleGenerateQuality() {
      let params = []
      this.multipleSelection.forEach(item => {
        params.push(item.barcode)
      })
      let data = {
        barcodes: params,
        repeatCheck: 'IQCNG'
      }
      this.$confirm('确定选中的' + this.multipleSelection.length + '条数据生成质检单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('recheckorder', data, 'CreateOrder').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>
