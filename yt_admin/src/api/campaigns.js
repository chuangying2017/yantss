import Vue from 'vue'
let root = '/admin/campaigns/'
export default {
  get: function (campaignId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + campaignId).then(
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
      Vue.http.get(root).then(
        function (data) {
          console.log(data)
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (campagin) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, campagin).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (campaignId, campaign) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + campaignId, campaign).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (campaignId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + campaignId).then(
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
