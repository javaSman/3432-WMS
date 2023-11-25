<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="RegionManagementCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
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
        @create="handleCreate"
        @cancel="cancel"
        @reset="reset"
      />
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { API } from '@/api/generalAPI'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import combogrid from '@/mixins/combogrid'

import { formList, queryItems, RegionManagementCrud } from './config'
export default {
  name: 'RegionManagement',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Region',
      apiName: 'Region',
      dialogTitle: this.$t('dialogHeader.regionManagement'),

      formList,
      queryItems,
      RegionManagementCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '',
      isEdit: false
    }
  },
  created() {
    this.getWarehouse()
    this.getDict()
  },
  mounted() {
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'warehouseName': {
          item.change = () => {
            this.$set(this.form, 'wareHouseID', this.form.warehouseName)
          }
        }
      }
    })
  },
  methods: {
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.formList[2].options = res.items
      })
    },
    getDict() {
      API.getDict('dict', { name: 'AreaType' }).then(res => {
        this.formList[5].options = res.details
      })
    }
  }
}
</script>
