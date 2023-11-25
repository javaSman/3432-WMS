// 入库报表查询
export const materialHistoryItems = [
  { type: 'Input', label: '标签条码', prop: 'Barcode' },
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Input', label: '批次', prop: 'Batch' },
  { type: 'Selects', label: '业务类型', prop: 'BussinessType', options: [] },
  // { type: 'Input', label: '条码信息', prop: 'NewBarCodeJson' },

  { type: 'Input', label: '载具编号', prop: 'BoxID' },
  { type: 'Selects', label: '仓库名称', prop: 'WarehouseID', options: [] },
  { type: 'Input', label: '供应商编号', prop: 'SupplierCode' },
  { type: 'Input', label: '单据编号', prop: 'orderID' },
  { type: 'Selects', label: '标签状态', prop: 'state', options: [] },
  { type: 'Input', label: '操作人', prop: 'CreatorId' },

  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'createStartTime',
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

export const BtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
