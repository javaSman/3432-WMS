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
        @toAdd="handleCreate"
        @toOutShelves="handleOutShelves()"
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
      <h4>{{ $t('dialogHeader.materialReturnApplication') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="DetailBtn" :selection="treeSelection" @toOffShelf="handleOffShelf()" />
      <div style="height: 250px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="250"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :selection.sync="treeSelection"
          :has-selection="true"
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
      :form-list="MaterialList"
      :table-list="TabelList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="materialQueryItems"
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
    <div v-if="printBegin" id="storesRequisition" ref="storesRequisition" style="display: none">
      <StockTransfer :data="storesRequisition" :thead="multipleSelection[0]" :page="storesRequisition.length" />
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
import StockTransfer from '@/views/printable-template/StockTransfer'
import {
  MaterialItems,
  Crud,
  BtnItems,
  DetailBtn,
  MaterialList,
  materialQueryItems,
  TabelList,
  ptintFormList
} from '../config'
export default {
  name: 'Material',
  components: {
    Table,
    EditDetailOptDialog,
    CrudOperation,
    ptintDialog,
    StockTransfer
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PickOrder',
      detailColName: 'PickOrderDetail',
      apiName: 'pickorder',
      listQuery: { ApplyType: 'MESPick' },
      MaterialItems,
      Crud,
      BtnItems,
      DetailBtn,
      MaterialList,
      TabelList,
      ptintFormList,
      materialQueryItems,
      dialogTitle: this.$t('dialogHeader.materialRequisition'),
      layout: { span: 8 },
      detailTable: [],
      treeSelection: [],
      formTitle: '',
      detailTitle: this.$t('dialogHeader.materialRequisition'),
      form: {},
      printBegin: false,
      storesRequisition: [],
      API,
      isEdit: false,
      editDetailTable: [],
      dialogFormVisible: false,
      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'inventoryreport',
      ptintFormVisible: false,
      formData: {},
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        pickID: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity']
    }
  },
  created() {
    this.getDict()
    console.log(basics)
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'applicant' }).then(res => {
        this.MaterialList[1].options = res.details
      })
      API.getDict('dict', { name: 'PickApplyType' }).then(res => {
        this.MaterialList[2].options = res.details
      })
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.pickID = row.pickID
      API.get('pickorder/GetDetails', this.detailQuery, 'Web').then(res => {
        this.detailTable = res.details
        // this.editDetailTable = res
        this.detailListLoading = false
      })
    },
    handleOutShelves() {
      this.$confirm('确认执行下架操作', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        API.dataPost('', {}, '').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              druation: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              druation: 2000
            })
          }
        })
      })
    },
    handleOffShelf() {
      this.$confirm('确认执行下架操作', this.$t('dialog.tip'), {
        confirmButtonText: this.$t('button.confirm'), // '确认'
        cancelButtonText: this.$t('button.cancel'), // '取消'
        type: 'warning'
      }).then(() => {
        API.dataPost('', {}, '').then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              druation: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              druation: 2000
            })
          }
        })
      })
    },
    dialogCancel() {
      this.ptintFormVisible = false
    },
    handleprintBarcode() {
      // let row = this.multipleSelection
      // this.printBegin = true
      // this.storesRequisition = Functions.splitArray(row, 1)
      // console.log(this.storesRequisition)
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
        this.storesRequisition = this.detailTable
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
          let strHtml = document.getElementById('storesRequisition').innerHTML
          LODOP.PRINT_INIT('出库备料单打印')
          LODOP.SET_PRINT_PAGESIZE(1, 2400, 1420, '') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_TABLE('1mm', '1mm', '201mm', '140mm', printTemplate) // Top,Left,Width,Height
          LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    }
  }
}
</script>
