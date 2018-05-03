import Home from './components/Home/home.vue'
import PreOrder from './components/Home/preorder.vue'
import Deliver from './components/Home/deliver.vue'
import Data from './components/Home/data.vue'

import AuthView from './components/Auth/index.vue'
import Wechat from './components/Auth/wechat.vue'
import WechatAuth from './components/Auth/wechatAuth.vue'

import Bind from './components/Bind/bind.vue'

import Staff from './components/Home/index.vue'

import Error from './components/Home/error.vue'

import Auth from './auth/index.js'

export default {
  init: function (router) {
    router.map({
      '/auth': {
        component: AuthView,
        guest: true,
        subRoutes: {
          '/wechat': {
            component: Wechat
          },
          '/wechatAuth': {
            component: WechatAuth
          }
        }
      },
      '/error/:result': {
        component: Error
      },
      '/bind/': {
        component: require('./components/Bind/index.vue'),
        auth: true,
        subRoutes: {
          ':staff_id': {
            component: Bind
          }
        }
      },
      '/staff': {
        component: Staff,
        auth: true,
        subRoutes: {
          '/info': {
            component: Home
          },
          '/orders': {
            component: require('./components/Home/orderList.vue')
          },
          '/orders/:order_id': {
            component: require('./components/Home/orderDetail.vue')
          },
          '/preorders': {
            component: PreOrder,
            subRoutes: {
              '/deliver': {
                component: Deliver
              },
              '/data': {
                component: Data
              }
            }
          }
        }
      },
      '/deliver': {
        component: require('./components/Deliver/index.vue'),
        auth: true,
        subRoutes: {
          '/addresses': {
            component: require('./components/Deliver/addresses.vue')
          },
          '/search': {
            component: require('./components/Deliver/search.vue')
          },
          '/data': {
            component: require('./components/Deliver/data.vue')
          },
          '/orders': {
            component: require('./components/Deliver/orders.vue')
          },
          // '/orders1': {
          //   component: require('./components/Deliver/orders1.vue')
          // },
          '/orders/:order_id': {
            component: require('./components/Deliver/order.vue')
          },
          '/recommand': {
            component: require('./components/Deliver/recommand.vue')
          },
          'operate': {
            component: require('./components/Deliver/operate.vue')
          },
          '/allassess': {
            component: require('./components/Deliver/allAssess.vue')
          },
          '/assessinfo': {
            component: require('./components/Deliver/assessInfo.vue')
          },
          '/listall': {
            component: require('./components/Deliver/listall.vue'),
            subRoutes: {
              '/orders': {
                component: require('./components/Deliver/orders.vue')
              }
            }
          }
        }
      }
    })

    router.beforeEach(function (transition) {
      if (transition.to.auth) {
        if (window.localStorage.getItem('backURL')) {
          var url = window.localStorage.getItem('backURL')
          window.localStorage.removeItem('backURL')
          transition.redirect(url)
        }
        if (!Auth.check() && Auth.check() !== 'expired') {
          // 检查该条链接是否需要登录后再跳转
          window.localStorage.setItem('backURL', transition.to.path)
          transition.redirect('/auth/wechat')
        }
      }
      if (transition.to.guest) {
        if (Auth.check()) {
          transition.redirect('/')
        }
      }
      transition.next()
    })
  }
}
