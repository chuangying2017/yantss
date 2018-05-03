<template>
  <div class="row">
    <div class="col-md-4">
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">门店信息</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <dl class="dl-horizontal">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-home"></i></span>
              <input type="text" class="form-control" value="天河区XX门店">
            </div>
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input type="text" class="form-control" value="刘天一">
            </div>
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-phone"></i></span>
              <input type="text" class="form-control" value="1325199287">
            </div>
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>
              <input type="text" class="form-control" value="深圳市南山区留学生创业大厦1121">
            </div>
          </dl>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- ./col -->
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">核销明细</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="text" class="form-control pull-right" id="reservation">
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
              <th>#</th>
              <th>用户名</th>
              <th>商品</th>
              <th>商品金额</th>
              <th>时间</th>
            </tr>
            <tr v-for="1 in 5">
              <td>{{$index + 1}}</td>
              <td>李一</td>
              <td>牛奶|酸奶</td>
              <td>12.90</td>
              <td>2016-5-23 05:23:12</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <button class="btn btn-default btn-sm">导出</button>
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
