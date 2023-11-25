export const queryItems = [
  { type: 'Input', label: '质检单号', prop: 'orderID' },
  { type: 'Selects', label: '类型', prop: 'orderStatus', options: [] }
  // { type: 'Selects', label: '单据状态', prop: 'statusID', options: [] }
]

export const inventoryFormList = [
  {
    type: 'Select',
    label: '仓库编号',
    prop: 'warehouseID',
    options: [],
    rules: [{ required: true, message: '请选择仓库编号', trigger: 'blur' }]
  }
]
// 盘点单头部数据
export const inventoryHeadList = [
  { type: 'Input', label: '单据编号', prop: 'stocktakingID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'stocktakingType',
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '单据备注', prop: 'note' }
]

export const columnDetail = [
  { prop: 'boxDetailsID', label: '库存编号' },
  { prop: 'orderID', label: '盘点单号' },
  { prop: 'itemNo', label: '明细编号' },
  { prop: 'materialID', label: '物料编号' },
  { prop: 'boxID', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'statusID', label: '单据状态', type: 'loadingStatus' },
  { prop: 'materialStatus', label: '物料状态' }
]

export const stockQueryItems = [
  { type: 'Input', label: '载具编号', prop: 'BoxID' },
  { type: 'Input', label: '货位编码', prop: 'LocationID' },
  { type: 'Input', label: '批次号', prop: 'BatchID' },
  { type: 'Input', label: '供应商代码', prop: 'supplierCode' },
  { type: 'Input', label: '物料编号', prop: 'materialID' },
  { type: 'Input', label: '物料描述', prop: 'materialDesc' },
  { type: 'Input', label: '标签条码', prop: 'barcode' }
]

export const inventoryTableList = [
  { prop: 'boxID', label: '所属载具' },
  { prop: 'materialID', label: '物料编号' },
  { prop: 'materialDesc', label: '物料描述' },
  { prop: 'barcode', label: '物料条码' },
  { prop: 'batch', label: '批次号' },
  { prop: 'locationID', label: '货位编码' },
  { prop: 'supplierCode', label: '供应商代码' },
  { prop: 'quantity', label: '数量' }
  // { prop: 'boxDetailsID', label: '库存编号' }
]
// 盘点单列表
export const inventoryColumnList = [
  { prop: 'materialID', label: '物料编号' },
  { prop: 'barcode', label: '物料条码' },
  { prop: 'boxID', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'realQty', label: '盘点数量', type: 'colType/Number' },
  { prop: 'materialStatus', label: '物料状态' },
  // { prop: 'statusID', label: '明细状态' },
  { prop: 'boxDetailsID', label: '库存编号' }
]

export const InventoryOrderCrud = {
  add: 'any'
  //   del: 'any'
}

// 在库质检，非标按钮
export const inventoryBtnItems = [
  // {
  //   // 盘点
  //   langLabel: 'button.inventory',
  //   clickFun: 'toInventory',
  //   disabled: 'single',
  //   // permission: 'StocktakingManage.Stocktaking.FinishOrder',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toUndercarriage',
    disabled: 'single',
    // permission: 'StocktakingManage.Stocktaking.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  // {
  //   //过账
  //   langLabel: 'button.Posting',
  //   clickFun: 'toPosting',
  //   disabled: 'single',
  //   // permission: 'StocktakingManage.Stocktaking.OutShelves',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   // 单据打印
  //   langLabel: 'button.PostingPrint',
  //   clickFun: 'toPostingPrint',
  //   disabled: 'single',
  //   // permission: 'StocktakingManage.Stocktaking.OutShelves',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   // 生成差异报表
  //   langLabel: 'button.CreatevarianceReport',
  //   clickFun: 'toCreatevarianceReport',
  //   disabled: 'multipe',
  //   // permission: 'StocktakingManage.Stocktaking.OutShelves',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // }
  // {
  //   // OA审批
  //   langLabel: 'button.OAprint',
  //   clickFun: 'toOAprint',
  //   disabled: 'single',
  //   // permission: 'StocktakingManage.Stocktaking.OutShelves',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    // 过账
    langLabel: 'button.Posting',
    clickFun: 'toPosting',
    disabled: 'single',
    permission: 'OrderManagement.ScrapOrder.Post',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 单据打印
    langLabel: 'button.PostingPrint',
    clickFun: 'toPrintReceipt',
    disabled: 'single',
    // permission: 'InStock',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
export const outShelvesForm = [
  {
    type: 'Select',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]

// 差异搜索参数
export const varianceReportItems = [
  { type: 'Input', label: '差异报表编号', prop: 'SKReportID' }
  // // { type: 'Input', label: '需求库存组织', prop: 'NeedInventoryOrg' },
  // { type: 'DateTime', label: '申请日期开始', prop: 'BeginApplyDate' },
  // { type: 'DateTime', label: '申请日期结束', prop: 'EndApplyDate' },
  // { type: 'Input', label: '申请部门', prop: 'ApplyDept' }
]
// 差异按钮非标
export const varianceBtnItems = [
  {
    // 过账
    langLabel: 'button.Posting',
    clickFun: 'toPosting',
    disabled: 'single',
    // permission: 'StocktakingManage.Stocktaking.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 审核
    langLabel: 'button.Examine',
    clickFun: 'toExamine',
    disabled: 'single',
    // permission: 'StocktakingManage.Stocktaking.OutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
// export const TableBtn = {
//   width: '200',
//   btnItem: [
//     { btnLabel: '上传附件', clickFun: 'toUpload', isHide: [] },
//     { btnLabel: '下载附件', clickFun: 'toDownload', isHide: [] }
//   ]
// }
