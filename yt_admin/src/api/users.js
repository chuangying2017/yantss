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
