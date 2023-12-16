// import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '区域编号', prop: 'regionID' },
  { type: 'Input', label: '区域名称', prop: 'regionName' }
]
export const formList = [
  {
    type: 'Input',
    label: '区域编码',
    prop: 'regionID',
    rules: [{ required: true, message: '请输入区域编码', trigger: 'blur' }],
    unique: true
  },
  {
    type: 'Input',
    label: '区域名称',
    prop: 'regionName',
    rules: [{ required: true, message: '请输入区域名称', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseName',
    label: '仓库名称',
    unique: true,
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
  { type: 'Input', label: '仓库编码', prop: 'wareHouseID', disabled: true },
  { type: 'Input', label: '操作人', prop: 'operatePeople' },
  { type: 'Select', label: '区域类型', prop: 'regionType', options: [] }
]

export const RegionManagementCrud = {
  add: 'BaseData.RegionManagement.Create',
  edit: 'BaseData.RegionManagement.Update',
  del: 'BaseData.RegionManagement.Delete'
  // download: 'BaseData.RegionManagement.Wharf'
}
