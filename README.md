# 项目介绍

​ 本项目基于 vue2+js+element 开发的楚能 WMS web 端

​

# 环境依赖

- 项目依赖：

```
"dependencies": {
    "@riophae/vue-treeselect": "^0.4.0",                 //解析树结构的插件
    "axios": "0.18.1",                 // 交互方式
    "body-parser": "^1.20.0",		//Node.js 正文解析中间件
    "clipboard": "2.0.4",	//剪切板版工具
    "codemirror": "5.45.0",	//代码高亮插件
    "driver.js": "0.9.5",		//引导用户展示该网站的部分功能的插件
    "dropzone": "5.5.1",	//拖拽上传插件
    "echarts": "4.2.1",		//可视化图标库
    "element-ui": "2.13.0",	     //element UI组件库
    "file-saver": "2.0.1",	//实现文件下载导出的库
    "fuse.js": "3.4.4",		//用于模糊搜索的JavaScript库
    "i5ting_toc": "^1.1.5",	//markdowm文档的标题标记插件
    "js-cookie": "2.2.0",	//处理cookie的jsAPI
    "jsonlint": "1.6.3",		//json数据校验格式化库
    "jszip": "3.2.1",		//操作.zip文件的工具库
    "moment": "^2.27.0",	//时间转换工具库
    "normalize.css": "7.0.0",		//跨浏览器渲染的定制css文件组件库
    "nprogress": "0.2.0",	//页面加载虚假进度条
    "path-to-regexp": "2.4.0",		//路径url正则处理插件
    "pinyin": "2.9.0",		//前端汉字转拼音插件
    "qrcodejs2": "^0.0.2", 	//二维码封装插件
    "qs": "^6.9.4",		//处理url参数的组件库
    "showdown": "^1.9.1",	//markdown语法解释工具库
    "sortablejs": "1.8.4",	//创建可拖动和可排序的列表的组件库
    "stompjs": "^2.3.3",	//用于与STOMP协议兼容的消息代理进行交互的JavaScript库
    "vue": "2.6.10",		//vue2 框架
    "vue-count-to": "1.0.13",	//数字动态计数插件
    "vue-i18n": "7.3.2",	//vue国际化插件
    "vue-image-crop-upload": "^2.5.0",
    "vue-qr": "^4.0.9",		//二维码插件
    "vue-router": "3.0.2",	//路由
    "vue-splitpane": "1.0.4",	//分割面板插件
    "vuedraggable": "2.20.0",		//列表拖拽插件
    "vuex": "3.1.0",		//路由
    "xlsx": "0.14.1"     		//表格展示插件
  }
```

- 开发依赖：

```
"devDependencies": {
    "@babel/core": "7.0.0",		//把 js 代码分析成 ast
    "@babel/register": "7.0.0",		//实现即时翻译
    "@vue/cli-plugin-babel": "3.5.3",		 // 插件解析器
    "@vue/cli-plugin-eslint": "^3.9.1",		// 向vue-cli-service注入命令lint
    "@vue/cli-plugin-unit-jest": "^4.5.4",		//jest单元测试实践
    "@vue/cli-service": "3.5.3", 			// 启动一个服务，并附带开箱即用的模块热重载
    "@vue/test-utils": "1.0.0-beta.29",		//启动前端自动化测试
    "autoprefixer": "^9.5.1",		//自动补全css样式
    "babel-eslint": "10.0.1",		//用于ESlint的Babel解析的包装器
    "babel-jest": "^26.3.0",		//用于执行自动化测试的
    "chalk": "2.4.2",			//颜色插件
    "chokidar": "2.1.5",		//文件监控库
    "connect": "3.6.6",			//控制实现异步
    "eslint": "^5.15.3",			// 代码检测工具，统一代码风格
    "eslint-config-prettier": "^8.3.0",	//解决eslint和prettier冲突
    "eslint-plugin-prettier": "^4.0.0",	//禁用掉了一些不必要的以及和 Prettier 相冲突的 ESLint 规则
    "eslint-plugin-vue": "5.2.2",		// 用ESLint检查.vue文件的<template>和<script>
    "html-webpack-plugin": "3.2.0",		// 生成html文件的插件
    "husky": "1.3.1",		//git执行一些操作的时候触发一些钩子
    "jsbarcode": "^3.11.5",		//用于生成条形码的js库
    "less": "^3.12.2",		//css预处理器
    "less-loader": "^7.0.1",		//用于处理编译.less文件,将其转为css文件代码
    "lint-staged": "8.1.5",		//git暂存文件上运行linters的工具
    "mockjs": "1.0.1-beta3",		//模拟数据生成器
    "node-sass": "^4.9.0",		//将Node.js绑定到LibSass(流行样式表预处理器Sass的C版本)，快速编译sass
    "plop": "2.3.0",			//前端自动化工具
    "prettier": "^2.4.1",		//代码格式工具
    "prettier-eslint-cli": "^5.0.1",		//代码语法检查工具
    "sass-loader": "^7.1.0",		// scss编译器，打包scss文件
    "script-ext-html-webpack-plugin": "2.1.3",	//webpack插件做监控插入
    "script-loader": "0.7.2",		//脚本加载器
    "serve-static": "^1.13.2",		//实现静态资源访问服务
    "svg-sprite-loader": "4.1.3",		//svg 雪碧图的 Webpack 加载器
    "svgo": "1.2.0",		//基于Nodejs的SVG文件优化工具
    "tasksfile": "^5.1.1",		//node.js的简约任务运行器
    "vue-template-compiler": "2.6.10"	//编译vue模板的包
  }
```

# 目录结构描述

```
    ├── build                   // webpack 开发和打包的相关设置
    ├── dist                    // 打包目录
    ├── node_modules            // npm 加载的项目依赖模块
    ├── public                  // 公共资源目录
    ├── src                     // 开发目录
    │   ├── api                 // 接口目录列表
    │   ├── assets              // 系统静态资源目录
    │   ├── axios               // axios 配置文件
    │   ├── components          // 系统组件列表
    │   ├── directive           // 自定义指令列表
    │   ├── filters	            // 时间转换方法
    │   ├── icons               // svg图标
    │   ├── lang	              //语言转换文件
    │   ├── layout              // 系统布局模板
    │   ├── mixins              // 混入
    │   ├── router              // 路由
    │   ├── store               // 状态管理
    │   ├── styles              // 样式列表
    │   ├── utils               // 公共方法
    │   ├── vendor	            //系统导出方式
    │   ├── views               // 基础页面组件
    │   ├── wms                 // 业务页面组件
    │   ├── App.vue             // 根组件
    │   ├── main.js             // 入口文件
    │   ├── permission.js       // 权限
    │   ├── settings.ts         // 系统通用字段设置配置文件
    ├── static	                //静态资源
    ├── .editorconfig           // 编码样式规范配置文件
    ├── .env.development        // 开发环境地址配置文件
    ├── .env.production         // 生产环境地址配置文件
    ├── .env.staging            // 测试环境配置文件
    └── .eslintignore           // eslint验证忽略文件
    └── .eslintrc.js            // eslint 配置文件
    └── .gitignore              // git追踪忽略文件
    └── .prettierrc             // 代码格式化配置文件
    └── babel.config.js         // babel 配置文件
    └── jsconfig.json           // JS 配置文件
    └── package.json            // 项目配置和包管理文件
    └── package-lock.json       // 项目依赖版本配置文件
    └── vue.config.js           // 项目配置信息：跨域proxy代理
    └── READMe.md               // 帮助文档
```

# 使用说明

- 访问地址

| 使用环境 | 所属业务 | 地址 |
| 开发环境 | 业务 | http://10.123.5.229:3432 |

- 本地运行命令：npm rundev

- 测试环境打包命令：npm run build:dev

  命令运行完毕会在项目根目录生成 dist 文件夹，该文件夹内所有内容即为打包文件，其中只有 dist/static 发生改变

- 测试环境访问地址：客户的测试环境

# 版本更新说明

```
  2023-03-24 上线内容
	1、所有的过账按钮都需要做防抖，前后端都需要做（由于网络延迟或者是接口结果反回较慢，导致用户点了几次传递了几次）---前端加二次确认按钮
	2、所有报表查询都改成以“搜索”触发，现在是每次选一次筛选信息都要刷新查询一次
	3、载具管理--新增载具，需增加规则提示
	4、pack入库单打印的模板要跟成品完工入库一致
	5、入库单管理打印表名变更入库单单据类型
	6、pda成品完工入库判未扫描载具扫描货位时直接绑定成功的限制判断未扫描载具扫描货位进行绑定时提示"载具不能为空"
```
