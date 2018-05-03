<template>
    <div class="changeInfo">
      <p class="title">兑换记录</p>
      <div class="row">
        <div class="col-md-6 userInfo">
          <div class="orderTitle">
            <p class="titleOne"><i class="fa fa-user"></i><span class="userTitle">用户信息</span></p>
          </div>
          <div class="contentUser">
            <table class="table noneBorder">
              <tr>
                <td width="30%">姓名</td>
                <td>{{order.user.name}}</td>
              </tr>
              <tr>
                <td>电话</td>
                <td>{{order.user.phone}}</td>
              </tr>
              <tr>
                <td>地址</td>
                <td>{{order.user.detail}}</td>
              </tr>
              <tr>
                <td>小区名称</td>
                <td>(无)</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-md-5 userInfo mg20">
          <div class="orderTitle">
            <p><i class="fa fa-university"></i><span class="userTitle">订单信息</span></p>
          </div>
          <div class="contentUser">
            <table class="table noneBorder">
              <tr>
                <td width="60%">订单号</td>
                <td>{{order.order.order_no}}</td>
              </tr>
              <tr>
                <td>订单金额</td>
                <td>{{order.order.total_amount/100 | currency '￥'}}</td>
              </tr>
              <tr>
                <td>支付金额</td>
                <td>{{order.order.pay_amount/100 | currency '￥'}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="row changeInfoSecond">
        <div class="col-md-6 userInfo">
          <div class="orderTitle noneBorder2">
            <p><i class="fa fa-university"></i><span class="userTitle">优鲜卡详情</span></p>
          </div>
          <div class="tableContent">
            <table class="table youInfos">
              <tr>
                <td>购买额度</td>
                <td>状态</td>
                <td>过期时间</td>
              </tr>
              <tr v-for="item in order.card">
                <td>{{item.content/100 | currency '￥' }}</td>
                <td><span v-if="item.status == '0'">未使用</span>
                  <span v-if="item.status == '1'">已使用</span></td>
                <td>{{item.end_time}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="row lastRow">
        <div class="col-xs-12">
          <div class="orderTitle noneBorder2">
            <p><i class="fa fa-university"></i><span class="userTitle">兑换记录</span></p>
          </div>
          <div class="">
            <table class="table padleft" style="border: 1px solid #dddddd;">
              <tr style="border: 1px solid #dddddd;" class="tablehead">
                <td>兑换商品</td>
                <td>兑换时间</td>
                <td>兑换数量</td>
                <td style="width: 700px">兑换金额</td>
              </tr>
              <tr style="border: 1px solid #dddddd;" class="tableline" v-for="sku in order.skus">
                <td><img class="imgClass" :src=sku.cover_image />{{sku.name}}</td>
                <td>{{sku.created_at}}</td>
                <td>{{sku.quantity}}</td>
                <td>{{sku.discount_amount/100 | currency '￥'}}元</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import api from 'api/index.js'
  export default {
    name: 'changInfo',
    data () {
      return {
        order: {}
      }
    },
    route: {
      data (transition) {
        return {
          order: api.cardorder.get(transition.to.params.order_id)
        }
      }
    },
    // created () {
    //   this.$http.get('/admin/card/cardorder/detail/41114').then((response) => {
    //     this.carts = response.data
    //     console.log(this.carts)
    //   })
    // },
    methods: {}
  }
</script>

<style scoped>
  .tablehead>td{
    padding-left: 20px;
    border-style:none ;
  }
  .tableline>td{
    padding: 25px 0px 30px 20px;
    border-style:none ;
  }
  *{
    font-size: 15px;
  }
  .title{
    font-size: 1.65rem;
  }
  .userTitle{
    padding-left: 10px;
    font-size: 19px;
  }
  tr{
    padding: 20px 0px;
  }
  .col-md-6{
    padding: 0px;
    margin: 0px;
  }
  .col-md-5{
    padding: 0px;
    margin: 0px;
  }
  .userInfo{
    background: white;
    margin-left: 20px;
  }
  .orderTitle{
    border-bottom: 1px solid #cccccc;
    padding: 10px 0px 0px 10px;
  }
  .contentUser{
    padding-top: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .mg20{
    margin-left: 20px;
  }
  .tableClass tr{
    padding-bottom: 20px;
    line-height: 35px;
  }
  .changeInfoSecond{
    margin-top: 20px;
  }
  .titleOne{
    font-size: 19px;
  }
  .lastRow{
    background: #ffffff;
    margin-left: 9px;
    margin-right: 10px;
    margin-top: 20px;
  }
  .imgClass{
    height:30px;
    width: 30px;
  }
  .col-xs-12{
    padding: 0px;
    margin: 0px;
  }
  .noneBorder tr td{
    border-top: 0px!important;
  }
  .noneBorder2{
    border-bottom: 0px!important;
  }
  .tableContent{
    padding-left: 20px;
  }
  .table{
    margin-bottom: 0px;
  }
</style>
