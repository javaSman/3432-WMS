<template>
  <div class="app-container">
    <div class="head-container">
      <filter-container :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
    </div>
    <div class="content-container">
      <CrudOperation
        :permission-crud="WharfCrud"
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
        :cbg-remote="cbgRemote"
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

import { formList, queryItems, WharfCrud } from './config'
export default {
  name: 'Wharf',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'Wharf',
      apiName: 'wharf',
      dialogTitle: this.$t('dialogHeader.wharf'), // '码头',

      formList,
      queryItems,
      WharfCrud,

      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '',
      isEdit: false,
      boxcbgAttr: formList[3], // 远程
      warehousecbgAttr: formList[2] // 远程
    }
  },
  created() {
    this.getDict()
    this.getWarehouse()
    this.getVehicle()
    // this.getOpts()
    this.formList.forEach(item => {
      switch (item.prop) {
        case 'boxID': {
          item.change = row => {
            if (!row) {
              this.cbgRemote('boxID')
            }
          }
          break
        }
        case 'warehouseID': {
          item.change = row => {
            this.inputWHName(row)
          }
          break
        }
      }
    })
  },
  methods: {
    getDict() {
      API.getDict('dict', { name: 'WharfType' }).then(res => {
        this.formList[4].options = res.details
      })
      API.getDict('dict', { name: 'WharfState' }).then(res => {
        this.formList[5].options = this.queryItems[6].options = res.details
      })
    },
    getWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseName
          item.value = item.warehouseID
          item.asign = item.warehouseID
        })
        this.queryItems[6].options = this.formList[2].options = res.items
      })
    },
    getVehicle() {
      API.get('box', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.boxID
          item.value = item.boxID
        })
        this.formList[3].options = res.items
      })
    },
    inputWHName(val) {
      this.formList[2].options.forEach(item => {
        if (item.value === val) {
          this.form.whName = item.warehouseName
        } else if (val === '') {
          this.form.whName = ''
          this.getNewWarehouse()
        }
      })
    },
    cbgRemote(node, str) {
      if (node === this.boxcbgAttr.prop) {
        // this.getNewBox()
        this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
      }
      if (node === this.warehousecbgAttr.prop) {
        // this.getNewBox()
        this.getCbgRemoteSearch(this.warehousecbgAttr, 'warehouse', { warehouseID: str })
      }
    },
    getOpts() {
      this.getCbgRemoteOpts(this.boxcbgAttr, 'box')
      this.getCbgRemoteOpts(this.warehousecbgAttr, 'warehouse')
      this.getCbgOpts('warehouse', { IsPage: false })
    },
    handleCreate() {
      // this.dialogFormVisible = true
      this.dialogOpen()
      this.form = {}
      this.getOpts()
      this.getNewWarehouse()
      this.getNewBox()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getNewWarehouse()
      this.getOpts()
      this.getNewBox()
    },
    // 下拉框获取新的仓库编码options
    getNewWarehouse() {
      API.get('warehouse', { IsPage: false }, 'all').then(res => {
        // let arr = []
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.warehouseID
          item.value = item.warehouseID
        })
        this.formList[2].options = res.items
      })
    },
    getNewBox() {
      API.get('box', { IsPage: false }, 'all').then(res => {
        res.items.forEach(item => {
          // arr.push(item.warehouseID)
          item.label = item.boxID
          item.value = item.boxID
        })
        this.formList[3].options = res.items
      })
    }
  }
}
</script>
