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
     var self = this

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
