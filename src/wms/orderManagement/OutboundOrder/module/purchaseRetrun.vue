<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="PurchItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="PurchCrud"
        :selection="multipleSelection"
        :button-items="PurchBtnItems"
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
    <div v-if="printBegin" id="PurchaseReturns" ref="boxBarcode" style="display: none">
      <PurchaseReturns :data="printData" :thead="multipleSelection[0]" :page="printData.length" />
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
// import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import PurchaseReturns from '@/views/printable-template/PurchaseReturns'
import { PurchItems, PurchCrud, PurchBtnItems, DetailBtn, ptintFormList } from '../config'
export default {
  name: 'PurchaseRetrun',
  components: {
    Table,
    CrudOperation,
    ptintDialog,
    PurchaseReturns
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'outboundOrderPurchaseReturn',
      detailColName: 'PurchaseReturnDetails',
      apiName: 'outstockorder',
      PurchItems,
      PurchCrud,
      PurchBtnItems,
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
        OrderType: 'ArriveReturn,SourcePreturn,preturn'
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
        this.PurchItems[1].options = res.details
      })
    },
    dialogCancel() {
      this.ptintFormVisible = true
    },
    handleprintBarcode() {
      // let row = this.multipleSelection
      // this.printBegin = true
      // this.printData = Functions.splitArray(row, 1)
      // console.log(this.printData)
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        // 打印的同时改变条码状态
        // let Ids = [] // 选中的id集
        // if (this.multipleSelection.length > 0) {
        //   //  获取选中的数据id
        //   this.multipleSelection.map(item => {
        //     Ids.push(item.id)
        //   })
        // }
        // API.dataPost('box', Ids, 'UpdatePrint').then(res => {
        //   console.log(111)
        // })
        this.printBegin = true
        this.printData = this.detailTable
        console.log(this.multipleSelection[0])
        console.log(this.printData)
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 220mm; height: 139mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 10mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 10mm;border: 1px solid #000; }'
        strStyle +=
          ' .main-title { height: 18mm !important; line-height: 18mm; font-size: 20pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom: 1px solid #000!important;}'
        strStyle += '.top-right {text-align: left;font-size: 10pt;font-weight: normal;position: absolute;right:19mm}'
        strStyle += '.qrcodestyle {position: absolute; right: 1mm;top:1mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {line-height: 7mm;text-align:left;  border: none !important;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.tb-footer1 td {height:10mm;line-height: 10mm !important;text-align: center;border: none;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('PurchaseReturns').innerHTML
          LODOP.PRINT_INIT('采购退货打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2200, 1420) // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '241mm', '140mm', printTemplate) // Top,Left,Width,Height
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
