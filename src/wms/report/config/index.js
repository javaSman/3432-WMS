// 库存报表查询
export const inventoryReportItems = [
  { type: 'BatchInput', label: '所属载具', prop: 'boxID' },
  { type: 'BatchInput', label: '物料编号', prop: 'materialID' },
  { type: 'BatchInput', label: '物料名称', prop: 'materialDesc' },
  // { type: 'Input', label: '数量', prop: 'quantity' },
  // { type: 'Input', label: '单位编号', prop: 'unitID' },
  { type: 'BatchInput', label: '标签条码', prop: 'barcode' },
  { type: 'BatchInput', label: '批次号', prop: 'batchID' }
  // { type: 'Input', label: '货位编码', prop: 'locationID' },
  // { type: 'Selects', label: '仓库名称', prop: 'warehouseID', options: [] },
  // { type: 'Selects', label: '条码状态', prop: 'State', options: [] },
  // { type: 'Input', label: '供应商代码', prop: 'supplierCode' },
  // { type: 'Selects', label: '冻结状态', prop: 'freeze', options: [] },
  // { type: 'Selects', label: '质检状态', prop: 'qcState', options: [] },
  // { type: 'Input', label: '临期天数', prop: 'adventDate' },
  // { type: 'Selects', label: '物理仓库名称', prop: 'actual', options: [] },
  // { type: 'Input', label: '等级', prop: 'grade' },
  // { type: 'Input', label: '档次', prop: 'cellgrade' }
]
// 库存报表更多查询
export const InventoryQuery = [
  { type: 'SelectNew', label: '仓库', prop: 'WarehouseID', options: [] },
  { type: 'Select', label: '冻结状态', prop: 'Freeze', options: [] },
  { type: 'Select', label: '条码状态', prop: 'State', options: [] },
  { type: 'Select', label: '质检状态', prop: 'QcState', options: [] }
]
// 非标按钮
// {
//   // 下架
//   langLabel: 'button.outShelves',
//   clickFun: 'toOutShelves',
//   disabled: 'single',
//   permission: 'OutStock.ReadyMaterials.Create',
//   styleType: 'danger',
//   icon: 'el-icon-finished'
// },
export const inventoryReportBtnItems = [
  // 批量下架
  {
    langLabel: 'button.batchShelves',
    clickFun: 'toBatchOutShelves',
    disabled: 'multipe',
    permission: 'Report.InventoryReport.BatchOutShelves',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  // 比亚迪下架
  // {
  //   langLabel: 'button.bydOffShelf',
  //   clickFun: 'toBydOffshelf',
  //   disabled: 'multipe',
  //   permission: 'Report.InventoryReport',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // 呼叫空盘
  // {
  //   langLabel: 'button.callControlPanel',
  //   clickFun: 'toCallControlPanel',
  //   disabled: 'multipe',
  //   permission: 'Report.InventoryReport.CallEmptyBox',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   langLabel: 'button.changeSHD',
  //   clickFun: 'tochangeSHD',
  //   disabled: 'multipe',
  //   permission: 'Report.InventoryReport.PickOrder',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    langLabel: 'button.changeRecheckorder',
    clickFun: 'tochangeRecheckorder',
    disabled: 'multipe',
    permission: 'Report.InventoryReport.CreateRecheck',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 期初导入
    langLabel: 'button.openingImport',
    clickFun: 'toopeningImport',
    disabled: '',
    permission: 'Report.InventoryReport.OpeningImport',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 生成退货单
    langLabel: 'button.generateReturnOrder',
    clickFun: 'toGenerateReturnOrder',
    disabled: 'multipe',
    permission: 'Report.InventoryReport.GenerateReturnOrder',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  // // 冻结
  // {
  //   langLabel: 'button.frozen',
  //   clickFun: 'toFrozen',
  //   disabled: 'multipe',
  //   permission: 'Report.InventoryReport.MaterialFreeze',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // // 解冻
  // {
  //   langLabel: 'button.thaw',
  //   clickFun: 'toThaw',
  //   disabled: 'multipe',
  //   permission: 'Report.InventoryReport.MaterialUnFreeze',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   langLabel: 'button.labelPrint',
  //   clickFun: 'toPrint',
  //   disabled: 'multipe',
  //   permission: 'Basics.MaterialsBarcode',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  {
    // 生成质检单
    langLabel: 'button.generateQuality',
    clickFun: 'toGenerateQuality',
    disabled: 'multipe',
    permission: 'Report.InventoryReport.GenerateQuality',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 销售订单变更
    langLabel: 'button.saleOrder',
    clickFun: 'toSaleOrder',
    disabled: 'single',
    permission: 'Report.InventoryReport.SaleOrder',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]

export const formList = [
  {
    type: 'Input',
    label: '单号',
    prop: 'Po',
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  }
]

export const costomerCrud = {
  // add: 'Basics.Customer.Create',
  // edit: 'Basics.Customer.Update',
  // del: 'Basics.Customer.Delete'
}
export const BtnItems = [
  // 标签打印
  {
    langLabel: 'button.labelPrint',
    clickFun: 'toPrint',
    disabled: 'multipe',
    permission: 'Basics.MaterialsBarcode',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
// 库存报表权限
export const inventoryReportCrud = {
  download: 'Report.InventoryReport.Export'
}
// 下架 -下料位置选中
export const outShelvesForm = [
  // {
  //   type: 'Combogrid',
  //   prop: 'wharfID',
  //   label: '下料位置',
  //   options: [],
  //   optLabel: 'wharfName',
  //   optValue: 'wharfID',
  //   optTotal: '',
  //   count: 50,
  //   remote: true,
  //   tableWidth: 100,
  //   isForamt: true,
  //   col: [
  //     // { label: '仓库编号', prop: 'warehouseID' },
  //     { label: '码头名称', prop: 'wharfName', width: '150' },
  //     { label: '码头类型', prop: '_wharfType' },
  //     { label: '状态', prop: '_state' }
  //   ],
  //   rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  // }
  {
    type: 'Input',
    prop: 'boxIDs',
    label: '托盘项数',
    readonly: true
  },
  {
    type: 'Input',
    prop: 'metrials',
    label: '物料种类项数',
    readonly: true
  },
  {
    type: 'Input',
    prop: 'batchs',
    label: '批次项数',
    readonly: true
  }
]
// BYD批量下架
export const BydOffShelfForm = [
  {
    type: 'Combogrid',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    optLabel: 'wharfName',
    optValue: 'wharfID',
    optTotal: '',
    count: 50,
    remote: true,
    tableWidth: 100,
    isForamt: true,
    col: [
      // { label: '仓库编号', prop: 'warehouseID' },
      { label: '码头名称', prop: 'wharfName', width: '150' },
      { label: '码头类型', prop: '_wharfType' },
      { label: '状态', prop: '_state' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  }
]
// 呼叫空盘
export const CallEmptyForm = [
  {
    type: 'Combogrid',
    prop: 'wharfID',
    label: '下料位置',
    options: [],
    optLabel: 'wharfName',
    optValue: 'wharfID',
    optTotal: '',
    count: 50,
    remote: true,
    tableWidth: 100,
    isForamt: true,
    col: [
      // { label: '仓库编号', prop: 'warehouseID' },
      { label: '码头名称', prop: 'wharfName', width: '150' },
      { label: '码头类型', prop: '_wharfType' },
      { label: '状态', prop: '_state' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  }
]
// AGV配送
export const AgvDeliverForm = [
  {
    type: 'Combogrid',
    prop: 'wharfID',
    label: 'AGV配送点位',
    options: [],
    optLabel: 'locationID',
    optValue: 'locationID',
    optTotal: '',
    count: 50,
    remote: true,
    tableWidth: 100,
    col: [
      // { label: '仓库编号', prop: 'warehouseID' },
      { label: '点位编码', prop: 'locationID', width: '150' },
      { label: '状态编号', prop: 'state' },
      { label: '描述', prop: 'areaDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  }
]
// AGV配送
export const AgvSitePostForm = [
  {
    type: 'Combogrid',
    prop: 'wharfID',
    label: 'AGV配送点位',
    options: [],
    optLabel: 'locationID',
    optValue: 'locationID',
    optTotal: '',
    count: 50,
    remote: true,
    tableWidth: 100,
    col: [
      // { label: '仓库编号', prop: 'warehouseID' },
      { label: '点位编码', prop: 'locationID', width: '150' },
      { label: '状态编号', prop: 'state' },
      { label: '描述', prop: 'areaDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  }
]

export const inventoryFormList = [
  { type: 'Input', label: '单据编号', prop: 'inventoryID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'inventoryType',
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '单据备注', prop: 'note' }
]
// 盘点单头部数据
export const inventoryHeadList = [
  { type: 'Input', label: '单据编号', prop: 'inventoryID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'inventoryType',
    options: [],
    disabled: true,
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '单据备注', prop: 'note', disabled: true }
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
  { type: 'Input', label: '箱号', prop: 'BoxID' },
  { type: 'Input', label: '货位编号', prop: 'LocationID' },
  { type: 'Input', label: '批次号', prop: 'BatchID' }
]

export const inventoryTableList = [
  { prop: 'materialID', label: '物料编号' },
  { prop: 'barcode', label: '标签条码' },
  { prop: 'boxID', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'materialStatus', label: '物料状态' },
  { prop: 'statusID', label: '明细状态' },
  { prop: 'boxDetailsID', label: '库存编号' }
]
// 盘点单列表
export const inventoryColumnList = [
  { prop: 'materialID', label: '物料编号' },
  { prop: 'barcode', label: '标签条码' },
  { prop: 'boxID', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'realQty', label: '盘点数量', type: 'Number' },
  { prop: 'materialStatus', label: '物料状态' },
  { prop: 'statusID', label: '明细状态' },
  { prop: 'boxDetailsID', label: '库存编号' }
]

// export const InventoryOrderCrud = {
//   add: 'StocktakingManage.Stocktaking.Create',
//   // edit: 'InventoryManagement.InventoryHeader.Update',
//   del: 'StocktakingManage.Stocktaking.Delete'
// }

// 收货报表查询
export const arrivalReportItems = [
  // { type: 'Input', label: '货位编码', prop: 'LocationID' }, { type: 'Selects', label: '条码状态', prop: 'State', options: [] },
  // { type: 'Selects', label: '仓库名称', prop: 'WarehouseID', options: [] },
  { type: 'Selects', label: '条码状态', prop: 'State', options: [] },
  // { type: 'Input', label: '物料描述', prop: 'BoxState' },
  { type: 'BatchInput', label: '载具编号', prop: 'BoxID' },
  { type: 'BatchInput', label: '物料编码', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Input', label: '标签条码', prop: 'Barcode' },
  { type: 'Selects', label: '质检状态', prop: 'QcState', options: [] }
]
/* 收货报表更多查询 */
export const ArrMoreQuery = [
  { type: 'BatchInput', label: '批次', prop: 'BatchID' },
  { type: 'Selects', label: '仓库名称', prop: 'WarehouseID', options: [] },
  { type: 'BatchInput', label: '采购订单号', prop: 'po' },
  { type: 'BatchInput', label: '送货单号', prop: 'deliverynoteID' },
  { type: 'Input', label: '账号/姓名', prop: 'CreatorId' },
  { type: 'Input', label: '临期天数', prop: 'AdventDate' },
  {
    type: 'DateRangePart',
    label: '到货日期',
    // prop: 'registrationEndTime',
    startProp: 'BeginDate',
    endProp: 'EndDate',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: 24, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
// 收货非标按钮
export const arrivalReportBtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    // permission: 'Report.ArrivalReport.Export',
    styleType: 'warning',
    icon: 'el-icon-download'
  },
  {
    // 生成质检单
    langLabel: 'button.generateQuality',
    clickFun: 'toGenerateQuality',
    disabled: 'multipe',
    // permission: 'Report.ArrivalReport.GenerateQuality',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]

// 库存汇总报表查询
export const inventorySummaryItems = [
  // { type: 'Input', label: '储位编码', prop: 'LocationID' },
  // { type: 'Selects', label: '汇总类型', prop: 'AllInventoryType', options: [] },
  // { type: 'Input', label: '物料描述', prop: 'BoxState' },
  // { type: 'Input', label: '载具编号', prop: 'BoxID' },
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  // { type: 'Input', label: '标签条码', prop: 'Barcode' },
  { type: 'Input', label: '批次', prop: 'BatchID' },
  { type: 'Input', label: '供应商代码', prop: 'SupplierCode' },
  { type: 'Input', label: '供应商名称', prop: 'SupplierName' },
  { type: 'Selects', label: '仓库名称', prop: 'WarehouseID', options: [] }
  // { type: 'Selects', label: '物理仓库名称', prop: 'Actual ', options: [] }
]
// 库存汇总报表非标按钮
export const inventorySummaryBtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: 'Report.InventorySummary.Export',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]

/** 冻结弹窗 */
export const formListFrozen = [
  {
    type: 'Select',
    prop: 'freezeReason',
    label: '冻结原因',
    rules: [{ required: true, message: '请选择冻结原因', trigger: 'blur' }],
    options: []
  }
]

/** 解冻 */
export const formListthaw = [
  {
    type: 'Select',
    prop: 'freezeReason',
    label: '解冻原因',
    rules: [{ required: true, message: '请选择解冻原因', trigger: 'blur' }],
    options: []
  }
]

// 安全库存预警报表查询
export const safetyStockAlertItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  // { type: 'Input', label: '规格', prop: 'Specs' },
  // { type: 'Input', label: '数量', prop: 'Quantity' },
  { type: 'Input', label: '安全数量', prop: 'SafetyQuantity' }
]

// 库龄报表查询
export const stockAgeItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' }
  // {
  //   type: 'DateRangePart',
  //   label: '时间',
  //   // prop: 'registrationEndTime',
  //   startProp: 'BeginDate',
  //   endProp: 'EndDate',
  //   dateType: 'datetime',
  //   valueFormat: 'yyyy-MM-dd ',
  //   labelFormat: 'yyyy-MM-dd HH:mm:ss',
  //   // startDefaultTime: '08:00:00',
  //   // endDefaultTime: '20:00:00',
  //   formStyle: 'width:180px',
  //   rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
  //   // span: 12
  //   layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  // }
]
// 库龄报表非标按钮
export const stockAgeBtnItems = [
  // {
  //   // 导出
  //   langLabel: 'button.export',
  //   clickFun: 'toDownload',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'warning',
  //   icon: 'el-icon-download'
  // }
]
export const boxTableList = [
  { label: '物料编号', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { type: 'txt', label: '仓库编码', prop: 'warehouseID', options: [] },
  { label: '单位', prop: 'unitName' },
  {
    label: '数量',
    prop: 'quantity',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入数量' }]
  },
  {
    label: '实称数量',
    prop: 'Nnum',
    type: 'colType/Number',
    width: '150px',
    required: true,
    rules: [{ required: true, message: '请输入实称数量' }]
  }
  // {
  //   label: '标签条码',
  //   prop: 'barcode',
  //   type: 'colType/Number',
  //   required: true,
  //   rules: [
  //     { required: true, message: '请输入标签条码' },
  //     {
  //       pattern: /^[0-9A-Z]+$/,
  //       message: '请正确输入类别名称，2~50个字符支持中英文、数字',
  //       trigger: 'blur'
  //     }
  //   ]
  // },
  // { label: '批次', type: 'colType/Number', prop: 'batch' }
]

export const boxTableListAll = [
  // { label: '载具编号', prop: 'boxID' },
  { label: '物料编号', prop: 'materialID' },
  { label: '物料描述', prop: 'materialDesc' },
  { label: '规格', prop: 'specs' },
  // { type: 'txt', label: '仓库编码', prop: 'warehouseID', options: [] },
  { label: '数量', prop: 'quantity' },
  { label: '物料条码', prop: 'barcode' },
  { label: '仓库编号', prop: 'warehouseID' },
  // { label: '仓库名称', prop: 'warehouseName' },
  { label: '批次', prop: 'batch' },
  { label: '单位编号', prop: 'unitID' },
  { label: '供应商', prop: 'supplierCode' },
  { label: '供应商名称', prop: 'supplierName' },
  { label: '条码状态', prop: 'state' },
  // { label: '冻结状态', prop: 'qcState' },
  // { label: '质检状态', prop: 'qcState' },
  { label: '生产时间', prop: 'productTime' },
  { label: '失效时间', prop: 'invalidTime' },
  // { label: '储位编码', prop: 'unitName' },

  { label: '有效期', prop: 'quality' },
  { label: '入库时间', prop: 'instockTime' }
  // { label: '库龄', prop: 'unitName' },
  // { label: '临期天数', prop: 'unitName' }

  // {
  //   label: '数量',
  //   prop: 'quantity',
  //   type: 'colType/Number',
  //   width: '150px',
  //   required: true,
  //   rules: [{ required: true, message: '请输入数量' }]
  // },
  // {
  //   label: '实称数量',
  //   prop: 'Nnum',
  //   type: 'colType/Number',
  //   width: '150px',
  //   required: true,
  //   rules: [{ required: true, message: '请输入实称数量' }]
  // }
  // {
  //   label: '标签条码',
  //   prop: 'barcode',
  //   type: 'colType/Number',
  //   required: true,
  //   rules: [
  //     { required: true, message: '请输入标签条码' },
  //     {
  //       pattern: /^[0-9A-Z]+$/,
  //       message: '请正确输入类别名称，2~50个字符支持中英文、数字',
  //       trigger: 'blur'
  //     }
  //   ]
  // },
  // { label: '批次', type: 'colType/Number', prop: 'batch' }
]
// 物料履历查询
export const materialHistoryItems = [
  { type: 'BatchInput', label: '标签条码', prop: 'Barcode' },
  { type: 'BatchInput', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  { type: 'BatchInput', label: '批次', prop: 'Batch' },
  { type: 'Select', label: '业务类型', prop: 'BussinessType', options: [] }
]
export const MoreQuery = [
  { type: 'BatchInput', label: '载具编号', prop: 'BoxID' },
  { type: 'Select', label: '仓库名称', prop: 'WarehouseName', options: [] },
  { type: 'BatchInput', label: '供应商编号', prop: 'SupplierCode' },
  { type: 'BatchInput', label: '单据编号', prop: 'OrderID' },
  { type: 'Select', label: '状态', prop: 'State', options: [] },
  { type: 'Input', label: '操作人', prop: 'CreatorId' },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'CreateStartTime',
    endProp: 'createEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
export const MaterBtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: 'Report.MaterialHistory.Export',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]

/* 出入库报表 */
export const queryItems = [
  {
    type: 'BatchInput',
    label: '物料编码',
    prop: 'MaterialID'
  },
  {
    type: 'BatchInput',
    label: '标签条码',
    prop: 'Barcode'
  },
  {
    type: 'BatchInput',
    label: '单据编号',
    prop: 'OrderID'
  },
  {
    type: 'BatchInput',
    label: '批次',
    prop: 'Batch'
  },
  {
    type: 'BatchInput',
    label: '载具',
    prop: 'BoxID'
  },
  {
    type: 'Input',
    label: '物料名称',
    prop: 'MaterialDesc'
  }
]
export const Crud = { download: 'any' }
export const OutMoreQuery = [
  { type: 'BatchInput', label: '供应商编码', prop: 'SupplierCode' },
  { type: 'BatchInput', label: '货位', prop: 'Location' },
  { type: 'Select', label: '业务类型', prop: 'BussinessType', options: [] },
  { type: 'Select', label: '质检类型', prop: 'QcType', options: [] },
  { type: 'Select', label: '标签状态', prop: 'state', options: [] },
  { type: 'Select', label: '仓库名称', prop: 'WarehouseID', options: [] },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'CreateStartTime',
    endProp: 'CreateEndTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: 24, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
