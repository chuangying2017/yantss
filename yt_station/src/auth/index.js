import Vue from 'vue'
import JwtDecode from 'jwt-decode'

export default {
  login: function (token) {
    this.setInterceptor(token)
    return window.localStorage.setItem('jwt-token', token)
  },

  adminLogin: function (data) {
    var self = this
    return new Promise(function (resolve, reject) {
      Vue.http.post('/auth/login', data).then(
        function ({data: {data: {token}}}) {
          self.setInterceptor(token)
          window.localStorage.setItem('jwt-token', token)
          resolve(token)
        },
        function (error) {
          reject(error)
        }
      )
    })
  },

  logout: function () {
    window.localStorage.removeItem('jwt-token')
    return false
  },

  token: function () {
 // var token = window.localStorage.getItem('jwt-token')
var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk0MzU2LCJpc3MiOiJodHRwOi8veXQyLmw0My5jbi93ZWF6bS15dC1hcGktZmNhNjQ4ZWEwMGU3L3NlcnZlci5waHAvYXBpL2F1dGgvbG9naW4vd2VpeGluIiwiaWF0IjoxNTI4MTA0MTkxLCJleHAiOjE1MjgxMzI5OTEsIm5iZiI6MTUyODEwNDE5MSwianRpIjoiYkdJb2dDcGcxd09HT0hERCJ9.Su1OLaSAD1Zx_RA6-9xfFdzRwUY5D4yf_169aFX_AIs"
 window.localStorage.setItem('jwt-token', token)//要删
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
//   var self = this

    Vue.http.interceptors.push({
      request: function (options) {
        options.params['token'] = token
        return options
      },

      response: function (response) {
//       if (response.status && response.status === 401) {
//         self.logout()
//         self.$route.redirect('/login')
//       }
//
//       if (response.status_code === 500 && response.message === 'Token has expired') {
//         self.logout()
//         self.$route.redirect('/login')
//       }

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
