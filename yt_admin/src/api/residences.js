import Vue from 'vue'
let root = '/admin/residences/'
export default {
  get: function (residenceId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + residenceId).then(
        function ({data: {data: residence}}) {
        	
          resolve(residence)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function (params = {}) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root, {
        params: params
      }).then(
        function ({data: {data: residences, meta: meta}}) {
          if (meta && meta.pagination) {
            resolve({
              residences: residences,
              pagination: meta.pagination
            })
          } else {
            resolve(residences)
          }
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getDropdown: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'getDropdown').then(
        function ({data: {data: residences}}) {
          resolve(residences)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (residence) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, residence).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (residence) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + residence.id, residence).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (residenceId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + residenceId).then(
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
