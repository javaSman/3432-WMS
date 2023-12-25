import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

// 导入组件模块路由
// import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则item将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子route时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (必须设置)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑 (recommend set)
    icon: 'svg-name'             图标显示在侧边栏
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，标签将被添加到标签视图中
    breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，工具条将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  //  系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    alwaysShow: true,
    name: 'SystemManagement',
    meta: {
      title: 'systemAdm',
      icon: 'systemAdm',
      roles: ['Systems']
    },
    children: [
      // 用户管理
      {
        path: 'user',
        component: () => import('@/views/systemAdm/user/index'),
        name: 'User',
        meta: {
          title: 'user',
          roles: ['Systems.Users'],
          icon: 'user',
          keepAlive: true
        }
      },
      // 角色管理
      {
        path: 'role',
        component: () => import('@/views/systemAdm/role/index'),
        name: 'Role',
        meta: {
          title: 'role',
          roles: ['Systems.Roles'],
          icon: 'role',
          keepAlive: true
        }
      },
      // 数据字典
      {
        path: 'dict',
        component: () => import('@/views/systemAdm/dict/index'),
        name: 'Dictionary',
        meta: {
          title: 'dictionary',
          roles: ['Systems.DataDictionary'],
          icon: 'dict',
          keepAlive: true
        }
      },
      // 系统日志
      {
        path: 'log',
        component: () => import('@/views/systemAdm/log/index'),
        name: 'Log',
        meta: {
          title: 'log',
          roles: ['Systems.AuditLogging'],
          icon: 'log',
          keepAlive: true
        }
      },
      // 列模板
      {
        path: 'colModel',
        component: () => import('@/views/systemAdm/colModel/index'),
        name: 'ColModel',
        meta: {
          title: 'colModel',
          roles: ['Systems.TableTemplate'],
          icon: 'colModel',
          keepAlive: true
        }
      },
      // app管理
      {
        path: 'appVersion',
        component: () => import('@/views/systemAdm/appVersion/index'),
        name: 'appVersion',
        meta: {
          title: 'appVersionAdm',
          roles: ['Systems.AppVersion'],
          icon: 'appVersion',
          keepAlive: true
        }
      },
      // 编码规则
      {
        path: 'codingRules',
        component: () => import('@/views/systemAdm/codingRules/index'),
        name: 'codingRulesAdm',
        meta: {
          title: 'codingRules',
          roles: ['Systems.CodingRulesAdm'],
          icon: 'appVersion',
          keepAlive: true
        }
      },
      // 操作日志
      {
        path: 'operationLog',
        component: () => import('@/views/systemAdm/operationLog/index'),
        name: 'OperationLog',
        meta: {
          title: 'operationLog',
          roles: ['Systems.OperationLog'],
          icon: 'appVersion',
          keepAlive: true
        }
      }
    ]
  },
  // 接口管理
  {
    // 接口
    path: '/interface',
    component: Layout,
    redirect: '/interface/interfaceConfiguration',
    alwaysShow: true,
    name: 'InterfaceManagement',
    meta: {
      title: 'interfaceManagement',
      roles: ['InterfaceManagement'],
      icon: 'inShelves',
      keepAlive: true
    },
    children: [
      // 接口配置
      {
        path: 'interfaceConfiguration',
        component: () => import('@/wms/interface/interfaceConfiguration'),
        name: 'InterfaceConfiguration',
        meta: {
          title: 'interfaceConfiguration',
          roles: ['InterfaceManagement.InterfaceConfiguration'],
          icon: 'inShelves',
          keepAlive: true
        }
      },
      // 接口日志
      {
        path: 'interfaceLog',
        component: () => import('@/wms/interface/interfaceLog'),
        name: 'InterfaceLog',
        meta: {
          title: 'interfaceLog',
          roles: ['InterfaceManagement.InterfaceLog'],
          icon: 'inShelves',
          keepAlive: true
        }
      }
    ]
  },
  // 基础数据（仓库管理）
  {
    path: '/baseData',
    component: Layout,
    redirect: '/baseData/materials',
    alwaysShow: true,
    name: 'BaseData',
    meta: {
      title: 'baseData',
      icon: 'baseData',
      roles: ['BaseData'],
      keepAlive: true
    },
    children: [
      // 载具管理
      {
        path: 'box',
        component: () => import('@/wms/baseData/box/index'),
        name: 'Box',
        meta: {
          title: 'box',
          roles: ['BaseData.Box'],
          icon: 'box',
          keepAlive: true
        }
      },
      // 仓库管理
      {
        path: 'warehouse',
        component: () => import('@/wms/baseData/warehouse/index'),
        name: 'Warehouse',
        meta: {
          title: 'warehouse',
          roles: ['BaseData.Warehouse'],
          icon: 'warehouse',
          keepAlive: true
        }
      },
      // 货位管理
      {
        path: 'locations',
        component: () => import('@/wms/baseData/locations/index'),
        name: 'Locations',
        meta: {
          title: 'locations',
          roles: ['BaseData.Locations'],
          icon: 'locations',
          keepAlive: true
        }
      },
      // 码头管理
      {
        path: 'wharf',
        component: () => import('@/wms/baseData/wharf/index'),
        name: 'Wharf',
        meta: {
          title: 'wharf',
          roles: ['BaseData.Wharf'],
          icon: 'wharf',
          keepAlive: true
        }
      },
      // 区域管理
      {
        path: 'regionManagement',
        component: () => import('@/wms/baseData/regionManagement/index'),
        name: 'RegionManagement',
        meta: {
          title: 'regionManagement',
          roles: ['BaseData.RegionManagement'],
          icon: 'warehouse',
          keepAlive: true
        }
      },
      // 线体管理
      {
        path: 'ConveyerLineNew',
        component: () => import('@/wms/baseData/conveyerLineNew/index'),
        name: 'ConveyerLineNew',
        meta: {
          title: 'ConveyerLineNew',
          roles: ['BaseData.ConveyerLineNew'],
          icon: 'warehouse',
          keepAlive: true
        }
      },
      // 物料管理
      {
        path: 'materials',
        component: () => import('@/wms/baseData/materials/index'),
        name: 'Materials',
        meta: {
          title: 'materials',
          roles: ['BaseData.Materials'],
          icon: 'materials',
          keepAlive: true
        }
      },
      // 供应商管理
      {
        path: 'supplier',
        component: () => import('@/wms/baseData/supplier/supplierManage'),
        name: 'Supplier',
        meta: {
          title: 'supplier',
          roles: ['BaseData.Supplier'],
          icon: 'inShelves',
          keepAlive: true
        }
      },
      // 采购订单
      {
        path: 'PurchaseOrder',
        component: () => import('@/wms/baseData/PurchaseOrder/index'),
        name: 'PurchaseOrder',
        meta: {
          title: 'PurchaseOrder',
          roles: ['BaseData.PurchaseOrder'],
          icon: 'wcsTask',
          keepAlive: true
        }
      }

      // AGV点位管理
      // {
      //   path: 'pointManagement',
      //   component: () => import('@/wms/baseData/pointManagement/index'),
      //   name: 'PointManagement',
      //   meta: {
      //     title: 'pointManagement',
      //     roles: ['WarehouseManagement.AGVLocations'],
      //     icon: 'locations'
      //   }
      // }
    ]
  },

  // 报表管理
  {
    path: '/report',
    component: Layout,
    redirect: '/report/inShelves',
    alwaysShow: true,
    name: 'report',
    meta: {
      title: 'report',
      roles: ['Report'],
      icon: 'inShelves',
      keepAlive: true
    },
    children: [
      // 库存报表
      {
        path: 'inventoryReport',
        component: () => import('@/wms/report/inventoryReport'),
        name: 'InventoryReport',
        meta: {
          title: 'inventoryReport',
          roles: ['Report.InventoryReport'],
          icon: 'inStockAdm',
          keepAlive: true
        }
      },
      // 物料履历
      {
        path: 'materialHistory',
        component: () => import('@/wms/report/materialHistory'),
        name: 'MaterialHistory',
        meta: {
          title: 'materialHistory',
          roles: ['Report.MaterialHistory'],
          icon: 'dict',
          keepAlive: true
        }
      },
      // 到货报表
      {
        path: 'arrivalReport',
        component: () => import('@/wms/report/arrivalReport'),
        name: 'ArrivalReport',
        meta: {
          title: 'arrivalReport',
          roles: ['Report.ArrivalReport'],
          icon: 'inStockAdm',
          keepAlive: true
        }
      },
      // 库存汇总报表 inventorySummary
      {
        path: 'inventorySummary',
        component: () => import('@/wms/report/inventorySummary'),
        name: 'InventorySummary',
        meta: {
          title: 'inventorySummary',
          roles: ['Report.InventorySummary'],
          icon: 'inStockAdm',
          keepAlive: true
        }
      },
      // 安全库存报表
      {
        path: 'safetyStockAlertReport',
        component: () => import('@/wms/report/safetyStockAlertReport'),
        name: 'SafetyStockAlertReport',
        meta: {
          title: 'safetyStockAlertReport',
          roles: ['Report.SafetyStockAlertReport'],
          icon: 'dict',
          keepAlive: true
        }
      },
      // 库龄报表
      {
        path: 'stockAgeReport',
        component: () => import('@/wms/report/stockAgeReport'),
        name: 'StockAgeReport',
        meta: {
          title: 'stockAgeReport',
          roles: ['Report.StockAgeReport'],
          icon: 'dict',
          keepAlive: true
        }
      },
      // 出入库报表
      // {
      //   path: 'outinStockReport',
      //   component: () => import('@/wms/report/outinStockReport'),
      //   name: 'OutinStockReport',
      //   meta: {
      //     title: 'outinStockReport',
      //     roles: ['Report.OutinStockReport'],
      //     icon: 'dict',
      //     keepAlive: true
      //   }
      // },
      // 载具清洗日志
      {
        path: 'boxCleanLog',
        component: () => import('@/wms/report/boxCleanLog'),
        name: 'BoxCleanLog',
        meta: {
          title: 'boxCleanLog',
          roles: ['Report.BoxCleanLog'],
          icon: 'dict',
          keepAlive: true
        }
      }
    ]
  },

  // 出库管理
  {
    path: '/outStockAdm',
    component: Layout,
    redirect: '/outStockAdm/outShelves',
    alwaysShow: true,
    name: 'OutStockAdm',
    meta: {
      title: 'outStockAdm',
      roles: ['OrderManagement'],
      icon: 'outStockAdm'
    },
    children: [
      // {
      //   path: 'agvTask',
      //   component: () => import('@/wms/outStockAdm/agvTask'),
      //   name: 'AgvTask',
      //   meta: {
      //     title: 'agvTask',
      //     roles: ['OutStock'],
      //     icon: 'inStockAdm'
      //   }
      // },
      // {
      //   path: 'outStockRequest',
      //   component: () => import('@/wms/outStockAdm/outStockRequest'),
      //   name: 'OutStockRequest',
      //   meta: {
      //     title: 'outStockRequest',
      //     roles: ['OutStock'],
      //     icon: 'inStockAdm'
      //   }
      // }
    ]
  },
  // 策略管理
  {
    path: '/strategyAdm',
    component: Layout,
    redirect: '/strategyAdm/inStockStrategy',
    alwaysShow: true,
    name: 'StrategyAdm',
    meta: {
      title: 'StrategyAdm',
      roles: ['Strategy'],
      icon: 'strategyAdm'
    },
    children: [
      // 策略配置
      {
        path: 'strategyConfig',
        component: () => import('@/wms/strategyAdm/strategyConfig'),
        name: 'StrategyConfig',
        meta: {
          title: 'strategyConfig',
          roles: ['Strategy.StrategyConfig'],
          icon: 'strategyConfig',
          keepAlive: true
        }
      },
      // 策略明细
      {
        path: 'strategyDetails',
        component: () => import('@/wms/strategyAdm/strategyDetails'),
        name: 'StrategyDetails',
        meta: {
          title: 'strategyDetails',
          roles: ['Strategy.StrategyDetails'],
          icon: 'strategyDetails',
          keepAlive: true
        }
      },
      // 策略流程集合
      {
        path: 'strategyFlowGather',
        component: () => import('@/wms/strategyAdm/strategyFlowGather'),
        name: 'StrategyFlowGather',
        meta: {
          title: 'strategyFlowGather',
          roles: ['Strategy.StrategyFlowGather'],
          icon: 'strategyFlowGather',
          keepAlive: true
        }
      },
      // 策略流程
      {
        path: 'strategyFlow',
        component: () => import('@/wms/strategyAdm/strategyFlow'),
        name: 'StrategyFlow',
        meta: {
          title: 'strategyFlow',
          roles: ['Strategy.StrategyFlow'],
          icon: 'strategyFlow',
          keepAlive: true
        }
      },
      // 任务清单
      {
        path: 'wcsTask',
        component: () => import('@/wms/strategyAdm/wcsTask'),
        name: 'WCSTask',
        meta: {
          title: 'wcsTask',
          roles: ['Strategy.WCSTask'],
          icon: 'wcsTask',
          keepAlive: true
        }
      }
    ]
  },
  // 订单管理
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/DeliveryOrder',
    alwaysShow: true,
    name: 'OrderManagement',
    meta: {
      title: 'orderManagement',
      roles: ['OrderManagement'],
      icon: 'wcsTask'
    },
    children: [
      // 入库申请单
      {
        path: 'warehousingApplication',
        component: () => import('@/wms/orderManagement/warehousingApplication'),
        name: 'WarehousingApplication',
        meta: {
          title: 'warehousingApplication',
          roles: ['OrderManagement.WarehousingApplication'],
          icon: 'wcsTask',
          keepAlive: true
        }
      },
      // 出库申请单
      {
        path: 'outboundApplication',
        component: () => import('@/wms/orderManagement/outboundApplication'),
        name: 'outboundApplication',
        meta: {
          title: 'outboundApplication',
          roles: ['OutboundApplication'],
          icon: 'wcsTask',
          keepAlive: true
        }
      },
      // 入库单
      {
        path: 'warehousingEntry',
        component: () => import('@/wms/orderManagement/warehousingEntry'),
        name: 'warehousingEntry',
        meta: {
          title: 'warehousingEntry',
          roles: ['OrderManagement.WarehousingEntry'],
          icon: 'wcsTask',
          keepAlive: true
        }
      },
      // 出库单
      {
        path: 'OutboundOrder',
        component: () => import('@/wms/orderManagement/OutboundOrder'),
        name: 'OutboundOrder',
        meta: {
          title: 'OutboundOrder',
          roles: ['OrderManagement.OutboundOrder'],
          icon: 'wcsTask',
          keepAlive: true
        }
      },
      // 上架管理
      {
        path: 'inShelves',
        component: () => import('@/wms/orderManagement/inStockAdm/inShelves'),
        name: 'InShelves',
        meta: {
          title: 'inShelves',
          roles: ['OrderManagement.InShelves'],
          icon: 'inShelves',
          keepAlive: true
        }
      },
      // 下架管理
      {
        path: 'outShelves',
        component: () => import('@/wms/orderManagement/outStockAdm/outShelves'),
        name: 'OutShelves',
        meta: {
          title: 'outShelves',
          roles: ['OrderManagement.OutShelves'],
          icon: 'outShelves',
          keepAlive: true
        }
      }
    ]
  },
  // 标签管理
  {
    path: '/labelManagement',
    component: Layout,
    redirect: '/labelManagement/GenerateLabel',
    alwaysShow: true,
    name: 'LabelManagement',
    meta: {
      title: 'labelManagement',
      roles: ['LabelManagement'],
      icon: 'wcsTask'
    },
    children: [
      // 收货标签
      {
        path: 'GenerateLabel',
        component: () => import('@/wms/labelManagement/GenerateLabel'),
        name: 'GenerateLabel',
        meta: {
          title: 'generateLabel',
          roles: ['LabelManagement.GenerateLabel'],
          keepAlive: true
        }
      },
      // 固废标签
      {
        path: 'SolidWaste',
        component: () => import('@/wms/labelManagement/SolidWaste'),
        name: 'SolidWaste',
        meta: {
          title: 'solidWaste',
          roles: ['LabelManagement.SolidWaste'],
          keepAlive: true
        }
      },
      // 标签列表
      {
        path: 'TagList',
        component: () => import('@/wms/labelManagement/TagList'),
        name: 'TagList',
        meta: {
          title: 'tagList',
          roles: ['LabelManagement.TagList'],
          keepAlive: true
        }
      }
    ]
  },
  // 设备管理
  {
    path: '/baseData',
    component: Layout,
    redirect: '/labelManagement/GenerateLabel',
    alwaysShow: true,
    name: 'device',
    meta: {
      title: 'device',
      roles: ['DeviceManagement'],
      icon: 'wcsTask'
    },
    children: [
      // 设备管理--设备列表
      {
        path: 'device',
        component: () => import('@/wms/baseData/device/index'),
        name: 'device',
        meta: {
          title: 'device',
          roles: ['DeviceManagement.Device'],
          icon: 'warehouse',
          keepAlive: true
        }
      },
      // 设备管理---设备报警记录
      {
        path: 'logisticsLineAlarm',
        component: () => import('@/wms/baseData/logisticsLineAlarm/index'),
        name: 'LogisticsLineAlarm',
        meta: {
          title: 'logisticsLineAlarm',
          roles: ['DeviceManagement.LogisticsLineAlarm'],
          icon: 'warehouse',
          keepAlive: true
        }
      }
    ]
  },
  /* 库内业务 */
  {
    path: '/warehouseBusiness',
    component: Layout,
    redirect: '/warehouseBusiness/Allocate',
    alwaysShow: true,
    name: 'WarehouseBusiness',
    meta: {
      title: 'warehouseBusiness',
      roles: ['WarehouseBusiness'],
      icon: 'wcsTask'
    },
    children: [
      /* 物料调拨 */
      {
        path: 'Allocate',
        component: () => import('@/wms/warehouseBusiness/Allocate'),
        name: 'Allocate',
        meta: {
          title: 'allocate',
          roles: ['WarehouseBusiness.Allocate'],
          keepAlive: true
        }
      },
      // 在库报废
      {
        path: 'scrapInStockChange',
        component: () => import('@/wms/warehouseBusiness/scrapInStockChange'),
        name: 'ScrapInStockChange',
        meta: {
          title: 'scrapInStockChange',
          roles: ['WarehouseBusiness.ScrapInStockChange'],
          icon: 'wcsTask',
          keepAlive: true
        }
      },
      // 物料重检
      {
        path: 'inStockQualityInspection',
        component: () => import('@/wms/warehouseBusiness/inStockQualityInspection'),
        name: 'InStockQualityInspection',
        meta: {
          title: 'inStockQualityInspection',
          icon: 'wcsTask',
          roles: ['WarehouseBusiness.InStockQualityInspection'],
          keepAlive: true
        }
      },
      // 盘点单
      {
        path: 'inventoryOrder',
        component: () => import('@/wms/warehouseBusiness/inventoryAdm/inventoryOrder'),
        name: 'InventoryOrder',
        meta: {
          title: 'inventoryOrder',
          icon: 'inventoryOrder',
          keepAlive: true,
          roles: ['WarehouseBusiness.InventoryOrder']
        }
      },
      // 差异报表
      {
        path: 'varianceReport',
        component: () => import('@/wms/warehouseBusiness/inventoryAdm/varianceReport'),
        name: 'VarianceReport',
        meta: {
          title: 'varianceReport',
          icon: 'inventoryOrder',
          keepAlive: true,
          roles: ['WarehouseBusiness.VarianceReport']
        }
      }
    ]
  },
  // 静置库管理
  // {
  //   path: '/staticStorageManagement',
  //   component: Layout,
  //   redirect: '/staticStorageManagement/quietData',
  //   alwaysShow: true,
  //   name: 'StaticStorageManagement',
  //   meta: {
  //     title: 'staticStorageManagement',
  //     // roles: ['SupplierManage'],
  //     icon: 'inShelves'
  //   },
  //   children: [
  //     //静置数据
  //     {
  //       path: 'quietData',
  //       component: () => import('@/wms/staticStorageManagement/quietData'),
  //       name: 'QuietData',
  //       meta: {
  //         title: 'quietData',
  //         // roles: ['SupplierManage.Supplier'],
  //         icon: 'inStockAdm'
  //       }
  //     },
  //     // MES日志
  //     {
  //       path: 'MESLog',
  //       component: () => import('@/wms/staticStorageManagement/MESLog'),
  //       name: 'MESLog',
  //       meta: {
  //         title: 'MESLog',
  //         // roles: ['SupplierManage.Supplier'],
  //         icon: 'inStockAdm'
  //       }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
