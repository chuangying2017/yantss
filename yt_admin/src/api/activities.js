import Vue from 'vue'
let root = '/admin/promotions/activities/'
export default {
  get (activityId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root + activityId).then(
        function ({data: {data: activities}}) {
          resolve(activities)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  list: function () {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root).then(
        function ({data: {data: activities}}) {
          resolve(activities)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (activity) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, activity).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (activityId, activity) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + activityId, activity).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  changeStatus: function (activityId, status) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + activityId + '/' + status).then(
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
