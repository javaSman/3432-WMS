<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="journalQueryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="journalCrud"
        :selection="multipleSelection"
        :button-items="journalBtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toretransmission="handleRetrans()"
        @toDownload="handleDownloadPast()"
      />
      <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
      <Table
        v-if="tableShow"
        ref="table"
        v-loading="listLoading"
        :height="-1"
        :data-list="list"
        :column="column"
        :table-btn="tableBtn"
        :selection.sync="multipleSelection"
        :total="totalCount"
        :page.sync="page"
        :limit.sync="listQuery.MaxResultCount"
        :is-sort="true"
        :sorting.sync="listQuery.Sorting"
        :dict-gather="dictGather"
        @pagination="getList"
        @tableSort="getList"
        @toParams="handleParams"
      />
      <EditForm
        :dialog-form-visible="dialogFormVisible"
        :form-title="formTitle"
        :form-list="journalFormList"
        :form-data="form"
        :is-edit="isEdit"
        :api-name="apiName"
        :dialog-width="800"
        :layout="layout"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
      <el-dialog :visible.sync="dialogVisible" title="查看参数">
        <span style="line-height: 2">{{
          rowData.sysCode === 'SAP' ? rowData.parametersJson : rowData.parameters
        }}</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import API from '@/api/base'
import { journalQueryItems, journalFormList, journalCrud, journalBtnItems, tableBtn } from './config'
export default {
  name: 'InterfaceLog',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'APILog',
      apiName: 'apilog',
      dialogTitle: this.$t('dialogHeader.interfaceLog'), // '仓库',
      journalFormList,
      journalQueryItems,
      journalCrud,
      journalBtnItems,
      tableBtn,
      form: {},
      dialogFormVisible: false,
      dialogVisible: false,
      rowData: {},
      formTitle: '',
      isEdit: false,
      layout: { gutter: 10, span: 12, xs: 24, sm: 12, md: 8, xl: 6 },
      exportParams: {}
    }
  },
  created() {
    this.getDict()
    this.getinterfaceLog()
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'IsSuccess' }).then(res => {
        this.journalQueryItems[1].options = res.details
      })
    },
    getinterfaceLog() {
      API.get('apiconfig', { IsPage: false }, 'all').then(res => {
        // let arr = []
        // res.items.forEach(item => {
        //   // arr.push(item.apiName)
        //   item.label = item.apiName
        //   item.value = item.apiName
        // })
        let arr = []
        for (let i = 0; i < res.items.length; i++) {
          let index = arr.findIndex(item => item.label === res.items[i].apiName)
          // console.log(index)
          if (index === -1) {
            arr.push({ label: res.items[i].apiName, value: res.items[i].apiName })
          }
        }
        this.journalQueryItems[0].options = arr
      })
    },
    handleRetrans() {
      var row = this.multipleSelection[0]
      console.log(row)
      // console.log(aaa);
      this.journalBtnItems[0].loading = true
      API.post('apilog', { id: row.id }, 'Resend').then(res => {
        if (res.success) {
          this.journalBtnItems[0].loading = false
          this.$notify({
            title: this.$t('notify.success'), // '成功'
            message: this.$t('notify.operateSuccess'), // '操作成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.journalBtnItems[0].loading = false
          this.$notify({
            title: this.$t('notify.failure'), // '失败'
            // 接口返回数据，待中英配置
            message: res.message, // '操作失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleDownloadPast() {
      let Ids = [] // 选中的id集
      if (this.multipleSelection.length > 0) {
        //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
        this.multipleSelection.map(item => {
          Ids.push(item.id)
        })
        // this.exportParams.Ids = Ids
        this.exportPast('apilog', { Ids: Ids }, 'Export')
      } else {
        // delete this.exportParams.Ids
        this.exportPast('apilog', this.exportParams, 'Export')
      }
    },
    handleParams(row) {
      // this.$message({
      //   message: row.row.parameters,
      //   duration: 5 * 1000
      // })
      this.dialogVisible = true
      this.rowData = row.row
    }
  }
}
</script>
<style scoped>
::v-deep .el-dialog__body {
  height: 600px;
  overflow: auto;
}
</style>
