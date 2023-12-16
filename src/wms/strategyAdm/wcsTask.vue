<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="WcsCrud"
        :button-items="wcsBtnItems"
        :selection="multipleSelection"
        :download-loading.sync="downloadLoading"
        @toEdit="handleUpdate()"
        @toExport="handleDownload()"
        @toPriority="handlePriority()"
        @toExecute="handleExecute()"
        @toReportTask="handleReportTask()"
        @toResend="handleResend()"
        @toCancel="handleCancel()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
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
        @tableSort="getList"
        @pagination="getList"
      />
      <EditForm
        :dialog-form-visible="dialogFormVisible"
        :form-title="formTitle"
        :form-list="wcsFormList"
        :form-data="form"
        :is-edit="isEdit"
        :api-name="apiName"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
      <ReportTaskDialog
        :dialog-form-visible="reportDialogVisible"
        :form-list="reportFormList"
        :form-data="form"
        :dialog-width="500"
        :layout="{ span: 20 }"
        form-title="报工"
        :api="API"
        api-name="Stacker"
        api-method="SetTaskInfoState"
        @cancel="dialogCancel"
        @reset="reset"
      />
    </div>
  </div>
</template>
<script>
import CrudOperation from '@/components/Crud/CRUD.operation'
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import ReportTaskDialog from './module/reportTaskDialog'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { queryItems, wcsFormList, reportFormList, wcsBtnItems, WcsCrud } from './config/wcsAdm'
import permission from '@/directive/permission/index.js'
export default {
  name: 'WCSTask',
  components: { Table, EditForm, CrudOperation, ReportTaskDialog },
  directives: { permission },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'TaskInfo',
      apiName: 'TaskInfo',
      dialogTitle: this.$t('dialogHeader.wcsTask'), // 'wcs任务',

      queryItems,
      wcsFormList,
      reportFormList,
      wcsBtnItems,
      WcsCrud,
      API,
      defaultSort: 'priority',
      listQuery: {
        Sorting: 'priority',
        SkipCount: 0,
        MaxResultCount: 20
      },

      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,

      reportDialogVisible: false,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.queryItems[6].options = res.items
      })
    },
    getDict() {
      API.getDict('dict', { name: 'TaskState' }).then(res => {
        this.reportFormList[0].options = this.queryItems[2].options = res.details
      })
      API.getDict('dict', { name: 'TaskType' }).then(res => {
        this.queryItems[3].options = res.details
      })
    },
    reset(val) {
      if (val === 0) {
        // 查询条件修改为默认值
        this.page = 1
        if (this.$refs.table) {
          this.$refs.table.$refs.table.clearSort()
        }
        this.listQuery = {
          Sorting: 'priority',
          SkipCount: 0,
          MaxResultCount: this.listQuery.MaxResultCount
        }
      } else if (val === 1) {
        // 查询条件不修改,仅页码修改为第一页,查询为第一页
        this.page = 1
        this.listQuery.SkipCount = 0
      }
      // 不传参，保留原有查询条件、页码
      this.getList()
    },
    /** 优先 */
    handlePriority() {
      var row = this.multipleSelection[0]
      if (row.state === '创建' || row.state === '下发') {
        API.post(this.apiName, { id: this.multipleSelection[0].id }, 'Priority').then(res => {
          if (res) {
            this.$message({
              message: this.$t('notify.hasPrioritized'), // '已优先',
              type: 'success'
            })
            this.getList()
          }
        })
      } else {
        this.$message({
          message: this.$t('notify.selectCreateOrAssign'), // '请选择状态为“创建”或“下发”的数据',
          type: 'warning'
        })
      }
    },

    /** 报工 */
    handleReportTask() {
      var row = this.multipleSelection[0]

      if (row.state === '完成' || row.state === '取消') {
        this.$message({
          message: '取消或完成状态无法报工',
          type: 'warning'
        })
      } else {
        API.getForm(this.apiName, this.multipleSelection[0].id).then(res => {
          this.form = {
            state: '',
            taskId: res.taskId,
            remark: res.remark
          }
          this.reportDialogVisible = true
        })
      }
    },
    /** 取消 */
    handleCancel() {
      var row = this.multipleSelection[0]
      if (row.state === '创建' || row.state === '运行') {
        this.updateState({ TaskId: row.taskId, State: 'Cancel' }, this.$t('notify.hasCanceled')) // '已取消'
      } else {
        this.$message({
          message: this.$t('notify.selectCreateOrRun'), // '请选择状态为“创建”或“运行”的数据',
          type: 'warning'
        })
      }
    },
    updateState(params, msg) {
      API.dataPost(this.apiName, params, 'UpdateState').then(res => {
        if (res) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    dialogCancel() {
      this.reportDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-col-3 {
  padding-left: 100px;
}
</style>
