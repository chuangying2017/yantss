import api from './api'
import {WILDDOG_STAFF} from './../config'

var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')

export default {
  exist: function (staffId) {
    return new Promise(function (resolve, reject) {
      staffRef.child(staffId).once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        } else {
          resolve(snapshot.exists())
        }
      })
    })
  },
  createStaff: function (staffId) {
    return api.staffs.create(staffId, {'clientsCount': 0})
  },
  addNewClient: function (staffId, clientId, clientInfo, orderInfo) {
    var countsRef = new window.Wilddog(WILDDOG_STAFF + '/counts/' + staffId + '/clientsCount')
    var clientRef = new window.Wilddog(WILDDOG_STAFF + '/counts/' + staffId + '/clients/' + clientId)
    console.log('addNew')
    countsRef.transaction(function (data) {
      return data + 1
    })
    clientRef.set({orderNumber: orderInfo.order_no, clientName: clientInfo.nickname})
    return api.staffs.update(staffId + '/' + clientId, {'clientInfo': clientInfo, 'orderInfo': orderInfo})
  },
  isClientExist: function (staffId, clientId) {
    return new Promise(function (resolve, reject) {
      staffRef.child(staffId + '/' + clientId).once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        } else {
          resolve(snapshot.exists())
        }
      })
    })
  }
}
