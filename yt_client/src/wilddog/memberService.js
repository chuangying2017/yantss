import api from './api.js'

var memberRef = new window.Wilddog('https://yt-test.wilddogio.com/members')

export default {
  exsit: function (memberId) {
    return new Promise(function (resolve, reject) {
      memberRef.child(memberId).once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        } else {
          resolve(snapshot.exists())
        }
      })
    })
  },
  createMember: function (memberId) {
    return api.members.create(memberId)
  },
  updateTicket: function (campaignId, memberId, ticketId) {
    return api.members.update(memberId + '/tickets/' + ticketId, {'campaignId': campaignId})
  },
  updateCampaign: function (campaignId, memberId, ticketId) {
    return api.members.update(memberId + '/campaigns/' + campaignId, {'ticketId': ticketId})
  },
  inCampaign: function (memberId, campaignId) {
    return api.members.get(memberId + '/campaigns/' + campaignId)
  },
  getMember: function (memberId) {
    return api.members.get(memberId)
  }
}
