<template>
  <div ref="main">
    <!-- 导航栏 -->
    <div class="nav">
      <!-- <div class="nav-item"><span class="nav-item-title">导航栏1</span></div> -->
      <div class="nav-content">
        <div class="nav-item">
          <div class="nav-item-title">
            <div class="title-wms" @click="isShow = !isShow">
              <!-- <span class="img"><img src="../../assets/images/close.png" alt=""></span> -->
              <span class="all">耀宁WMS</span>
            </div>
            <!-- <div class="line"></div> -->
            <div class="title-all">
              <!-- <span class="img"><img src="../../assets/images/home.png" alt="" /></span>
              <span class="all">总览</span> -->
            </div>
          </div>
          <!-- 下拉菜单 -->
          <div v-show="isShow" class="dropdown-content">
            <div class="nav-content">
              <div class="quick-access">
                <div class="quick-title">快捷访问</div>
                <div class="quick-model">
                  <div v-for="(item, index) in unique" :key="index">
                    <div v-if="index <= 13" class="text" @click="isShow = !isShow">
                      <router-link :to="item.routerUrl"> {{ item.title }}</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dropdown-menu">
                <!-- <div class="menuItem">菜单1</div>
            <div class="menuItem">菜单菜单1</div>
            <div class="menuItem">菜单2</div>
            <div class="menuItem">菜单菜单菜单1</div>
            <div class="menuItem">菜单3</div> -->
                <div class="top-content">
                  <div class="top-list">
                    <div class="text">最近访问</div>
                    <div class="text">系统日志</div>
                    <div class="text">数据字典</div>
                  </div>
                  <div class="top-search">
                    <el-select
                      ref="headerSearchSelect"
                      v-model="search"
                      :remote-method="querySearch"
                      filterable
                      default-first-option
                      remote
                      placeholder="搜索功能名称、缩写"
                      class="header-search-select"
                      @change="change"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.path"
                        :value="item"
                        :label="item.title.join(' > ')"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="bottom-content">
                  <div v-for="(item, index) in navdetails" :key="index" class="content">
                    <dd class="content-first">{{ item.label }}</dd>
                    <dd
                      v-for="(item2, index2) in item.hreflist"
                      :key="index2"
                      class="content-child"
                      @click="getRoute(item2.routerUrl, item2.label, item2.name)"
                    >
                      <span v-if="roles.find(item => item == item2.roles)">{{ item2.label }}</span>
                      <!-- <router-link v-show="item2.noHidden" v-if="roles.find(item => item == item2.roles)"
                        :to="item2.routerUrl">{{ item2.label }}</router-link> -->
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 页面标签栏 -->
      <div class="tags">
        <span v-for="(item, index3) in unique" :key="index3" class="tags-item">
          <router-link :to="item.routerUrl" class="tags-router">{{ item.title }}</router-link>
          <span class="close"><i class="el-icon-close" @click.stop="handleClose(item, index3)" /></span>
        </span>
      </div>
      <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <!-- <search id="header-search" class="right-menu-item" /> -->

          <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>

          <lang-select class="right-menu-item hover-effect" />
        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../../static/image/common/user.png" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>
                {{ $t('navbar.profile') }}
              </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a> -->
            <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { quickAccess, navdetails } from './config'
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'
import { API } from '@/api/generalAPI'
import store from '@/store'
import Fuse from 'fuse.js'
import path from 'path'
import i18n from '@/lang'
export default {
  components: {
    Screenfull,
    SizeSelect,
    LangSelect
    // Search
  },
  data() {
    return {
      roles: store.getters.roles,
      quickAccess,
      navdetails,
      search: '',
      options: [],
      searchPool: [],
      fuse: undefined,
      isShow: false,
      route: [],
      routeArray: [],
      unique: [],
      details: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    routes() {
      return this.$store.getters.permission_routes
    },
    lang() {
      return this.$store.getters.language
    },
    supportPinyinSearch() {
      return this.$store.state.settings.supportPinyinSearch
    }
  },
  watch: {
    lang() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      // Support pinyin search
      if (this.lang === 'zh' && this.supportPinyinSearch) {
        this.addPinyinField(list)
      }
      this.initFuse(list)
    }
    // show(value) {
    //   if (value) {
    //     document.body.addEventListener('click', this.close)
    //   } else {
    //     document.body.removeEventListener('click', this.close)
    //   }
    // }
  },
  mounted() {
    document.addEventListener('click', this.bodyCloseNavmenus)
    this.searchPool = this.generateRoutes(this.routes)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyCloseNavmenus)
  },
  created() {
    this.isShow = !this.isShow
    this.getRoute()
    // this.getMenu()
    this.unique = JSON.parse(sessionStorage.getItem('router'))
    // console.log(this.$store.getters.roles, 'roles')
  },
  methods: {
    async addPinyinField(list) {
      const { default: pinyin } = await import('pinyin')
      if (Array.isArray(list)) {
        list.forEach(element => {
          const title = element.title
          if (Array.isArray(title)) {
            title.forEach(v => {
              v = pinyin(v, {
                style: pinyin.STYLE_NORMAL
              }).join('')
              element.pinyinTitle = v
            })
          }
        })
        return list
      }
    },
    // click() {
    //   this.show = !this.show
    //   if (this.show) {
    //     this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
    //   }
    // },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    change(val) {
      this.isShow = !this.isShow
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      // this.$nextTick(() => {
      //   this.show = false
      // })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'pinyinTitle',
            weight: 0.3
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }
        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }
        if (router.meta && router.meta.title) {
          // generate internationalized title
          const i18ntitle = i18n.t(`route.${router.meta.title}`)
          data.title = [...data.title, i18ntitle]
          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }
        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
    // 导航菜单栏点击关闭（导航菜单栏以外区域）
    bodyCloseNavmenus(e) {
      const self = this
      if (this.$refs.main && !this.$refs.main.contains(e.target)) {
        if (self.isShow === true) {
          self.isShow = false
        }
      }
    },
    getRoute(url, label, routeName) {
      // var route = this.$route.path
      // this.$emit('update:currentRoute', routeName);
      const { name } = this.$route // 获取当前路由的名称
      const routeMeta = this.$router.meta // 查找路由的meta信息

      if (routeMeta) {
        routeMeta.keepAlive = !routeMeta.keepAlive // 切换 keep-alive
        this.$router.replace({ name: name, params: this.$route.params }) // 重新加载当前路由
      }
      this.isShow = !this.isShow
      this.$router.push({ path: url })
      if (url !== undefined && label !== undefined) {
        if (this.unique) {
          this.unique.push({ title: label, routerUrl: url })
          this.routeArray = this.unique.filter(
            (obj, index) => this.unique.findIndex(item => item.routerUrl === obj.routerUrl) === index
          )
        } else {
          this.route.push({ title: label, routerUrl: url })
          this.routeArray = this.route.filter(
            (obj, index) => this.route.findIndex(item => item.routerUrl === obj.routerUrl) === index
          )
        }
        // 存储路由
        sessionStorage.setItem('router', JSON.stringify(this.routeArray))
        this.unique = JSON.parse(sessionStorage.getItem('router'))
      }
    },
    // 关闭标签
    handleClose(item, index) {
      // console.log(item, index)
      // 先把长度保存下来后面用来比较做判断条件
      let length = this.unique.length - 1
      this.closeTab(item)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (item.routerUrl !== this.$route.path) {
        return
      }
      // 判断：如果index和length是一样的，那就代表都是一样的长度，就是最后一位，那就往左跳转一个
      if (index === length) {
        // 再判断：如果length=0，也就是说你删完了所有标签
        if (length === 0) {
          // 那么再判断：如果当前路由不等于index，也就是我首页的路由
          if (this.$route.path !== '/dashboard') {
            // 那么就跳转首页。这一步的意思是：如果删除的最后一个标签不是首页就统一跳转首页，如果你删除的最后一个标签是首页标签，已经在这个首页路由上了，你还跳个什么呢。这不重复操作了吗。
            this.$router.push({ path: '/dashboard' })
          }
        } else {
          // 上面的条件都不成立，没有length=0.也就是说你还有好几个标签，并且你删除的是最后一位标签，那么就往左边挪动一位跳转路由
          this.$router.push({ path: this.unique[index - 1].routerUrl })
        }
      } else {
        // 如果你点击不是最后一位标签，点的前面的，那就往右边跳转
        this.$router.push({ path: this.unique[index].routerUrl })
      }
    },
    closeTab(val) {
      // 同上，找角标，然后用角标的位置对应删除一位。splice：这是数组的删除方法
      let result = this.unique.findIndex(item => item.title === val.title)
      this.unique.splice(result, 1)
      // this.unique = JSON.parse(sessionStorage.getItem('router')).splice(result, 1)
      sessionStorage.setItem('router', JSON.stringify(this.unique))
      this.unique = JSON.parse(sessionStorage.getItem('router'))
      // console.log(this.unique, 'un')
      // sessionStorage.removeItem("a");
    },
    getMenu() {
      API.dataGet('MenuManage', { IsPage: false }, 'GetAll')
        .then(res => {
          if (res.success === true) {
            this.$notify({
              title: '成功',
              message: '完成',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: res.message,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {})
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  z-index: 2000;
  position: relative;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(38, 47, 62);
  border-bottom: 1px solid #ccc;

  .nav-content {
    width: 15%;

    .nav-item {
      // position: relative;
      margin: 0 20px;
      cursor: pointer;
      // transition: all 0.3s linear;

      .nav-item-title {
        // position: relative;
        // display: block;
        // height: inherit;
        // width: inherit;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        font-size: 20px;
        font-weight: 400;
        color: rgb(188, 191, 196);

        .title-wms {
          margin-right: 5px;

          &:hover {
            color: rgb(22, 119, 255);
          }

          .img {
            display: inline-block;
            width: 24px;
            height: 50px;
          }
        }

        .title-all {
          margin-left: 5px;

          .img img {
            display: inline-block;
            height: 20px;
            line-height: 70px !important;
          }
        }

        .line {
          width: 2px;
          height: 30px;
          background-color: rgb(235, 235, 235);
        }

        // &:hover {
        //   color: rgb(22, 119, 255);

        //   &::before {
        //     transform: scale(1);
        //   }
        // }
      }

      .dropdown-content {
        height: 768px;
      }
    }
  }

  .tags {
    flex: 1;
    height: 50px;
    line-height: 50px;
    overflow-x: auto;

    .tags-item {
      display: inline-block;
      // width: 110px;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      color: #ffffff;
      font-size: 16px;
      padding-left: 16px;

      .close {
        font-size: 14px;
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        &:hover {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          background: #1890ff;
        }
      }
    }
  }

  a.tags-router.router-link-active {
    border-bottom: 3px solid #1890ff;
    //color: #1890ff;
    // bottom: 10px;
    // // left: 50%;
    // // transform: translateX(-50%);
    // position: absolute;
    // height: 2px;
    // width: 86px;
    // // border-radius: 2px;
    // background-color: #368FFF;
  }

  ::-webkit-scrollbar {
    /* 隐藏滚动条 */
    display: none;
  }

  .right-menu {
    width: 20%;
    height: 100%;
    line-height: 50px;
    text-align: right;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 45px;
          height: 45px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  // 下拉菜单
  .dropdown-content {
    position: absolute;
    top: 49px; // 为导航栏高度
    left: 0; // 设置为0, 不然会直接定位到父元素下方
    width: 80%;
    height: 0; // 下拉初始高度
    overflow: hidden;
    transition: 0.6s;

    .nav-content {
      width: 100%;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: flex-start;

      .quick-access {
        width: 204px;
        height: 768px;
        background: rgb(16, 17, 24);

        .quick-title {
          color: rgb(177, 180, 186);
          font-size: 18px;
          font-weight: 400;
          width: 140px;
          height: 56px;
          line-height: 56px;
          text-align: left;
          margin: 0 auto;

          &:hover {
            font-weight: 400;
            color: rgb(22, 119, 255);
          }
        }

        .quick-model {
          display: flex;
          flex-direction: column;

          .text {
            width: 140px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin: 10px auto;
            background: rgb(227, 239, 255);
            color: rgb(51, 51, 51);
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .dropdown-menu {
        // padding: 10px 8px 15px;
        // color: white;
        // background-color: rgba($color: #344157, $alpha: 0.5);
        // border-radius: 4px;
        flex: 1;
        height: 768px;
        background-color: rgb(21, 24, 34);

        .top-content {
          height: 56px;
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: flex-start;

          .top-list {
            // flex: 1;
            margin-left: 25px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .text {
              width: 140px;
              margin: 10px;
              font-size: 14px;
              font-weight: 400;
              color: rgb(177, 180, 186);

              &:hover {
                font-weight: 400;
                color: rgb(22, 119, 255);
              }
            }
          }

          .top-search {
            /deep/.el-input--medium .el-input__inner {
              width: 452px;
              height: 32px;
            }
          }
        }

        .bottom-content {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;

          .content {
            width: 10%;
            height: 32px;
            line-height: 32px;
            // margin: 10px;
            color: #ffffff;

            .content-first {
              text-align: left;
              font-size: 18px;

              // &:hover {
              //   color: rgb(22, 119, 255);
              // }
            }

            .content-child {
              text-align: left;
              font-size: 14px;
              color: rgb(177, 180, 186);

              &:hover {
                color: rgb(22, 119, 255);
              }
            }
          }
        }
      }

      // .menuItem {
      //   width: 100%;
      //   height: 42px;
      //   white-space: nowrap;
      //   padding: 0 16px;
      //   font-size: 16px;
      //   line-height: 42px;
      //   color: #000;
      //   cursor: pointer;
      //   transition: all 0.3s ease-in-out;
      //   border-radius: 4px;
      //   &:hover {
      //     background-color: #ccc;
      //   }
      // }
    }
  }
}
</style>
