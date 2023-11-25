<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 9mm" />
          <td style="width: 37mm" />
          <td style="width: 22mm" />
          <td style="width: 33mm" />
          <td style="width: 27mm" />
          <td style="width: 13mm" />
          <td style="width: 13mm" />
          <td style="width: 15mm" />
          <td style="width: 18mm" />
          <td style="width: 15mm" />
        </tr>

        <tr>
          <td colspan="10" class="main-title">
            <img src="../../../static/image/common/Rowlogo.png" class="logo" />
            {{ data[0].orderTypesss }}单
            <span class="top-right">编号:J-S0303.01 </span>
            <div ref="qrcode11111" class="qrcodestyle" />
          </td>
        </tr>

        <tr class="top-title">
          <td colspan="3" style="border-top: none; border-bottom: none">单据类型：{{ data[0].orderTypesss }}</td>
          <td colspan="4" style="border-top: none; border-bottom: none">制单日期：{{ getDate }}</td>
          <td colspan="3" style="border-top: none; border-bottom: none">单号：{{ data[0].orderID }}</td>
        </tr>
        <!-- <tr class="newTitle">
          <td colspan="3">客户订单号：3310021616</td>
          <td colspan="5">送货日期：{{ getDate }} 送货地址：武汉市江夏区星光大道489号</td>
        </tr> -->
        <tr class="td-title">
          <td colspan="1" style="border-bottom: none !important">序号</td>
          <td colspan="1" style="border-bottom: none !important">客户</td>
          <td colspan="1" style="border-bottom: none !important">物料编号</td>
          <td colspan="1" style="border-bottom: none !important">物料名称</td>
          <td colspan="1" style="border-bottom: none !important">物料规格</td>
          <td colspan="1" style="border-bottom: none !important">单位</td>
          <td colspan="1" style="border-bottom: none !important">数量</td>
          <td colspan="1" style="border-bottom: none !important">仓库</td>
          <td colspan="1" style="border-bottom: none !important">生产批次</td>
          <td colspan="1" style="border-bottom: none !important">备注</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td>{{ item.supplierName }}</td>
          <td>{{ item.materialID }}</td>
          <td>{{ item.materialDesc }}</td>
          <td>{{ item.specs }}</td>
          <td>{{ item.unitName }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.warehouseInID }}</td>
          <td>{{ item.batch }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">入库(操作人):</td>
          <td colspan="2">品质审核:</td>
          <td colspan="2">生产审核:</td>
          <td colspan="2">仓库审核:</td>
          <td colspan="2">账务审核:</td>
        </tr>
        <tr class="tb-footer">
          <td colspan="2">此表一式五联</td>
          <td colspan="1">第一联:财务</td>
          <td colspan="1">第二联:账务</td>
          <td colspan="2">第三联:仓库</td>
          <td colspan="2">第四联:生产</td>
          <td colspan="2">第五联:品质</td>
        </tr>
        <tr class="tb-footer1">
          <td colspan="10"><span tdata="pageNO">第##页</span>，<span tdata="pageCount">共##页</span></td>
        </tr>
      </tfoot>
    </table>
    <!-- <div class="footer-page">第{{ currentPage }}页，共{{ page }}页</div>
    <div style="page-break-after: always" /> -->
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'PrintReceipt',
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
  mounted() {
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      let qrcode = new QRCode(this.$refs.qrcode11111, {
        width: 60,
        height: 60,
        render: 'canvas',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode.makeCode(this.data[0].orderID)
      let canvas = document.querySelector('canvas')
      var strDataURI = canvas.toDataURL('image/png')
      canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
      qrcode.clear()
      // this.$emit('change', true)
    }
  }
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
  width: 40mm;
  position: absolute;
  top: 2mm;
}
.page {
  width: 202mm;
  height: 130mm;
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
  height: 10mm;
  border: 1px solid #000;
  padding: 0 3px;
}
.table tr {
  height: 7mm;
}
.td-title td {
  text-align: center;
  height: 10mm !important;
}
.top-title td {
  height: 10mm;
  border: 1px solid #000;
}
.main-title {
  height: 18mm !important;
  font-size: 20pt;
  font-weight: bold;
  text-align: center !important;
  line-height: 18mm;
  border: none !important;
  /* border-bottom: 1px solid #000 !important; */
}
.top-right {
  text-align: left;
  font-size: 10pt;
  font-weight: normal;
  position: absolute;
  right: 19mm;
  /* line-height: 12mm; */
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
  height: 10mm;
  line-height: 10mm;
  text-align: left;
  border: none !important;
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
.qrcodestyle {
  position: absolute;
  right: 1mm;
  top: 1mm;
}
.tb-footer1 td {
  height: 10mm;
  line-height: 10mm !important;
  text-align: center;
  border: none;
}
</style>
