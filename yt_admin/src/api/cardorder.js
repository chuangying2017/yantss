import Vue from 'vue'
let orderRoot = '/admin/card/cardorder/'
export default {
  getAll: function (query = {}) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(orderRoot + 'index', {
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
  get: function (cardorderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(orderRoot + 'detail/' + cardorderId).then(
        function ({data: {data: cardorder}}) {
          resolve(cardorder)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getOneUserCards: function (cardorderId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(orderRoot + 'usercard/' + cardorderId).then(
        function ({data: {data: cardorder}}) {
          resolve(cardorder)
        },
        function (data) {
          reject(data)
        }
      )
    })
  }
}
