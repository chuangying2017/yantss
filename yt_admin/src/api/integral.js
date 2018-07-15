/* eslint-disable camelcase,semi */
// eslint-disable-next-line camelcase
import Vue from 'vue'
// eslint-disable-next-line semi
let url_path = '/admin/integral';
export default {
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(url_path + '/category').then(
        function (data) {
          resolve(data.data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (parmeter) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(url_path + '/category', parmeter).then(
        function (data) {
          resolve(data)
      },
        function (data) {
          reject(data)
      }
      )
    })
  },
  remove: function (id) {
    return Vue.http.delete(url_path + '/category/' + id)
  }
}
