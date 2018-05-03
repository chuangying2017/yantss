import api from './api'
import {WILDDOG_STAFF} from './../config'

var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')
var countsRef = new window.Wilddog(WILDDOG_STAFF + '/counts')

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
  get: function (staffId) {
    return api.staffs.get(staffId)
  },
  getCountsStaff: function (staffId) {
    return new Promise(function (resolve, reject) {
      countsRef.child(staffId).once('value', function (snapshot) {
        resolve(snapshot.val())
      })
    })
  },
  getRank: function () {
    return new Promise(function (resolve, reject) {
      var arr = []
      countsRef.orderByChild('clientsCount').limitToLast(200).on('child_added', function (snapshot) {
        var newItem = {}
        newItem.staffId = snapshot.key()
        newItem.clients = snapshot.val().clientsCount
        arr.push(newItem)
      })
      resolve(arr)
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      countsRef.limitToFirst(400).once('value', function (snapshot) {
        // console.log(snapshot.val())
        resolve(snapshot.val())
      })
    })
  },
  getStaffs: function () {
    return new Promise(function (resolve, reject) {
      staffRef.limitToFirst(400).once('value', function (snapshot) {
        // console.log(snapshot.val())
        resolve(snapshot.val())
      })
    })
  }
}
