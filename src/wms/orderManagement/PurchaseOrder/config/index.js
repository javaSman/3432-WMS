export const AllocationOrderQueryItems = [
  { type: 'Input', label: '采购订单号', prop: 'po' },
  { type: 'Input', label: '供应商编码', prop: 'supplierCode' },
  { type: 'Input', label: '供应商名称', prop: 'supplierName' },
  { type: 'Select', label: '订单类型', prop: 'purchOrderType', options: [] },
  { type: 'Input', label: '物料编码', prop: 'materialID' }
]
export const AllocationOrderCrud = {}
// 非标按钮
export const BtnItems = [
  // {
  //   // 生成送货单
  //   langLabel: 'button.generate',
  //   clickFun: 'toGenerate',
  //   disabled: 'single',
  //   permission: 'OrderManagement.PurchaseOrder.CreateDelivery',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    // 生成备料单
    langLabel: 'button.materiallist',
    clickFun: 'toMateriallist',
    disabled: 'single',
    permission: 'OrderManagement.PurchaseOrder.CreatePick',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
