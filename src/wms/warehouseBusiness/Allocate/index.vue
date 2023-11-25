<template>
  <div class="components-container">
    <!-- <el-tabs type="border-card">
      <el-tab-pane label="仓库调拨"><warehouseAllocate /></el-tab-pane>
      <el-tab-pane label="载具调拨"></el-tab-pane>
      <el-tab-pane label="货位调拨"></el-tab-pane>
    </el-tabs> -->
    <warehouseAllocate />
  </div>
</template>
<script>
import warehouseAllocate from './module/warehouseAllocate'
export default {
  name: 'Allocate',
  components: { warehouseAllocate },
  mixins: [],
  data() {
    return {}
  },
  created() {},
  updated() {},
  methods: {}
}
</script>
