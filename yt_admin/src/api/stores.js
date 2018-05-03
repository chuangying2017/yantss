import Vue from 'vue'
export default {
  get: function (storeId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/store' + storeId).then(
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
      Vue.http.get('/admin/store').then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (store) {
    return new Promise(function (resolve, reject) {
      Vue.http.post('/admin/store', store).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (store) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/store', store).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (storeId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete('/admin/store' + storeId).then(
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
