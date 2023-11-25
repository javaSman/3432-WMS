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
// import Functions from '@/utils/functions'
import boxBarcode from '@/views/printable-template/boxBarcode'
// import { getLodop } from '@/utils/lodop'

import {
  boxQueryItems,
  boxFormList,
  boxTableList,
  tableButton,
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
      tableButton,
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
    }
  }
}
</script>
