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
              <label for="groupRadios" class="col-sm-2 control-label">开始时间</label>
              <div class="col-sm-6">
                <input type="text" v-model="query.start_time" class="form-control">
              </div>
            </div>
            <div class="row">
              <label for="groupRadios" class="col-sm-2 control-label">结束时间</label>
              <div class="col-sm-6">
                <input type="text" v-model="query.end_time" class="form-control">
              </div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <button type="submit" class="btn btn-info pull-right" @click.prevent="search">搜索</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-if="lists.length > 0">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">服务部总账单</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>No.</th>
              <th>账单号</th>
              <th>账单日期</th>
              <th>订单金额</th>
              <th>优惠金额</th>
              <th>实际支付</th>
              <th>手续费</th>
              <th>应收金额</th>
              <th>订单数</th>
              <th>操作</th>
            </tr>
            <tr v-for="list in lists">
              <td>{{$index + 1}}</td>
              <td>{{list.invoice_no}}</td>
              <td>{{list.invoice_date}}</td>
              <td>{{list.total_amount}}</td>
              <td>{{list.discount_amount}}</td>
              <td>{{list.pay_amount}}</td>
              <td>{{list.service_amount}}</td>
              <td>{{list.receive_amount}}</td>
              <td>{{list.total_count}}</td>
              <td>
                <a v-link="{path: '/dashboard/finance/stations/overview/' + list.invoice_no}"> 服务部详情</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <!--<ul class="pagination pagination-sm no-margin pull-right">-->
          <!--<li><a href="#">«</a></li>-->
          <!--<li><a href="#">1</a></li>-->
          <!--<li><a href="#">2</a></li>-->
          <!--<li><a href="#">3</a></li>-->
          <!--<li><a href="#">»</a></li>-->
          <!--</ul>-->
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import moment from 'moment'
  export default {
    name: 'ListStationStatements',
    data () {
      return {
        lists: [],
        query: {
          start_time: '2016-08-27',
          end_time: moment().format('YYYY-MM-DD')
        }
      }
    },
    methods: {
      search: function () {
        var self = this
        api.invoice.getList(this.query).then(function (lists) {
          self.lists = lists
        })
      }
    }
  }
</script>
