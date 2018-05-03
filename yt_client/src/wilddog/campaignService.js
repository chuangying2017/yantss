import api from './api.js'

var campaignRef = new window.Wilddog('https://yt-test.wilddogio.com/campaigns')

export default {
  exist: function (organiserId) {
    return new Promise(function (resolve, reject) {
      campaignRef.child(organiserId).once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        } else {
          resolve(snapshot.exists())
        }
      })
    })
  },
  createCampaign: function (campaignId, campaignInfo) {
    return api.campaigns.create(campaignId, campaignInfo)
  },
  updateMember: function (campaignId, memberId, memberInfo, ticketId) {
    return api.campaigns.update(campaignId + '/members/' + memberId, {'ticketId': ticketId, 'memberInfo': memberInfo})
  },
  updateUser: function (campaignId, memberId, memberInfo, orderInfo) {
    return api.campaigns.update(campaignId + '/users/' + memberId, {'orderInfo': orderInfo, 'memberInfo': memberInfo})
  },
  getCampaign: function (campaignId) {
    return api.campaigns.get(campaignId)
  }
}
