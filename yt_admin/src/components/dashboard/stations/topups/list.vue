<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">充值明细</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <form action="" class="form-horizontal">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">用户手机</label>
                  <div class="col-sm-8">
                    <input type="tel" class="form-control">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">时间</label>
                  <div class="col-sm-4">
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <input type="text" class="form-control pull-right" id="reservation">
                    </div>
                  </div>
                  <a href="">
                    <small>7天</small>
                  </a>
                  &nbsp;
                  &nbsp;
                  <a href="">
                    <small>30天</small>
                  </a>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <div class="col-sm-4">
                    <button class="btn btn-success">筛选</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>#</th>
              <th>用户名</th>
              <th>充值金额</th>
              <th>支付方式</th>
              <th>支付凭证</th>
              <th>充值时间</th>
            </tr>
            <tr v-for="1 in 5">
              <td>{{$index + 1}}</td>
              <td>刘立</td>
              <td>500.00</td>
              <td>微信支付</td>
              <td>120391238381238128381828</td>
              <td>2016-5-23 05:23:12</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <ul class="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- /.col -->
  </div>
</template>
