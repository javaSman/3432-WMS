<template>
  <div class="components-container">
    <div class="head-container">
      <filter-collapse :form-items="boxQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="boxCrud"
        :button-items="boxBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toBatchOutShelves="handleBatchOutShelves()"
        @toAlleyOutShelves="handleAlleyOutShelves()"
        @toImport="handleImport()"
        @toprintBarcode="handleprintBarcode()"
        @toDownload="handleDownloadPast()"
      />
      <div style="height: 350px">
        <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :height="330"
          :data-list="list"
          :column="column"
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
      <!-- '载具明细' -->
      <h4>{{ $t('dialogHeader.boxDetails') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <div style="height: 270px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :height="250"
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
      :form-list="boxFormList"
      :table-list="boxTableList"
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
    <UploadDialog
      :dialog-visible.sync="uploadDialogVisible"
      :api-name="apiName"
      :has-template="true"
      :template-path="templatePath"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditBatchDialog
      :dialog-visible.sync="batchDialogVisible"
      :form-title="formTitle"
      :form-data="batchForm"
      :batch-form-list="batchFormList"
      :data-list="tableList"
      :detail-table.sync="list"
      api-name="outshelves"
      :batch-table-list="column"
      :dict-gather="dictGather"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <EditAlleyOutShelves
      :dialog-visible.sync="alleyDialogVisible"
      :form-title="formTitle"
      :form-list="AlleyFormList"
      :form-data="form"
      api-name="outshelves"
      @reset="reset"
      @cancel="dialogCancel"
    />
    <ptintDialog
      :dialog-form-visible="ptintFormVisible"
      :form-list="ptintFormList"
      :form-data="form"
      :dialog-width="500"
      :layout="{ span: 20 }"
      form-title="打印条码"
      :api="API"
      api-name="box"
      api-method="RePrintBarcode"
      @cancel="dialogCancel"
      @reset="reset"
    />
    <div v-if="printBegin" id="boxBarcode" ref="boxBarcode" style="display: none">
      <boxBarcode v-for="(item, index) in printData" :key="index" :data="item" />
    </div>
  </div>
</template>
<script>
import ptintDialog from './module/assetTag.vue'
import Table from '@/components/Table'
import UploadDialog from '@/components/Upload/UploadDialog'
import EditDetailOptDialog from './module/EditDetailOptDialog'
import EditBatchDialog from './module/EditBatchDialog'
import EditAlleyOutShelves from './module/EditAlleyOutShelves'
import { API } from '@/api/generalAPI'
// import { newAPI } from '@/api/newgeneralAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import Functions from '@/utils/functions'
import boxBarcode from '@/views/printable-template/boxBarcode'
import { getLodop } from '@/utils/lodop'

import {
  boxQueryItems,
  boxFormList,
  boxTableList,
  boxBtnItems,
  boxCrud,
  materialQueryItems,
  batchFormList,
  AlleyFormList,
  ptintFormList
} from './config'
export default {
  name: 'Box',
  components: {
    Table,
    EditDetailOptDialog,
    EditBatchDialog,
    EditAlleyOutShelves,
    CrudOperation,
    UploadDialog,
    ptintDialog,
    boxBarcode
  },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Box',
      detailColName: 'BoxDetails',
      apiName: 'box',
      dialogTitle: this.$t('dialogHeader.box'), // '载具',
      templatePath: '/Temp/box.xlsx',

      boxQueryItems,
      boxFormList,
      boxTableList,
      batchFormList,
      AlleyFormList,
      boxBtnItems,
      ptintFormList,
      boxCrud,

      checkParams: 'materialID',
      colDetailName: 'Materials',
      apiDetailName: 'materials',

      detailTitle: this.$t('dialogHeader.materials'), // '物料',

      materialQueryItems,
      layout: { span: 8 },

      form: {},
      dialogFormVisible: false,

      batchForm: {},
      tableList: [],
      editDetailTable: [],
      ptintFormVisible: false,
      batchDialogVisible: false,
      uploadDialogVisible: false,

      alleyDialogVisible: false,

      formTitle: '',
      isEdit: false,

      detailQuery: {
        boxID: null
      },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,

      downloadLoading: false,
      exportParams: {},
      API,
      printBegin: false,
      printData: [],
      totalCol: ['quantity']
      // newAPI
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
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getDetail(this.multipleSelection[0])
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.boxID = row.boxID
      API.getData('boxDetails', this.detailQuery).then(res => {
        this.detailTable = res
        this.editDetailTable = res
        this.detailListLoading = false
      })
    },
    getDict() {
      API.getDict('dict', { name: 'BoxType' }).then(res => {
        this.boxQueryItems[1].options = this.boxFormList[1].options = res.details // 获取箱子类型
      })
      API.getDict('dict', { name: 'BoxState' }).then(res => {
        this.AlleyFormList[3].options = this.boxQueryItems[2].options = this.boxFormList[2].options = res.details
      })
      API.getDict('dict', { name: 'MaterialType' }).then(res => {
        this.materialQueryItems[2].options = res.details
      })
      API.getDict('dict', { name: 'Printer' }).then(res => {
        this.ptintFormList[0].options = res.details
      })
    },
    getOpts() {
      API.getData('wharf', { IsPage: false }).then(res => {
        res.items.forEach(item => {
          item.label = item.name
          item.value = item.wharfID
        })
        this.AlleyFormList[1].options = this.batchFormList[0].options = res.items
      })
    },
    handleBatchOutShelves() {
      this.getOpts()
      this.formTitle = this.$t('dialog.batchShelves') + this.dialogTitle // '批量下架'
      this.batchForm = { boxIDs: [] }
      this.tableList = JSON.parse(JSON.stringify(this.multipleSelection))
      this.batchDialogVisible = true
    },
    handleAlleyOutShelves() {
      this.getOpts()
      this.formTitle = '按巷道下架'
      this.form.statusID = 'Empty'
      this.alleyDialogVisible = true
    },

    // 导入
    handleImport() {
      this.uploadDialogVisible = true
    },
    // 补签
    handleReprint() {
      // console.log(111)
      API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
        this.form = {
          printer: '',
          id: res.id
        }
        this.ptintFormVisible = true
      })
    },
    dialogCancel(val) {
      this.uploadDialogVisible = false
      this.batchDialogVisible = false
      this.alleyDialogVisible = false
      this.ptintFormVisible = false
      this.form = {}
    },
    // handleChange() {
    //   this.changeNum = this.changeNum + 1
    //   if (this.changeNum === this.multipleSelection.length) {
    //     this.print()
    //     this.changeNum = 0
    //   }
    // },
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
    },
    // 导出
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('box', { Ids: Ids }, 'Export')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('box', this.exportParams, 'Export')
      }
    }
  }
}
</script>
