<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">{{orders[0]['station']['name']}}账单明细 <b>({{date}})</b></h3>
          <div class="box-tools">
            <select v-model="order_type" @change="changePage">
              <option selected value="preorder">线上订奶</option>
              <option value="collect">线下收款</option>
            </select>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>用户信息</th>
              <th>购买信息</th>
              <th>订单金额</th>
              <th>优惠金额</th>
              <th>实际支付</th>
              <th>手续费</th>
              <th>应收金额</th>
            </tr>
            <tr v-for="order in orders ">
              <td>{{$index + 1}}</td>
              <td>
                <p>订单号: {{order.order_no}}</p>
                <p>{{order.name}} - {{order.phone}}</p>
                <p style="width:180px; font-size:12px;">{{order.address}}</p>
              </td>
              <td v-show="order_type === 'preorder'">
                <p v-for="product in order.detail">
                  {{product.name}} / {{product.total}} </p>
                <p>下单时间: {{order.order_at}}</p>
                <p>接单时间: {{order.confirm_at}}</p>
              </td>
              <td v-show="order_type === 'collect'">
                <p>
                  {{order.detail.name}} * {{order.detail.quantity}} </p>
                <p>支付时间: {{order.pay_at}}</p>
              </td>
              <td>{{order.total_amount}}</td>
              <td>{{order.discount_amount}}</td>
              <td>{{order.pay_amount}}</td>
              <td>{{order.service_amount}}</td>
              <td>{{order.receive_amount}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <div class="box-footer">
            <span>当前: 第{{pagination.current_page}}页</span> - 跳转到第
            <select v-model="goTo" v-on:change="changePage">
              <option value="{{n+1}}" v-for="n in pagination.total_pages">{{n + 1}}</option>
            </select>页
          </div>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListInvoiceDetail',
    data () {
      return {
        invoice_no: null,
        goTo: 1,
        orders: [],
        filter: '',
        pagination: {},
        order_type: 'preorder'
      }
    },
    created () {
      const params = this.$route.params
      let self = this
      Promise.all([api.invoice.getDetail(params.invoice_no, {page: 1})]).then(([{orders, pagination}]) => {
        self.invoice_no = params.invoice_no
        self.date = params.date
        self.orders = orders
        self.pagination = pagination
      }, (error) => {
        console.warn(error)
      })
    },
    methods: {
      changePage: function () {
        var self = this
        api.invoice.getDetail(this.invoice_no, {
          page: this.goTo,
          _type: self.order_type
        }).then(function ({orders, pagination}) {
          self.orders = orders
          self.pagination = pagination
        })
      }
    }
  }
</script>
