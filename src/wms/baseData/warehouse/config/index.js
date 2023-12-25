import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '仓库编号', prop: 'warehouseID' },
  { type: 'Input', label: '仓库名称', prop: 'warehouseName' }
]

export const formList = [
  {
    type: 'Input',
    label: '仓库编号',
    prop: 'warehouseID',
    unique: true,
    rules: [
      { required: true, message: '请输入仓库编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Warehouse', validator: validateKey }
    ]
  },
  { type: 'Input', label: '仓库名称', prop: 'warehouseName' },
  { type: 'Input', label: '仓库描述', prop: 'warehouseDesc' },
  // {
  //   type: 'Input',
  //   label: '虚拟库位',
  //   prop: 'virtualLocationID'
  // },
  {
    type: 'Select',
    label: '仓库类型',
    prop: 'warehouseType',
    options: []
  },
  { type: 'Input', label: '物料组前四位', prop: 'materialsGroup' }
]

export const WarehouseCrud = {
  add: 'BaseData.Warehouse.Create',
  edit: 'BaseData.Warehouse.Update',
  del: 'BaseData.Warehouse.Delete'
}
export const BtnItems = [
  // {
  //   // ERP对应仓
  //   langLabel: 'button.ERPwarehouseCorrespond',
  //   clickFun: 'toERPwarehouseCorrespond',
  //   permission: 'BaseData.Warehouse.Obverse',
  //   disabled: 'single'
  // },
  // {
  //   // 启用
  //   langLabel: 'button.Enable',
  //   clickFun: 'toEnable',
  //   permission: 'BaseData.Warehouse.Enable',
  //   disabled: 'single'
  // },
  // {
  //   // 禁用
  //   langLabel: 'button.Disable',
  //   clickFun: 'toDisable',
  //   permission: 'BaseData.Warehouse.Disable',
  //   disabled: 'single'
  // }
]
export const correspondForm = [
  {
    type: 'Select',
    label: 'ERP仓库编号',
    prop: 'fictitious',
    options: [],
    rules: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }]
  }
]
