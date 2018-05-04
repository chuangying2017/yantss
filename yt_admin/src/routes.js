import authService from './services/authService'
export default {
	init: function(router) {
		router.map({
			'/auth': {
				component: require('./components/auth/index.vue'),
				guest: true,
				subRoutes: {
					'/login': {
						component: require('./components/auth/login.vue')
					},
					'/register': {
						component: require('./components/auth/register.vue')
					}
				}
			},
			'/dashboard': {
				component: require('./components/dashboard/index.vue'),
				auth: true,
				subRoutes: {
					'/logout': {
						component: require('./components/auth/logout.vue')
					},
					'/400': {
						component: require('./components/dashboard/400.vue')
					},
					'/401': {
						component: require('./components/dashboard/401.vue')
					},
					'/home': {
						component: require('./components/dashboard/Home/home.vue')
					},
					'/products': {
						component: require('./components/dashboard/products/index.vue'),
						role: 'Supervisor',
						nav: 'product',
						subRoutes: {
							'/list': {
								component: require('./components/dashboard/products/list.vue')
							},
							'/create': {
								component: require('./components/dashboard/products/create.vue')
							},
							'/edit/:product_id': {
								component: require('./components/dashboard/products/edit.vue')
							},
							'/selllist': {
								component: require('./components/dashboard/products/selllist/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/products/selllist/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/products/selllist/create.vue')
									},
									'/edit/:product_id': {
										component: require('./components/dashboard/products/selllist/edit.vue')
									}
								}
							},
							'/depotpro': {
								component: require('./components/dashboard/products/depotpro/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/products/depotpro/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/products/depotpro/create.vue')
									},
									'/edit/:product_id': {
										component: require('./components/dashboard/products/depotpro/edit.vue')
									}
								}
							},
							'/packages': {
								component: require('./components/dashboard/products/Packages/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/products/Packages/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/products/Packages/create.vue')
									},
									'/edit/:product_id': {
										component: require('./components/dashboard/products/Packages/edit.vue')
									}
								}
							},
							'/groups': {
								component: require('./components/dashboard/products/groups/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/products/groups/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/products/groups/create.vue')
									},
									'/edit/:group_id': {
										component: require('./components/dashboard/products/groups/edit.vue')
									}
								}
							},
							'/cats': {
								component: require('./components/dashboard/products/categories/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/products/categories/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/products/categories/create.vue')
									},
									'/edit/:cat_id': {
										component: require('./components/dashboard/products/categories/edit.vue')
									}
								}
							}
						}
					},
					'/stations': {
						component: require('./components/dashboard/stations/index.vue'),
						role: 'StationAdmin',
						nav: 'station',
						subRoutes: {
							'/list': {
								component: require('./components/dashboard/stations/list.vue')
							},
							'/:station_id': {
								component: require('./components/dashboard/stations/detail.vue')
							},
							'/create': {
								component: require('./components/dashboard/stations/create.vue')
							},
							'/edit/:station_id': {
								component: require('./components/dashboard/stations/edit.vue')
							},
							'/orders': {
								component: require('./components/dashboard/stations/orders/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stations/orders/list.vue')
									},
									'/detail/:order_no': {
										component: require('./components/dashboard/stations/orders/detail.vue')
									},
									'/changeInfo/:order_id': {
										component: require('./components/dashboard/stations/orders/changeInfo.vue')
									},
									'/allUsersCard/:order_id': {
										component: require('./components/dashboard/stations/orders/allUsersCard.vue')
									},
									'/newCard': {
										component: require('./components/dashboard/stations/orders/newCard.vue')
									},
									'/newCreateCard': {
										component: require('./components/dashboard/stations/orders/newCreateCard.vue')
									},
									'/newEditCard/:card_id': {
										component: require('./components/dashboard/stations/orders/newEditCard.vue')
									},
									'/cardlist': {
										component: require('./components/dashboard/stations/orders/cardlist.vue')
									}
								}
							},
							'/collect_orders': {
								component: require('./components/dashboard/stations/collect_orders/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stations/collect_orders/list.vue')
									},
									'/detail/:order_no': {
										component: require('./components/dashboard/stations/collect_orders/detail.vue')
									}
								}
							},
							'/coupons': {
								component: require('./components/dashboard/stations/coupons/index.vue'),
								subRoutes: {
									'/create': {
										component: require('./components/dashboard/stations/coupons/create.vue')
									},
									'/list': {
										component: require('./components/dashboard/stations/coupons/list.vue')
									},
									'/detail/:coupon_id': {
										component: require('./components/dashboard/stations/coupons/detail.vue')
									},
									'/dispatch': {
										component: require('./components/dashboard/stations/coupons/dispatch.vue')
									}
								}
							},
							'/packets': {
								component: require('./components/dashboard/stations/packet/index.vue'),
								subRoutes: {
									'/create': {
										component: require('./components/dashboard/stations/packet/create.vue')
									},
									'/list': {
										component: require('./components/dashboard/stations/packet/list.vue')
									},
									'/detail/:packet_id': {
										component: require('./components/dashboard/stations/packet/detail.vue')
									}
								}
							},
							'/activities': {
								component: require('./components/dashboard/stations/activities/index.vue'),
								subRoutes: {
									'/create': {
										component: require('./components/dashboard/stations/activities/create.vue')
									},
									'/list': {
										component: require('./components/dashboard/stations/activities/list.vue')
									},
									'/detail/:activity_id': {
										component: require('./components/dashboard/stations/activities/detail.vue')
									}
								}
							},
							'/banners': {
								component: require('./components/dashboard/stations/banners/index.vue'),
								subRoutes: {
									'/create': {
										component: require('./components/dashboard/stations/banners/create.vue')
									},
									'/list': {
										component: require('./components/dashboard/stations/banners/list.vue')
									},
									'/detail/:banner_id': {
										component: require('./components/dashboard/stations/banners/detail.vue')
									}
								}
							},
							'/topups': {
								component: require('./components/dashboard/stations/topups/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stations/topups/list.vue')
									}
								}
							},
							'/residences': {
								component: require('./components/dashboard/residences/index.vue'),
								subRoutes: {
									'/create': {
										component: require('./components/dashboard/residences/create.vue')
									},
									'/list': {
										component: require('./components/dashboard/residences/list.vue')
									},
									'/edit/:residence_id': {
										component: require('./components/dashboard/residences/edit.vue')
									}
								}
							},
							'/payagre': {
								component: require('./components/dashboard/stations/payagre/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stations/payagre/list.vue')
									},
									'/edit/:payager_id': {
										component: require('./components/dashboard/stations/payagre/edit.vue')
									}
								}
							},
						}
					},
					'/assess': {
						component: require('./components/dashboard/assess/index.vue'),
						role: 'AssessList',
						nav: 'assessList',
						subRoutes: {
							'/list': {
								component: require('./components/dashboard/assess/assesslist.vue')
							},
							'/starTag': {
								component: require('./components/dashboard/assess/starTag.vue')
							},
							'/ranklist': {
								component: require('./components/dashboard/assess/ranklist.vue')
							}
						}
					},
					'/integral': {
						component: require('./components/dashboard/integral/index.vue'),
						role: 'Integral',
						nav: 'integral',
						subRoutes: {
							'/list': {
								component: require('./components/dashboard/integral/list.vue')
							},
							'/categoriesList': {
								component: require('./components/dashboard/integral/categories/list.vue')
							},
							'/addcategory': {
								component: require('./components/dashboard/integral/categories/addcategory.vue')
							},
							'/delivery': {
								component: require('./components/dashboard/integral/delivery/list.vue')
							},
							'/banners': {
								component: require('./components/dashboard/integral/banners/list.vue')
							},
							'/create': {
								component: require('./components/dashboard/integral/banners/create.vue')
							},
							'/detail/:banner_id': {
								component: require('./components/dashboard/integral/banners/detail.vue')
							},
							'/deliveryInfo': {
								component: require('./components/dashboard/integral/delivery/deliveryInfo.vue')
							},
							'/exchange': {
								component: require('./components/dashboard/integral/delivery/exchange.vue')
							},
							'/sign': {
								component: require('./components/dashboard/integral/sign/list.vue')
							},
							'/signRecord': {
								component: require('./components/dashboard/integral/sign/signRecord.vue')
							},
							'/exchangeList': {
								component: require('./components/dashboard/integral/exchange/list.vue')
							},
							'/addExchange': {
								component: require('./components/dashboard/integral/exchange/create.vue')
							}
							// '/addgood': {
							//   component: require('./components/dashboard/integral/addgood3.vue')
							// }
							// '/setgood': {
							//   component: require('./components/dashboard/integral/setgood.vue')
							// }
						}
					},
					'/addgood': {
						component: require('./components/dashboard/integral/addgood.vue'),
						subRoutes: {
							'/setgood': {
								component: require('./components/dashboard/integral/setgood.vue')
							},
							'/stock': {
								component: require('./components/dashboard/integral/stock.vue')
							},
							'/goodinfo': {
								component: require('./components/dashboard/integral/goodinfo.vue')
							}
						}
					},
					'/stores': {
						component: require('./components/dashboard/stores/index.vue'),
						role: 'Storeadmin',
						nav: 'store',
						subRoutes: {
							'/list': {
								component: require('./components/dashboard/stores/list.vue')
							},
							'/:id': {
								component: require('./components/dashboard/stores/detail.vue')
							},
							'/create': {
								component: require('./components/dashboard/stores/create.vue')
							},
							'/edit': {
								component: require('./components/dashboard/stores/edit.vue')
							},
							'/campaigns': {
								component: require('./components/dashboard/stores/campaigns/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stores/campaigns/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/stores/campaigns/create.vue')
									},
									'/edit': {
										component: require('./components/dashboard/stores/campaigns/edit.vue')
									}
								}
							},
							'/orders': {
								component: require('./components/dashboard/stores/orders/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/stores/orders/list.vue')
									}
								}
							}
						}
					},
					'/mall': {
						component: require('./components/dashboard/mall/index.vue'),
						role: 'mall',
						nav: 'mall',
						subRoutes: {
							'/orders': {
								component: require('./components/dashboard/mall/orders/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/mall/orders/list.vue')
									},
									'/:order_no': {
										component: require('./components/dashboard/mall/orders/detail.vue')
									}
								}
							}
						}
					},
					'/users': {
						component: require('./components/dashboard/users/index.vue'),
						role: 'User',
						nav: 'user',
						subRoutes: {
							'/customusers': {
								component: require('./components/dashboard/users/customusers.vue')
							},
							'/list': {
								component: require('./components/dashboard/users/list.vue')
							},
							'/groups': {
								component: require('./components/dashboard/users/groups/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/users/groups/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/users/groups/create.vue')
									}
								}
							}
						}
					},
					'/finance': {
						component: require('./components/dashboard/finance/index.vue'),
						role: 'Finance',
						nav: 'finance',
						subRoutes: {
							'/stations': {
								component: require('./components/dashboard/finance/stations/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/finance/stations/list.vue')
									},
									'/overview/:invoice_no': {
										component: require('./components/dashboard/finance/stations/overview.vue')
									},
									'/detail/:invoice_no/:date': {
										component: require('./components/dashboard/finance/stations/detail.vue')
									}
								}
							},
							'/stores': {
								component: require('./components/dashboard/finance/stores/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/finance/stores/list.vue')
									},
									'/detail/:statement_no': {
										component: require('./components/dashboard/finance/stores/detail.vue')
									}
								}
							},
							'/weazm': {
								component: require('./components/dashboard/finance/weazm/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/finance/weazm/list.vue')
									}
								}
							}
						}
					},
					'/access': {
						component: require('./components/dashboard/access/index.vue'),
						role: 'Supervisor',
						nav: 'access',
						subRoutes: {
							'/users': {
								component: require('./components/dashboard/access/users/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/access/users/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/access/users/create.vue')
									},
									'/edit/:user_id': {
										component: require('./components/dashboard/access/users/edit.vue')
									}
								}
							},
							'/roles': {
								component: require('./components/dashboard/access/roles/index.vue'),
								subRoutes: {
									'/list': {
										component: require('./components/dashboard/access/roles/list.vue')
									},
									'/create': {
										component: require('./components/dashboard/access/roles/create.vue')
									},
									'/edit/:user_id': {
										component: require('./components/dashboard/access/roles/edit.vue')
									}
								}
							}
						}
					},
					'/setting': {
						component: require('./components/dashboard/setting/index.vue')
					}
				}
			}
		})
		router.beforeEach(function(transition) {
			if(transition.to.path === '/dashboard/logout') {
				return transition.next()
			}
			if(transition.to.auth) {
				if(!authService.check() && authService.check() !== 'expired') {
					return transition.redirect('/auth/login')
				}
			}
			if(transition.to.guest) {
				if(authService.check()) {
					return transition.redirect('/')
				}
			}
			if(window._user) {
				if(window._user.roles.indexOf('Supervisor') < 0 && window._user.roles.indexOf(transition.to.role) < 0) {
					transition.redirect('/dashboard/401')
				}
			}
			transition.next()
		})
		router.redirect({
			'*': '/dashboard/home'
		})
	}
}