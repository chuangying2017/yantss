import Vue from 'vue'
import JwtDecode from 'jwt-decode'

export default {
  login: function (token) {
    this.setInterceptor(token)
    return window.localStorage.setItem('jwt-token', token)
  },

  logout: function () {
    window.localStorage.removeItem('jwt-token')
    return
  },

  token: function () {
    //var token = window.localStorage.getItem('jwt-token')
var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk0MzU2LCJpc3MiOiJodHRwOi8veXQyLmw0My5jbi93ZWF6bS15dC1hcGktZmNhNjQ4ZWEwMGU3L3NlcnZlci5waHAvYXBpL2F1dGgvbG9naW4vd2VpeGluIiwiaWF0IjoxNTI4NzY2NjEwLCJleHAiOjE1Mjg3OTU0MTAsIm5iZiI6MTUyODc2NjYxMCwianRpIjoiNVRRclhZd1ZiaWVwU0V4QiJ9.O9NHO5uHOs5j4DKkEpej_K9tyxrJPKDNc4-pMZ99Utg"
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

    Vue.http.interceptors.push({
      request: function (options) {
        options.params['token'] = token
        return options
      },

      response: function (response) {
         if (response.status && response.status === 401) {
           self.logout()
           self.$route.redirect('/login')
         }

         if (response.status_code === 500 && response.message === 'Token has expired') {
           self.logout()
           self.$route.redirect('/login')
         }

        return response
      }
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
