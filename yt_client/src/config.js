//export const API_ROOT = (process.env.NODE_ENV === 'production')
//? 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
//: 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
//// : 'http://api.yt.dev/api'
//// : 'http://test.yt.dev/api'
//export const MIXPANEL_KEY = (process.env.NODE_ENV === 'production')
//? 'ceada88e3273a06cf4a632a2a8135656'
//: '6320bb850dacebc8138749c5c14355f2'
//export const HOST = (process.env.NODE_ENV === 'production')
//? 'http://yt.l43.cn/yt-client'
//: 'http://yt.l43.cn/yt-client'
//export const WILDDOG_STAFF = (process.env.NODE_ENV === 'production')
//? 'https://staff.wilddogio.com'
//: 'https://yt-staff.wilddogio.com'



export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'http://192.168.10.4:802/weazm-yt-api-fca648ea00e7/server.php/api'
  : 'http://192.168.10.4:802/weazm-yt-api-fca648ea00e7/server.php/api'
  // : 'http://api.yt.dev/api'
  // : 'http://test.yt.dev/api'
export const MIXPANEL_KEY = (process.env.NODE_ENV === 'production')
  ? 'ceada88e3273a06cf4a632a2a8135656'
  : '6320bb850dacebc8138749c5c14355f2'
export const HOST = (process.env.NODE_ENV === 'production')
  ? 'http://192.168.10.4:802/yt-client'
  : 'http://192.168.10.4:802/yt-client'
export const WILDDOG_STAFF = (process.env.NODE_ENV === 'production')
  ? 'https://staff.wilddogio.com'
  : 'https://yt-staff.wilddogio.com'

