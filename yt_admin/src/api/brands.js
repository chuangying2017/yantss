import Vue from 'vue'
export default {
  get: function (brandId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/mall/brands/' + brandId).then(
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
      Vue.http.get('/admin/mall/brands').then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (brandId) {
    return new Promise(function (resolve, reject) {
      Vue.http.post('/admin/mall/brands/', brandId).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (brandId, brand) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/mall/brands/' + brandId, brand).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (brandId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete('/admin/mall/brands/' + brandId).then(
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
