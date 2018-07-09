export const API_ROOT = (process.env.NODE_ENV === 'production')
? 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
: 'http://yt.l43.cn/weazm-yt-api-fca648ea00e7/server.php/api'
export const QINIU_URL = 'http://pbfkayj1e.bkt.clouddn.com/'
export const STATION_DOMAIN = (process.env.NODE_ENV === 'production')
? 'http://yt.l43.cn'
: 'http://yt.l43.cn'
    // : 'http://test.station.yt.weazm.com'
    //  修改之前
//export const API_ROOT = (process.env.NODE_ENV === 'production')
//? 'http://192.168.10.14:805/weazm-yt-api-fca648ea00e7/server.php/api'
//: 'http://192.168.10.14:805/weazm-yt-api-fca648ea00e7/server.php/api'
//export const QINIU_URL = 'http://o7tep4eu1.bkt.clouddn.com/'
//export const STATION_DOMAIN = (process.env.NODE_ENV === 'production')
//? 'http://192.168.10.14:805'
//: 'http://192.168.10.14:805'
