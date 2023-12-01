<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="OtherItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="OtherCrud"
        :selection="multipleSelection"
        :button-items="OtherBtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toDelete="handleDelete()"
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
      <h4>{{ $t('dialogHeader.salesOutboundReturn') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="OtherDetailBtn" />
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
    <EditDetailOptDialog
      :dialog-form-visible.sync="dialogFormVisible"
      :layout="layout"
      :form-title="formTitle"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="isEdit"
      :form-list="OuterList"
      :table-list="OtherTabelList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="OuterQueryItems"
      :check-params="checkParams"
      :dict-gather="dictGather"
      @create="handleCreate"
      @reset="reset"
      @cancel="cancel"
    />
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
    <div v-if="printBegin" id="outboundOrder" ref="outboundOrder" style="display: none">
      <OutboundOrder :data="outboundOrder" :thead="multipleSelection[0]" :page="outboundOrder.length" />
    </div>
  </div>
</template>
<script>
import ptintDialog from './assetTag.vue'
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditDetailOptDialog from './EditDetailOptDialog.vue'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
// import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import OutboundOrder from '@/views/printable-template/OutboundOrder'
import {
  OtherItems,
  OtherCrud,
  OtherBtnItems,
  OtherDetailBtn,
  OuterList,
  OuterQueryItems,
  OtherTabelList,
  ptintFormList
} from '../config'
export default {
  name: 'OtherOutbound',
  components: {
    Table,
    EditDetailOptDialog,
    CrudOperation,
    ptintDialog,
    OutboundOrder
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'OutboundOther',
      detailColName: 'PoInApplyforMaterialreturn',
      apiName: 'outstockorder',
      listQuery: {
        OrderType: 'DeteriorationOut'
      },
      OtherItems,
      OtherCrud,
      OtherBtnItems,
      OtherDetailBtn,
      OuterList,
      OtherTabelList,
      ptintFormList,
      OuterQueryItems,
      dialogTitle: this.$t('dialogHeader.OtherRequisition'),
      layout: { span: 8 },
      detailTable: [],
      formTitle: '',
      detailTitle: this.$t('dialogHeader.OtherRequisition'),
      form: {},
      printBegin: false,
      API,
      isEdit: false,
      editDetailTable: [],
      dialogFormVisible: false,
      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'materials',
      ptintFormVisible: false,
      formData: {},
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        pickID: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity'],
      outboundOrder: []
    }
  },
  created() {
    // this.getDict()
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
      this.detailQuery.pickID = row.pickID
      API.get('pickorder/GetDetails', this.detailQuery, 'all').then(res => {
        this.detailTable = res.details
        // this.editDetailTable = res
        this.detailListLoading = false
      })
    },
    /* 数据字典未配 */
    getDict() {
      API.getDict('dict', { name: '' }).then(res => {
        res.details.forEach(item => {
          item.label
          item.value
        })
        this.OtherItems[1].options = res.details
        this.$set(this.listQuery, 'orderType', '')
      })
    },
    dialogCancel() {
      this.ptintFormVisible = false
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
        this.printBegin = true
        this.outboundOrder = this.detailTable
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 200mm; height: 139mm; page-break-after: always;position: relative;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-size: 10pt;table-layout: fixed;word-break: break-all;page-break-after:always;}'
        strStyle += '.table td {text-align: left;height: 10mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 10mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 10mm;border: 1px solid #000; }'
        strStyle +=
          ' .main-title { height: 18mm !important; line-height: 18mm; font-size: 20pt; font-weight: bold;text-align: center !important;border:none !important;border-bottom: 1px solid #000!important;}'
        strStyle +=
          '.top-right {text-align: left;font-size: 10pt;font-weight: normal;position: absolute;right:19mm;top: 8mm;}'
        strStyle += '.qrcodestyle {position: absolute; right: 1mm;top:1mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.tb-footer td {height: 10mm;line-height: 10mm;text-align:left;border: none !important;}'
        strStyle += '.tb-footer1 td {height: 10mm;line-height: 10mm;text-align:left;border: none !important;}'
        strStyle +=
          '.footer-page {font-family: 宋体; font-size: 10pt; text-align: center; bottom: 0; position: absolute; width: 100%;}'
        strStyle += '.tb-footer2 td {height:10mm;line-height: 10mm !important;text-align: center;border: none;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '</style>'
        this.$nextTick(() => {
          let strHtml = document.getElementById('outboundOrder').innerHTML
          LODOP.PRINT_INIT('出库单打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2400, 1420, '') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '201mm', '140mm', printTemplate) // Top,Left,Width,Height
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
