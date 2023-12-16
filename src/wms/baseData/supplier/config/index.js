export const queryItems = [
  { type: 'Input', label: '供应商名称', prop: 'SupplierName' },
  { type: 'Input', label: '供应商代码', prop: 'SupplierCode' }
]
export const SupplierBtnItems = [
  // {
  //   // 打印
  //   langLabel: 'button.print',
  //   clickFun: 'toPrint',
  //   disabled: 'single',
  //   permission: 'BaseData.Supplier',
  //   styleType: 'primary',
  //   icon: 'el-icon-top'
  // }
]
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
    precision: 0,
    min: 0,
    rules: [{ required: true, message: '请输入打印份数', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '流水份数',
    prop: 'serialMore',
    precision: 0,
    min: 0,
    rules: [{ required: true, message: '请输入流水份数', trigger: 'blur' }]
  }
]
export const SupplierCrud = {
  // add: 'BaseData.Supplier.Create',
  // edit: 'BaseData.Supplier.Update',
  // del: 'BaseData.Supplier.Delete'
  // print: 'SupplierManage.Supplier'
}
export const formList = [
  {
    type: 'Input',
    label: '供应商代码',
    prop: 'supplierCode',
    rules: [{ required: true, message: '请输入供应商编号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '供应商名称',
    prop: 'supplierName',

    rules: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '采购组织',
    prop: 'poOrg',
    rules: [{ required: true, message: '请输入采购组织', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '状态',
    prop: 'supplierStatus',

    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  }
]
