<template>
  <!-- <div :class="classObj" class="app-wrapper"> -->
  <div class="app-wrapper">
    <!-- 菜单区域 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- <sidebar class="sidebar-container" /> -->
    <!-- 内容区域 -->
    <!-- <div :class="{ hasTagsView: needTagsView }" class="main-container"> -->
    <div class="main-container" :class="{ hasTagsView: needTagsView }">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 顶部栏 -->
        <dropdown v-if="needTagsView" />
        <!-- <navbar /> -->
        <!-- 页面标签栏 -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <!-- 页面内容 -->
      <app-main />
      <!-- 右侧设置按钮 暂时隐藏 -->
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel>-->
    </div>
  </div>
</template>

<script>
// import RightPanel from '@/components/RightPanel'
// Settings,
import { AppMain } from './components'
import Dropdown from '@/components/Dropdown'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    // Navbar,
    Dropdown
    // RightPanel,
    // Settings,
    // Sidebar,
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
