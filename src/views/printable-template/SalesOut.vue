<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 9mm" />
          <td style="width: 35mm" />
          <td style="width: 34mm" />
          <td style="width: 33mm" />
          <td style="width: 21mm" />
          <td style="width: 30mm" />
          <!-- <td style="width: 17mm" /> -->
          <!-- <td style="width: 16mm" /> -->
          <td style="width: 20mm" />
          <td style="width: 20mm" />
        </tr>

        <tr>
          <td colspan="10" class="main-title" style="border: none !important">
            <!-- <img src="../../../static/image/common/Rowlogo.png" class="logo" /> -->
            出库备料单
            <span class="top-right">编号:J-S0303.0</span>
            <div ref="qrcode11111" class="qrcodestyle" />
          </td>
        </tr>

        <!-- <tr class="top-title">
            <td colspan="4" style="border-top: none; border-bottom: none">制单日期:{{ getDate }}</td>
            <td colspan="4" style="border-top: none; border-bottom: none">调入仓库:{{ data[0].inWarehouseCode }}</td>
            <td colspan="4" style="border-top: none; border-bottom: none">调出仓库:{{ data[0].outWarehouseCode }}</td>
          </tr> -->
        <tr class="top-title">
          <td colspan="3" style="border: none">单据类型:{{ thead.applyType }}</td>
          <td colspan="3" style="border: none">制单日期:{{ getDate }}</td>
          <td colspan="3" style="border: none">发料车间:{{ thead.applyDeptName }}</td>
          <td colspan="3" style="border: none">单号:{{ thead.pickID }}</td>
        </tr>
        <tr class="td-title">
          <td colspan="1" style="border-bottom: none !important; width: 5%">序号</td>
          <td colspan="1" style="border-bottom: none !important; width: 11%">物料编号</td>
          <td colspan="1" style="border-bottom: none !important; width: 15%">物料描述</td>
          <td colspan="1" style="border-bottom: none !important; width: 10%">条码</td>
          <td colspan="1" style="border-bottom: none !important; width: 8%">货位</td>
          <td colspan="1" style="border-bottom: none !important; width: 8%">载具</td>
          <td colspan="1" style="border-bottom: none !important; width: 5%">单位</td>
          <!-- <td colspan="1" style="border-bottom: none !important">调出仓库</td> -->
          <!-- <td colspan="1" style="border-bottom: none !important">调入仓库</td> -->
          <td colspan="1" style="border-bottom: none !important; width: 8%">领料数量</td>
          <td colspan="1" style="border-bottom: none !important; width: 8%">仓库</td>
          <td colspan="1" style="border-bottom: none !important; width: 10%">供应商批次</td>
          <td colspan="1" style="border-bottom: none !important; width: 8%">档次</td>
          <td colspan="1" style="border-bottom: none !important; width: 10%">备注</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td>{{ item.materialID }}</td>
          <td>{{ item.materialDesc }}</td>
          <td>{{ item.barcodes }}</td>
          <td>{{ item.barcodes }}</td>
          <td>{{ item.pickBoxID }}</td>
          <td>{{ item.unitName }}</td>
          <td>{{ item.pickQuantity }}</td>
          <td>{{ item.warehouseID }}</td>
          <td>{{ item.batch }}</td>
          <td>{{ item.cellgrade }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </tbody>
      <tfoot>
        <!-- <tr>
            <td colspan="2">调入:</td>
            <td colspan="1">调入审核:</td>
            <td colspan="1">调出:</td>
            <td colspan="2">调出审核:</td>
            <td colspan="2">账务:</td>
          </tr> -->
        <tr class="tb-footer">
          <td colspan="2">领料:</td>
          <td colspan="4">领料审核:</td>
          <td colspan="2">仓管:</td>
          <td colspan="2">仓库审核:</td>
          <td colspan="2">财务:</td>
        </tr>
        <tr class="tb-footer1">
          <td colspan="2">此表一式四联</td>
          <td colspan="4">第一联:财务</td>
          <td colspan="2">第二联:仓库</td>
          <td colspan="2">第三联:采购</td>
          <td colspan="2">第四联:存档</td>
        </tr>
        <tr class="tb-footer2">
          <td colspan="12"><span tdata="pageNO">第##页</span>，<span tdata="pageCount">共##页</span></td>
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
  name: 'SalesOutbound',
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
      qrcode.makeCode(this.data[0].pickID)
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
  width: 299mm;
  height: 139mm;
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
  top: 8mm;
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
