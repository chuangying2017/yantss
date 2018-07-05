import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Mall from '@/components/Mall/index.vue'
//import Mallhome from '@/components/Mall/Home/index'

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/mall',
      name: 'Mall',
      component: Mall,
      children:[
      	{path:'/home',component: resolve => require(['@/components/Mall/Home/index.vue'], resolve)}
      ]
    }
  ]
})
