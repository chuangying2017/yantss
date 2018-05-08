import Vue from 'vue'
let root = '/others/protocol/'
export default {
  getall: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'find').then(
        function ({data: {protocols: paygredetail}}) {
          resolve(paygredetail)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (group) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root + 'edit', group).then(
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
