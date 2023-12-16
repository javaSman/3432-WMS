// 入库单搜索参数
export const inStockOrderItems = [
  { type: 'Input', label: '入库单号', prop: 'OrderID' },
  { type: 'Selects', label: '单据类型', prop: 'OrderType', options: [] },
  { type: 'Selects', label: '单据状态', prop: 'OrderStatus', options: [] },
  { type: 'Input', label: '源单号', prop: 'SourceOrder' },
  {
    type: 'DateRangePart',
    label: '更新时间',
    // prop: 'registrationEndTime',
    startProp: 'postBeginDate',
    endProp: 'postEndDat',
    dateType: 'date',
    valueFormat: 'yyyy-MM-dd',
    labelFormat: 'yyyy-MM-dd',
    // startDefaultTime: '00:00:00',
    // endDefaultTime: '23:59:59',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    // span: 12
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  { type: 'Input', label: '操作人', prop: 'Operator' }
]
