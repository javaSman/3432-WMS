export const quickAccess = [
  {
    id: 1,
    title: '载具管理'
  },
  {
    id: 2,
    title: '角色管理'
  },
  {
    id: 3,
    title: '数据字典'
  },
  {
    id: 4,
    title: '版本管理'
  },
  {
    id: 5,
    title: '物料管理'
  },
  {
    id: 6,
    title: '标签管理'
  },
  {
    id: 7,
    title: '接口配置'
  },
  {
    id: 8,
    title: '接口日志'
  },
  {
    id: 9,
    title: '仓库管理'
  },
  {
    id: 10,
    title: '设备管理'
  },
  {
    id: 10,
    title: '入库报表'
  },
  {
    id: 11,
    title: '库存预警'
  },
  {
    id: 12,
    title: '策略配置'
  }
]
export const navdetails = [
  {
    id: '1',
    /* 列表标题 */
    label: '基础数据',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '载具管理',
        routerUrl: '/baseData/box',
        noHidden: true,
        roles: ['BaseData.Box']
      },
      {
        label: '仓库管理',
        routerUrl: '/baseData/warehouse',
        noHidden: true,
        roles: ['BaseData.Warehouse']
      },
      {
        label: '区域管理',
        routerUrl: '/baseData/regionManagement',
        noHidden: true,
        roles: ['BaseData.RegionManagement']
      },
      {
        label: '货位管理',
        routerUrl: '/baseData/locations',
        noHidden: true,
        roles: ['BaseData.Locations']
      },
      {
        label: '物料管理',
        routerUrl: '/BaseData/materials',
        noHidden: true,
        roles: ['BaseData.Materials']
      },
      {
        label: '码头管理',
        routerUrl: '/baseData/wharf',
        noHidden: true,
        roles: ['BaseData.Wharf']
      },
      // {
      //   label: '设备管理',
      //   routerUrl: '/baseData/device',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      {
        label: '采购订单',
        routerUrl: '/baseData/PurchaseOrder',
        noHidden: true,
        roles: ['BaseData.PurchaseOrder']
      },
      {
        label: '线体管理',
        routerUrl: '/baseData/conveyerLineNew',
        noHidden: true,
        roles: ['BaseData.ConveyerLineNew']
      },
      {
        label: '供应商管理',
        routerUrl: '/baseData/supplier',
        noHidden: true,
        roles: ['BaseData.Supplier']
      }
    ]
  },
  {
    id: '2',
    /* 列表标题 */
    label: '订单管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '入库申请单',
        routerUrl: '/orderManagement/warehousingApplication',
        noHidden: true,
        roles: ['OrderManagement.WarehousingApplication']
      },
      {
        label: '入库单',
        routerUrl: '/orderManagement/warehousingEntry',
        noHidden: true,
        roles: ['OrderManagement.WarehousingEntry']
      },
      {
        label: '出库申请单',
        routerUrl: '/orderManagement/outboundApplication',
        noHidden: true,
        roles: ['OrderManagement.OutboundApplication']
      },
      {
        label: '出库单',
        routerUrl: '/orderManagement/outboundOrder',
        noHidden: true,
        roles: ['OrderManagement.OutboundOrder']
      },
      {
        label: '上架管理',
        routerUrl: '/orderManagement/inShelves',
        noHidden: true,
        roles: ['OrderManagement.InShelves']
      },
      {
        label: '下架管理',
        routerUrl: '/orderManagement/outShelves',
        noHidden: true,
        roles: ['OrderManagement.OutShelves']
      }
      // {
      //   label: '采购订单',
      //   routerUrl: '/orderManagement/PurchaseOrder',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '收货单管理',
      //   routerUrl: '',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '退库单',
      //   routerUrl: '',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '领料单管理',
      //   routerUrl: '/orderManagement/PickOrder',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '固废出入库管理',
      //   routerUrl: '/orderManagement/ScrapInOut',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '发货单管理',
      //   routerUrl: '/orderManagement/shipmentorder',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '重检单管理',
      //   routerUrl: '/orderManagement/reInspectionDocManagement',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '在库报废',
      //   routerUrl: '/orderManagement/scrapInStockChange',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // }
    ]
  },
  {
    id: '3',
    /* 列表标题 */
    label: '库内业务',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '物料调拨',
        routerUrl: '/warehouseBusiness/Allocate',
        noHidden: true,
        roles: ['WarehouseBusiness.Allocate']
      },
      {
        label: '物料重检',
        routerUrl: '/warehouseBusiness/inStockQualityInspection',
        noHidden: true,
        roles: ['WarehouseBusiness.InStockQualityInspection']
      },
      {
        label: '在库报废',
        routerUrl: '/warehouseBusiness/scrapInStockChange',
        noHidden: true,
        roles: ['WarehouseBusiness.ScrapInStockChange']
      },
      {
        label: '盘点单',
        routerUrl: '/warehouseBusiness/inventoryOrder',
        noHidden: true,
        roles: ['WarehouseBusiness.InventoryOrder']
      },
      {
        label: '差异报表',
        routerUrl: '/warehouseBusiness/varianceReport',
        noHidden: true,
        roles: ['WarehouseBusiness.VarianceReport']
      }
      // {
      //   label: '冲销管理',
      //   routerUrl: '',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '业务冲销',
      //   routerUrl: '',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // }
    ]
  },
  {
    id: '4',
    /* 列表标题 */
    label: '策略管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '策略配置',
        routerUrl: '/strategyAdm/strategyConfig',
        noHidden: true,
        roles: ['Strategy.StrategyConfig']
      },
      {
        label: '策略明细',
        routerUrl: '/strategyAdm/strategyDetails',
        noHidden: true,
        roles: ['Strategy.StrategyDetails']
      },
      {
        label: '策略流程',
        routerUrl: '/strategyAdm/strategyFlow',
        noHidden: true,
        roles: ['Strategy.StrategyFlow']
      },
      {
        label: '策略流程集合',
        routerUrl: '/strategyAdm/strategyFlowGather',
        noHidden: true,
        roles: ['Strategy.StrategyFlowGather']
      },
      {
        label: '任务清单',
        routerUrl: '/strategyAdm/wcsTask',
        noHidden: true,
        roles: ['Strategy.WCSTask']
      }
    ]
  },
  {
    id: '5',
    /* 列表标题 */
    label: '报表管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '到货报表',
        routerUrl: '/report/arrivalReport',
        noHidden: true,
        roles: ['Report.ArrivalReport']
      },
      {
        label: '物料履历',
        routerUrl: '/report/materialHistory',
        noHidden: true,
        roles: ['Report.MaterialHistory']
      },
      {
        label: '出入库报表',
        routerUrl: '/report/outinStockReport',
        noHidden: true,
        roles: ['Report.OutinStockReport']
      },
      {
        label: '库存报表',
        routerUrl: '/report/inventoryReport',
        noHidden: true,
        roles: ['Report.InventoryReport']
      },
      {
        label: '安全库存报表',
        routerUrl: '/report/safetyStockAlertReport',
        noHidden: true,
        roles: ['Report.SafetyStockAlertReport']
      },
      {
        label: '库龄报表',
        routerUrl: '/report/stockAgeReport',
        noHidden: true,
        roles: ['Report.StockAgeReport']
      },
      // {
      //   label: '收货清单',
      //   routerUrl: '',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      {
        label: '库存汇总报表',
        routerUrl: '/report/inventorySummary',
        noHidden: true,
        roles: ['Report.InventorySummary']
      },
      {
        label: '载具清洗日志',
        routerUrl: '/report/boxCleanLog',
        noHidden: true,
        roles: ['Report.BoxCleanLog']
      }
      // {
      //   label: '到货报表',
      //   routerUrl: '/report/arrivalReport',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '物料履历',
      //   routerUrl: '/report/materialHistory',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '入库报表',
      //   routerUrl: '#',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '出库报表',
      //   routerUrl: '#',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '库存报表',
      //   routerUrl: '/report/inventoryReport',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '安全预警报表',
      //   routerUrl: '/report/safetyStockAlertReport',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '库龄报表',
      //   routerUrl: '/report/stockAgeReport',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '库存汇总报表',
      //   routerUrl: '/report/inventorySummary',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // }
    ]
  },
  {
    id: '6',
    /* 列表标题 */
    label: '接口管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '接口配置',
        routerUrl: '/interface/interfaceConfiguration',
        noHidden: true,
        roles: ['InterfaceManagement.InterfaceConfiguration']
      },
      {
        label: '接口日志',
        routerUrl: '/interface/interfaceLog',
        noHidden: true,
        roles: ['InterfaceManagement.InterfaceLog']
      }
      // {
      //   label: '任务管理',
      //   routerUrl: '/wcsAdm/wcsTask',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // }
    ]
  },
  {
    id: '7',
    /* 列表标题 */
    label: '系统管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '数据字典',
        routerUrl: '/system/dict',
        noHidden: true,
        roles: ['Systems.DataDictionary']
      },
      {
        label: '列表模板',
        routerUrl: '/system/colModel',
        noHidden: true,
        roles: ['Systems.TableTemplate']
      },
      {
        label: '角色管理',
        routerUrl: '/system/role',
        noHidden: true,
        roles: ['Systems.Roles']
      },
      {
        label: '用户管理',
        routerUrl: '/system/user',
        noHidden: true,
        roles: ['Systems.Users']
      },
      {
        label: '系统日志',
        routerUrl: '/system/log',
        noHidden: true,
        roles: ['Systems.AuditLogging']
      },
      {
        label: 'APP管理',
        routerUrl: '/system/appVersion',
        noHidden: true,
        roles: ['Systems.AppVersion']
      },
      // {
      //   label: '编码规则',
      //   routerUrl: '/system/codingRules',
      //   noHidden: true,
      //   roles: ['Systems.CodingRulesAdm']
      // },
      {
        label: '操作日志',
        routerUrl: '/system/operationLog',
        noHidden: true,
        roles: ['Systems.OperationLog']
      }
      // {
      //   label: '租户管理',
      //   routerUrl: '/system/user',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
      // {
      //   label: '身份标识管理',
      //   routerUrl: '/system/role',
      //   noHidden: true,
      //   roles: ['WarehouseManagement.Box']
      // },
    ]
  },
  {
    id: '8',
    /* 列表标题 */
    label: '标签管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '收货标签',
        routerUrl: '/labelManagement/GenerateLabel',
        noHidden: true,
        roles: ['LabelManagement.GenerateLabel']
      },
      {
        label: '固废标签',
        routerUrl: '/labelManagement/SolidWaste',
        noHidden: true,
        roles: ['LabelManagement.SolidWaste']
      },
      {
        label: '标签列表',
        routerUrl: '/labelManagement/TagList',
        noHidden: true,
        roles: ['LabelManagement.TagList']
      }
    ]
  },
  {
    id: '9',
    /* 列表标题 */
    label: '设备管理',
    /* 标题下内容列表 */
    hreflist: [
      {
        label: '设备列表',
        routerUrl: '/baseData/device',
        noHidden: true,
        roles: ['DeviceManagement.Device']
      },
      {
        label: '设备报警记录',
        routerUrl: '/baseData/logisticsLineAlarm',
        noHidden: true,
        roles: ['DeviceManagement.LogisticsLineAlarm']
      }
    ]
  }
]
