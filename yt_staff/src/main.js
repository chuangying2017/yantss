require('./assets/styles/main.css')

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'

import App from './App'
import Routes from './routes.js'

import {API_ROOT, MIXPANEL_KEY} from './config.js'
// mixpanel init
window.mixpanel.init(MIXPANEL_KEY)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueForm)
Vue.filter('filtproductit', function productit(val){
	if (val == null) return val
  return val.replace(/<br\/>/gi,'');
})

var router = new VueRouter({
  // history: true
})

Vue.http.interceptors.push(function () {
  return {
    request: function (request) {
      if (request.method !== 'jsonp') {
        request.url = API_ROOT + request.url
      }
      return request
    }
  }
})

Routes.init(router)

/* eslint-disable no-new */
router.start(App, 'app')
