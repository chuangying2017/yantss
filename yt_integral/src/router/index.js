import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//商城
import Mall from '@/components/Mall/index.vue'
//积分签到
import Integralin from '@/components/Integralin/index.vue'
//积分兑换
import Exchange from '@/components/Exchange/index.vue'

export default new Router({
	mode: 'history',
	routes: [
		// {
		// 	path:'/',
		// 	redirect:'/mall/home'
		// },
	    {
	    	//商城
	    	path: '/mall',
	      	name: 'Mall',
	      	component: Mall,
	      	children:[
	      		//商城首页
	      		{path:'/home',name:'Home',component: resolve => require(['@/components/Mall/Home/index.vue'], resolve)},
	      		//商品选择
	      		{path:'/productdetail',name:'Productdetail',component:resolve => require(['@/components/Mall/Product/productdetail.vue'],resolve)},
	      		//商品预览
	      		{path:'/productpreview',name:'Productpreview',component:resolve => require(['@/components/Mall/Product/productpreview.vue'],resolve)},
	      	]
	    },
	    //积分签到integrallist
	    {
	    	path:'/integralin',
	    	name:'Integralin',
	    	component:Integralin,
	    	children:[
	    		//积分签到
	    		{path:'integralsignin',name:'Integralsignin',component:resolve => require(['@/components/Integralin/integralsignin.vue'],resolve)},
	    		//积分来源列表
	    		{path:'integrallist',name:'Integrallist',component:resolve => require(['@/components/Integralin/integrallist.vue'],resolve)},
	    	]
	    },
	    //积分兑换
	    {
	    	path:'/exchange',
	    	name:'Exchange',
	    	component:Exchange,
	    	children:[
	    		//兑换列表
	    		{path:'exchangelist',name:'Exchangelist',component:resolve => require(['@/components/Exchange/exchangelist.vue'],resolve)},
	    		//兑换确认及规则
	    		{path:'exchangedetail/:id',name:'Exchangedetail',component:resolve => require(['@/components/Exchange/exchangedetail.vue'],resolve)},
	    		//兑换成功
	    		{path:'exchangesuc',name:'Exchangesuc',component:resolve => require(['@/components/Exchange/exchangesuc.vue'],resolve)},
	    		//是否兑换
	    		{path:'wthexchange',name:'Wthexchange',component:resolve => require(['@/components/Exchange/wthexchange.vue'],resolve)},
	    		//兑换记录
	    		{path:'exrecord',name:'Exrecord',component:resolve => require(['@/components/Exchange/exrecord.vue'],resolve)}
	    	]
	    }
	]
})
