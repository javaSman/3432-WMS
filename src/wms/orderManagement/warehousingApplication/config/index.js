export const QueryItems = [
  { type: 'Input', label: '采购订单', prop: 'pO' },
  { type: 'Input', label: '收货单号', prop: 'receiptID' },
  { type: 'Input', label: '供应商名称', prop: 'SupplierName' },
  { type: 'Input', label: '供应商编码', prop: 'SupplierCode' },
  { type: 'Input', label: '物料编码', prop: 'materialID' }
]
export const MoreQuery = [
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'createStartTime',
    endProp: 'createEndTime',
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
export const Crud = {}

// 非标按钮
export const BtnItems = [
  // {
  //   // 新增
  //   langLabel: 'button.add',
  //   clickFun: 'toAdd',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: 'el-icon-download'
  // },
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multiple',
    permission: 'OrderManagement.WarehousingApplication.Delete',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

export const ButtonItems = [
  // {
  //   // 修改
  //   langLabel: 'button.edit',
  //   clickFun: 'toUpdate',
  //   disabled: 'single',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: ''
  // },
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multiple',
    permission: 'OrderManagement.WarehousingApplication.Delete',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const List = [
  { type: 'Input', label: '物料编码', prop: 'materialID', disabled: true },
  { type: 'Input', label: '物料描述', prop: 'materialDesc', disabled: true },
  { type: 'Input', label: '单位', prop: 'unitName', disabled: true },
  { type: 'Number', label: '数量', prop: 'receivingNum', min: 0 }
]

/* 生产完申请单 */
export const ProdItems = [
  { type: 'Input', label: '申请单号', prop: 'inApplyforEBELN' },
  { type: 'Select', label: '单据类型', prop: 'inApplyforType', options: [] },
  { type: 'Select', label: '过账状态', prop: 'inApplyforHeadState', options: [] },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'createStartTime',
    endProp: 'createEndTime',
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
export const MoreListQuery = [{ type: 'Input', label: '创建人', prop: 'creationTime' }]

/* 退料申请单 */
export const MaterialItems = [
  { type: 'Input', label: '退料单号', prop: 'inApplyforEBELN' },
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '物料描述', prop: 'materialDesc' },
  { type: 'Input', label: '退料人', prop: 'controlPeopleName' },
  // { type: 'Select', label: '申请类型', prop: 'inApplyforType', options: [] },
  { type: 'Select', label: '状态', prop: 'status', options: [] }
]

/* 其他入库申请单 */
export const OtherItems = [
  { type: 'Input', label: '单号', prop: 'orderId' },
  { type: 'Select', label: '单据类型', prop: 'orderType', options: [] },
  { type: 'Select', label: '单据状态', prop: 'orderStatus', options: [] }
]
export const OtherBtn = [
  {
    // 新增
    langLabel: 'button.add',
    clickFun: 'toAdd',
    disabled: '',
    permission: 'OrderManagement.WarehousingApplication',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multipe',
    permission: 'OrderManagement.WarehousingApplication.Delete',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]

/* 其他入库新增 */
export const FormList = [
  {
    type: 'Select',
    label: '单据类型',
    prop: 'OrderType',
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  {
    type: 'Input',
    prop: 'deptcode',
    label: 'OA流程',
    isHide: true,
    options: []
    // rules: [{ required: false, message: '请填写部门编码', trigger: 'blur' }]
    // readonly: true
  },
  {
    type: 'Input',
    prop: 'deptname',
    label: '备注',
    isHide: true
    // readonly: true
    // rules: [{ required: false, message: '请填写部门名称', trigger: 'blur' }]
  }
]
export const TableList = [
  { label: '物料编号', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { type: 'txt', label: '仓库编码', prop: 'warehouseID', options: [] },
  { label: '单位', prop: 'unitName' },
  // {
  //   label: '数量',
  //   prop: 'quantity',
  //   width: '150px'
  // },
  {
    label: '实称数量',
    prop: 'Nnum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入实称数量' }]
  }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' }
  // { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
