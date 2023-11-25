<template>
  <div class="page" style="border: 1px soild #000">
    <div v-if="this.data[0].boxID.length > 10" ref="qrcode11111" class="qrCode" />
    <div v-if="this.data[0].boxID.length > 10" class="qrText">{{ this.data[0].boxID }}</div>

    <div
      v-if="this.data[0].boxID.length === 10 || this.data[0].boxID.length < 10"
      ref="barcode"
      class="barcode"
      style="border: 1px soild #000"
    >
      <svg ref="barcodeSvg" />
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import JsBarcode from 'jsbarcode'
export default {
  name: 'InventoryTable',
  components: { JsBarcode },
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  created() {
    // console.log(this.data)
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs)
    //   this.creatQrCode()
    // })
    // this.barcode()
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      if (this.data[0].boxID.length > 10) {
        // console.log(this.data[0].boxID)
        let qrcode = new QRCode(this.$refs.qrcode11111, {
          width: 150,
          height: 150,
          render: 'canvas',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrcode.makeCode(this.data[0].boxID)
        let canvas = document.querySelector('canvas')
        var strDataURI = canvas.toDataURL('image/png')
        canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
        qrcode.clear()
        // this.$emit('change', true)
      } else {
        // console.log(this.data[0].boxID)
        JsBarcode(this.$refs.barcodeSvg, this.data[0].boxID, {
          format: 'CODE128A', // 选择要使用的条形码类型
          width: 2.5, // 设置条之间的宽度
          height: 150, // 高度
          displayValue: true, // 是否在条形码下方显示文字
          lineColor: '#000', // 设置条和文本的颜色。
          margin: 0
        })
      }
    }
    // barcode() {
    //   console.log(this.data[0].boxID)
    //   JsBarcode(this.$refs.barcodeSvg, this.data[0].boxID, {
    //     format: 'CODE128A', //选择要使用的条形码类型
    //     width: 2.5, //设置条之间的宽度
    //     height: 150, //高度
    //     displayValue: true, //是否在条形码下方显示文字
    //     lineColor: '#000', //设置条和文本的颜色。
    //     margin: 0
    //   })
    // }
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
  width: 99mm;
  height: 69.5mm;
  /* border: 1px soild #000; */
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
.qrCode {
  width: 100mm;
  height: 68mm;
  border: 1px soild #000;
  position: absolute;
  top: 10mm;
  left: 30mm;
}
.qrText {
  position: absolute;
  top: 51mm;
  left: 20mm;
}
.barcode {
  position: absolute;
  top: 10mm;
  left: 0mm;
}
</style>
