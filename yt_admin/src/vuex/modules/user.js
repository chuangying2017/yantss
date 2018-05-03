import {
  LOGIN_SUCCESS,
  USERINFO_SUCCESS,
  LOGOUT_USER
} from './../types'

const state = {
  token: null,
  info: null
}

const mutations = {
  [LOGIN_SUCCESS] (state, action) {
    state.token = action.token
  },
  [USERINFO_SUCCESS] (state, action) {
    state.info = action.user
  },
  [LOGOUT_USER] (state, action) {
    state.token = null
    state.info = null
  }
}

export default {
  state,
  mutations
}
