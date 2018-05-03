<template>
  <div class="pad margin no-print">
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
          <small class="pull-right">Date: 2/10/2014</small>
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
          795 Folsom Ave, Suite 600<br>
          San Francisco, CA 94107<br>
          Phone: (804) 123-5432<br>
        </address>
      </div>
      <!-- /.col -->
      <div class="col-sm-4 invoice-col">
        To
        <address>
          <strong>天河区XXX服务部</strong><br>
          负责人: 李天一<br>
          地址: 天河大道北XX楼XX号<br>
          联系电话: 1329123121<br>
        </address>
      </div>
      <!-- /.col -->
      <div class="col-sm-4 invoice-col">
        <b>账单编号 #007612</b><br>
        <br>
        <b>Order ID:</b> 4F3S8J<br>
        <b>确认日期:</b> 2/22/2014<br>
        <b>状态:</b> <span class="label label-success">对账成功</span><br>
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
            <th>数量</th>
            <th>商品</th>
            <th>结算价</th>
            <th>Description</th>
            <th>总计</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Call of Duty</td>
            <td>455-981-221</td>
            <td>El snort testosterone trophy driving gloves handsome</td>
            <td>$64.50</td>
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
        <p class="lead">账单日期 2016-5-12</p>

        <div class="table-responsive">
          <table class="table">
            <tbody>
            <tr>
              <th style="width:50%">Subtotal:</th>
              <td>$250.30</td>
            </tr>
            <tr>
              <th>Tax (9.3%)</th>
              <td>$10.34</td>
            </tr>
            <tr>
              <th>Shipping:</th>
              <td>$5.80</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td>$265.24</td>
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
        <button type="button" class="btn btn-danger pull-right btn-sm"><i class="fa fa-credit-card"></i> 确认对账
        </button>
        <button type="button" class="btn btn-primary pull-right btn-sm" style="margin-right: 5px;">
          <i class="fa fa-download"></i> 下载
        </button>
      </div>
    </div>
  </section>
</template>
