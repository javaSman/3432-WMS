export const queryItems = [
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '箱子编号', prop: 'BoxId' },
  { type: 'Selects', label: '任务状态', prop: 'State', options: [], filterStyle: 'width: 150px' },
  // { type: 'Input', label: '备注', prop: 'Remark' },
  { type: 'Selects', label: '任务类型', prop: 'TaskType', options: [], filterStyle: 'width: 150px' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Selects', label: '仓库名称', prop: 'WarehouseID', options: [], filterStyle: 'width: 150px' }
]

export const wcsFormList = [
  { type: 'Input', label: '任务号', prop: 'taskId', disabled: true },
  { type: 'Select', label: '任务状态', prop: 'state', options: [] },
  { type: 'Select', label: '任务类型', prop: 'taskType', options: [], disabled: true },
  { type: 'Input', label: '箱子编号', prop: 'boxID', disabled: true },
  { type: 'Input', label: '起始位置', prop: 'beginPostion', disabled: true },
  { type: 'Input', label: '结束位置', prop: 'endPostion', disabled: true },
  { type: 'Select', label: '输送线层', prop: 'floor', options: [], disabled: true },
  { type: 'Input', label: '失败次数', prop: 'failCount', disabled: true },
  {
    type: 'Textarea',
    label: '备注',
    prop: 'remark',
    minRows: 2,
    maxRows: 4,
    span: 24
  }
]
export const reportFormList = [
  {
    type: 'Select',
    label: '任务状态',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择任务状态', trigger: 'blur' }]
  }
]
export const resendFormList = [
  {
    type: 'Input',
    label: '任务编号',
    prop: 'taskId',
    rules: [{ required: true, message: '请选择任务状态', trigger: 'blur' }]
  }
]

// 权限
export const WcsCrud = {
  // edit: 'TaskInfoManage.TaskInfo',
  download: 'TaskInfoManage.TaskInfo'
}

// wcs，非标按钮
export const wcsBtnItems = [
  {
    // 优先
    langLabel: 'button.priority',
    clickFun: 'toPriority',
    disabled: 'single',
    permission: 'TaskInfoManage.TaskInfo',
    styleType: 'primary',
    icon: 'el-icon-top'
  },
  {
    // 报工
    langLabel: 'button.reportTask',
    clickFun: 'toReportTask',
    disabled: 'single',
    permission: 'TaskInfoManage.TaskInfo',
    styleType: 'primary',
    icon: 'el-icon-edit'
  }
  // {
  //   // 执行
  //   langLabel: 'button.execute',
  //   clickFun: 'toExecute',
  //   disabled: 'single',
  //   permission: 'WCSTaskManage.WCSTask.Update',
  //   styleType: 'success',
  //   icon: 'el-icon-edit'
  // },
  // {
  //   // 取消
  //   langLabel: 'button.cancel',
  //   clickFun: 'toCancel',
  //   disabled: 'single',
  //   permission: 'WCSTaskManage.WCSTask.Update',
  //   styleType: 'danger',
  //   icon: 'el-icon-close'
  // },

  // {
  //   // 重发
  //   langLabel: 'button.resend',
  //   clickFun: 'toResend',
  //   disabled: 'single',
  //   loading: false,
  //   permission: 'TaskInfoManage.TaskInfo.Create',
  //   styleType: 'success',
  //   icon: 'el-icon-refresh-left'
  // }
]
