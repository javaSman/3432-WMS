<template>
  <div>
    <div class="head-container">
      <filter-collapse :form-items="OtherItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="Crud"
        :selection="multipleSelection"
        :button-items="OtherBtn"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate()"
        @toDelete="handleDelete"
      />
      <div style="height: 300px">
        <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
        <Table
          v-if="tableShow"
          ref="table"
          v-loading="listLoading"
          :data-list="list"
          :column="column"
          :height="250"
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
      <h4>{{ $t('dialogHeader.warehousingApplication') }}</h4>
      <ColDesign
        tid="DetailTable"
        :col-list="columnDetail"
        :table-show.sync="detailTableShow"
        @resetColDetail="resetColDetail"
      />
      <CrudOperation />
      <div style="height: 250px">
        <Table
          v-if="detailTableShow"
          ref="tableDetail"
          v-loading="detailListLoading"
          :data-list="multipleSelection.length === 1 ? detailTable : []"
          :column="columnDetail"
          :height="220"
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
      :form-list="FormList"
      :form-data="form"
      :detail-table.sync="editDetailTable"
      :is-edit="isEdit"
      :table-list="TableList"
      :api-name="EditApiName"
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
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditDetailOptDialog from '../components/index'
import CrudOperation from '@/components/Crud/CRUD.operation'
import filterContainer from '@/mixins/filterContainer'
import colDesign from '@/mixins/colDesign'
import basics from '@/mixins'
import { OtherItems, Crud, OtherBtn, FormList, TableList, materialQueryItems } from '../config'
export default {
  name: 'OtherWarehousingApplications',
  components: {
    Table,
    CrudOperation,
    EditDetailOptDialog
  },
  mixins: [filterContainer, basics, colDesign],
  data() {
    return {
      colName: 'PoInApplyforother',
      detailColName: 'PoInApplyforMaterialother',
      apiName: 'wasteorder',
      listQuery: { OrderType: 'InStock,MESIn' },
      OtherItems,
      Crud,
      OtherBtn,
      layout: { span: 8 },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderId: null
      },
      downloadLoading: false,
      exportParams: {},
      totalCol: ['quantity'],
      dialogFormVisible: false,
      formTitle: '',
      FormList,
      form: {},
      editDetailTable: [],
      isEdit: false,
      TableList,
      EditApiName: 'wasteorder',
      dialogTitle: '单据',
      detailTitle: '物料',
      colDetailName: 'Materials',
      apiDetailName: 'materials',
      materialQueryItems,
      checkParams: ''
    }
  },
  created() {
    // this.getList()
    this.FormList.forEach(item => {
      switch (item.prop) {
        case 'OrderType': {
          item.change = row => {
            this.changeOrderType()
          }
          item.clear = row => {
            this.clearOther()
          }
          break
        }
      }
    })
    // 单据类型
    API.getDict('dict', { name: 'ScrapInOutType' }).then(res => {
      this.FormList[0].options = res.details
      this.OtherItems[1].options = res.details
    })
    // 单据状态
    API.getDict('dict', { name: 'OrderStatus' }).then(res => {
      this.OtherItems[2].options = res.details
    })
  },
  updated() {
    // 解决合计行不显示及高度不渲染
    this.$nextTick(() => {
      if (this.$refs['tableDetail']) this.$refs['tableDetail'].$refs.table.doLayout()
    })
  },
  methods: {
    // getList() {
    //   this.listQuery.SkipCount = (this.page - 1) * 10
    //   API.get('InApplyforPo', this.listQuery, 'GetAll').then(res => {
    //     this.totalCount = res.totalCount
    //     this.list = res.items
    //   })
    // },
    changeOrderType() {
      this.editDetailTable = []
      if (this.form.OrderType === 'InStock') {
        this.apiDetailName = 'materials'
        this.colDetailName = 'Materials'
        this.FormList[1].isHide = false
        this.FormList[2].isHide = false
      } else if (this.form.OrderType === 'OutStock') {
        this.apiDetailName = 'inventoryreport'
        this.colDetailName = 'InventoryReportDto'
        this.FormList[1].isHide = true
        this.FormList[2].isHide = true
        this.form.deptcode = this.form.deptname = ''
        // this.boxFormList[1].rules[0].required = false
        // this.boxFormList[2].rules[0].required = false
      }
    },
    clearOther() {
      this.editDetailTable = []
      this.FormList[1].isHide = this.FormList[2].isHide = true
      this.form.deptcode = this.form.deptname = ''
    },
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderId = row.orderID
      API.get('wasteorder', this.detailQuery, 'GetDetails').then(res => {
        this.detailTable = res.details
        this.editDetailTable = res.items
        this.detailListLoading = false
      })
    }
    // handleDelete() {
    //   let array = []
    //   this.multipleSelection.forEach(item => {
    //     array.push(item.id)
    //   })
    //   // '确认删除选中项','提示'
    //   this.$confirm('确定删除选中' + this.multipleSelection.length + '条数据？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     API.dataPost('wasteorder', array, 'Delete')
    //       .then(res => {
    //         if (res.success) {
    //           this.$notify({
    //             title: this.$t('notify.success'),
    //             message: res.message,
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.getList()
    //         } else {
    //           this.$notify({
    //             title: this.$t('notify.failure'),
    //             message: res.message,
    //             type: 'error',
    //             duration: 2000
    //           })
    //         }
    //       })
    //       .catch(e => {
    //         console.log(e)
    //         this.$message({
    //           type: 'info',
    //           message: this.$t('notify.delFailure') // '未删除成功'
    //         })
    //       })
    //   })
    // }
  }
}
</script>
