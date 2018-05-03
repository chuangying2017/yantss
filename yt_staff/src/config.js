export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
  : 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
export const HOST = (process.env.NODE_ENV === 'production')
  ? 'http://yt.l43.cn/yt-client'
  : 'http://yt.l43.cn/yt-client'
export const MIXPANEL_KEY = (process.env.NODE_ENV === 'production')
  ? 'ceada88e3273a06cf4a632a2a8135656'
  : '6320bb850dacebc8138749c5c14355f2'
export const STAFF_ACTIVITY = (process.env.NODE_ENV === 'production')
  ? 'http://yt.l43.cn/yt-client/?#!/activities/activity_staff_refer_2016'
  : 'http://yt.l43.cn/yt-client/?#!/activities/activity_5812bdd6a6ac1'
export const WILDDOG_STAFF = (process.env.NODE_ENV === 'production')
  ? 'https://staff.wilddogio.com'
  : 'https://staff.wilddogio.com'
