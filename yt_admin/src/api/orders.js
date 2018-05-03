import Vue from 'vue'
export default {
  get: function (orderNo) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/mall/orders/' + orderNo).then(
        function ({data: {data: order}}) {
          resolve(order)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function (query) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/mall/orders', {
        params: query
      }).then(
        function ({data: data}) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  cancel: function (orderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/mall/orders/' + orderId + '/cacnel').then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  deliver: function (orderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/mall/orders/' + orderId + '/deliver').then(
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
