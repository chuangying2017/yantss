import Vue from 'vue'
import JwtDecode from 'jwt-decode'
export default {
  login: function (data) {
    var self = this
    return new Promise((resolve, reject) => {
      Vue.http.post('/auth/login', data).then(
        ({data: {data: {token}}}) => {
          self.setInterceptor(token)
          window.localStorage.setItem('jwt-token', token)
          resolve(token)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  logout: function () {
    window.localStorage.removeItem('jwt-token')
    delete window._user
    return true
  },
  check: function () {
    var token = window.localStorage.getItem('jwt-token')
    if (token !== null && token !== undefined) {
      if (!this.isTokenExpired(token)) {
        this.setInterceptor(token)
        return token
      }
    }
    return false
  },
  setInterceptor: function (token) {
    Vue.http.interceptors.push(function (request, next) {
      request.params['token'] = token
      next()
    })
  },
  getTokenExpirationDate: function (token) {
    var decoded
    decoded = JwtDecode(token)
    if (typeof decoded.exp === undefined) {
      return null
    }
    var d = new Date(0)
    d.setUTCSeconds(decoded.exp)
    return d
  },
  isTokenExpired: function (token, offsetSeconds) {
    var d = this.getTokenExpirationDate(token)
    offsetSeconds = offsetSeconds || 0
    if (d === null) {
      return false
    }
    return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
