<template>
  <!-- Site wrapper -->
  <div class="wrapper" v-if="!$loadingRouteData">

    <header class="main-header">
      <!-- Logo -->
      <a v-link="{path: '/dashboard/home'}" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>优</b>鲜达</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>燕塘</b>优鲜达</span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Notifications: style can be found in dropdown.less -->
            <!--<li class="dropdown notifications-menu">-->
            <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
            <!--<i class="fa fa-bell-o"></i>-->
            <!--<span class="label label-warning">10</span>-->
            <!--</a>-->
            <!--<ul class="dropdown-menu">-->
            <!--<li class="header">You have 10 notifications</li>-->
            <!--<li>-->
            <!--&lt;!&ndash; inner menu: contains the actual data &ndash;&gt;-->
            <!--<ul class="menu">-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<i class="fa fa-users text-aqua"></i> 5 new members joined today-->
            <!--</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
            <!--<li class="footer"><a href="#">View all</a></li>-->
            <!--</ul>-->
            <!--</li>-->

            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="http://cdn.weazm.com/user-logo-round.png" class="user-image" alt="User Image">
                <!--<img :src="user.avatar" class="user-image" alt="User Image">-->
                <span class="hidden-xs">{{user.username}}</span>
              </a>
            </li>
            <li class="dropdown user user-menu">
              <a href="#" v-link="{path: '/dashboard/logout'}" class="dropdown-toggle" data-toggle="dropdown">
                <span class="hidden-xs">退出</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- =============================================== -->

    <!-- Left side column. contains the sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <!--<img :src="user.avatar" class="img-circle" alt="User Image">-->
            <img src="http://cdn.weazm.com/user-logo-round.png" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>{{user.nickname}}</p>
            <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
          </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="header">功能导航</li>
          <li class="treeview" v-if="permit('Supervisor')">
            <a v-link="{path: '/dashboard/home'}">
              <i class="fa fa-dashboard"></i> <span>概况</span>
            </a>
          </li>
          <li class="treeview" v-if="permit('Supervisor')" :class="{active: route.nav == 'product'}">
            <a href="#">
              <i class="fa fa-gift"></i>
              <span>商品</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <!--<li><a v-link="{path: '/dashboard/products/list'}"><i class="fa fa-navicon"></i> 商品列表</a></li>-->
              <li><a v-link="{path: '/dashboard/products/selllist/list'}"><i class="fa fa-cubes"></i> 出售中的商品</a></li>
              <li><a v-link="{path: '/dashboard/products/depotpro/list'}"><i class="fa fa-cubes"></i> 仓库中的商品</a></li>
              <li><a v-link="{path: '/dashboard/products/packages/list'}"><i class="fa fa-cubes"></i> 商品组合</a></li>
              <li><a v-link="{path: '/dashboard/products/cats/list'}"><i class="fa fa-sitemap"></i> 分类管理</a></li>
              <li><a v-link="{path: '/dashboard/products/groups/list'}"><i class="fa fa-exchange"></i> 分组管理</a></li>
            </ul>
          </li>
          <li class="treeview" v-if="permit('StationAdmin')" :class="{active: route.nav == 'station'}">
            <a href="#">
              <i class="fa fa-life-bouy"></i>
              <span>服务部</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li class="treeview">
                <a v-link="{path: '/dashboard/stations/orders/list'}">
                  <i class="fa fa-reorder"></i>
                  <span>订单管理</span>
                </a>
              </li>
              <li><a v-link="{path: '/dashboard/stations/orders/cardlist'}"><i class="fa fa-reorder"></i> 优鲜卡订单管理</a></li>
              <li><a v-link="{path: '/dashboard/stations/orders/newCard'}"><i class="fa fa-reorder"></i> 优鲜卡管理</a></li>
              <!--<li><a v-link="{path: '/dashboard/stations/collect_orders/list'}"><i class="fa fa-list-ul"></i> 收款管理</a></li>-->
              <li><a v-link="{path: '/dashboard/stations/list'}"><i class="fa fa-map-marker"></i> 服务部详情</a></li>
              <li><a href="http://yt.l43.cn/admin/login" target="_blank"><i class="fa fa-life-bouy"></i> 管理工具</a>
              </li>
              <li v-if="permit('StationAdmin')"><a v-link="{path: '/dashboard/stations/coupons/list'}"><i
                class="fa fa-newspaper-o"></i> 优惠券管理</a></li>
              <li v-if="permit('StationAdmin')"><a v-link="{path: '/dashboard/stations/coupons/dispatch'}"><i
                class="fa fa-gift"></i> 优惠券赠送</a>
              </li>
              <li v-if="permit('Weazm')"><a v-link="{path: '/dashboard/stations/packets/list'}"><i
                class="fa fa-money"></i> 红包规则管理</a>
              </li>
              <li v-if="permit('Weazm')"><a v-link="{path: '/dashboard/stations/activities/list'}"><i
                class="fa fa-opencart"></i> 营销活动管理</a>
              </li>
              <li v-if="permit('Weazm')"><a v-link="{path: '/dashboard/stations/banners/list'}"><i
                class="fa fa-image"></i> Banner管理</a>
              </li>
              <li><a v-link="{path: '/dashboard/stations/residences/list'}"><i class="fa fa-image"></i> 小区管理</a>
              </li>
              <li><a v-link="{path: '/dashboard/stations/payagre/edit'}"><i class="fa fa-image">协议管理</i></a>
              </li>
              <!--<li><a v-link="{path: '/dashboard/stations/topups/list'}"><i class="fa fa-battery-quarter"></i> 用户充值</a>-->
              <!--<li><a href="../layout/fixed.html"><i class="fa fa-bar-chart"></i> 数据统计</a></li>-->
            </ul>
          </li>

          <li class="treeview" v-if="permit('Integral')" :class="{active: route.nav == 'integral'}">
            <a href="#">
              <i class="fa fa-gift"></i>
              <span>积分管理</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li><a v-link="{path: '/dashboard/integral/list'}"><i class="fa fa-navicon"></i> 商品管理</a></li>
              <li><a v-link="{path: '/dashboard/integral/categoriesList'}"><i class="fa fa-cubes"></i> 分类管理</a></li>
              <li><a v-link="{path: '/dashboard/integral/banners'}"><i class="fa fa-sitemap"></i> 幻灯片管理</a></li>
              <li><a v-link="{path: '/dashboard/integral/delivery'}"><i class="fa fa-sitemap"></i> 发货管理</a></li>
              <li><a v-link="{path: '/dashboard/integral/sign'}"><i class="fa fa-sitemap"></i> 签到规则</a></li>
              <li><a v-link="{path: '/dashboard/integral/signRecord'}"><i class="fa fa-sitemap"></i> 签到记录</a></li>
              <li><a v-link="{path: '/dashboard/integral/exchangeList'}"><i class="fa fa-sitemap"></i> 兑换管理</a></li>
            </ul>
          </li>

          <!--<li class="treeview">-->
          <!--<a href="#">-->
          <!--<i class="fa fa-shopping-basket"></i>-->
          <!--<span>门店</span>-->
          <!--<i class="fa fa-angle-left pull-right"></i>-->
          <!--</a>-->
          <!--<ul class="treeview-menu">-->
          <!--<li><a v-link="{path: '/dashboard/stores/list'}"><i class="fa fa-map-marker"></i> 门店管理</a></li>-->
          <!--<li><a v-link="{path: '/dashboard/stores/campaigns/list'}"><i class="fa fa-bullseye"></i> 营销活动</a></li>-->
          <!--<li><a v-link="{path: '/dashboard/stores/orders/list'}"><i class="fa fa-reorder"></i> 订单管理</a></li>-->
          <!--<li><a href="../layout/fixed.html"><i class="fa fa-bar-chart"></i> 数据统计</a></li>-->
          <!--</ul>-->
          <!--</li>-->
          <!--<li class="treeview" v-if="permit('Weazm')" :class="{active: route.nav == 'mall'}">
            <a href="#">
              <i class="fa fa-shopping-cart"></i>
              <span>邮寄</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li><a v-link="{path: '/dashboard/mall/orders/list'}"><i class="fa fa-navicon"></i> 商城订单</a></li>
              <li><a v-link="{path: '/dashboard/finance/stations/list'}"><i class="fa fa-bar-chart"></i> 数据统计</a></li>
            </ul>
          </li>-->
          <li class="treeview" v-if="permit('Weazm')" :class="{active: route.nav == 'user'}">
            <a href="#">
              <i class="fa fa-user"></i>
              <span>用户</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
            	<li><a v-link="{path: '/dashboard/users/customusers'}"><i class="fa fa-users"></i>自定义新用户</a></li>
              <li><a v-link="{path: '/dashboard/users/list'}"><i class="fa fa-users"></i> 用户管理</a></li>
              <li><a v-link="{path: '/dashboard/users/groups/list'}"><i class="fa fa-navicon"></i> 用户分组</a></li>
            </ul>
          </li>
          <li class="treeview" v-if="permit('Finance')" :class="{active: route.nav == 'finance'}">
            <a href="#">
              <i class="fa fa-cny"></i>
              <span>财务</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li><a v-link="{path: '/dashboard/finance/stations/list'}"><i class="fa fa-life-bouy"></i> 服务部</a></li>
              <li v-if="permit('Finance')"><a v-link="{path: '/dashboard/finance/weazm/list'}"><i
                class="fa fa-line-chart"></i> 销售提成</a></li>
              <!--<li><a v-link="{path: '/dashboard/finance/stores/list'}"><i class="fa fa-shopping-basket"></i> 门店</a></li>-->
            </ul>
          </li>
          <li class="treeview" v-if="permit('Supervisor')" :class="{active: route.nav == 'access'}">
            <a href="#">
              <i class="fa fa-lock"></i>
              <span>管理员</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li><a v-link="{path: '/dashboard/access/users/list'}"><i class="fa fa-users"></i> 管理员列表</a></li>
              <!--<li><a v-link="{path: '/dashboard/access/roles/list'}"><i class="fa fa-users"></i> 角色列表</a></li>-->
            </ul>
          </li>
          <li class="treeview" v-if="permit('AssessList')" :class="{active: route.nav == 'assessList'}">
            <a href="#">
              <i class="fa fa-gift"></i>
              <span>评价</span>
              <i class="fa fa-angle-left pull-right"></i>
           </a>
            <ul class="treeview-menu">
              <li><a v-link="{path: '/dashboard/assess/list'}"><i class="fa fa-navicon"></i> 用户评价</a></li>
              <li><a v-link="{path: '/dashboard/assess/starTag'}"><i class="fa fa-cubes"></i> 评价设置</a></li>
              <li><a v-link="{path: '/dashboard/assess/ranklist'}"><i class="fa fa-sitemap"></i> 好评率排行</a></li>
            </ul>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- =============================================== -->

    <router-view></router-view>

    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 1.0
      </div>
      <strong>Copyright &copy; 2016 <a href="http://www.yantangmilk.com/">燕塘乳业</a>.</strong> All rights
      reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
  import { userinfoSuccess } from 'vuex-dir/actions.js'
  import api from 'api/index.js'
  export default {
    name: 'dashboard',
    vuex: {
      getters: {
        user: function (state) {
          return state.user.info
        },
        route: function (state) {
          return state.route
        }
      },
      actions: {
        userinfoSuccess
      }
    },
    data () {
      return {
        env: process.env.NODE_ENV
      }
    },
    methods: {
      permit (role) {
        if (role === 'Weazm') {
          return this.user.roles.indexOf(role) > -1
        } else {
          return this.user.roles.indexOf('Supervisor') > -1 || this.user.roles.indexOf(role) > -1
        }
      }
    },
    route: {
      data: function (transition) {
        var self = this
        api.users.get().then(
          function (user) {
            self.userinfoSuccess(user)
            window._user = user
            if (user.roles.indexOf('StationContact') > -1) {
              window.wilddog.sync().ref(user.id.toString()).once('value', function (snapshot) {
                if (snapshot.exists() && snapshot.val().split(',').length > 0) {
                  user.associateStations = snapshot.val()
                }
                transition.next()
              })
            } else {
              transition.next()
            }
          },
          function (error) {
            console.log(error)
          }
        )
      }
    }
  }
</script>
