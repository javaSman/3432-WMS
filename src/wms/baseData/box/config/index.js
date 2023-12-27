import { validateKey } from '@/utils/validate.js'

export const boxQueryItems = [
  { type: 'BatchInput', label: '载具编码', prop: 'boxID' },
  // { type: 'Input', label: '来源单号', prop: 'SourceID' },
  { type: 'Selects', label: '载具类型', prop: 'boxType', options: [] },
  { type: 'Selects', label: '装载状态', prop: 'boxState', options: [] }
  // { type: 'Select', label: '箱子位置状态', prop: 'positionStatus', options: [] }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编码', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
export const boxFormList = [
  {
    type: 'Input',
    label: '载具编码',
    prop: 'boxID',
    unique: true,
    placeholder: '请输入9位-10位载具编码',
    rules: [
      { required: true, message: '请输入载具编码', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Box', validator: validateKey }
    ]
  },
  {
    type: 'Select',
    label: '载具类型',
    prop: 'boxType',
    options: [],
    rules: [{ required: true, message: '请选择载具类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '装载状态',
    prop: 'boxState',
    unique: true,
    options: [],
    rules: [{ required: true, message: '请选择装载状态', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '使用期限(天)',
    prop: 'dueTime',
    min: 0
  }
]

export const boxTableList = [
  { label: '物料编码', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  {
    label: '数量',
    prop: 'quantity'
    // type: 'colType/Number',
    // width: '150px',
    // required: true,
    // rules: [{ required: true, message: '请输入数量' }]
  },
  {
    label: '标签条码',
    prop: 'barcode'
    // type: 'colType/Input',
    // required: true,
    // rules: [{ required: true, message: '请输入标签条码' }]
  },
  {
    label: '批次号',
    // type: 'colType/Input',
    prop: 'batch'
    // rules: [
    //   {
    //     pattern: /^[0-9]*$/,
    //     message: '请正确输入批次。',
    //     trigger: 'blur'
    //   }
    // ]
  }
]

export const batchFormList = [
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]

export const AlleyFormList = [
  {
    type: 'Selects',
    prop: 'alleys',
    label: '巷道',
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 }
    ],
    rules: [{ required: true, message: '请选择巷道', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '数量',
    prop: 'count',
    min: 0,
    rules: [{ required: true, message: '请输入数量', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'statusID',
    label: '箱子状态',
    options: [],
    disabled: true,
    rules: [{ required: true, message: '请选择箱子状态', trigger: 'blur' }]
  }
]

export const boxCrud = {
  add: 'BaseData.Box.Create',
  edit: 'BaseData.Box.Update',
  // del: 'BaseData.Box.Delete',
  import: 'BaseData.Box.Import'
  // download: 'BaseData.Box'
  // reprint: 'BaseData.Box'
}
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

// box非标按钮
export const boxBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: 'BaseData.Box.Print',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: 'BaseData.Box.Export',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
