import Vue from 'vue'
const root = '/admin/mall/banner'
export default {
  get (id) {
    return new Promise((resolve, reject) => {
      console.log('11')
      Vue.http.get(`${root}/${id}`).then(
        function ({data: {data: banner}}) {
          resolve(banner)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  list (parmarter) {
    return new Promise((resolve, reject) => {
      Vue.http.get(root, parmarter).then(
        function ({data: {data: banners}}) {
          console.log(banners)
          resolve(banners)
        },
        function (data) {
          reject(data)
        }
      )
    })
  },
  create (banner) {
    return Vue.http.post(root, banner)
  },
  update (id, banner) {
    return Vue.http.put(`${root}/${id}`, banner)
  },
  remove (id) {
    return Vue.http.delete(`${root}/${id}`)
  }
}
