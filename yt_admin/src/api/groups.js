import Vue from 'vue'
let root = '/admin/products/groups/'
export default {
  get: function (groupId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + groupId).then(
        function ({data: {data: group}}) {
          console.log(group)
          resolve(group)
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
  create: function (group) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, group).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (group) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + group.id, group).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (groupId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + groupId).then(
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
