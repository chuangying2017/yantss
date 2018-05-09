import Vue from 'vue'
import {API_ROOT} from 'src/config'
import Auth from 'src/services/authService.js'
let root = '/admin/invoices/'
let stationRoot = root + 'stations/'
export default {
  getList: function (query) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(stationRoot, {
        params: query
      }).then(
        function ({data: {data: list}}) {
          resolve(list)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getDetail: function (invoiceNo, query = null) {
    console.log(query)
    var path = '/orders'
    if ('_type' in query && query._type === 'collect') {
      path = '/collect_orders'
    }
    delete query._type
    return new Promise(function (resolve, reject) {
      Vue.http.get(stationRoot + invoiceNo + path, {
        params: query
      }).then(
        function ({data: {data: orders, meta: {pagination: pagination}}}) {
          resolve({
            orders: orders,
            pagination: pagination
          })
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getInvoices: function (invoiceNo) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(stationRoot + invoiceNo).then(
        function ({data: {data: invoices}}) {
          resolve(invoices)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getExportLink: function (invoiceNo, type) {
    var token = Auth.check()
    return API_ROOT + stationRoot + invoiceNo + '?token=' + token + '&export=' + type

  },
  listBonus () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + 'bonus').then(
        function (data) {
          resolve(data.data.data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getBonusDownload (date) {
    return API_ROOT + '/admin/invoices/bonus?date=' + date
  }
}
