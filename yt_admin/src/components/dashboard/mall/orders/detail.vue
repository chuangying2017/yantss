<template>
  <div class="row mall-order-detail" v-if="!$loadingRouteData">
    <div class="col-md-12">
      <div class="box box-success">
        <div class="box-header with-border">
          <h3 class="box-title">订单状态</h3>
          <!-- /.box-tools -->
        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding">
          <ul id="progressbar" class="mt10">
            <li class="active">买家下单<br>{{order.created_at.date | date}}</li>
            <li :class="{active: order.status == 'paid' || order.status == 'shipping'}">成功支付<br><span
              v-if="order.billings.length > 0">{{order.billings[0]['payment']['pay_at']}}</span>
            </li>
            <li :class="{active: order.status == 'shipping'}">商家发货<br><a
              href="http://www.kuaidi100.com/chaxun?com={{order.deliver.company.name}}&nu={{order.deliver.post_no}}"
              target="_blank" class="btn btn-warning btn-xs">查看物流</a>
            </li>
            <li :class="{active: order.status == 'done'}">交易完成<br></li>
          </ul>
        </div>
        <!-- /.box-body -->
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">订单信息</h3>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <ul>
                <li class="text-danger">订单编号：{{order.order_no}}</li>
                <li>订单总额：{{order.total_amount/100 | currency '￥'}}</li>
                <li>优惠金额：{{order.discount_amount/100 | currency '￥'}}</li>
                <li>支付金额：<span class="label label-warning">{{order.pay_amount/100 | currency '￥'}}</span></li>
                <hr>
                <li>付款方式：{{order.billings[0].pay_channel}}</li>
                <li>流水号：{{order.billings[0].payment.transaction_no}}</li>
              </ul>
            </div>
            <div class="box-footer clearfix">
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <div class="col-md-6">
          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">收货信息</h3>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <ul>
                <li><img width="50" src="http://o7tep4eu1.bkt.clouddn.com/cdn/img/user.png" alt=""></li>
                <li>姓名：{{order.address.name}}</li>
                <li>手机号码：{{order.address.phone}}</li>
                <li>联系方式：{{order.address.address}}</li>
              </ul>
            </div>
            <div class="box-footer clearfix">
              <button v-if="order.status == 'paid'" type="submit" class="btn btn-success btn-sm pull-right"
                      data-toggle="modal"
                      data-target=".express-modal">
                马上发货
              </button>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
      <div class="box box-warning">
        <div class="box-header with-border">
          <h3 class="box-title">订单商品</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body order-tables">
          <table class="table table-striped">
            <tbody>
            <tr>
              <th width="10%">商品图片</th>
              <th width="40%">商品名称</th>
              <!--<th width="20%">属性</th>-->
              <th width="10%">单价/数量</th>
              <th width="10%">合计</th>
            </tr>
            <tr v-for="sku in order.skus">
              <td width="10%">
                <img width="50"
                     :src="sku.cover_image" alt=""
                     class="cover-img">
              </td>
              <td><a href="" class="pro-title">{{sku.name}}</a></td>
              <!--<td width="20%">-->
              <!--<span> undefined: undefined<br></span>-->
              <!--</td>-->
              <td width="10%">
                {{sku.price | currency '￥'}}/{{sku.quantity}}件
              </td>
              <td width="10%">
                {{sku.price * sku.quantity | currency '￥'}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.tab-content -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'MallOrderDetail',
    data () {
      return {
        order: {}
      }
    },
    route: {
      data ({to: {params: {order_no: order_no}}}) {
        return api.orders.get(order_no).then(function (order) {
          return {
            order: order
          }
        })
      }
    },
    methods: {}
  }
</script>
<style>
  .mall-order-detail li {
    list-style: none;
    margin: 10px auto;
  }

  #progressbar {
    overflow: hidden;
    /*CSS counters to number the steps*/
    counter-reset: step;
    padding: 40px 0;
  }

  #progressbar li {
    list-style-type: none;
    color: #999396;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    width: 25%;
    float: left;
    position: relative;
  }

  #progressbar li:before {
    content: counter(step);
    counter-increment: step;
    width: 30px;
    height: 30px;
    display: block;
    font-size: 10px;
    color: #fff;
    background: #ddd;
    border-radius: 15px;
    margin: 0 auto 5px auto;
    border: 2px solid #fff;
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: bold;
    line-height: 25px;
    color: #fff;
  }

  /*progressbar connectors*/

  #progressbar li:after {
    content: '';
    width: 100%;
    height: 5px;
    background: #ddd;
    position: absolute;
    left: -50%;
    top: 12px;
    z-index: 1;
    /*put it behind the numbers*/
  }

  #progressbar li:first-child:after {
    content: none;
  }

  #progressbar li.active:before,
  #progressbar li.active:after {
    background: #31bf56;
    color: white;
  }
</style>
