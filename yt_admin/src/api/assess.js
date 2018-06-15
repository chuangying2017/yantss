import Vue from 'vue'
//let root = '/admin/residences/'
export default {
	set:function(starobj){
		return new Promise(function(resolve,reject){
			Vue.http.post('/others/protocol/setting/2',starobj).then(function(){
				
			}).then(function(data){
				reject(data)
			})
		})
	},
	get:function(){
		return new Promise(function(resolve,reject){
			Vue.http.get('/others/protocol/show/2').then(function({data:{setting:{value:starobj}}}){
				console.log(starobj)
				resolve(starobj)
			}).then(function(data){
				reject(data)
			})
		})
	},
	getstation:function(){
		return new Promise(function(resolve,reject){
			Vue.http.get('/admin/comments/stationShow').then(function({data:{stations}}){
				resolve(stations)
			}).then(function(data){
				reject(data)
			})
		})
	},
//	获取评论内容
	getalgetcont:function(getalcont){
		console.log(getalcont)
		return new Promise(function(resolve,reject){
			Vue.http.get('/admin/comments/AdminComments',{
        		params: getalcont
      		}).then(function({data}){
				resolve(data)
			}).then(function(data){
				reject(data)
			})
		})
	}
//get: function (residenceId) {
//  return new Promise(function (resolve, reject) {
//    Vue.http.get(root + residenceId).then(
//      function ({data: {data: residence}}) {
//      	
//        resolve(residence)
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//},
//getAll: function (params = {}) {
//  return new Promise(function (resolve, reject) {
//    Vue.http.get(root, {
//      params: params
//    }).then(
//      function ({data: {data: residences, meta: meta}}) {
//        if (meta && meta.pagination) {
//          resolve({
//            residences: residences,
//            pagination: meta.pagination
//          })
//        } else {
//          resolve(residences)
//        }
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//},
//getDropdown: function () {
//  return new Promise(function (resolve, reject) {
//    Vue.http.get(root + 'getDropdown').then(
//      function ({data: {data: residences}}) {
//        resolve(residences)
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//},
//create: function (residence) {
//  return new Promise(function (resolve, reject) {
//    Vue.http.post(root, residence).then(
//      function (data) {
//        resolve(data)
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//},
//update: function (residence) {
//  return new Promise(function (resolve, reject) {
//    Vue.http.put(root + residence.id, residence).then(
//      function (data) {
//        resolve(data)
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//},
//delete: function (residenceId) {
//  return new Promise(function (resolve, reject) {
//    Vue.http.delete(root + residenceId).then(
//      function (data) {
//        resolve(data)
//      },
//      function (data) {
//        reject(data)
//      }
//    )
//  })
//}
}
