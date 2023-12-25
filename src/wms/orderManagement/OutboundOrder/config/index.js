/* 领料出库 */
export const MaterialItems = [
  { type: 'Input', label: '出库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus ', options: [] },
  { type: 'Input', label: '源单号', prop: 'sourceOrder ' },
  {
    type: 'DateRangePart',
    label: '过账日期',
    // prop: 'registrationEndTime',
    startProp: 'postBeginDate ',
    endProp: 'postEndDate ',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }]
    // span: 12
  }
]
/* 销售出库 */
export const SalesItems = [
  { type: 'Input', label: '出库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus', options: [] },
  { type: 'Input', label: '源单号', prop: 'sourceOrder' },
  {
    type: 'DateRangePart',
    label: '过账日期',
    // prop: 'registrationEndTime',
    startProp: 'postBeginDate ',
    endProp: 'postEndDate ',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }]
    // span: 12
  }
]
/* 退货出库 */
export const PurchItems = [
  { type: 'Input', label: '出库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus', options: [] },
  { type: 'Input', label: '源单号', prop: 'sourceOrder' },
  {
    type: 'DateRangePart',
    label: '过账日期',
    // prop: 'registrationEndTime',
    startProp: 'PostBeginDate',
    endProp: 'PostEndDate',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    span: 24
    // layout: { span: 24, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
/* 其他出库 */
export const OtherItems = [
  { type: 'Input', label: '出库单号', prop: 'orderID' },
  { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus', options: [] },
  { type: 'Input', label: '源单号', prop: 'sourceOrder' },
  {
    type: 'DateRangePart',
    label: '过账日期',
    // prop: 'registrationEndTime',
    startProp: 'postBeginDate ',
    endProp: 'postEndDate ',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }]
    // span: 12
  }
]
/* 取消入库 */
export const CancelItems = [
  { type: 'Input', label: '出库单号', prop: 'orderID' },
  { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus', options: [] },
  { type: 'Input', label: '源单号', prop: 'sourceOrder' },
  {
    type: 'DateRangePart',
    label: '过账日期',
    // prop: 'registrationEndTime',
    startProp: 'postBeginDate ',
    endProp: 'postEndDate ',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }]
    // span: 12
  }
]
/* 领料出库按钮 */
export const SalesBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundOrder.Sale.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
/* 销售出库按钮 */
export const Crud = {}
export const BtnItems = [
  // {
  //   // 过账
  //   langLabel: 'button.Posting',
  //   clickFun: 'totransfer',
  //   disabled: 'multipe',
  //   permission: 'OrderManagement.OutboundOrder.material.Transfer',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundOrder.material.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 签收确认
    langLabel: 'button.signfor',
    clickFun: 'tosignfor',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundOrder.material.Signfor',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
/* 退料出库按钮 */
export const PurchBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundOrder.purchase.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const PurchCrud = {}
/* 其他出库按钮 */
export const OtherBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'OrderManagement.OutboundOrder.otherOutbound.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const OtherCrud = {}
