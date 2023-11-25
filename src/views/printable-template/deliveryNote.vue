<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 9mm" />
          <td style="width: 25mm" />
          <td style="width: 37mm" />
          <td style="width: 25mm" />
          <td style="width: 25mm" />
          <td style="width: 25mm" />
          <td style="width: 25mm" />
          <td style="width: 25mm" />
        </tr>

        <tr>
          <td colspan="8" class="main-title">
            <img src="../../../static/image/common/logo.png" class="logo" />
            送货单
            <span class="top-right"> 版次：A1 </span>
          </td>
        </tr>

        <tr class="top-title">
          <td colspan="4">客户名称：楚能新能源股份有限公司</td>
          <td colspan="4">送货单号：{{ data[0].deliverynoteID }}</td>
        </tr>
        <tr class="newTitle">
          <td colspan="3">客户订单号：3310021616</td>
          <td colspan="5">送货日期：{{ getDate }} 送货地址：武汉市江夏区星光大道489号</td>
        </tr>
        <tr class="td-title">
          <td>序号</td>
          <td>物料编号</td>
          <td>物料名称</td>
          <td>规格</td>
          <td>单位</td>
          <td>数量</td>
          <td>送货批次</td>
          <td>备注</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td style="text-align: center">{{ (currentPage - 1) * 16 + index + 1 }}</td>
          <td>{{ item.materialID }}</td>
          <td>{{ item.materialDesc }}</td>
          <td>{{ item.specs }}</td>
          <td>{{ item.unitName }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.batch }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="8">供应商名称(全称及盖章)</td>
        </tr>
        <tr class="tb-footer">
          <td colspan="4">
            <div style="float: left">送货人：</div>
          </td>
          <td colspan="4">
            <div style="float: left">客户签收：</div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="footer-page">第{{ currentPage }}页，共{{ page }}页</div>
    <div style="page-break-after: always" />
  </div>
</template>
<script>
export default {
  name: 'DeliveryNote',
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  computed: {
    getDate() {
      let date = new Date()
      let yyyy = date.getFullYear()
      let MM = date.getMonth() + 1
      let dd = date.getDate()
      return yyyy + '-' + MM + '-' + dd
      // console.log(yyyy + '-' + MM + '-' + dd)
    }
  },
  methods: {}
}
</script>
<style scoped>
/* 需与打印样式同步 */
html,
body {
  padding: 0;
  margin: 0;
}
.logo {
  width: 15mm;
  position: absolute;
}
.page {
  width: 196mm;
  height: 148mm;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
table {
  position: relative;
  margin: auto;
  border-collapse: collapse;
  font-family: 宋体;
  font-size: 10pt;
  table-layout: fixed;
  word-break: break-all;
  page-break-after: always;
}
.table td {
  text-align: left;
  height: 13mm;
  border: 1px solid #000;
  padding: 0 3px;
}
.table tr {
  height: 7mm;
}
.td-title td {
  text-align: center;
  height: 14mm !important;
}
.top-title td {
  height: 7mm;
  /* border: 1px solid #000; */
}
.main-title {
  height: 12mm !important;
  font-size: 16pt;
  font-weight: bold;
  text-align: center !important;
  line-height: 12mm;
  border: none !important;
  border-bottom: 1px solid #000 !important;
}
.top-right {
  text-align: left;
  font-size: 12pt;
  font-weight: normal;
  position: absolute;
  right: 1mm;
  line-height: 12mm;
}
.col_design {
  height: 0 !important;
}
.col_design td {
  height: 0 !important;
  visibility: hidden;
  border: none;
}
.tb-footer td {
  line-height: 7mm;
  text-align: right;
  border: 1px solid #000;
}
.footer-page {
  font-family: 宋体;
  font-size: 10pt;
  text-align: center;
  bottom: 0;
  position: absolute;
  width: 100%;
}
.newText {
  height: 7mm;
}
</style>
