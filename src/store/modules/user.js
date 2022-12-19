import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter ,asyncRoutes ,constantRoutes ,anyRoutes} from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    buttons:[],
    roles:[],
    // 存储配置的路由
    resultAsyncRoutes:[],
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
 // 存储用户信息
  SET_USERINFo:(state,userInfo)=>{
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    // 菜单权限标记
    state.routes = userInfo.routes;
    // 按钮权限标记
    state.buttons = userInfo.buttons;
    // 角色
    state.roles = userInfo.roles;
  },
  // 配置权限路由
  SET_RESULTASYNCROUTES:(state,resultAsyncRoutes)=>{
    state.resultAsyncRoutes = resultAsyncRoutes;
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
    router.addRoutes(state.resultAllRoutes);
  }
}
// 定义一个函数
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  return asyncRoutes.filter(item=>{
    //console.log(item);
    if(routes.indexOf(item.name)!=-1){
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes);
      }
      return true;
    }
  })
}
const actions = {
  // 处理登录业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    if(result.code == 20000){
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'));
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        // vuex存储用户全部信息
        commit('SET_USERINFo',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

