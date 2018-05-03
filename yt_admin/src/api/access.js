import Vue from 'vue'
let userRoot = '/admin/access/users/'
let roleRoot = '/admin/access/roles/'
export default {
  users: {
    getAll: function () {
      return new Promise((resolve, reject) => {
        Vue.http.get(userRoot).then(({data: {data: users}}) => {
          resolve(users)
        }, (error) => {
          reject(error)
        })
      })
    },
    get: function (userId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(userRoot + userId).then(
          function ({data: {data: user}}) {
            resolve(user)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    create: function (user) {
      return new Promise(function (resolve, reject) {
        Vue.http.post(userRoot, user).then(
          function (data) {
            resolve(data.data.data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    update: function (user) {
      return new Promise(function (resolve, reject) {
        Vue.http.put(userRoot + user.id, user).then(
          function (data) {
            resolve(data.data.data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    delete: function (userId) {
      return new Promise(function (resolve, reject) {
        Vue.http.delete(userRoot + userId).then(
          function (data) {
            resolve(data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  },
  roles: {
    getAll: function () {
      return new Promise((resolve, reject) => {
        Vue.http.get(roleRoot).then(({data: {data: roles}}) => {
          resolve(roles)
        }, (error) => {
          reject(error)
        })
      })
    },
    get: function (roleId) {
      return new Promise(function (resolve, reject) {
        Vue.http.get(roleRoot + roleId).then(
          function ({data: {data: role}}) {
            resolve(role)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    create: function (role) {
      return new Promise(function (resolve, reject) {
        Vue.http.post(roleRoot, role).then(
          function (data) {
            resolve(data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    update: function (role) {
      return new Promise(function (resolve, reject) {
        Vue.http.put(roleRoot + role.id, role).then(
          function (data) {
            resolve(data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    },
    delete: function (roleId) {
      return new Promise(function (resolve, reject) {
        Vue.http.delete(roleRoot + roleId).then(
          function (data) {
            resolve(data)
          },
          function (data) {
            reject(data)
          }
        )
      })
    }
  }
}
