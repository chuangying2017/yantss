import Vue from 'vue'
let root = '/admin/promotions/coupons/'
export default {
  get: function (couponId) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('/admin/promotions/coupons/' + couponId).then(
        function (data) {
          resolve(data.data.data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  getAll: function (params = {}) {
    return new Promise(function (resolve, reject) {
      Vue.http.get(root, {
        params: params
      }).then(
        function ({data: {data: coupons, meta: meta}}) {
          if (meta && meta.pagination) {
            resolve({
              coupons: coupons,
              pagination: meta.pagination
            })
          } else {
            resolve(coupons)
          }
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create: function (coupon) {
    return new Promise(function (resolve, reject) {
      Vue.http.post(root, coupon).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  update: function (couponId, data) {
    return new Promise(function (resolve, reject) {
      Vue.http.put(root + couponId, data).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  delete: function (couponId) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete(root + couponId).then(
        function (data) {
          resolve(data)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  dispatch (params) {
    return new Promise(function (resolve, reject) {
      Vue.http.post('/admin/promotions/tickets', params).then(function (data) {
        resolve(true)
      }, function (error) {
        reject(error)
      })
    })
  }
}
