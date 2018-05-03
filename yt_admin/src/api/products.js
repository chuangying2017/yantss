import Vue from 'vue'
let root = '/admin/products/'
export default {
  getMix: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'mix-products').then(
        function ({data: data}) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getEntity: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'mix-skus').then(
        function ({data: data}) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  status: function (action, productId) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + productId + '/' + action).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  get: function (productId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + productId).then(
        function ({data: {data: data}}) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function (queryObject = {}) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root, {
        params: queryObject
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
  create: function (product) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, product).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (id, product) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + id, product).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (productId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + productId).then(
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
