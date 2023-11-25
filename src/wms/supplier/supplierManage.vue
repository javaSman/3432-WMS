<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="SupplierCrud"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        :button-items="SupplierBtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toPrint="handlePrint()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" style="margin-top: 20px" @resetCol="resetCol" />
      <Table
        v-if="tableShow"
        ref="table"
        v-loading="listLoading"
        :height="-1"
        :data-list="list"
        :column="column"
        :selection.sync="multipleSelection"
        :total="totalCount"
        :page.sync="page"
        :limit.sync="listQuery.MaxResultCount"
        :is-sort="true"
        :sorting.sync="listQuery.Sorting"
        :dict-gather="dictGather"
        @pagination="getList"
        @tableSort="getList"
      />
      <EditForm
        :dialog-form-visible="dialogFormVisible"
        :form-title="formTitle"
        :form-list="formList"
        :form-data="form"
        :is-edit="isEdit"
        :api-name="apiName"
        :dialog-width="750"
        :layout="layout"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
      <ptintDialog
        :dialog-form-visible="ptintFormVisible"
        :form-list="ptintFormList"
        :form-data="form"
        :dialog-width="500"
        :layout="{ span: 20 }"
        form-title="打印条码"
        :api="API"
        api-name="Supplier"
        api-method="PrintBarcode"
        @cancel="dialogCancel"
        @reset="reset"
      />
      <!-- <el-dialog title="打印条码" :visible.sync="ptintFormVisible" width="width">
      <div></div>
      <div slot="footer">
        <el-button @click="ptintFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ptintFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import { newAPI } from '@/api/newgeneralAPI'

import ptintDialog from './module/assetTag.vue'
import EditForm from '@/components/EditDialog'
// import PrintEditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'
// import { getLodop } from '@/utils/lodop'

import { SupplierCrud, queryItems, formList, SupplierBtnItems, ptintFormList } from './config'

export default {
  name: 'Supplier',
  components: { Table, EditForm, CrudOperation, ptintDialog },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Supplier',
      apiName: 'Supplier',
      dialogTitle: '供应商',
      API, // 搜索
      queryItems,
      downloadLoading: false,
      SupplierCrud,
      isEdit: false,
      dialogFormVisible: false,
      formList,
      SupplierBtnItems,
      formTitle: '',
      layout: { gutter: undefined, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      form: {},
      printBegin: false,
      printData: [],
      ptintFormVisible: false,
      ptintFormList,
      newAPI
    }
  },
  created() {
    this.getDict()
    this.getNewBox()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'Printer' }).then(res => {
        this.ptintFormList[0].options = res.details
      })
    },
    handleCreate() {
      this.form = {}
      this.dialogOpen()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
    },
    handlePrint() {
      API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
        this.form = {
          printer: '',
          id: res.id
        }
        this.ptintFormVisible = true
      })
    },
    dialogCancel() {
      this.ptintFormVisible = false
    },
    getNewBox() {
      API.getDict('dict', { name: 'SupplierStatus' }).then(res => {
        this.formList[3].options = res.details // 获取箱子类型
      })
    }
  }
}
</script>
