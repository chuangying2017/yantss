import {
  LOAD_CATEGORIES
} from './../types'
const state = {
  data: []
}
const mutations = {
  [LOAD_CATEGORIES] (state, action) {
    state.data = action.data
  }
}
export default {
  state,
  mutations
}
