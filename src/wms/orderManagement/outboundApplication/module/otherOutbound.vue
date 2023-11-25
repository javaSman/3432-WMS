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
      <h4>{{ $t('dialogHeader.OtherReturnApplication') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation :button-items="OtherDetailBtn" :selection="treeSelection" @toOffShelf="handleOffShelf()" />
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
    <EditForm
      :dialog-form-visible="EditDialogFormVisible"
      :form-title="formTitle"
      :form-list="EditFormList"
      :form-data="FormData"
      :is-edit="true"
      :dialog-width="850"
      :submit="confirm"
      @cancel="dialogCancel"
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
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import EditDetailOptDialog from './EditDetailOptDialogTwo.vue'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import { getLodop } from '@/utils/lodop'
import boxBarcode from '@/views/printable-template/boxBarcode'
import {
  OtherItems,
  OtherCrud,
  OtherBtnItems,
  OtherDetailBtn,
  OuterList,
  OuterQueryItems,
  OtherTabelList,
  ptintFormList,
  EditFormList
} from '../config'
export default {
  name: 'OtherOutbound',
  components: {
    Table,
    EditDetailOptDialog,
    CrudOperation,
    ptintDialog,
    boxBarcode,
    EditForm
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'OtherOutbound',
      detailColName: 'OtherOutboundDetail',
      apiName: 'pickorder',
      OtherItems,
      OtherCrud,
      OtherBtnItems,
      OtherDetailBtn,
      OuterList,
      OtherTabelList,
      ptintFormList,
      OuterQueryItems,
      dialogTitle: '单据',
      layout: { span: 8 },
      detailTable: [],
      treeSelection: [],
      formTitle: '',
      detailTitle: '库存',
      form: {},
      printBegin: false,
      API,
      isEdit: false,
      editDetailTable: [],
      dialogFormVisible: false,
      checkParams: 'materialID',
      colDetailName: 'inventory',
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
      EditDialogFormVisible: false,
      EditFormList,
      FormData: {}
    }
  },
  created() {},
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

        this.EditFormList[0].options = res.items
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
      API.dataPost('allocationorder', params, 'AllocationOrderSale')
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
