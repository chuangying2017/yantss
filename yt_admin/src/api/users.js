import Vue from 'vue'
export default {
  get: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/users/info').then(
        function ({data: {data: user}}) {
          resolve(user)
        },
        function (error) {
          reject(error)
        }
      )
    })
  },
  getnewuser:function(){
  	return new Promise(function(resolve,reject){
  		 Vue.http.get('/others/protocol/show/1').then(
  		 	function({data:{setting:{value:{interval_time:intertime}}}}){
  		 		resolve(intertime)
  		 	},
  		 	function(error){
  		 		reject(error)
  		 	}
  		 )
  	})
  },
  setnewuser:function(inter){
  	return new Promise(function(resolve,reject){
  		Vue.http.post('/others/protocol/setting/1',{'interval_time':inter}).then(function(data){		
  			resolve(data)
  		},function(){
  			
  		})
  	})
  },
  getAll (keyword = '') {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/clients/users', {
        params: {
          keyword: keyword
        }
      }).then(
        function ({data: users}) {
          resolve(users)
        },
        function (error) {
          reject(error)
        }
      )
    })
  },
  getUserByOrderNos (orderNos = '') {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/clients/users', {
        params: {
          type: 'ordernos',
          orderNos: orderNos
        }
      }).then(
        function ({data: users}) {
          resolve(users)
        },
        function (error) {
          reject(error)
        }
      )
    })
  }
}
