const state = {
  NoRefreshRouter: [],
  OpenRouter: [] // 打开的页面
}

const mutations = {
  // 不刷新页面
  Get_NoRefreshRouter: (state, view) => {
    state.NoRefreshRouter = state.OpenRouter.filter(item => item !== view.name)
  },
  // 打开的页面
  Get_OpenRouter: (state, view) => {
    state.OpenRouter = view.map(item => item.name)
  }
}

const actions = {
  getNoRefreshRouter({ commit }, view) {
    return new Promise(resolve => {
      commit('Get_NoRefreshRouter', view)
      resolve([...state.NoRefreshRouter])
    })
  },
  getOpenRouter({ commit }, view) {
    return new Promise(resolve => {
      commit('Get_OpenRouter', view)
      resolve([...state.OpenRouter])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
