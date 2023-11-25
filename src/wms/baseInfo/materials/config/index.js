export const queryItems = [
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '物料描述', prop: 'materialDesc' }
  // { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
export const formList = [
  {
    type: 'Input',
    prop: 'materialID',
    label: '物料编码',
    // unique: true,
    rules: [{ required: true, message: '请输入物料编号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    prop: 'materialDesc',
    label: '物料描述',
    rules: [{ required: true, message: '请输入物料名称', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'baseUnit',
    label: '基本单位',
    options: [],
    rules: [{ required: true, message: '请选择基本单位', trigger: 'blur' }]
  },
  // {
  //   type: 'Select',
  //   prop: 'materialStatus',
  //   label: '物料状态',
  //   options: [],
  //   rules: [{ required: true, message: '请选择物料状态', trigger: 'blur' }]
  // },
  // {
  //   type: 'Input',
  //   prop: 'specs',
  //   label: '规格',
  //   rules: [{ required: true, message: '请输入规格', trigger: 'blur' }]
  // },
  // {
  //   type: 'Select',
  //   prop: 'weightUnit',
  //   label: '重量单位',
  //   options: [],
  //   rules: [{ required: true, message: '请选择重量单位', trigger: 'blur' }]
  // },
  // {
  //   type: 'Number',
  //   prop: 'grossWeight',
  //   label: '毛重',
  //   min: 0,
  //   precision: 2,
  //   step: 0.01,
  //   rules: [{ required: true, message: '请输入毛重', trigger: 'blur' }]
  // },
  // {
  //   type: 'Number',
  //   prop: 'netWeight',
  //   label: '净重',
  //   min: 0,
  //   precision: 2,
  //   step: 0.01,
  //   rules: [{ required: true, message: '请输入净重', trigger: 'blur' }]
  // },
  // {
  //   type: 'Select',
  //   prop: 'volumeUnit',
  //   label: '体积单位',
  //   options: [],
  //   rules: [{ required: true, message: '请选择体积单位', trigger: 'blur' }]
  // },
  {
    type: 'Input',
    prop: 'materialGroup',
    label: '物料组'
    // rules: [{ required: true, message: '请输入物料组', trigger: 'blur' }]
  }
  // {
  //   type: 'Input',
  //   prop: 'safetyQuantity',
  //   label: '库存预警数量',
  //   rules: [{ required: true, message: '请输入库存预警数量', trigger: 'blur' }]
  // },
  // {
  //   type: 'Input',
  //   prop: 'systemType',
  //   label: '系统类型',
  //   rules: [{ required: true, message: '请输入系统类型', trigger: 'blur' }]
  // },
  // {
  //   type: 'Input',
  //   prop: 'productGroup',
  //   label: '产品组'
  //   // rules: [{ required: true, message: '请输入产品组', trigger: 'blur' }]
  // },
  // {
  //   type: 'Input',
  //   prop: 'maxInventory',
  //   label: '最大库存',
  //   rules: [{ required: true, message: '请输入最大库存', trigger: 'blur' }]
  // },
  // {
  //   type: 'Input',
  //   prop: 'packingQuantity',
  //   label: '最小包装量',
  //   rules: [{ required: true, message: '请输入库存预警数量', trigger: 'blur' }]
  // }
]

export const MaterialCrud = {
  // add: 'Basics.Materials.Create',
  // edit: 'Basics.Materials.Update'
  // del: 'Basics.Materials.Delete'
  // download: 'Basics.Materials',
  // import: 'Basics.Materials.Create'
}
export const BtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: 'Basics.Materials',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
  // {
  //   // 同步物料信息
  //   langLabel: 'button.SynchronizeMaterial',
  //   clickFun: 'toSynchronizeMaterial',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // }
]
