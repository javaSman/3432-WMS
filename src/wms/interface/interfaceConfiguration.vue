<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="configureCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
      />
      <ColDesign :col-list="column" style="margin-top: 20px" :table-show.sync="tableShow" @resetCol="resetCol" />
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
        :dialog-width="800"
        :layout="layout"
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
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { formList, queryItems, configureCrud } from './config'
export default {
  name: 'InterfaceConfiguration',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'apiconfig',
      apiName: 'apiconfig',
      dialogTitle: this.$t('dialogHeader.interfaceConfiguration'), // '仓库',
      formList,
      queryItems,
      configureCrud,
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      layout: { gutter: 10, span: 12, xs: 24, sm: 12, md: 8, xl: 6 }
    }
  },
  methods: {}
}
</script>
