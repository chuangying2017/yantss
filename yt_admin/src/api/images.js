import Vue from 'vue'
export default {
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/images').then(
        function ({data: data}) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getToken: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/images/token').then(
        function ({data: {data: {token: token}}}) {
          resolve(token)
        },
        function (data) {
          reject(data)
        }
      )
    })
  }
}
