<template>
  <div class="pad margin no-print" v-if="no">
    <div class="callout callout-info" style="margin-bottom: 0!important;">
      <h4><i class="fa fa-info"></i> Note:</h4>
      This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.
    </div>
  </div>
  <section class="invoice">
    <!-- title row -->
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">
          <i class="fa fa-globe"></i> 燕塘优鲜达
          <small class="pull-right">时间: {{statement.confirm_at}}</small>
        </h2>
      </div>
      <!-- /.col -->
    </div>
    <!-- info row -->
    <div class="row invoice-info">
      <div class="col-sm-4 invoice-col">
        From
        <address>
          <strong>广州燕塘有限公司</strong><br>
        </address>
      </div>
      <!-- /.col -->
      <div class="col-sm-4 invoice-col">
        To
        <address>
          <strong>{{statement.station.name}}</strong><br>
          负责人: {{statement.station.director}}<br>
          地址: {{statement.station.address}}<br>
          联系电话: {{statement.station.phone}}<br>
        </address>
      </div>
      <!-- /.col -->
      <div class="col-sm-4 invoice-col">
        <b>账单编号: {{statement.statement_no}}</b><br>
        <br>
        <p v-if="statement.status">
          <b>状态:</b> <span class="label label-success">已对账</span><br>
        </p>
        <p v-else>
          <b>状态:</b> <span class="label label-warning">未对账</span><br>
        </p>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- Table row -->
    <div class="row">
      <div class="col-xs-12 table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>商品ID</th>
            <th>商品</th>
            <th>数量</th>
            <th>零售价</th>
            <th>总计</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="sku in statement.skus">
            <td>{{sku.product_id}}</td>
            <td>{{sku.name}}</td>
            <td>{{sku.quantity}}</td>
            <td>{{sku.price}}</td>
            <td>{{sku.total_amount}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="row">
      <!-- accepted payments column -->
      <div class="col-xs-6">

      </div>
      <!-- /.col -->
      <div class="col-xs-6">
        <p class="lead">账单日期 {{statement.year}} - {{statement.month}}</p>

        <div class="table-responsive">
          <table class="table">
            <tbody>
            <tr>
              <th style="width:50%">商品总计:</th>
              <td>{{statement.settle_amount}}</td>
            </tr>
            <tr>
              <th>服务费总计:</th>
              <td>{{statement.service_amount}}</td>
            </tr>
            <tr>
              <th>总计:</th>
              <td>{{statement.total_amount}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- this row will not appear when printing -->
    <div class="row no-print">
      <div class="col-xs-12">
        <!--<button type="button" class="btn btn-danger pull-right btn-sm"><i class="fa fa-credit-card"></i> 确认对账-->
        <!--</button>-->
        <a v-link="{path: '/dashboard/finance/stations/detail/' + statement.statement_no}"
           class="btn btn-warning pull-right btn-sm" style="margin-right: 5px;">
          <i class="fa fa-eye"></i> 明细
        </a>

      </div>
    </div>
  </section>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListStationStatement',
    data () {
      return {
        statement: {}
      }
    },
    route: {
      data (transition) {
        return Promise.all([api.statements.stations.get(transition.to.params.statement_no)]).then(function ([statement]) {
          return {
            statement: statement
          }
        })
      }
    },
    methods: {}
  }
</script>
