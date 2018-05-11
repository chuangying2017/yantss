require('./assets/styles/main.css')
require('./assets/styles/pure-grid.css')
// dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'
import Vuex from 'vuex'
// components
import App from './App'
import Routes from './routes.js'
import wx from './wx.js'
import utils from './utils.js'
// configs & apis
import {API_ROOT, MIXPANEL_KEY} from './config'
import {strictFilter, productFilter} from './filters'
// mixpanel init
window.mixpanel.init(MIXPANEL_KEY)
// plugins
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueForm)
Vue.use(Vuex)
//Vue.use(BaiduMap,{
//	ak:'pux0Qkvz9RqnYHxBC9HOGECKFb1ACaBT'
//})
Vue.filter('strictFilter', strictFilter)
Vue.filter('productFilter', productFilter)
utils.ObjectAssignPolyfill()
// router
var router = new VueRouter({
  // mode: 'history'
})
// interceptor
Vue.http.interceptors.push(function () {
  return {
    request: function (request) {
      if (request.method !== 'jsonp') {
        request.url = API_ROOT + request.url
      }
      return request
    },
    response: function (response) {
      return response
    }
  }
})
Routes.init(router)
// init weixin
wx.init()
/* eslint-disable no-new */
router.start(App, 'app')
