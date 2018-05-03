import {WILDDOG_STAFF} from './../config'

var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')
var campaignRef = new window.Wilddog('https://yt-test.wilddogio.com/campaigns')
var memberRef = new window.Wilddog('https://yt-test.wilddogio.com/members')

export default {
  staffs: {
    create: function (staffId, info) {
      return new Promise(function (resolve, reject) {
        staffRef.child(staffId).set(info, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    update: function (path, data) {
      return new Promise(function (resolve, reject) {
        staffRef.child(path).set(data, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    get: function (path) {
      return new Promise(function (resolve, reject) {
        staffRef.child(path).once('value', function (snapshot) {
          resolve(snapshot.val())
        })
      })
    }
  },
  campaigns: {
    create: function (campaignId, campaignInfo) {
      return new Promise(function (resolve, reject) {
        campaignRef.child(campaignId).set({'members': '', 'users': '', 'campaignInfo': campaignInfo}, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    update: function (path, data) {
      return new Promise(function (resolve, reject) {
        campaignRef.child(path).update(data, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    get: function (path) {
      return new Promise(function (resolve, reject) {
        campaignRef.child(path).once('value', function (snapshot) {
          resolve(snapshot.val())
        })
      })
    }
  },
  members: {
    create: function (memberId) {
      return new Promise(function (resolve, reject) {
        memberRef.child(memberId).set({'campaigns': '', 'tickets': ''}, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    update: function (path, data) {
      return new Promise(function (resolve, reject) {
        memberRef.child(path).set(data, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      })
    },
    get: function (path) {
      return new Promise(function (resolve, reject) {
        memberRef.child(path).once('value', function (snapshot) {
          resolve(snapshot.val())
        })
      })
    }
  }
}
