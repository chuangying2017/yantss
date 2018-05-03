import Vue from 'vue'
let root = '/admin/promotions/giftcards/'
export default {
  get: function (giftcardId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/promotions/giftcards/' + giftcardId).then(
        function (data) {
          resolve(data.data.data)
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
        function ({data: {data: giftcards, meta: meta}}) {
          if (meta && meta.pagination) {
            resolve({
              giftcards: giftcards,
              pagination: meta.pagination
            })
          } else {
            resolve(giftcards)
          }
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (giftcard) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, giftcard).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (giftcardId, data) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + giftcardId, data).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (giftcardId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + giftcardId).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  dispatch (params) {
    return new Promise(function (resolve, reject) {
      Vue.http.post('/admin/promotions/tickets', params).then(function (data) {
        resolve(true)
      }, function (error) {
        reject(error)
      })
    })
  }
}
