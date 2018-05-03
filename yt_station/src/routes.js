import Home from './components/Home/index.vue'

import AuthView from './components/Auth/index.vue'
import Login from './components/Auth/login.vue'
import Register from './components/Auth/register.vue'
import Logout from './components/Auth/logout.vue'
import Wechat from './components/Auth/wechat.vue'
import WechatAuth from './components/Auth/wechatAuth.vue'

import Navi from './components/Home/navi.vue'
import Subscribe from './components/Subscribes/index.vue'
import SubsList from './components/Subscribes/list.vue'
import SubsSetting from './components/Subscribes/setting.vue'
import SubsEdit from './components/Subscribes/edit.vue'
import SubsDeliver from './components/Subscribes/deliver.vue'
import SubsDetail from './components/Subscribes/detail.vue'
import SubsInfo from './components/Subscribes/info.vue'

import Staffs from './components/Staffs/index.vue'
import StaffsList from './components/Staffs/list.vue'
import StaffCreate from './components/Staffs/create.vue'
import Staff from './components/Staffs/staff.vue'
import StaffInfo from './components/Staffs/info.vue'
import StaffPreorder from './components/Staffs/preorders.vue'
import StaffEdit from './components/Staffs/edit.vue'
import DelOrder from './components/DelOrder/index.vue'

import StaffsHome from './components/Staffs/listhome.vue'
import StaffsCount from './components/Staffs/count.vue'
import AllAssess from './components/Staffs/allAssess.vue'
import AssessInfo from './components/Staffs/assessInfo.vue'
export default {
  init: function (router) {
    router.map({
      '/auth': {
        component: AuthView,
        subRoutes: {
          '/login': {
            component: Login,
            guest: true
          },
          '/register': {
            component: Register,
            guest: true
          },
          '/logout': {
            component: Logout,
            auth: true
          },
          '/wechat': {
            component: Wechat,
            guest: true
          },
          '/wechatAuth': {
            component: WechatAuth,
            guest: true
          }
        }
      },
      '/admin': {
        component: require('./components/Admin/index.vue'),
        auth: true,
        subRoutes: {
          '/create': {
            component: require('./components/Admin/create.vue')
          },
          '/check': {
            component: require('./components/Admin/check.vue')
          },
          '/edit': {
            component: require('./components/Admin/edit.vue')
          },
          '/logout': {
            component: require('./components/Admin/logout.vue')
          }
        }
      },
      '/admin/login': {
        component: require('./components/Admin/login.vue')
      },
      '/station': {
        component: Home,
        auth: true,
        subRoutes: {
          '/navi': {
            component: Navi
          },
          '/rank': {
            component: require('./components/Subscribes/rank.vue')
          },
          '/subscribes': {
            component: Subscribe,
            subRoutes: {
              '/list': {
                component: require('./components/Subscribes/listIndex.vue')
              },
              '/allAssess': {
                component: AllAssess
              },
              '/assessInfo': {
                component: AssessInfo
              },
              '/list/:status': {
                component: SubsList
              },
              '/search': {
                component: require('./components/Subscribes/search.vue')
              },
              '/:subs_id/setting': {
                component: SubsSetting
              },
              '/:subs_id/edit': {
                component: SubsEdit,
                name: 'subsEdit'
              },
              '/:subs_id/deliver': {
                component: SubsDeliver
              },
              '/:subs_id': {
                component: SubsDetail
              },
              '/:subs_id/weekinfo': {
                component: SubsInfo
              }
            }
          },
          '/deliveryOrder': {
            component: DelOrder
          },
          '/listhome': {
            component: StaffsHome,
            subRoutes: {
              '/list': {
                component: StaffsList
              },
              '/count': {
                component: StaffsCount
              }
            }
          },
          '/staffs': {
            component: Staffs,
            subRoutes: {
              '/create': {
                component: StaffCreate
              },
              '/:staff_id/edit': {
                component: StaffEdit
              },
              '/:staff_id': {
                component: Staff,
                subRoutes: {
                  '/info': {
                    component: StaffInfo
                  },
                  '/preorders': {
                    component: StaffPreorder
                  }
                }
              }
            }
          },
          '/exchange': {
            component: require('./components/Exchange/index.vue'),
            subRoutes: {
              '/month': {
                component: require('./components/Exchange/month.vue')
              },
              '/day': {
                component: require('./components/Exchange/day.vue')
              }
            }
          },
          '/exchange/statement/:statement_no': {
            component: require('./components/Exchange/statement.vue')
          }
        }
      },
      '/error/:result': {
        component: require('./components/Error/index.vue')
      },
      '/bind/': {
        component: require('./components/Bind/index.vue'),
        auth: true,
        subRoutes: {
          '/:station_id': {
            component: require('./components/Bind/bind.vue')
          }
        }
      }
    })
  }
}
