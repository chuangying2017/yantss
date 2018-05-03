import Vue from 'vue'
let root = '/admin/products/cats/'
export default {
  get: function (catId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + catId).then(
        function ({data: {data: category}}) {
          console.log(category)
          resolve(category)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root).then(
        function ({data: {data: categories}}) {
          resolve(categories)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (category) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, category).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (cat) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + cat.id, cat).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (catId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + catId).then(
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
