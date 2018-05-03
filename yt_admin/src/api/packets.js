import Vue from 'vue'
let root = '/admin/promotions/red-envelopes/'
export default {
  get (packetId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + packetId).then(
        function ({data: {data: packets}}) {
          resolve(packets)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  list: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root).then(
        function ({data: {data: packets}}) {
          resolve(packets)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (packet) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, packet).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (packetId, packet) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + packetId, packet).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  changeStatus: function (packetId, status) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + packetId + '/' + status).then(
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
