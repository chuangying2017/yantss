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
              <td>{{order.address.name}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{order.address.phone}}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{order.address.detail}}</td>
            </tr>
            <tr>
              <td>小区名称</td>
              <td>{{order.residence}}</td>
            </tr>
            <tr>
              <td>支付时间</td>
              <td>{{order.pay_at}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-user-secret"></i>

          <h3 class="box-title">收款员信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td width="35%">名称</td>
              <td>{{order.staff.name}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{order.staff.phone}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>


      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-building"></i>

          <h3 class="box-title">服务部信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td width="35%">服务部名称</td>
              <td>{{order.staff.station.name}}</td>
            </tr>
            <tr>
              <td>服务部地址</td>
              <td>{{order.staff.station.address}}</td>
            </tr>
            <tr>
              <td>服务部电话</td>
              <td>{{order.staff.station.tel}}</td>
            </tr>
            <tr>
              <td>负责人姓名</td>
              <td>{{order.staff.station.director}}</td>
            </tr>
            <tr>
              <td>负责人电话</td>
              <td>{{order.staff.station.phone}}</td>
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
          <i class="fa fa-list"></i>

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
              <td>
                {{order.order.discount_amount | currency '￥'}}
              </td>
            </tr>
            <tr v-if="order.order.promotions">
              <td width="35%">使用优惠：</td>
              <td v-for="promo in order.order.promotions">
                  <p>{{promo.promotion.name}}</p>
              </td>
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
          <i class="fa fa-gift"></i>

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
              <td>总数</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><img :src="order.sku.cover_image" alt="" width="30"></td>
              <td>{{order.sku.name}}</td>
              <td>{{order.sku.price | currency '￥'}}</td>
              <td>{{order.quantity}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- ./col -->
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListStationCollectOrderDetail',
    data () {
      return {
        order: {},
        stations: []
      }
    },
    route: {
      data (transition) {
        return {
          order: api.stations.collect_orders.get(transition.to.params.order_no)
        }
      }
    },
    methods: {}
  }
</script>
