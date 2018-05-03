import api from './api'

// var staffRef = new window.Wilddog('https://yantang.wilddogio.com/staffs')
var staffClientRef = new window.Wilddog('https://yantang.wilddogio.com/staffs_clients')

export default{
  exist: function (staffId, clientId) {
    return new Promise(function (resolve, reject) {
      staffClientRef.child(staffId + '/' + clientId).once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        } else {
          resolve(snapshot.exists())
        }
      })
    })
  },
  create: function (staffId, clientId, clientInfo, orderInfo) {
    return api.clients.create(staffId, clientId, {
      clientInfo: clientInfo,
      orderInfo: orderInfo
    })
  }
}
