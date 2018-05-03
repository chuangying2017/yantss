import {WILDDOG_STAFF} from './../config'

var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')

export default {
  staffs: {
    get: function (path) {
      if (path) {
        return new Promise(function (resolve, reject) {
          staffRef.child(path).once('value', function (snapshot) {
            resolve(snapshot.val())
          })
        })
      } else {
        return new Promise(function (resolve, reject) {
          staffRef.once('value', function (snapshot) {
            resolve(snapshot.val())
          })
        })
      }
    }
  }
}
