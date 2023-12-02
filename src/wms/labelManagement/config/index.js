/* 生成标签 */
export const queryItems = [
  { type: 'BatchInput', label: '收账人账号', prop: 'controlPeopleName' },
  // { type: 'BatchInput', label: '收货人姓名', prop: 'controlPeopleName' },
  { type: 'BatchInput', label: '单号', prop: 'receiptID' },
  // { type: 'BatchInput', label: '供应商编号', prop: 'bianhao' },
  // { type: 'BatchInput', label: '供应商简称', prop: 'jiancheng' },
  { type: 'BatchInput', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '采购订单', prop: 'po' }
]
export const WarehouseCrud = {}
export const TableList = [
  { label: '仓库编码', prop: 'warehouseID', width: 150 },
  { label: '单号', prop: 'receiptID', width: 150 },
  // { label: '单据类型', prop: 'orderType', width: 150 },
  { label: '采购订单', prop: 'po', width: 150 },
  { label: '订单行号', prop: 'poItemNo', width: 150 },
  { label: '物料编码', prop: 'materialID', width: 150 },
  { label: '物料描述', prop: 'materialDesc', width: 250 },
  { label: '收货人', prop: 'controlPeopleName', width: 150 },
  { label: '收货日期', prop: 'receivingDate', width: 100 },
  { label: '入库批次', prop: 'batch', width: 150 },
  { label: '供应商批次', prop: 'supplierBatch', width: 170 },
  { label: '创建时间', prop: 'creationTime', width: 170 },
  { label: '是否免检', prop: 'chkfreeflag' },
  { label: '本次收货数量', prop: 'receivingNum' },
  { label: '已生成标签数量', prop: 'lableNum' },
  { label: '待生成标签数量', prop: 'remainder' },
  { label: '单位', prop: 'unitName' },
  {
    label: '物料标签数量',
    prop: 'labelMantelNum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入物料标签数量' }]
  },
  {
    label: '标签个数',
    prop: 'labelNum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入标签个数' }]
  },
  {
    label: '数量合计',
    prop: 'total',
    type: 'colType/Number',
    disabled: true,
    width: '150px',
    rules: [{ required: true, message: '请输入数量合计' }]
  },
  {
    label: '生产日期',
    prop: 'productTime',
    type: 'colType/Date',
    width: '150px',
    rules: [{ required: true, message: '请输入生产日期' }]
  },
  {
    label: '生产地',
    prop: 'productPlace',
    type: 'colType/Input',
    width: '150px',
    rules: [{ required: true, message: '请输入生产地' }]
  }
  // {
  //   label: '供应商批次',
  //   prop: 'supplierBatch',
  //   type: 'colType/Input',
  //   width: '150px',
  //   rules: [{ required: true, message: '请输入供应商批次号' }]
  // }
]
export const tableBtn = {
  width: '120',
  // permission: 'Systems.AppVersion.Export',
  btnItem: [
    {
      btnLabel: '生成标签',
      btnType: 'primary',
      clickFun: 'toGenerateLabel',
      isHide: [],
      btnLoding: [],
      permission: ''
    }
  ]
}
export const BtnItems = [
  /* 打印 */
  {
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  /* 删除 */
  {
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

/* 标签列表 */
export const TagListQueryItems = [
  { type: 'BatchInput', label: '标签条码', prop: 'barcode' },
  { type: 'BatchInput', label: '物料编码', prop: 'materialID' },
  { type: 'BatchInput', label: '物料描述', prop: 'materialDesc' },
  { type: 'BatchInput', label: '标签状态', prop: 'materialStatus' },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'BeginApplyDate',
    endProp: 'EndApplyDate',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
export const MoreQuery = [
  { type: 'Input', label: '单号', prop: 'PO' },
  { type: 'Select', label: '单据类型', prop: 'State', options: [] },
  { type: 'Select', label: '供应商', prop: 'SupplierCode', options: [] },
  { type: 'Input', label: '批次号', prop: 'Batch' },
  { type: 'Input', label: '操作人', prop: 'CreatorId' },
  { type: 'Input', label: '原物料码', prop: 'OriginBarcode' }
]
export const TagListCrud = {}
export const TagLsitBtn = [
  /* 打印 */
  {
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  /* 导出 */
  {
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  /* 冻结 */
  {
    langLabel: 'button.frozen',
    clickFun: 'toFrozen',
    disabled: '',
    permission: '',
    styleType: 'danger',
    icon: ''
  },
  /* 解冻 */
  {
    langLabel: 'button.thaw',
    clickFun: 'toThaw',
    disabled: '',
    permission: '',
    styleType: 'danger',
    icon: ''
  },
  /* 修改 */
  {
    langLabel: 'button.edit',
    clickFun: 'toEdit',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: ''
  }
]
export const DeleteFormList = [
  {
    type: 'Select',
    prop: 'BarcodeFlag',
    label: '条码标识',
    options: [],
    rules: [{ required: true, message: '请选择条码标识', trigger: 'blur' }]
  }
]
export const formList = [
  { type: 'Input', label: '冻结原因', prop: 'freezeReason', isHide: false },
  { type: 'Input', label: '解冻原因', prop: 'thaw', isHide: false }
]

/* 固废标签 */
export const SolidQueryItems = [
  { type: 'BatchInput', label: '收账人账号', prop: 'controlPeopleName' },
  // { type: 'BatchInput', label: '收货人姓名', prop: 'controlPeopleName' },
  { type: 'BatchInput', label: '单号', prop: 'receiptID' },
  // { type: 'BatchInput', label: '供应商编号', prop: 'bianhao' },
  // { type: 'BatchInput', label: '供应商简称', prop: 'jiancheng' },
  { type: 'BatchInput', label: '物料编码', prop: 'materialID' }
]
export const SolidTableList = [
  { label: '仓库编码', prop: 'warehouseID', width: 150 },
  { label: '单号', prop: 'orderID', width: 150 },
  // { label: '单据类型', prop: 'orderType', width: 150 },
  // { label: '订单行号', prop: 'itemNo', width: 150 },
  { label: '物料编码', prop: 'materialID', width: 150 },
  // { label: '采购订单', prop: 'po', width: 150 },
  // { label: '收货人', prop: 'controlPeopleName', width: 150 },
  // { label: '收货日期', prop: 'receivingDate', width: 150 },
  // { label: '入库批次', prop: 'batch', width: 150 },
  // { label: '供应商批次', prop: 'supplierBatch', width: 250 },
  // { label: '是否免检', prop: 'chkfreeflag' },
  // { label: '本次收货数量', prop: 'receivingNum' },
  { label: '已生成标签数量', prop: 'lableNum' },
  { label: '待生成标签数量', prop: 'remainder' },
  { label: '单位', prop: 'unitID' },
  {
    label: '实称数量',
    prop: 'nnum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    disabled: false,
    rules: [{ required: true, message: '请输入实称数量' }]
  },
  {
    label: '物料标签数量',
    prop: 'labelMantelNum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入物料标签数量' }]
  },
  {
    label: '标签个数',
    prop: 'labelNum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入标签个数' }]
  },
  {
    label: '数量合计',
    prop: 'total',
    type: 'colType/Number',
    disabled: true,
    width: '150px',
    rules: [{ required: true, message: '请输入数量合计' }]
  }
  // {
  //   label: '生产日期',
  //   prop: 'productTime',
  //   type: 'colType/Date',
  //   width: '150px',
  //   rules: [{ required: true, message: '请输入生产日期' }]
  // },
  // {
  //   label: '生产地',
  //   prop: 'productPlace',
  //   type: 'colType/Input',
  //   width: '150px',
  //   rules: [{ required: true, message: '请输入生产地' }]
  // }
  // {
  //   label: '供应商批次',
  //   prop: 'supplierBatch',
  //   type: 'colType/Input',
  //   width: '150px',
  //   rules: [{ required: true, message: '请输入供应商批次号' }]
  // }
]
export const SolidTableBtn = {
  width: '120',
  // permission: 'Systems.AppVersion.Export',
  btnItem: [
    {
      btnLabel: '生成标签',
      btnType: 'primary',
      clickFun: 'toGenerateLabel',
      isHide: [],
      btnLoding: [],
      permission: ''
    }
  ]
}
export const Crud = {}
