import Vue from 'vue'
import JwtDecode from 'jwt-decode'

export default {
  login: function (token) {
    this.setInterceptor(token)
    return window.localStorage.setItem('jwt-token', token)
  },

  logout: function () {
    window.localStorage.removeItem('jwt-token')
    return false
  },

  token: function () {
    var token = window.localStorage.getItem('jwt-token')

    if (token !== null && token !== undefined) {
      if (this.isTokenExpired(token)) {
        return 'expired'
      } else {
        this.setInterceptor(token)
        return token
      }
    } else {
      return false
    }
  },

  check: function () {
    var token = window.localStorage.getItem('jwt-token')

    if (token !== null && token !== undefined) {
      if (this.isTokenExpired(token)) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  },

  setInterceptor: function (token) {
    // var self = this
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
