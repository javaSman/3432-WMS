<template>
  <div class="components-container">
    <el-tabs type="border-card">
      <el-tab-pane label="领料出库"><material /></el-tab-pane>
      <el-tab-pane label="销售出库"><salesOutbound /></el-tab-pane>
      <el-tab-pane label="采购退货出库"><purchase /></el-tab-pane>
      <el-tab-pane label="其他出库"><otherOutbound /></el-tab-pane>
      <el-tab-pane label="取消入库"><cancelReceipt /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import material from './module/material'
import salesOutbound from './module/salesOutbound'
import purchase from './module/purchase'
import otherOutbound from './module/otherOutbound'
import cancelReceipt from './module/cancelReceipt'
export default {
  name: 'OutboundApplication',
  components: { material, salesOutbound, purchase, otherOutbound, cancelReceipt },
  mixins: [],
  data() {
    return {}
  },
  created() {},
  updated() {},
  methods: {}
}
</script>
