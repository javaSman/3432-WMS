/* 仓库调拨 */
export const WarehouseItems = [
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '物料名称', prop: 'materialDesc' },
  { type: 'Input', label: '转出仓库编码', prop: 'outWarehouseCode' },
  { type: 'Input', label: '转出仓库名称', prop: 'outWarehouseName' },
  { type: 'Input', label: '转入名称', prop: 'inWarehouseName' },
  { type: 'DateTime', label: '单据日期', prop: 'creationTime' }
]
export const WarehouseCrud = {
  add: 'any',
  edit: 'any'
}
export const WarehouseBtnItems = [
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'todeleteSing',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  },
  {
    // 打印
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const WarehouseDetailBtn = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOffShelf',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
export const WarehouseList = [
  {
    type: 'SelectNew',
    label: '转出仓库',
    prop: 'outWarehouseCode',
    options: [],
    rules: [{ required: true, message: '请选择转出仓库', trigger: 'blur' }]
  },
  {
    type: 'SelectNew',
    label: '转入仓库',
    prop: 'inWarehouseCode',
    options: [],
    rules: [{ required: true, message: '请选择转入仓库', trigger: 'blur' }]
  }
]
export const WarehouseTabelList = [
  { label: '物料编号', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  {
    label: '数量',
    prop: 'quantity',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入数量' }]
  },
  {
    label: '供应商代码',
    prop: 'supplierCode'
  },
  { label: '供应商批次', prop: 'supplierBatch' }
]
export const WarehosueQueryItems = [
  { type: 'Input', label: '批次号', prop: 'batch' },
  { type: 'Input', label: '供应商名称', prop: 'supplierName' },
  { type: 'Input', label: '供应商代码', prop: 'supplierCode' },
  { type: 'Input', label: '物料编码', prop: 'materialID' },
  { type: 'Input', label: '物料描述', prop: 'materialDesc' }
]
export const formList = [
  {
    type: 'Select',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]
