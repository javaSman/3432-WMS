<template>
  <div class="app-container">
    <div class="head-container">
      <filter-collapse :form-items="queryItems" :list-query.sync="listQuery" @query="getList" @reset="reset" />
      <CrudOperation
        :permission-crud="AGVlocationsCrud"
        :selection="multipleSelection"
        @toAdd="handleCreate"
        @toEdit="handleUpdate()"
        @toDelete="handleDelete()"
        @toExport="handleExport()"
      />
    </div>
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

import { formList, queryItems, AGVlocationsCrud } from './config'
export default {
  name: 'PointManagement',
  components: { Table, EditForm, CrudOperation },
  mixins: [colDesign, filterContainer, basics, combogrid],
  data() {
    return {
      colName: 'AGVlocations',
      apiName: 'AGVlocations',
      dialogTitle: this.$t('dialogHeader.pointManagement'), // '码头',

      formList,
      queryItems,
      AGVlocationsCrud,
      form: {},
      dialogFormVisible: false,

      exportParams: {},

      formTitle: '',
      isEdit: false,
      boxcbgAttr: formList[3], // 远程
      cbgAttr: formList[2] // 下拉网配置字段
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    getDict() {
      // 状态编码
      API.getDict('dict', { name: 'AGVState' }).then(res => {
        this.formList[6].options = this.queryItems[6].options = res.details
      })
      // 区域编码
      API.getDict('dict', { name: 'AreaID' }).then(res => {
        this.formList[1].options = this.queryItems[1].options = res.details
      })
      // 载具类型
      API.getDict('dict', { name: 'BoxID' }).then(res => {
        this.formList[3].options = this.queryItems[3].options = res.details
      })
    },
    // getWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     // let arr = []
    //     res.items.forEach(item => {
    //       // arr.push(item.warehouseID)
    //       item.label = item.warehouseID
    //       item.value = item.warehouseID
    //     })
    //     this.queryItems[0].options = this.formList[2].options = res.items
    //   })
    // },
    // getVehicle() {
    //   API.get('box', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       // arr.push(item.warehouseID)
    //       item.label = item.boxID
    //       item.value = item.boxID
    //     })
    //     this.formList[3].options = res.items
    //   })
    // },
    // inputWHName(val) {
    //   this.formList[2].options.forEach(item => {
    //     if (item.value === val) {
    //       this.form.whName = item.warehouseName
    //     } else if (val === '') {
    //       this.form.whName = ''
    //       this.getNewWarehouse()
    //     }
    //   })
    // },
    // cbgRemote(node, str) {
    //   if (node === this.boxcbgAttr.prop) {
    //     // this.getNewBox()
    //     this.getCbgRemoteSearch(this.boxcbgAttr, 'box', { BoxID: str })
    //   }
    // },
    // getOpts() {
    //   this.getCbgRemoteOpts(this.boxcbgAttr, 'box')
    //   this.getCbgOpts('warehouse', { IsPage: false })
    // },
    handleCreate() {
      // this.dialogFormVisible = true
      this.form = {}
      this.dialogOpen()
    },
    handleUpdate() {
      this.getForm(this.multipleSelection[0].id)
      this.getNewWarehouse()
      this.getOpts()
      this.getNewBox()
    }
    // 下拉框获取新的仓库编码options
    // getNewWarehouse() {
    //   API.get('warehouse', { IsPage: false }, 'all').then(res => {
    //     // let arr = []
    //     res.items.forEach(item => {
    //       // arr.push(item.warehouseID)
    //       item.label = item.warehouseID
    //       item.value = item.warehouseID
    //     })
    //     this.formList[2].options = res.items
    //   })
    // },
    // getNewBox() {
    //   API.get('box', { IsPage: false }, 'all').then(res => {
    //     res.items.forEach(item => {
    //       // arr.push(item.warehouseID)
    //       item.label = item.boxID
    //       item.value = item.boxID
    //     })
    //     this.formList[3].options = res.items
    //   })
    // }
  }
}
</script>
