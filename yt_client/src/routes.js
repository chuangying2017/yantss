import Auth from './auth/index.js'
import Utils from './utils.js'
// auth
  // import Home from './components/Home/index.vue'
//   import AuthView from './components/Auth/index.vue'
// import Login from './components/Auth/login.vue'
// import Register from './components/Auth/register.vue'
// import Logout from './components/Auth/logout.vue'
// import Wechat from './components/Auth/wechat.vue'
// import WechatAuth from './components/Auth/wechatAuth.vue'
// subscribe
import Subs from './components/Subscribe/init.vue'
import SubsView from './components/Subscribe/index.vue'
import Step1 from './components/Subscribe/Service/step1.vue'
import Step2 from './components/Subscribe/Service/step2.vue'
import Step3 from './components/Subscribe/Service/step3.vue'
// userinfo
import SubsOrder from './components/Subscribe/Order/index.vue'
import PayRecord from './components/Subscribe/Order/payrecord.vue'
import Weekinfo from './components/Subscribe/Order/weekinfo.vue'
// campaign
import Campaigns from './components/Campaigns/index.vue'
import CampaignsList from './components/Campaigns/list.vue'
import Campaign from './components/Campaigns/campaign.vue'
import Tickets from './components/Campaigns/tickets.vue'
import Ticket from './components/Campaigns/ticket.vue'
// mall
import Mall from './components/Mall/index.vue'
import MallHome from './components/Mall/Home/index.vue'
import MallProducts from './components/Mall/Products/index.vue'
import MallProduct from './components/Mall/Product/index.vue'
import MallCart from './components/Mall/Cart/index.vue'
import MallConfirm from './components/Mall/Confirm/index.vue'
import MallPay from './components/Mall/Pay/index.vue'
import MallOrders from './components/Mall/Orders/index.vue'
import MallOrder from './components/Mall/Orders/order.vue'
import MallUser from './components/Mall/Users/index.vue'
import MallPayResult from './components/Mall/Pay/result.vue'
export default {
  init: function (router) {
    router.map({
//       '/': {
//         component: Home
//       },
//       '/auth': {
//         component: AuthView,
//         subRoutes: {
//           '/login': {
//             component: Login,
//             guest: true
//           },
//           '/register': {
//             component: Register,
//             guest: true
//           },
//           '/logout': {
//             component: Logout,
//             auth: true
//           },
//           '/wechat': {
//             component: Wechat,
//             guest: true,
//             name: '微信授权'
//           },
//           '/wechatAuth': {
//             component: WechatAuth,
//             guest: true,
//             name: '微信登陆'
//           }
//         }
//       },
      '/subscribe': {
        component: SubsView,
        auth: true,
        checkLocator: true,
        subRoutes: {
          '/init': {
            component: Subs
          },
          '/step1': {
            component: Step1
          },
          '/step2': {
            component: Step2
          },
          '/step3': {
            component: Step3
          },
          '/order/:order_no': {
            component: SubsOrder
          },
          '/order/:order_no/payrecord': {
            component: PayRecord
          },
          '/order/:order_no/weekinfo': {
            component: Weekinfo
          },
          '/orders': {
            component: require('./components/Subscribe/Orders/index.vue'),
            subRoutes: {
              '/create': {
                component: require('./components/Subscribe/Orders/create.vue'),
                name: '优先达订单创建'
              },
              '/list': {
                component: require('./components/Subscribe/Orders/list.vue'),
                name: '优先达订单列表'
              },
              '/:order_no': {
                component: require('./components/Subscribe/Orders/order.vue'),
                name: '优先达订单详情'
              },
              '/:order_no/exchanges': {
                component: require('./components/Subscribe/Orders/exchanges.vue'),
                name: '优先达配送记录'
              },
              '/:order_no/station': {
                component: require('./components/Subscribe/Orders/station.vue'),
                name: '优先达配送服务部'
              },
              '/:temp_id/pay': {
                component: require('./components/Subscribe/Orders/pay.vue')
              }
            }
          },
          '/assess/:order_no': {
            component: require('./components/Subscribe/Orders/assess.vue')
          },
   					'/assess': {
            component: require('./components/Subscribe/Orders/assess.vue')
          },
          '/assesss': {
            component: require('./components/Subscribe/Orders/assess1.vue')
          },
          '/asseDetail': {
            component: require('./components/Subscribe/Orders/asseDetail.vue')
          },
          '/assessSuccess': {
            component: require('./components/Subscribe/Orders/assessSuccess.vue')
          },
          '/agreement': {
            component: require('./components/Subscribe/Orders/agreement.vue'),
          },
           '/myaddress': {
            component: require('./components/Subscribe/Myaddress/index.vue'),
            subRoutes: {
              '/addrlist': {
                component: require('./components/Subscribe/Myaddress/list.vue'),
              },
              '/addrchange': {
                component: require('./components/Subscribe/Myaddress/change.vue'),
              },
              '/creataddr/:defaultaddr': {
                component: require('./components/Subscribe/Myaddress/creat.vue'),
              }
            }
          }
        }
      },
      '/campaigns': {
        component: Campaigns,
        auth: true,
        subRoutes: {
          '/list': {
            component: CampaignsList
          },
          '/:cam_id': {
            component: Campaign
          },
          '/tickets': {
            component: Tickets
          },
          '/tickets/:ticket_no': {
            component: Ticket
          }
        }
      },
      '/mall': {
        component: Mall,
        auth: true,
        checkLocator: true,
        subRoutes: {
          '/home': {
            component: MallHome,
            name: '商城首页'
          },
          '/products': {
            component: MallProducts,
            name: '优先达商品列表'
          },
          '/products/:product_id': {
            component: MallProduct,
            name: '邮寄商品详情'
          },
          '/cart': {
            component: MallCart,
            name: '邮寄商品购物车'
          },
          '/confirm/:order_temp_id': {
            component: MallConfirm,
            name: '邮寄商品订单确认'
          },
          '/pay/:order_id': {
            component: MallPay,
            name: '邮寄商品订单支付'
          },
          '/result/:type': {
            component: MallPayResult,
            name: '邮寄商品支付结果'
          },
          '/orders': {
            component: MallOrders,
            name: '邮寄商品订单列表'
          },
          '/orders/:order_id': {
            component: MallOrder,
            name: '邮寄商品订单详情'
          },
          '/user': {
            component: MallUser,
            name: '个人中心'
          },
          '/subsproducts/:product_id': {
            component: require('./components/Mall/SubsProduct/product.vue'),
            name: '优先达产品详情'
          },
          '/redirect': {
            component: require('./components/Mall/redirect.vue'),
            name: '微信重定向'
          },
          '/campaign': {
            component: require('./components/Mall/Campaigns/index.vue'),
            subRoutes: {
              '/create': {
                component: require('./components/Mall/Campaigns/create.vue'),
                name: '创建个人拼团'
              },
              '/:cam_id': {
                component: require('./components/Mall/Campaigns/campaign.vue'),
                name: '个人拼团详情'
              },
              '/:cam_id/coupons': {
                component: require('./components/Mall/Campaigns/coupons.vue'),
                name: '领取拼团优惠'
              }
            }
          }
        }
      },
      '/coupons': {
        component: require('./components/Mall/Coupons/index.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./components/Mall/Coupons/avaliable.vue'),
            name: '可领取优惠券列表'
          },
          '/activity': {
            component: require('./components/Mall/Coupons/activity.vue'),
            name: '优惠券活动页'
          },
          '/staff': {
            component: require('./components/Mall/Coupons/staff.vue'),
            name: '优惠券配送员推荐页'
          },
          '/game': {
            component: require('./components/Mall/Coupons/game.vue'),
            name: '优惠券游戏页'
          },
          '/:couponId': {
            component: require('./components/Mall/Coupons/single.vue'),
            name: '优惠券详情页'
          },
          '/list': {
            component: require('./components/Mall/Coupons/list.vue'),
            subRoutes: {
              '/usable': {
                component: require('./components/Mall/Coupons/status/usable.vue'),
                name: '个人优惠券列表-可用'
              },
              '/expired': {
                component: require('./components/Mall/Coupons/status/expired.vue'),
                name: '个人优惠券列表-过期'
              }
            }
          },
          '/gifts': {
            component: require('./components/Mall/Gift/index.vue'),
            name: '优鲜卡列表',
          }
        }
      },
      '/hongbao': {
        component: require('./components/Mall/Hongbao/index.vue'),
        auth: true,
        subRoutes: {
          '/:hbid': {
            component: require('./components/Mall/Hongbao/single.vue')
          }
        }
      },
      '/activities': {
        component: require('./components/Mall/Activity/index.vue'),
        auth: true,
        subRoutes: {
          '/:activityId': {
            component: require('./components/Mall/Activity/activity.vue'),
            name: '优惠券活动列表页'
          }
        }
      },
      '/group': {
        component: require('./components/Mall/GroupPurchase/index.vue'),
        auth: true,
        subRoutes: {
          '/:residenceId': {
            component: require('./components/Mall/GroupPurchase/group.vue'),
            name: '团购活动页'
          }
        }
      },
    })

    let authTransition = function(transition){
      if (transition.to.auth) {
        /**
         * 保存跳转前的访问链接
         */
        if (window.localStorage.getItem('backURL')) {
          var url = window.localStorage.getItem('backURL')
          window.localStorage.removeItem('backURL')
          transition.redirect(url)
          return
        }
        /**
         * 登陆
         */
//         if (!Auth.check()) {
//           // 检查该条链接是否需要登录后再跳转
//           window.localStorage.setItem('backURL', transition.to.path)
//           transition.redirect('/auth/wechat')
//           return
//         }

        return 'next'
      }
    }

    let guestTransition = function (transition) {
      if (transition.to.guest) {
        if (Auth.check()) {
          transition.redirect('/')
          return
        }
      }
      return 'next'
    }

    let locatorTransition = function(transition){
         if(transition.to.checkLocator){
           let result = Utils.checkLocator()
           if(result !== true){
             window.location.replace(result)
             return
           }
         }
      let result = Utils.checkLocator()
      if(result !== true){
        window.location.replace(result)
        return
      }
      transition.next()
    }

    let afterAuth = Utils.after(authTransition, guestTransition),
        afterGuest = Utils.after(afterAuth, locatorTransition)
        // afterLocator = Utils.after(afterGuest, endTransition)

    let transitionContext = afterGuest

    router.beforeEach( transitionContext )

    router.redirect({
      '*': '/mall/home'
    })
  }
}
