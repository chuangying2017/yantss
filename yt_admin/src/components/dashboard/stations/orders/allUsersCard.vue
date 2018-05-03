<template>
  <div class="changeInfo">
    <p class="title">用户所有优鲜卡</p>
    <div class="row">
      <div class="col-md-6 userInfo">
        <div class="orderTitle">
          <p class="titleOne"><i class="fa fa-user"></i><span class="userTitle">用户信息</span></p>
        </div>
        <div class="contentUser">
          <table class="table noneBorder">
            <tr>
              <td width="40%">姓名</td>
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
              <td>{{order.user.district}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="row lastRow">
      <div class="col-xs-12">
        <div class="orderTitle noneBorder2">
          <p><i class="fa fa-university"></i><span class="userTitle">优鲜卡</span></p>
        </div>
        <div class="">
          <table class="table tableEdit">
            <tr>
              <td>购买额度</td>
              <td width="20%">下单时间</td>
              <td width="20%">过期时间</td>
              <td>使用状态</td>
              <td>操作</td>
            </tr>
            <tr v-for="item in order.card">
              <td>{{item.content/100 | currency '￥'}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.end_time}}</td>
              <td><span v-if="item.status == '0'">未使用</span>
                <span v-if="item.status == '1'">已使用</span></td>
              <td>查看详情</td>
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
    name: 'allUsersCard',
    data () {
      return {
        order: {}
      }
    },
    route: {
      data (transition) {
        return {
          order: api.cardorder.getOneUserCards(transition.to.params.order_id)
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
  .tableEdit>tbody>tr>td{
    padding-left: 20px;
  }
  .tableEdit{
    margin-bottom: 0px;
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
  .userInfo{
    background: white;
    margin-left: 20px;
  }
  .orderTitle{
    border-bottom: 1px solid #dddddd;
    padding: 10px 0px 0px 10px;
  }
  .contentUser{
    padding-top: 10px;
    padding-left: 10px;
  }
  .tableClass tr{
    padding-bottom: 20px;
    line-height: 35px;
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
</style>
