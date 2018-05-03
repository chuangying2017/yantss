import Vue from 'vue'
export default {
  get: function (orderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/mall/return-orders/' + orderId).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/mall/return-orders').then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  operate: function (orderId, action) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/mall/orders/' + orderId + '/return', action).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  recieve: function (orderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/mall/orders/' + orderId + '/done').then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  }
}
