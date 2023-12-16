import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '码头编码', prop: 'wharfID' },
  { type: 'Input', label: '码头名称', prop: 'wharfName' },
  { type: 'Input', label: '码头类型', prop: 'wharfType' },
  { type: 'Input', label: '载具编码', prop: 'boxID' },
  { type: 'Input', label: '仓库编码', prop: 'warehouseID' },
  { type: 'Input', label: '巷道', prop: 'alley' },
  { type: 'Select', label: '状态', prop: 'state', options: [] }
]
export const formList = [
  {
    type: 'Input',
    label: '码头编号',
    prop: 'wharfID',
    disabled: false,
    unique: true,

    rules: [
      { required: true, message: '请输入码头编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Wharf', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '码头名称',
    prop: 'wharfName',
    rules: [{ required: true, message: '请输入码头名称', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库编号',
    options: [],
    count: 10,
    remote: true,
    optLabel: 'warehouseID',
    optValue: 'warehouseID',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseID' },
      { label: '名称', prop: 'warehouseName' },
      { label: '描述', prop: 'warehouseDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    label: '载具编号',
    prop: 'boxID',
    options: [],
    count: 10,
    optTotal: '',
    remote: true,
    optLabel: 'boxID',
    optValue: 'boxID',
    col: [
      { label: '载具编号', prop: 'boxID', width: '150px' },
      { label: '类型', prop: 'boxType' },
      { label: '状态', prop: 'state' }
    ]
  },

  {
    type: 'Select',
    label: '码头类型',
    prop: 'wharfType',
    options: [],
    rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '状态',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '巷道',
    prop: 'alley',
    min: 0,
    rules: [{ required: true, message: '请输入巷道', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '下一站点',
    prop: 'nextStation'
  },
  {
    type: 'Input',
    label: '关联堆垛机',
    prop: 'linkStackerCode'
  },
  {
    type: 'Input',
    label: '码头库位号',
    prop: 'wharfLocationId'
  }
]

export const WharfCrud = {
  add: 'BaseData.Wharf.Create',
  edit: 'BaseData.Wharf.Update',
  del: 'BaseData.Wharf.Delete',
  download: 'BaseData.Wharf.Export'
}
