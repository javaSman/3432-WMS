import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '货位编号', prop: 'locationID' },
  { type: 'Selects', label: '货位状态', prop: 'state', options: [] },
  { type: 'Selects', label: '仓库名称', prop: 'warehouseID', options: [] },
  { type: 'Input', label: '载具集', prop: 'boxIDs' },
  { type: 'Selects', label: '货位类型', prop: 'localType', options: [] }
  // { type: 'Input', label: '载具集', prop: 'boxIDs' }
]

export const formList = [
  {
    type: 'Input',
    label: '货位编号',
    prop: 'locationID',
    unique: true,
    rules: [
      { required: true, message: '请输入货位编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Locations', validator: validateKey }
    ]
  },
  {
    type: 'Select',
    label: '货位状态',
    prop: 'state',
    // disabled: true,
    options: [],
    rules: [{ required: true, message: '请选择状态编号', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库编码',
    unique: true,
    options: [],
    count: 10,
    remote: true,
    optLabel: 'warehouseID',
    optValue: 'warehouseID',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '仓库编码', prop: 'warehouseID' },
      { label: '名称', prop: 'warehouseName' },
      { label: '描述', prop: 'warehouseDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'regionId',
    label: '区域编码',
    unique: true,
    options: [],
    count: 10,
    remote: true,
    optLabel: 'regionID',
    optValue: 'regionID',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '区域编码', prop: 'regionID' },
      { label: '名称', prop: 'regionName' }
    ],
    rules: [{ required: true, message: '请选择区域编码', trigger: 'blur' }]
  },
  // {
  //   type: 'Combogrid',
  //   label: '载具编号',
  //   prop: 'boxID',
  //   options: [],
  //   count: 10,
  //   optTotal: '',
  //   remote: true,
  //   optLabel: 'boxID',
  //   optValue: 'boxID',
  //   col: [
  //     { label: '载具编号', prop: 'boxID', width: '150px' },
  //     { label: '类型', prop: 'boxType', width: '150px' },
  //     { label: '状态', prop: 'state' }
  //   ]
  // },
  {
    type: 'Input',
    label: '载具编号',
    prop: 'boxID'
    // , disabled: true
  },
  {
    type: 'Input',
    label: '巷',
    prop: 'alley',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '排',
    prop: 'row',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },

  {
    type: 'Input',
    label: '列',
    prop: 'col',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '层',
    prop: 'floor',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  // { type: 'Input', label: '载具集', prop: 'boxIDs' },
  { type: 'Select', label: '货位类型', prop: 'localType', options: [] }

  // { type: 'Input', label: '货位类型图片', prop: 'localTypeImg' }
]

export const batchFormList = [{ type: 'Select', prop: 'statusID', label: '状态编号', options: [] }]

export const LocationsCrud = {
  add: 'WarehouseManagement.Locations.Create',
  edit: 'WarehouseManagement.Locations.Update',
  del: 'WarehouseManagement.Locations.Delete',
  import: 'WarehouseManagement.Locations',
  download: 'WarehouseManagement.Locations'
}
// locations非标按钮
export const locationsBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'todownSet',
    disabled: 'multipe',
    permission: 'WarehouseManagement.Locations.LowerShelf',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
