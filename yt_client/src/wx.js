var wx = window.wx
import Vue from 'vue'
import Resource from 'vue-resource'
import _ from 'underscore'
Vue.use(Resource)
var dataForWeixin = {
  imgUrl: 'https://ocie5114k.qnssl.com/image/logo_1027.jpg',
  title: '燕塘优鲜达线上商城',
  timelineTitle: '更多服务,尽在燕塘优鲜达',
  timelinelink: 'http://yt.l43.cn/yt-client/?#!/mall/home?utm_source=timeline_share',
  messagelink: 'http://yt.l43.cn/yt-client/?#!/mall/home?utm_source=app_share',
  desc: '更多服务,尽在燕塘优鲜达',
  success: function () {
    console.log('分享成功')
  },
  cancel: function () {
    console.log('分享取消')
  }
}
export default {
  init: function (options = null) {
    var self = this
    console.log('init:' + JSON.stringify(options));
    Vue.http.jsonp('http://yt2.l43.cn/weazm-connection/server.php/wechat/js-sign-package', {
//    token_id: 'token_5a1bc3cd480d0',
 			token_id: 'token_5a1bc3cd480d0',
      url: encodeURIComponent(window.location.href.split('#')[0])
    }).then(function (data) {
      var signPackage = data.data.signPackage
      wx.config({
        debug: false,
        appId: signPackage.appid,
        timestamp: signPackage.timestamp,
        nonceStr: signPackage.noncestr,
        signature: signPackage.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'hideMenuItems'
        ]
      })
      wx.ready(function () {
        wx.hideMenuItems({
          menuList: ['menuItem:copyUrl', 'menuItem:openWithSafari']
        })
        self.setup(options)
      })
    })
  },
  setup: function (options = null) {
    if (options) {
      dataForWeixin = _.extend(dataForWeixin, options)
    }
    var shareType = (options && options.share_type) ? options.share_type : 'mall'
    var fn = (options && options.callback) ? options.callback : function(){ console.log('share success') }
    wx.onMenuShareTimeline({
      title: dataForWeixin.timelineTitle,
      link: dataForWeixin.timelinelink,
      imgUrl: dataForWeixin.imgUrl,
      success: function () {
        fn()
        window.mixpanel.track('分享成功', {
          share_method: 'Timeline',
          share_type: shareType
        })
      },
      cancel: dataForWeixin.cancel
    })
    wx.onMenuShareAppMessage({
      title: dataForWeixin.title,
      link: dataForWeixin.messagelink,
      desc: dataForWeixin.desc,
      imgUrl: dataForWeixin.imgUrl,
      success: function () {
        fn()
        window.mixpanel.track('分享成功', {
          share_method: 'AppMessage',
          share_type: shareType
        })
      },
      cancel: dataForWeixin.cancel
    })
  }
}
