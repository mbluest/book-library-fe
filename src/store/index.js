import { createStore } from 'vuex'
import Http from '@/plugins/Http'

export default createStore({
  state: {
    accountId: null,
    role: null,
    login: false,
    token: null,
  },
  getters: {
    getUser(state){
      return state.accountId
    },
    getRole(state){
      return state.role
    },
    getLogin(state){
      return state
    },
    getToken(state){
      return state
    }
  },
  mutations: {
    setAccountId(state, accountId){
      state.accountId = accountId
    },
    removeAccountId(state){
      state.accountId = null
      state.role = null
      state.login = false
      state.token = null
    },
    setRole(state, role){
      state.role = role
    },
    setLogin(state, login){
      state.login = login
    },
    setToken(state, token){
      state.token = token
    }
  },
  actions: {
    login({commit}, payload){
      localStorage.setItem('accountId', payload.accountId)
      localStorage.setItem('role', payload.role)
      localStorage.setItem('login', true)
      localStorage.setItem('token', payload.auth)
      Http.setHeaderAuthorization(payload.auth);
      commit("setLogin", true)
      commit("setAccountId", payload.accountId)
      commit("setRole", payload.role)
      commit("setToken", payload.auth)
    },
    logout({commit}){
      localStorage.removeItem('accountId')
      localStorage.removeItem('role')
      localStorage.removeItem('login')
      localStorage.removeItem("token")
      Http.clearHeaderAuthorization()
      commit("removeAccountId")
    },
    restoreToken({ dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        const accountId = localStorage.getItem('accountId')
        const role = localStorage.getItem('role')
        const login = localStorage.getItem("login")
        dispatch("login", {accountId, role, login, auth: token})
      }else{
        dispatch("logout")
      }
    }
  },
  modules: {
  }
})
