require('./assets/styles/main.css')

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'

import App from './App'
import {API_ROOT} from './config'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueForm)

import Routes from './routes.js'

var router = new VueRouter({
  history: true
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
