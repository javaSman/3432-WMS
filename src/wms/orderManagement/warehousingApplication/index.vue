<template>
  <div class="components-container">
    <el-tabs type="border-card">
      <el-tab-pane label="采购入库申请单">
        <div class="head-container">
          <filter-container
            :form-items="QueryItems"
            :list-query.sync="listQuery"
            :more-items="MoreQuery"
            :more-query.sync="listQuery"
            :more-search="true"
            @query="getList"
            @reset="reset"
          />
        </div>
        <div class="content-container">
          <CrudOperation
            :permission-crud="Crud"
            :button-items="BtnItems"
            :selection="multipleSelection"
            :download-loading.sync="downloadLoading"
            @toDelete="handleDelete()"
          />
          <div style="height: 250px">
            <ColDesign :col-list="column" :table-show.sync="tableShow" @resetCol="resetCol" />
            <Table
              v-if="tableShow"
              ref="table"
              v-loading="listLoading"
              :data-list="list"
              :column="column"
              :height="230"
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
          <CrudOperation
            :button-items="ButtonItems"
            :selection="treeSelection"
            @toUpdate="handleUpdate()"
            @toDelete="handleOmit()"
          />
          <div style="height: 250px">
            <Table
              v-if="detailTableShow"
              ref="tableDetail"
              v-loading="detailListLoading"
              :data-list="multipleSelection.length === 1 ? detailTable : []"
              :column="columnDetail"
              :selection.sync="treeSelection"
              :height="220"
              :has-selection="true"
              :page-hidden="true"
              :dict-gather="dictGather"
              :has-index="true"
            />
          </div>
          <EditForm
            :dialog-form-visible="visible"
            :form-title="formTitle"
            :form-list="List"
            :form-data="FormData"
            :is-edit="isEdit"
            :dialog-width="950"
            :layout="layout"
            :submit="submit"
            @cancel="cancel"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="生产完工入库申请单"><productionCompletion /></el-tab-pane>
      <el-tab-pane label="退料入库申请单"><materialReturnApplication /></el-tab-pane>
      <el-tab-pane label="其他入库申请单"><otherWarehousingApplications /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Table from '@/components/Table'
import productionCompletion from './module/productionCompletion'
import materialReturnApplication from './module/materialReturnApplication'
import otherWarehousingApplications from './module/otherWarehousingApplications'
import { API } from '@/api/generalAPI'
import CrudOperation from '@/components/Crud/CRUD.operation'
import colDesign from '@/mixins/colDesign'
import filterContainer from '@/mixins/filterContainer'
import EditForm from '@/components/EditDialog'
import basics from '@/mixins'
import { QueryItems, BtnItems, Crud, ButtonItems, List, MoreQuery } from './config'
export default {
  name: 'WarehousingApplication',
  components: {
    Table,
    CrudOperation,
    EditForm,
    productionCompletion,
    materialReturnApplication,
    otherWarehousingApplications
  },
  mixins: [colDesign, filterContainer, basics],
  data() {
    return {
      colName: 'ReceiptOrder',
      detailColName: 'ReceiptOrderDetail',
      apiName: 'ReceiptOrder',
      QueryItems,
      BtnItems,
      Crud,
      List,
      ButtonItems,
      MoreQuery,

      layout: { span: 8 },
      detailTable: [],

      listLoading: true,
      detailListLoading: false,
      detailQuery: {
        OrderId: null
      },
      downloadLoading: false,
      exportParams: {},
      formTitle: '',
      isEdit: true,
      visible: false,
      FormData: {},
      treeSelection: [],
      receiptID: ''
    }
  },
  created() {},
  methods: {
    getDetail(row) {
      this.detailListLoading = true
      this.detailQuery.OrderId = row.receiptID
      API.get('receiptorder', this.detailQuery, 'GetAllDetails').then(res => {
        this.detailTable = res.details
        this.detailListLoading = false
        this.receiptID = res.header.receiptID
      })
    },
    confirm() {},
    cancel() {
      this.visible = false
    },
    handleDelete() {
      let params = []
      this.multipleSelection.forEach(item => {
        params.push(item.receiptID)
      })
      this.$confirm('确定删除选中' + this.multipleSelection.length + '条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('receiptorder', params, 'InApplyforDelete')
          .then(res => {
            if (res.success) {
              let TableList = this.list
              this.multipleSelection.forEach(item => {
                for (let i = 0; i < TableList.length; i++) {
                  if (TableList[i].id === item.id) {
                    TableList.splice(i, 1)
                  }
                }
              })
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                druation: 2000
              })
              this.getList()
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                druation: 2000
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    handleOmit() {
      let params = []
      this.treeSelection.forEach(item => {
        params.push(item.id)
      })
      const data = {
        id: params,
        receiptID: this.receiptID
      }
      this.$confirm('确定删除选中' + this.multipleSelection.length + '条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.dataPost('receiptorder', data, 'InApplyforDetailDelete')
          .then(res => {
            if (res.success) {
              let DetailsList = this.detailTable
              this.treeSelection.forEach(item => {
                for (let i = 0; i < DetailsList.length; i++) {
                  if (DetailsList[i].id === item.id) {
                    DetailsList.splice(i, 1)
                  }
                }
              })
              this.$notify({
                title: this.$t('notify.success') /* 成功 */,
                message: res.message /* 返回成功信息 */,
                type: 'success',
                druation: 2000
              })
            } else {
              this.$notify({
                title: this.$t('notify.failure') /* 失败 */,
                message: res.message /* 返回失败信息 */,
                type: 'error',
                druation: 2000
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    handleUpdate() {
      this.formTitle = '修改'
      this.visible = true
      let materialID = []
      let materialDesc = []
      let unitName = []
      let receivingNum = []
      this.treeSelection.forEach(item => {
        materialID.push(item.materialID)
        materialDesc.push(item.materialDesc)
        unitName.push(item.unitName)
        receivingNum.push(item.receivingNum)
      })
      this.$set(this.FormData, 'materialID', materialID.toString())
      this.$set(this.FormData, 'materialDesc', materialDesc.toString())
      this.$set(this.FormData, 'unitName', unitName.toString())
      this.$set(this.FormData, 'receivingNum', receivingNum.toString())
    },
    submit() {
      API.dataPost('receiptorder', Array(this.FormData), 'InApplyforDetailUpdate')
        .then(res => {
          if (res.success) {
            this.$notify({
              title: this.$t('notify.success') /* 成功 */,
              message: res.message /* 返回成功信息 */,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('notify.failure') /* 失败 */,
              message: res.message /* 返回失败信息 */,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.visible = false
        })
      return true
    }
  }
}
</script>
