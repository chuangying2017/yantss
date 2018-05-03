import Vue from 'vue'
let root = '/admin/card/categories/'
export default {
  get: function (cardId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + cardId + '/edit').then(
        function ({data: {data: card}}) {
          console.log(card)
          resolve(card)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'index').then(
        function ({data: {data: allcards}}) {
          resolve(allcards)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (card) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root + 'update', card).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (card) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root + 'add', card).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (cardId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + cardId + '/del').then(
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
