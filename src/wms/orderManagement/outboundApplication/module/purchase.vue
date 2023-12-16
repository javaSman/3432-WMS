<template>
  <div>
    <div class="head-container">
      <filter-container :form-items="PurchaseItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="PurchaseCrud"
        :selection="multipleSelection"
        :button-items="PurchaseBtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toDelete="handleDelete()"
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
      <h4>{{ $t('dialogHeader.PurchaseReturnApplication') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="PurchaseDetailBtn" :selection="treeSelection" @toOffShelf="handleOffShelf()" />
      <div style="height: 250px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="220"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :has-selection="true"
          :selection.sync="treeSelection"
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
      :form-list="PurchaseList"
      :table-list="PurchaseTabelList"
      :api-name="apiName"
      :detail-title="detailTitle"
      :col-detail-name="colDetailName"
      :api-detail-name="apiDetailName"
      :detail-query-items="PurchaseQueryItems"
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
    <EditForm
      :dialog-form-visible="EditDialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="FormData"
      :is-edit="true"
      :dialog-width="850"
      :submit="confirm"
      @cancel="dialogCancel"
    />
    <div v-if="printBegin" id="PurchaseReturns" ref="boxBarcode" style="display: none">
      <SalesOut :data="printData" :thead="multipleSelection[0]" :page="printData.length" />
    </div>
  </div>
</template>
<script>
import ptintDialog from './assetTag.vue'
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditForm from '@/components/EditDialog'
import EditDetailOptDialog from './PurchaseDetailOptDialog.vue'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
// import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import SalesOut from '@/views/printable-template/SalesOut'
import {
  PurchaseItems,
  PurchaseCrud,
  PurchaseBtnItems,
  PurchaseDetailBtn,
  PurchaseList,
  PurchaseQueryItems,
  PurchaseTabelList,
  ptintFormList,
  formList
} from '../config'
export default {
  name: 'Purchase',
  components: {
    Table,
    EditDetailOptDialog,
    CrudOperation,
    ptintDialog,
    SalesOut,
    EditForm
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PurchaseReturn',
      detailColName: 'PurchaseReturnDetails',
      apiName: 'pickorder',
      listQuery: {
        ApplyType: 'preturn,SourcePreturn'
      },
      PurchaseItems,
      PurchaseCrud,
      PurchaseBtnItems,
      PurchaseDetailBtn,
      PurchaseList,
      PurchaseTabelList,
      ptintFormList,
      PurchaseQueryItems,
      dialogTitle: this.$t('dialogHeader.PurchaseRequisition'),
      layout: { span: 8 },
      detailTable: [],
      treeSelection: [],
      formTitle: '',
      detailTitle: this.$t('dialogHeader.PurchaseRequisition'),
      form: {},
      printBegin: false,
      API,
      isEdit: false,
      editDetailTable: [],
      dialogFormVisible: false,
      checkParams: 'materialID',
      colDetailName: 'BarcodeLog',
      apiDetailName: 'materialsbarcode',
      ptintFormVisible: false,
      formData: {},
      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderId: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity'],
      EditDialogFormVisible: false,
      formList,
      FormData: {}
    }
  },
  created() {
    this.getSupp()
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    reset(val) {
      if (val === 0) {
        // 清空所有查询条件，修改为默认值
        this.page = 1
        if (this.$refs.table) {
          this.$refs.table.$refs.table.clearSort()
        }
        this.listQuery = {
          Sorting: null,
          SkipCount: 0,
          PurchOrderType: 'ZC02',
          MaxResultCount: this.listQuery.MaxResultCount
        }
      } else if (val === 1) {
        // 查询条件不修改、仅页码修改为第一页,查询为第一页
        this.page = 1
        this.listQuery.SkipCount = 0
      }
      // 不传参，保留原有查询条件、页码
      this.getList()
    },
    getSupp() {
      API.get('pickorder/GetDetails', this.detailQuery, 'Web').then(res => {
        res.forEach(item => {
          item.label = item.supplierName
          item.value = item.supplierCode
        })
        this.PurchaseList[0].options = res
      })
    },
    getDetail(row) {
      console.log(row)
      this.detailListLoading = true
      this.detailQuery.pickID = row.pickID
      API.get('pickorder', this.detailQuery, 'GetDetails/Web').then(res => {
        if (res) {
          this.detailTable = res.details
          this.detailListLoading = false
        } else {
          this.detailListLoading = false
          this.$notify({
            title: this.$t('notify.failure') /* 失败 */,
            message: res.message /* 返回失败信息 */,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleOutShelves() {
      this.formTitle = '下架位置'
      this.EditDialogFormVisible = true
      this.getLocationOpts()
    },
    getLocationOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.wharfName
          item.value = item.wharfID
        })
        this.formList[0].options = res.items
      })
    },
    confirm() {
      let Array = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        Array.push(this.multipleSelection[i].id)
      }
      let params = {
        id: Array,
        endPostion: this.FormData.wharfID
      }
      API.dataPost('returnorder', params, 'ReturnOrderSale')
        .then(res => {
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
        .catch(() => {
          this.EditDialogFormVisible = false
        })
      return true
    },
    handleOffShelf() {
      this.handleOutShelves()
    },
    dialogCancel() {
      this.ptintFormVisible = false
      this.EditDialogFormVisible = false
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
        console.log(11)
        this.printBegin = true
        this.printData = this.detailTable
        console.log(this.multipleSelection[0])
        console.log(this.printData)
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.logo {width: 40mm;position: absolute;top:2mm}'
        strStyle +=
          '.page { width: 205mm; height: 539mm; page-break-after: always;position: relative;overflow: hidden;margin: 0 10px;}'
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
          LODOP.SET_PRINT_PAGESIZE(1, '221mm', '540mm') // 1纵向、2横向，纸宽，纸高，A4规格
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
