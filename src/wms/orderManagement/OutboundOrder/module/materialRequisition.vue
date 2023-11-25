<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="MaterialItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="Crud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toprintBarcode="handleprintBarcode()"
      />
      <div style="height: 350px">
        <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
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
      <h4>{{ $t('dialogHeader.outStockOrderDetails') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="DetailBtn" @toOffShelf="handleOffShelf()" />
      <div style="height: 250px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="220"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :has-selection="false"
          :page-hidden="true"
          :dict-gather="dictGather"
          :has-index="true"
          :show-summary="true"
          :summary-method="getTotal"
        />
      </div>
    </div>
    <ptintDialog
      :dialog-form-visible="ptintFormVisible"
      :form-list="ptintFormList"
      :form-data="formData"
      :dialog-width="500"
      :layout="{ span: 20 }"
      form-title="打印条码"
      :api="API"
      api-name=""
      api-method=""
      @cancel="dialogCancel"
      @reset="reset"
    />
    <div v-if="printBegin" id="boxBarcode" ref="boxBarcode" style="display: none">
      <boxBarcode v-for="(item, index) in printData" :key="index" :data="item" />
    </div>
  </div>
</template>
<script>
import ptintDialog from './assetTag.vue'
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import boxBarcode from '@/views/printable-template/boxBarcode'
import { MaterialItems, Crud, BtnItems, DetailBtn, ptintFormList } from '../config'
export default {
  name: 'MaterialRequisition',
  components: {
    Table,
    CrudOperation,
    ptintDialog,
    boxBarcode
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'SalesOutbound',
      detailColName: 'SalesOutboundDetails',
      apiName: 'outstockorder',
      MaterialItems,
      Crud,
      BtnItems,
      DetailBtn,
      ptintFormList,
      detailTable: [],
      printBegin: false,
      API,
      isEdit: false,
      ptintFormVisible: false,
      formData: {},
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        orderID: null
      },
      listQuery: {
        OrderType: 'Shipment'
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity']
    }
  },
  created() {
    this.getDict()
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.orderID = row.orderID
      API.get('outstockorder/GetDetails', this.detailQuery, null).then(res => {
        this.detailTable = res.details
        this.editDetailTable = res
        this.detailListLoading = false
      })
    },
    getDict() {
      API.getDict('dict', { name: 'outStockStatus' }).then(res => {
        this.MaterialItems[1].options = res.details
      })
    },
    dialogCancel() {
      this.ptintFormVisible = true
    },
    handleprintBarcode() {
      let row = this.multipleSelection
      this.printBegin = true
      this.printData = Functions.splitArray(row, 1)
      console.log(this.printData)
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        // 打印的同时改变条码状态
        let Ids = [] // 选中的id集
        if (this.multipleSelection.length > 0) {
          //  获取选中的数据id
          this.multipleSelection.map(item => {
            Ids.push(item.id)
          })
        }
        API.dataPost('box', Ids, 'UpdatePrint').then(res => {
          console.log(111)
        })

        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.page { width: 99mm;height: 68mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          '.barcode {width: 99mm;height: 68mm;border: 1px soild #000; left: 1mm;  top: 14mm; position: absolute;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('boxBarcode').innerHTML
          LODOP.PRINT_INIT('载具条码打印')
          LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '100mm', '68mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .opts[data-v-4618cba8] {
  padding-bottom: 15px;
}
</style>
