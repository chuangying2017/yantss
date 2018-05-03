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
  list () {
    return new Promise((resolve, reject) => {
      Vue.http.get(root).then(
        function ({data: {data: banners}}) {
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
