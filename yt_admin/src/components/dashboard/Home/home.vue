<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        概况
        <small>v 0.94</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 概况</a></li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Info boxes -->
      <!--<div class="row">-->
      <!--<div class="col-md-3 col-sm-6 col-xs-12">-->
      <!--<div class="info-box">-->
      <!--<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>-->

      <!--<div class="info-box-content">-->
      <!--<span class="info-box-text">用户总数</span>-->
      <!--<span class="info-box-number">90<small>%</small></span>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box-content &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.col &ndash;&gt;-->
      <!--<div class="col-md-3 col-sm-6 col-xs-12">-->
      <!--<div class="info-box">-->
      <!--<span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>-->

      <!--<div class="info-box-content">-->
      <!--<span class="info-box-text">订奶用户</span>-->
      <!--<span class="info-box-number">2,000</span>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box-content &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.col &ndash;&gt;-->
      <!--<div class="col-md-3 col-sm-6 col-xs-12">-->
      <!--<div class="info-box">-->
      <!--<span class="info-box-icon bg-red"><i class="fa fa-google-plus"></i></span>-->

      <!--<div class="info-box-content">-->
      <!--<span class="info-box-text">待发货(邮寄)</span>-->
      <!--<span class="info-box-number">41,410</span>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box-content &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.col &ndash;&gt;-->

      <!--&lt;!&ndash; fix for small devices only &ndash;&gt;-->
      <!--<div class="clearfix visible-sm-block"></div>-->

      <!--<div class="col-md-3 col-sm-6 col-xs-12">-->
      <!--<div class="info-box">-->
      <!--<span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>-->

      <!--<div class="info-box-content">-->
      <!--<span class="info-box-text">今日销量(邮寄)</span>-->
      <!--<span class="info-box-number">760</span>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box-content &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.info-box &ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; /.col &ndash;&gt;-->
      <!--</div>-->
      <!-- /.row -->
      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <div class="col-md-8">
          <!-- MAP & BOX PANE -->
          <!-- /.box -->
          <div class="row">
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">待处理订单(订奶)</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                  <tr>
                    <th>订单号</th>
                    <th>用户名</th>
                    <th>订单时间</th>
                    <th>状态</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="order in orders['data']">
                    <td>{{order.order_no}}</td>
                    <td>{{order.name}}</td>
                    <td>{{order.created_at.date | date}}</td>
                    <td>
                      <span class="label label-primary" v-if="order.status == 'shipping'">正常</span>
                      <span class="label label-danger" v-if="order.status == 'reject'">被拒绝</span>
                      <span class="label label-danger" v-if="order.status == 'unpaid'">未支付</span>
                      <span class="label label-warning" v-if="order.status == 'assigning'">未处理</span>
                      <span class="label label-success" v-if="order.status == 'done'">已完成</span>
                      <span class="label label-default" v-if="order.status == 'cancel'">已取消</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
              <a v-link="{path: '/dashboard/stations/orders/list'}" class="btn btn-sm btn-default btn-flat pull-right">查看所有订单</a>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->

        <div class="col-md-4">
          <!-- USERS LIST -->
          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">新增用户</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <ul class="users-list clearfix">
                <li v-for="user in users['data']" v-if="$index <8">
                  <img :src="user.avatar" alt="User Image">
                  <a class="users-list-name" href="#">{{user.nickname}}</a>
                </li>
              </ul>
              <!-- /.users-list -->
            </div>
            <!-- /.box-body -->
            <div class="box-footer text-center">
              <a v-link="{path: '/dashboard/users/list'}" class="uppercase">查看所有</a>
            </div>
            <!-- /.box-footer -->
          </div>
          <!--/.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  import api from 'api/index.js'
  export default {
    name: 'Home',
    data () {
      return {
        users: [],
        orders: []
      }
    },
    vuex: {
      getters: {
        user: function (state) {
          return state.user.info
        }
      }
    },
    route: {
      data () {
        return {
          users: this.user.roles.indexOf('Supervisor') > -1 ? api.users.getAll() : [],
          orders: api.stations.orders.getAll({status: 'assigning'})
        }
      }
    }
  }
</script>
