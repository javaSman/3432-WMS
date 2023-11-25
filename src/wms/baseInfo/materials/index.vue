<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="MaterialCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        :download-loading.sync="downloadLoading"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toDownload="handleExport()"
        @toImport="handleImport()"
        @toSynchronizeMaterial="handSynchronizeMaterial()"
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
        :dialog-width="950"
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import { API } from '@/api/generalAPI'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, MaterialCrud, BtnItems } from './config'
export default {
  name: 'Materials',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Materials',
      apiName: 'materials',
      dialogTitle: this.$t('dialogHeader.materials'), // '物料',

      formList,
      queryItems,
      MaterialCrud,
      BtnItems,
      tableList: [],
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: true,

      downloadLoading: false,
      exportParams: {}
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      // 获取材料状态数据
      API.getDict('dict', { name: 'MaterialStatus' }).then(res => {
        this.formList[3].options = res.details
      })
      API.getDict('dict', { name: 'WeightUnits' }).then(res => {
        this.formList[5].options = res.details // 获取重量列表
      })
      API.getDict('dict', { name: 'BasicUnit' }).then(res => {
        this.formList[2].options = res.details // 获取基本单位
      })
      API.getDict('dict', { name: 'VolUnit' }).then(res => {
        this.formList[8].options = res.details // 获取体积单位
      })
    },
    handleUpdate() {
      this.getOpts()
      this.getForm(this.multipleSelection[0].id)
    },
    // handleDownloadPast() {
    //   let Ids = [] // 选中的id集
    //   if (this.multipleSelection.length > 0) {
    //     //  如果有选中的数据，就导出选中的数据，否则全部导出或根据搜索条件导出
    //     this.multipleSelection.map(item => {
    //       Ids.push(item.id)
    //     })
    //     // this.exportParams.Ids = Ids
    //     this.exportPast('materials', { Ids: Ids }, 'Export')
    //   } else {
    //     // delete this.exportParams.Ids
    //     this.exportPast('materials', this.exportParams, 'Export')
    //   }
    // },
    // 导出
    handleExport() {
      this.export(this.apiName, this.exportParams)
    },
    handletoExport() {
      console.log(this.multipleSelection)
      this.exportPast('materials', this.multipleSelection, 'Export')
    },
    exportPast(name, params, otherExport) {
      this.downloadLoading = true
      let other = otherExport || 'Export'
      API.dataGet(name, params, other)
        .then(res => {
          if (res !== '') {
            var url = window.globalConfig.base.ip + ':' + window.globalConfig.base.backend_port + res
            window.location.href = url
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.exportSuccess'), // '导出成功'
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: this.$t('notify.exportEmpty'), // '当前表格为空'
              type: 'warning'
            })
          }
          this.downloadLoading = false
        })
        .catch(() => {
          this.downloadLoading = false
        })
    },
    getOpts() {}
  }
}
</script>
