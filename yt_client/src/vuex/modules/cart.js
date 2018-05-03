import {
  ADD_CART,
  DEL_CART,
  NEW_CART,
  CLE_CART
} from './../types'
import _ from 'underscore'

const state = {
  skus: []
}

const mutations = {
  [NEW_CART] (state, action) {
    state.skus = action.skus
  },
  [ADD_CART] (state, action) {
    state.skus.push(action.sku)
    window.localStorage.setItem('cart', JSON.stringify(state.skus))
  },
  [DEL_CART] (state, action) {
    state.skus = _.without(state.skus, action.sku)
    window.localStorage.setItem('cart', JSON.stringify(state.skus))
  },
  [CLE_CART] (state, action) {
    state.skus = []
    window.localStorage.setItem('cart', JSON.stringify(state.skus))
  }
}

export default {
  state,
  mutations
}
