/**
 * 采购入库
 */
export const QueryItems = [
  { type: 'Input', label: '入库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '过账状态', prop: 'orderStatus', options: [] },
  {
    type: 'DateRangePart',
    label: '过账时间',
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
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  { type: 'Input', label: '创建人', prop: 'operator' }
]
export const BtnItems = [
  {
    // 过账
    langLabel: 'button.Posting',
    clickFun: 'toPosting',
    disabled: '',
    permission: 'OrderManagement.InStock.Post',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 取消入库
    langLabel: 'button.cancelReceipt',
    clickFun: 'toCancelReceipt',
    disabled: 'multipe',
    permission: 'OrderManagement.InStock.CancelInStock',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const ButtonItems = [
  {
    // 取消入库
    langLabel: 'button.cancelReceipt',
    clickFun: 'toCancelReceipt',
    disabled: 'multipe',
    permission: 'OrderManagement.InStock.CancelInStock',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

/**
 * 生产完工入库
 */
export const ProdItems = [
  { type: 'Input', label: '入库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '过账状态', prop: 'orderStatus', options: [] },
  { type: 'Input', label: '退单号', prop: '' },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'CreateBeginDate',
    endProp: 'CreateEndDate',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  { type: 'Input', label: '创建人', prop: 'operator' }
]

/**
 * 退料入库
 */
export const MaterialItems = [
  { type: 'Input', label: '入库单号', prop: 'orderID' },
  // { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '过账状态', prop: 'orderStatus', options: [] },
  {
    type: 'DateRangePart',
    label: '过账时间',
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
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  { type: 'Input', label: '创建人', prop: 'operator' }
]

/**
 * 其他入库
 */
export const OtherItems = [
  { type: 'Input', label: '入库单号', prop: 'orderID' },
  { type: 'Select', label: '过账状态', prop: 'orderStatus', options: [] },
  {
    type: 'DateRangePart',
    label: '过账时间',
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
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
