<template>
  <div class="row">
    <div class="col-md-5">
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-user"></i>

          <h3 class="box-title">用户信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td width="35%">姓名</td>
              <td>{{order.name}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{order.phone}}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{order.address}}</td>
            </tr>
            <tr>
              <td>小区名称</td>
              <td>{{order.residence}}</td>
            </tr>
            <tr>
              <td>开始时间</td>
              <td>{{order.start_time}}</td>
            </tr>
            <tr>
              <td>配送喜好</td>
              <td>{{order.weekday_type == 'all' ? '周一到周日' : '周一到周五'}}({{order.daytime ? '上午' :
                '下午'}})
              </td>
            </tr>
            <tr>
              <td>订奶状态</td>
              <td>
                <span class="label label-primary" v-if="order.status == 'shipping'">正常</span>
                <span class="label label-danger" v-if="order.status == 'reject'">被拒绝</span>
                <span class="label label-success" v-if="order.status == 'done'">已完成</span>
                <span class="label label-danger" v-if="order.status == 'unpaid'">未付款</span>
                <span class="label label-default" v-if="order.status == 'cancel'">已取消</span>
                <span class="label label-warning" v-if="order.pause_status">暂停</span>
                <span class="label label-warning" v-if="order.status == 'assigning'">未处理</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">服务部信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td width="35%">名称</td>
              <td>{{order.station.name}}</td>
            </tr>
            <tr>
              <td>联系人</td>
              <td>{{order.station.director}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{order.station.phone}}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{order.station.address}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>

      <!-- /.box -->
    </div>
    <div class="col-md-7">
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">订单信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td width="35%">订单号</td>
              <td>{{order.order.order_no}}</td>
            </tr>
            <tr>
              <td width="35%">订单金额</td>
              <td>{{order.order.total_amount | currency '￥'}}</td>
            </tr>
            <tr>
              <td width="35%">优惠金额</td>
              <td>{{order.order.discount_amount | currency '￥'}}</td>
            </tr>
            <tr>
              <td width="35%">支付金额</td>
              <td>{{order.order.pay_amount | currency '￥'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">商品详情</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table">
            <thead>
            <tr>
              <td>图片</td>
              <td>商品名</td>
              <td>单价</td>
              <td>每天配送</td>
              <td>剩余/总数</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sku in order.skus">
              <td><img :src="sku.cover_image" alt="" width="30"></td>
              <td>{{sku.name}}</td>
              <td>{{sku.price | currency '￥'}}</td>
              <td>{{sku.per_day}}</td>
              <td>{{sku.remain}}/{{sku.total}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <!--<div class="box">-->
      <!--<div class="box-header">-->
      <!--<h3 class="box-title">配送明细</h3>-->
      <!--<div class="box-tools">-->
      <!--<div class="input-group input-group-sm" style="width: 150px;">-->
      <!--<div class="input-group-addon">-->
      <!--<i class="fa fa-calendar"></i>-->
      <!--</div>-->
      <!--<input type="text" class="form-control pull-right" id="reservation">-->
      <!--<div class="input-group-btn">-->
      <!--<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.box-header &ndash;&gt;-->
      <!--<div class="box-body table-responsive no-padding">-->
      <!--<table class="table table-hover">-->
      <!--<tbody>-->
      <!--<tr>-->
      <!--<th>时间</th>-->
      <!--<th>用户名</th>-->
      <!--<th>商品</th>-->
      <!--<th>商品金额</th>-->
      <!--<th>配送员</th>-->
      <!--<th>所属服务部</th>-->
      <!--<th>状态</th>-->
      <!--</tr>-->
      <!--<tr v-for="1 in 5">-->
      <!--<td>2016-5-23 05:23:12</td>-->
      <!--<td>李一</td>-->
      <!--<td>牛奶|酸奶</td>-->
      <!--<td>12.90</td>-->
      <!--<td>刘立</td>-->
      <!--<td>天河XX服务部A</td>-->
      <!--<td>-->
      <!--<span class="label label-success">成功</span>-->
      <!--<span class="label label-warning">客户不在家</span>-->
      <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.box-body &ndash;&gt;-->
      <!--<div class="box-footer">-->

      <!--<ul class="pagination pagination-sm no-margin pull-right">-->
      <!--<li><a href="#">«</a></li>-->
      <!--<li><a href="#">1</a></li>-->
      <!--<li><a href="#">2</a></li>-->
      <!--<li><a href="#">3</a></li>-->
      <!--<li><a href="#">»</a></li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--</div>-->
      <!-- /.box -->
    </div>
    <!-- ./col -->
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListStationOrderDetail',
    data () {
      return {
        order: {},
        stations: []
      }
    },
    route: {
      data (transition) {
        return {
          order: api.stations.orders.get(transition.to.params.order_no)
        }
      }
    },
    methods: {}
  }
</script>
