<template>
  <div>
    <!-- 下拉多选，组件内存值为数组，查询表单存值为字符串 -->

    <el-select
      v-model="dataArr"
      :style="item.formStyle || item.filterStyle || 'width:' + filterWidth"
      :collapse-tags="item.collapse !== undefined ? item.collapse : true"
      multiple
      filterable
    >
      <!-- @change="item.change ? item.change(dataArr) : handleFilter()" -->
      <el-option v-for="op in item.options" :key="op.index" :label="op.label" :value="op.value">
        <span style="float: left">{{ op.label }}</span>
        <span v-if="op.asign !== undefined" style="float: right; margin-right: 15px; color: #8492a6; font-size: 13px">{{
          op.asign
        }}</span>
      </el-option>

      <!-- <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option> -->
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'DateTimeRange',
  props: {
    /** 单条目配置数据 */
    item: { type: Object, default: () => {} },
    /** 查询项输入栏宽度（统一） */
    filterWidth: { type: Number, default: 160 },
    /** 表单数据 */
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      arr: []
    }
  },
  computed: {
    /** dataArr：组件内选中值对应数组,inArr=['11','22']
     *  queryData[item.prop]- 对应11,22
     * */
    dataArr: {
      get() {
        let arr = []
        if (this.formData[this.item.prop]) {
          arr = this.formData[this.item.prop].split(',')
        } else {
          arr = []
        }
        return arr
      },
      set(val) {
        if (val) {
          this.$set(this.formData, this.item.prop, val.join(','))
        } else {
          this.$set(this.formData, this.item.prop, '')
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    /** 搜索事件 */
    handleFilter() {
      this.$emit('handleFilter')
    }
  }
}
</script>
<style>
</style>
