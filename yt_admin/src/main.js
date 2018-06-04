import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'
import VueValidator from 'vue-validator'
import App from './App'
import RoutesConfig from './routes'
import {API_ROOT} from './config'
import {sync} from 'vuex-router-sync'
import store from './vuex/store'
/**
 * vue plugins
 */
Vue.config.silent = true
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueForm)
Vue.use(VueValidator)

Vue.filter('date', function (val) {
  if (!val) return
  return val.split('.')[0]
})
Vue.filter('money', function (val) {
  if (!val) return
  return (val / 100).toFixed(2)
})
Vue.filter('filtproductit', function productit(val){
	if (val == null) return val
  return val.replace(/<br\/>/gi,'');
})


/**
 * router
 * @type {boolean}
 */
var router = new VueRouter()
sync(store, router)
RoutesConfig.init(router)
/**
 * vue resource
 */
Vue.http.interceptors.push(function (request, next) {
  request.url = API_ROOT + request.url
  next(response => {
    if (response.ok && response.data && typeof response.data === 'string') {
      response.data = JSON.parse(response.data)
    }
  })
})
var config = {
  syncURL: 'https://yantang.wilddogio.com/associateStation'
}
window.wilddog.initializeApp(config)
/* eslint-disable no-new */
router.start(App, 'app')
