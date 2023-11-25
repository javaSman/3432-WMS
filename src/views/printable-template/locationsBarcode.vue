<template>
  <div class="page" style="border: 1px soild #000">
    <div ref="barcode" class="barcode" style="border: 1px soild #000">
      <svg ref="barcodeSvg" />
    </div>
  </div>
</template>
<script>
// import QRCode from 'qrcodejs2'
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
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs)
    //   this.creatQrCode()
    // })
    this.barcode()
  },
  methods: {
    barcode() {
      // console.log(this.data[0].boxID)
      JsBarcode(this.$refs.barcodeSvg, this.data[0].locationID, {
        format: 'CODE128', // 选择要使用的条形码类型
        width: 2, // 设置条之间的宽度
        height: 150, // 高度
        displayValue: true, // 是否在条形码下方显示文字
        lineColor: '#000', // 设置条和文本的颜色。
        margin: 0
      })
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
  width: 99mm;
  height: 69.5mm;
  /* border: 1px soild #000; */
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
.barcode {
  width: 100mm;
  height: 68mm;
  border: 1px soild #000;
  position: absolute;
  top: 14mm;
  left: 8mm;
}
</style>
