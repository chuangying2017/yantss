<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">商品管理</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="date" class="form-control w150 mb20 mt20" v-model="query.start_time">
                至
                <input type="date" class="form-control w150 mb20 mt20" v-model="query.end_time">
              </div>
            </div>

            <div class="col-md-6 mg20 mt20">
              <form action="" class="form-horizontal">
                <div class="form-group">

                  <select class="selC" v-model="query.type">
                    <option value="0">未中奖</option>
                    <option value="1">已中奖</option>
                    <option value="2">已兑换</option>
                  </select><select class="selC" v-model="query.info">
                  <option value="0">收件人信息</option>
                  <option value="1">活动编号</option>
                  <option value="2">兑换码</option>
                  <option value="3">兑换门店</option>
                  <option value="4">快递单号</option>
                  <option value="5">商品名称</option>
                </select><input type="text" class="form-control w250" placeholder="请输入关键字" v-model="query.name"><button type="button" class="btn btn-info bn">搜索</button><button type="button" class="btn btn-info bn">导出</button>
                </div>
                <div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <div class="col-md-12">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li :class="{active: !query.status}"><a href="#!/dashboard/integral/delivery">待发货</a></li>
                <li :class="{active: query.status == 'paid'}"><a
                  href="#!/dashboard/integral/delivery?status=paid">待收货</a></li>
                <li :class="{active: query.status == 'shipping'}"><a
                  href="#!/dashboard/integral/delivery?status=shipping">已完成</a>
                </li>
              </ul>
              <div class="tab-content order-tables">
                <div class="row">
                  <div class="col-xs-12">

                      <!-- /.box-header -->
                      <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-striped goodsTable">
                          <tbody>
                          <tr>
                            <th>编号/商品</th>
                            <th>信息</th>
                            <th>粉丝</th>
                            <th>会员</th>
                            <th>支付</th>
                            <th>消耗</th>
                            <th>操作</th>
                            <th>状态</th>
                          </tr>
                          <tr>
                          <!--<tr v-for="order in orders">-->
                            <td>
                              <p>111111111111111</p>
                              <p><img class="imgC" src="../../../../assets/logo.png"/>潮酷派多功能包</p>
                            </td>
                            <td>
                              <!--<p><span class="label label-danger" v-if="order.status == '0'">未使用</span></p>-->
                              <!--<p><span class="label label-success" v-if="order.status == 'done'">已完成</span></p>-->
                              <p><span class="label label-danger">兑换</span></p>
                              <p><span class="label label-success">快递配送</span></p>
                            </td>
                            <td>
                              <div class="spCon">
                                <div class="imgCon">
                                  <img class="imgC b50" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587"/>
                                </div>
                                <div>
                                  <p class="middleP">牛奶</p>
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <td>
                              <p>无需支付</p>
                              <p>无需运费</p>
                            </td>
                            <td>-3990积分</td>
                            <td>
                              <!--<p v-if="order.pay_status == 'paid'"><a v-link="{path: '/dashboard/stations/orders/changeInfo/' + order.id}">查看详情 </a></p>-->
                              <!--<p v-if="order.pay_status == 'paid'"><a v-link="{path: '/dashboard/stations/orders/allUsersCard/' + order.id}">兑换 </a></p>-->
                              <p><a v-link="{path: '/dashboard/integral/deliveryInfo'}">查看详情 </a></p>
                              <p><a v-link="{path: '/dashboard/integral/exchange'}">兑换 </a></p>
                            </td>
                            <td>待发货</td>
                          </tr>

                          </tbody>
                        </table>
                      </div>
                      <!-- /.box-body -->
                      <!--<div class="box-footer">-->
                      <!--<p>合计: {{pagination.total}}</p> 当前页:-->
                      <!--<pagination :pagination="pagination" :goto="search"></pagination>-->
                      <!--</div>-->
                    <!-- /.box -->
                  </div>
                </div>
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /. box -->
          </div>
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
    }

  }
</script>

<style scoped>
  .nav-tabs-custom {
    box-shadow: none;
  }
  .mt20{
    margin-top: 20px;
  }
  .selC{
    width: 100px;
    height: 34.5px;
    border-color: #d2d6de;
  }
  .w250{
    width:350px;
    display: inline;
  }
  .w150{
    width:150px;
    display: inline;
  }
  .bn{
    border-radius: 0px;
    height: 34px;
    position: relative;
    top:-1px;
  }
  .spCon{
    display: flex;
    margin: 5px;
  }
  .goodsTable>tbody>tr>td{
    vertical-align: middle;
  }
  .middleP{
    margin-top: 15px;
  }

</style>
