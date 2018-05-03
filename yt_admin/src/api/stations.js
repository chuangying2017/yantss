import Vue from 'vue'
let root = '/admin/stations/'
let orderRoot = '/admin/subscribe/orders/'
let collectOrderRoot = '/admin/subscribe/collect_orders/'
export default {
  orders: {
    get: function (orderId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(orderRoot + orderId).then(
          function ({data: {data: order}}) {
            resolve(order)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    getAll: function (query = {}) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(orderRoot, {
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
    getByStation: function (stationId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(orderRoot, {
          params: {
            station_id: stationId
          }
        }).then(
          function ({data: {data: orders}}) {
            console.log(orders)
            resolve(orders)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    reassign: function (orderId, newStationId) {
      return new Promise(function (resolve, reject) {
        Vue.http.put(orderRoot + orderId, {
          station: newStationId
        }).then(
          function () {
            resolve()
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  },
  collect_orders: {
    get: function (orderId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(collectOrderRoot + orderId).then(
          function ({data: {data: order}}) {
            resolve(order)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    getAll: function (query = {}) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(collectOrderRoot, {
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
    getByStation: function (stationId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(collectOrderRoot, {
          params: {
            station_id: stationId
          }
        }).then(
          function ({data: {data: orders}}) {
            console.log(orders)
            resolve(orders)
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  },
  unbind: function (stationId, uid) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('/admin/stations/' + stationId + '/unbind', {
        user: uid
      }).then(function (data) {
        resolve(data)
      }, function (error) {
        reject(error)
      })
    })
  },
  getDistricts: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/districts/').then(function ({data: {data: districts}}) {
        resolve(districts)
      }, function (error) {
        reject(error)
      })
    })
  },
  get: function (stationId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + stationId).then(
        function ({data: {data: station}}) {
          resolve(station)
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
        function ({data: {data: stations}}) {
          resolve(stations)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (station) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, station).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (station) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + station.id, station).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (stationId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + stationId).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  updateKpi: function (station, kpi) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + station.id + '/kpi', {
        user_count_kpi: kpi
      }).then(
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
