<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">服务部总账单 <b>({{invoices.invoice_date}})</b></h3>
          <a href="" class="btn btn-success btn-xs" @click.prevent="export('all')">导出明细</a>
          <a href="" class="btn btn-info btn-xs" @click.prevent="export('summary')">导出概况</a>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" v-model="filter" class="form-control pull-right" placeholder="服务部名称">

              <div class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>账单号</th>
              <th>服务部名字</th>
              <th>订单金额</th>
              <th>优惠金额</th>
              <th>实际支付</th>
              <th>手续费</th>
              <th>应收金额</th>
              <th>订单数</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="invoice in invoices.detail | filterBy filter in 'merchant_name' | orderBy invoiceOrder -1">
              <td>{{$index + 1}}</td>
              <td>{{invoice.invoice_no}}</td>
              <td>{{invoice.merchant_name}}</td>
              <td>{{invoice.total_amount}}</td>
              <td>{{invoice.discount_amount}}</td>
              <td>{{invoice.pay_amount}}</td>
              <td>{{invoice.service_amount}}</td>
              <td>{{invoice.receive_amount}}</td>
              <td>{{invoice.total_count}}</td>
              <td>
                <p>
                  <span class="label label-warning" v-if="invoice.status == 'pending'">未对账</span>
                  <span class="label label-success" v-if="invoice.status == 'confirm'">已确认</span>
                  <span class="label label-danger" v-if="invoice.status == 'reject'">有异议</span>
                  <span class="label label-success" v-if="invoice.status == 'reconfirm'">已重新确认</span>
                </p>
                <small v-if="invoice.status == 'reject'" class="text-danger">{{invoice.memo}}</small>
              </td>
              <td>
                <a
                  v-link="{path: '/dashboard/finance/stations/detail/' + invoice.invoice_no + '/' + invoice.invoice_date}">
                  明细</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListInvoiceOverview',
    data () {
      return {
        invoices: [],
        filter: ''
      }
    },
    route: {
      data (transition) {
        return Promise.all([api.invoice.getInvoices(transition.to.params.invoice_no)]).then(function ([invoices]) {
          if (window._user.roles.indexOf('StationContact') > -1) {
            var associateStations = window._user.associateStations.split(',')
            var temp = []
            invoices.detail.forEach(function (val) {
              if (associateStations.indexOf(val.merchant_id) > -1) {
                temp.push(val)
              }
            })
            invoices.detail = temp
          }
          return {
            invoices: invoices
          }
        })
      }
    },
    methods: {
      export: function (type) {
        window.open(
          api.invoice.getExportLink(this.invoices.invoice_no, type),
          '_blank'
        )
      },
      invoiceOrder: function (a, b) {
        if (a.merchant_no === '' || b.merchant_no === '') {
          // 同为服务部的情况，按id排序
          if (a.merchant_no === '' && b.merchant_no === '') {
            return parseInt(a.merchant_id) <= parseInt(b.merchant_id) ? 1 : -1
          }
          // 遇到非服务部的，丢后面
          if (a.merchant_no === '') {
            return -1
          }
          if (b.merchant_no === '') {
            return 1
          }
        } else {
          // 按金额排序
          return parseInt(a.total_amount) >= parseInt(b.total_amount) ? 1 : -1
        }
      }
    }
  }
</script>
