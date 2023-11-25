export const queryItems = [
  { type: 'Input', label: '点位编码', prop: 'locationID' },
  { type: 'Select', label: '区域编码', prop: 'areaID', options: [] }, //
  { type: 'Input', label: '区域描述', prop: 'areaDesc' },
  { type: 'Select', label: '载具类型', prop: 'boxType', options: [] },
  { type: 'Input', label: '运载架子', prop: 'agvBoxID' },
  { type: 'Input', label: '载具编号', prop: 'boxID' }, //
  { type: 'Select', label: '状态', prop: 'state', options: [] } //
]
export const formList = [
  {
    type: 'Input',
    label: '点位标签',
    prop: 'locationID',
    rules: [{ required: true, message: '请输入点位标签', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '区域编码',
    prop: 'areaID',
    options: [],
    rules: [{ required: true, message: '请输入区域编码', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '区域描述',
    prop: 'areaDesc'
  },
  {
    type: 'Select',
    label: '载具类型',
    prop: 'boxType',
    options: [],
    rules: [{ required: true, message: '请选择载具类型', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '运载架子',
    prop: 'agvBoxID'
  },
  {
    type: 'Input',
    label: '载具编号',
    prop: 'boxID'
  },
  {
    type: 'Select',
    label: '状态编号',
    prop: 'state',
    options: []
  }
]
// export const formList = [
//   {
//     type: 'Input',
//     label: '码头编号',
//     prop: 'wharfID',
//     disabled: false,
//     unique: true,

//     rules: [
//       { required: true, message: '请输入码头编号', trigger: 'blur' },
//       { addOnly: true, trigger: 'blur', tableName: 'WH_Wharf', validator: validateKey }
//     ]
//   },
//   {
//     type: 'Input',
//     label: '码头名称',
//     prop: 'wharfName',
//     rules: [{ required: true, message: '请输入码头名称', trigger: 'blur' }]
//   },
//   {
//     type: 'Combogrid',
//     prop: 'warehouseID',
//     label: '仓库编号',
//     options: [],
//     optLabel: 'warehouseID',
//     optValue: 'warehouseID',
//     optTotal: '',
//     tableWidth: 100,
//     col: [
//       { label: '仓库编号', prop: 'warehouseID' },
//       { label: '名称', prop: 'warehouseName' },
//       { label: '描述', prop: 'warehouseDesc' }
//     ],
//     rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
//   },
//   {
//     type: 'Combogrid',
//     label: '载具编号',
//     prop: 'boxID',
//     options: [],
//     count: 10,
//     optTotal: '',
//     remote: true,
//     optLabel: 'boxID',
//     optValue: 'boxID',
//     col: [
//       { label: '载具编号', prop: 'boxID', width: '150px' },
//       { label: '类型', prop: 'boxType' },
//       { label: '状态', prop: 'state' }
//     ]
//   },

//   {
//     type: 'Select',
//     label: '码头类型',
//     prop: 'wharfType',
//     options: [],
//     rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
//   },
//   {
//     type: 'Select',
//     label: '状态',
//     prop: 'state',
//     options: [],
//     rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
//   },
//   {
//     type: 'Number',
//     label: '巷道',
//     prop: 'alley',
//     min: 0,
//     rules: [{ required: true, message: '请输入巷道', trigger: 'blur' }]
//   },
//   {
//     type: 'Input',
//     label: '下一站点',
//     prop: 'nextStation'
//   }
// ]

export const AGVlocationsCrud = {
  add: 'WarehouseManagement.AGVLocations.Update',
  edit: 'WarehouseManagement.AGVLocations.Update',
  del: 'WarehouseManagement.AGVLocations.Delete',
  download: 'WarehouseManagement.AGVLocations'
}
