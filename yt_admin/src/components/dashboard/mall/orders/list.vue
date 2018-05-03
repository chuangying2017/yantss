<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">筛选</h3>
        </div>
        <div class="box-body">
          <form action="" class="form-horizontal">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">订单号</label>
                  <div class="col-sm-8">
                    <input type="text" name="" id="" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">用户手机</label>
                  <div class="col-sm-8">
                    <input type="tel" name="" id="" class="form-control">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">订单时间</label>
                  <div class="col-sm-4">
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <input type="text" class="form-control pull-right" id="reservation">
                    </div>
                  </div>
                  <a href="">
                    <small>7天</small>
                  </a>
                  &nbsp;
                  &nbsp;
                  <a href="">
                    <small>30天</small>
                  </a>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">订单状态</label>
                  <div class="col-sm-4">
                    <select class="form-control">
                      <option>所有</option>
                      <option>会员分组</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <button type="submit" class="btn btn-info pull-right">搜索</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">订单管理</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="管理员手机">

              <div class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <div class="col-md-12">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li :class="{active: !query.status}"><a href="#!/dashboard/mall/orders/list">全部订单</a></li>
                <li :class="{active: query.status == 'paid'}"><a
                  href="#!/dashboard/mall/orders/list?status=paid">待发货</a></li>
                <li :class="{active: query.status == 'shipping'}"><a
                  href="#!/dashboard/mall/orders/list?status=shipping">已发货</a>
                </li>
                <li :class="{active: query.status == 'unpaid'}"><a href="#!/dashboard/mall/orders/list?status=unpaid">未支付</a>
                </li>
                <li :class="{active: query.status == 'apply'}"><a
                  href="#!/dashboard/mall/orders/list?status=apply">申请退货</a></li>
                <li :class="{active: query.status == 'redeliver'}"><a
                  href="#!/dashboard/mall/orders/list?status=redeliver">退货中</a></li>
                <li :class="{active: query.status == 'refunded'}"><a
                  href="#!/dashboard/mall/orders/list?status=refunded">已退款</a></li>
                <li :class="{active: query.status == 'done'}"><a
                  href="#!/dashboard/mall/orders/list?status=done">已完成</a></li>
                <li :class="{active: query.status == 'closed'}"><a href="#!/dashboard/mall/orders/list?status=closed">已关闭</a>
                </li>
              </ul>
              <div class="tab-content order-tables">
                <div class="active tab-pane" id="activity">
                  <table class="table table-striped" v-for="order in orders">
                    <tbody>
                    <tr>
                      <th>{{order.created_at.date | date}} | 订单号：{{order.order_no}}</th>
                      <th>订单总价</th>
                      <th>订单状态</th>
                      <th>{{order.address.name}} | {{order.address.phone}}</th>
                    </tr>
                    <tr>
                      <td width="50%">
                        <table class="table">
                          <tbody>
                          <tr v-for="sku in order.skus">
                            <td width="20%"><img width="30" :src="sku.cover_image" alt=""></td>
                            <td width="30%">{{sku.name}}</td>
                            <td width="10%">{{sku.pay_amount | currency '￥'}}</td>
                            <td width="10%">{{sku.quantity}}</td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>{{order.pay_amount/100 | currency '￥'}}</td>
                      <td width="10%">
                        <span class="label label-warning" v-if="order.status == 'paid'">待发货</span>
                        <span class="label label-default" v-if="order.status == 'unpaid'">未支付</span>
                        <span class="label label-success" v-if="order.status == 'shipping'">已发货</span>
                      </td>
                      <td width="20%" style="text-align:center;">
                        <div class="btn-group">
                          <a v-link="{path: '/dashboard/mall/orders/' + order.order_no}"
                             class="btn btn-default btn-sm">查看详情</a>
                          <express :order="order" class="btn btn-warning btn-sm"
                                   v-if="order.status == 'paid'"></express>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /. box -->
          </div>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <ul class="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Express from 'components/express.vue'
  export default {
    name: 'ListMallOrders',
    components: [Express],
    data () {
      return {
        orders: [],
        pagination: {},
        query: {}
      }
    },
    route: {
      data ({to: {query: query}}) {
        return api.orders.getAll(query).then(function ({data: orders, meta: {pagination: pagination}}) {
          return {
            orders: orders,
            query: query,
            pagination: pagination
          }
        })
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .nav-tabs-custom {
    box-shadow: none;
  }
</style>
