<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="WarehouseCrud"
        :selection="multipleSelection"
        :button-items="BtnItems"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
        @toERPwarehouseCorrespond="handleERPwarehouseCorrespond()"
        @toEnable="handleEnable()"
        @toDisable="handleDisable()"
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
          @pagination="getList"
          @tableSort="getList"
        />
      </div>
    </div>
    <div class="content-container" style="margin-top: 10px">
      <h4>{{ $t('dialogHeader.areaDetails') }}</h4>
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
        />
      </div>
    </div>
    <EditForm
      :dialog-form-visible="dialogFormVisible"
      :form-title="formTitle"
      :form-list="formList"
      :form-data="form"
      :is-edit="isEdit"
      :api-name="apiName"
      :dialog-width="550"
      :layout="layout"
      @create="handleCreate"
      @cancel="cancel"
      @reset="reset"
    />
    <Correspond
      :form-title="corresponddialogTitles"
      :dialog-form-visible="correspondVisible"
      :form-list="correspondForm"
      :form-data="correspondData"
      :is-edit="true"
      :submit="correspondSubmit"
      @reset="reset"
      @cancel="dialogCancel"
    />
  </div>
</template>
<script>
import Table from '@/components/singleTable'
import Correspond from '@/components/EditDialog'
import EditForm from '@/components/EditDialog'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import basics from '@/mixins'
import { API } from '@/api/generalAPI'
import { formList, queryItems, WarehouseCrud, BtnItems, correspondForm } from './config'
export default {
  name: 'Warehouse',
  components: { Table, EditForm, CrudOperation, Correspond },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'Warehouse',
      apiName: 'warehouse',
      detailColName: 'RegionDetails',
      dialogTitle: this.$t('dialogHeader.warehouse'), // '仓库',

      formList,
      queryItems,
      WarehouseCrud,
      BtnItems,
      form: {},
      dialogFormVisible: false,
      formTitle: '',
      isEdit: false,
      loading: false,
      formLoading: false,
      layout: { gutter: 10, span: 24, xs: 24, sm: 12, md: 8, xl: 6 },
      corresponddialogTitles: '',
      correspondVisible: false,
      detailListLoading: false,
      correspondForm,
      correspondData: {},
      detailQuery: {
        WarerHoseID: null
      },
      detailTable: []
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
  },
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.WarerHoseID = row.warehouseID
      API.getData('Region', this.detailQuery, 'GetWearhose').then(res => {
        this.detailTable = res.data
        this.detailListLoading = false
      })
    },
    // /** 获取仓库编码下拉框值WarehouseType: 'Waste,Shelf,Nonproductive' */
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.correspondForm[0].options = res.items
      })
    },
    getDict() {
      API.getDict('dict', { name: 'WarehouseType' }).then(res => {
        this.formList[3].options = res.details
      })
    },
    dialogCancel() {
      this.correspondVisible = false
    },
    handleERPwarehouseCorrespond() {
      this.correspondVisible = true
    },
    correspondSubmit() {
      let params = {
        warehouseID: this.multipleSelection[0].warehouseID,
        warehouseStartYN: 0,
        warehouseERP: this.correspondData.fictitious
      }
      API.dataPost('warehouse', params, 'UpdateERPWareHouse')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.correspondVisible = false
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(e => {
          console.log(e)
          this.correspondVisible = false
        })
      return true
    },
    handleEnable() {
      let rows = this.multipleSelection
      let warehouseID = []
      let warehouseStartYN = []
      let warehouseERP = []
      rows.forEach(item => {
        warehouseID.push(item.warehouseID)
        warehouseStartYN.push(item.warehouseStartYN)
        warehouseERP.push(item.warehouseERP)
      })
      let params = {
        warehouseID: warehouseID.toString(),
        warehouseStartYN: warehouseStartYN.toString(),
        warehouseERP: parseFloat(warehouseERP)
      }
      this.$confirm('确定启用选中项仓库？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('warehouse', params, 'UpdateYNHouse').then(res => {
          // console.log(res)
          if (res.success) {
            this.splitdialogFormVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    },
    handleDisable() {
      let rows = this.multipleSelection
      let warehouseID = []
      let warehouseStartYN = []
      let warehouseERP = []
      rows.forEach(item => {
        warehouseID.push(item.warehouseID)
        warehouseStartYN.push(item.warehouseStartYN)
        warehouseERP.push(item.warehouseERP)
      })
      let params = {
        warehouseID: warehouseID.toString(),
        warehouseStartYN: warehouseStartYN.toString(),
        warehouseERP: parseFloat(warehouseERP)
      }
      this.$confirm('确定禁用选中项仓库？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('warehouse', params, 'UpdateYNHouse').then(res => {
          // console.log(res)
          if (res.success) {
            this.splitdialogFormVisible = false
            this.$notify({
              title: this.$t('notify.success'), // '成功'
              message: this.$t('notify.operateSuccess'), // '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
            this.$notify({
              title: this.$t('notify.failure'), // '失败'
              // 接口返回数据，待中英配置
              message: this.$t('notify.operateFailure') + ',' + res.message, // '操作失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>
