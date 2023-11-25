<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 22mm" />
          <td style="width: 29mm" />
          <td style="width: 13mm" />
          <td style="width: 30mm" />
        </tr>
        <tr>
          <td class="newTitle" style="text-align: center" colspan="4">物料标签</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border-top: none; border-bottom: none">物料编号</td>
          <td style="border-top: none; border-bottom: none">{{ data[0].materialID }}</td>
          <td style="border-top: none; border-bottom: none">物料名称</td>
          <td style="border-top: none; border-bottom: none">{{ data[0].materialDesc }}</td>
        </tr>
        <tr>
          <td>规格</td>
          <td style="width: 29mm; height: 7mm">
            <div style="width: 29mm; line-height: 3.4mm; height: 6.9mm">
              {{ data[0].specsNew }}
            </div>
          </td>
          <td>净重/数量</td>
          <td>{{ data[0].quantity + data[0].unitName }}</td>
        </tr>
        <tr>
          <td>毛重</td>
          <td>{{ data[0].grossWeight }}</td>
          <td colspan="2" rowspan="7">
            <div ref="qrcode11111" class="qrcodestyle" />
            <div class="textSt">{{ data[0].barcode }}</div>
          </td>
        </tr>
        <tr>
          <td>供应商</td>
          <td>{{ data[0].supplierName }}</td>
        </tr>
        <tr>
          <td>供应商批次</td>
          <td>{{ data[0].supplierBatch }}</td>
        </tr>
        <tr>
          <td>送货批次</td>
          <td>{{ data[0].batch }}</td>
        </tr>
        <tr>
          <td>失效日期</td>
          <td>{{ data[0].invalidTime }}</td>
        </tr>
        <tr>
          <td>生产日期</td>
          <td>{{ data[0].productTime }}</td>
        </tr>
        <tr>
          <td>保质期</td>
          <td>{{ data[0].quality }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'InventoryTable',
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs)
      this.creatQrCode()
    })
  },
  methods: {
    creatQrCode() {
      // console.log(this.$refs)

      let qrcode = new QRCode(this.$refs.qrcode11111, {
        width: 125,
        height: 125,
        render: 'canvas',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode.makeCode(this.data[0].barcode)
      let canvas = document.querySelector('canvas')
      var strDataURI = canvas.toDataURL('image/png')
      canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
      qrcode.clear()
      this.$emit('change', true)
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
.page {
  width: 94mm;
  height: 69mm;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
table {
  table-layout: fixed;
  position: relative;
  margin: auto;
  border-collapse: collapse;
  font-family: 宋体;
  font-size: 7pt;
  margin-left: 5mm;
  table-layout: fixed;
  word-break: break-all;
  page-break-after: always;
}
.table td {
  text-align: left;
  height: 6.9mm;
  border: 1px solid #000;
  padding: 0 3px;
}
.table tr {
  height: 6.9mm;
}
.td-title td {
  text-align: center;
  height: 6.9mm !important;
}
.top-title td {
  height: 6.9mm;
}
/* .main-title {
  height: 12mm !important;
  font-size: 16pt;
  font-weight: bold;
  text-align: center !important;
  line-height: 12mm;
  border: none !important;
} */
.top-right {
  text-align: left;
  font-size: 7pt;
  font-weight: normal;
  position: absolute;
  right: 1mm;
  line-height: 4mm;
}
.col_design {
  height: 0 !important;
}
.col_design td {
  height: 0 !important;
  visibility: hidden;
}
.newTitle {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}
.newText {
  height: 6.9mm;
}
.qrcodestyle {
  margin-left: 27px;
}
.textSt {
  margin: 10px 40px;
  font-size: 12px;
}
.ruleStyle {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
