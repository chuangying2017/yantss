import Vue from 'vue'
let stationRoot = '/admin/statements/stations/'
let storeRoot = '/admin/statements/stores/'
export default {
  stations: {
    get: function (stationId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(stationRoot + stationId).then(
          function ({data: {data: statements}}) {
            resolve(statements)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    getDetail: function (stationId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(stationRoot + stationId).then(
          function ({data: {data: statements}}) {
            resolve(statements)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    getAll: function () {
      return new Promise(function (resolve, reject) {
        Vue.http.get(stationRoot).then(
          function ({data: {data: statements}}) {
            resolve(statements)
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  },
  stores: {
    get: function (storeId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(storeRoot + storeId).then(
          function ({data: {data: statements}}) {
            resolve(statements)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    getAll: function () {
      return new Promise(function (resolve, reject) {
        Vue.http.get(storeRoot).then(
          function ({data: {data: statements}}) {
            resolve(statements)
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  }
}
