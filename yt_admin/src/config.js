export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'http://yt2.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
  : 'http://yt2.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
export const QINIU_URL = 'http://o7tep4eu1.bkt.clouddn.com/'
export const STATION_DOMAIN = (process.env.NODE_ENV === 'production')
  ? 'http://yt2.l43.cn'
  : 'http://yt2.l43.cn'
  // : 'http://test.station.yt.weazm.com'
