<template>
  <div class="components-container">
    <el-tabs type="border-card">
      <el-tab-pane label="领料出库单"><salesOutbound /></el-tab-pane>
      <el-tab-pane label="销售出库单"><materialRequisition /></el-tab-pane>
      <el-tab-pane label="采购退货出库单"><purchaseRetrun /></el-tab-pane>
      <el-tab-pane label="其他出库单"><otherOutbound /></el-tab-pane>
      <el-tab-pane label="取消入库"><cancelReceipt /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import materialRequisition from './module/materialRequisition.vue'
import salesOutbound from './module/salesOutbound'
import otherOutbound from './module/otherOutbound'
import purchaseRetrun from './module/purchaseRetrun'
import cancelReceipt from './module/cancelReceipt'
export default {
  name: 'OutboundOrder',
  components: { materialRequisition, salesOutbound, otherOutbound, purchaseRetrun, cancelReceipt },
  mixins: [],
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
