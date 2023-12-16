// 载具清洗日志查询
export const queryItems = [{ type: 'Input', label: '载具编号', prop: 'boxID' }]

// 载具清洗日志非标按钮
export const BtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: 'Report.BoxCleanLog.Export',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
