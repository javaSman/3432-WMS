/* 领料申请单 */
export const MaterialItems = [
  {
    type: 'Input',
    label: '领料单号',
    prop: 'PickID'
  },
  {
    type: 'DateTime',
    label: '申请日期',
    prop: 'BeginApplyDate'
  },
  {
    type: 'Input',
    label: '申请人',
    prop: 'ApplyName'
  }
]
export const Crud = {
  add: 'any'
}
export const MaterialList = [
  {
    type: 'Input',
    label: '申请部门',
    prop: 'applyDept',
    // unique: true,
    placeholder: '请输入',
    rules: [{ required: true, message: '请输入申请部门', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '申请人',
    prop: 'ApplyName',
    options: [],
    rules: [{ required: true, message: '请选择申请人', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'state',
    // unique: true,
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  {
    type: 'Date',
    prop: 'productTime',
    label: '生产日期',
    width: '199px'
    // rules: [{ required: true, message: '请选择生产日期', trigger: 'blur' }]
  }
]
export const TabelList = [
  { label: '物料编码', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { label: '在库数量', prop: 'quantity' },
  { label: '单位', prop: 'unitName' },
  { label: '仓库', prop: 'warehouseID' },
  {
    label: '申请数量',
    prop: 'pickQuantity',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入' }]
  },
  {
    label: '供应商代码',
    prop: 'supplierCode',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入' }]
  },
  {
    label: '批次号',
    prop: 'batch',
    type: 'colType/Input',
    required: true,
    rules: [{ required: true, message: '请输入' }]
  }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '物料名称', prop: 'materialDesc' }
]
export const ptintFormList = [
  {
    type: 'Select',
    label: '打印地址',
    prop: 'printer',
    rules: [{ required: true, message: '请选择打印地址', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '打印份数',
    prop: 'copies',
    rules: [{ required: true, message: '请输入打印份数', trigger: 'blur' }]
  }
]
export const BtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Material.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Material.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const DetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: 'OutStockRequestHeader.PickOrder.LowerShelf',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

/* 销售出库申请单 */
export const SalesItems = [
  { type: 'Select', label: '状态', prop: 'status', options: [] },
  { type: 'Input', label: '单号', prop: 'shipmentID' },
  { type: 'Input', label: '销售部门', prop: 'shipmentDept' },
  { type: 'Input', label: '业务员', prop: 'salesman' },
  { type: 'Select', label: '发货类型', prop: 'shipmentType', options: [] }
]
export const SalesCrud = {}
export const SalesBtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Sale.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Sale.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const SalesDetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Sale.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

/* 采购退货订单 */
export const PurchaseItems = [
  { type: 'Input', label: '退货单号', prop: 'returnID' },
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '供应商', prop: 'supplierCode' },
  { type: 'Input', label: '采购订单', prop: 'po' }
]
export const PurchaseCrud = {
  // add: 'any',
  del: 'any'
}
export const PurchaseBtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Purchase.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Purchase.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const formList = [
  {
    type: 'Select',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]
export const PurchaseDetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.Purchase.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const PurchaseList = [
  {
    type: 'Select',
    label: '供应商',
    prop: 'supplierCode',
    options: [],
    rules: [{ required: true, message: '请输入供应商', trigger: 'blur' }]
  }
]
export const PurchaseTabelList = [
  { label: '物料编码', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { label: '数量', prop: 'quantity' },
  { label: '单位', prop: 'unitID' },
  { label: '批次号', prop: 'batch' },
  { label: 'PO号', prop: 'pO' }
]
export const PurchaseQueryItems = [
  { type: 'Input', label: '质检结果', prop: 'QcState' },
  { type: 'Input', label: 'PO号', prop: 'PO' },
  { type: 'Input', label: '批次号', prop: 'Batch' }
]

/* 其他出库申请单 */
export const OtherItems = [
  { type: 'Input', label: '单号', prop: 'pickID' },
  { type: 'Select', label: '单据类型', prop: 'state', options: [] },
  { type: 'Select', label: '单据状态', prop: 'status', options: [] }
]
export const EditFormList = [
  {
    type: 'Select',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]
export const OtherCrud = {
  add: 'any',
  del: 'any'
}
export const OtherBtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.otherOutbound.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.otherOutbound.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const OtherDetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.otherOutbound.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const OuterList = [
  {
    type: 'Input',
    label: '备注',
    prop: 'remarks'
    // rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'state',
    options: []
  }
]
export const OtherTabelList = [
  { label: '物料编码', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { label: '标签条码', prop: 'barcode' },
  { label: '数量', prop: 'quantity' },
  { label: '单位', prop: 'unitName' },
  { label: '批次号', prop: 'batch' }
]
export const OuterQueryItems = [
  {
    type: 'Input',
    label: '物料编码',
    prop: 'materialID'
  },
  {
    type: 'Input',
    label: '物料描述',
    prop: 'materialDesc'
  },
  {
    type: 'Input',
    label: '批次号',
    prop: 'batch'
  }
]

/* 取消入库申请单 */
export const CancelReceiptItems = [
  {
    type: 'Input',
    label: '单号',
    prop: ''
  },
  {
    type: 'Input',
    label: '源单号',
    prop: ''
  },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'state',
    options: []
  },
  {
    type: 'Select',
    label: '单据状态',
    prop: '',
    options: []
  },
  {
    type: 'Input',
    label: '创建人',
    prop: ''
  }
]
export const CancelReceiptCrud = {}
export const CancelReceiptBtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.CancelReceipt.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const CancelReceiptDetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundApplication.CancelReceipt.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
