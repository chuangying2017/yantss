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
              <div class="col-md-4">
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">订单号</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">营销活动</label>
                  <div class="col-sm-8">
                    <select class="form-control">
                      <option>所有</option>
                      <option>营销活动1</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">订单时间</label>
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
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">订单状态</label>
                  <div class="col-sm-4">
                    <select class="form-control">
                      <option>所有</option>
                      <option>会员分组</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <button type="submit" class="btn btn-info pull-right">搜索</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">订单管理</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="微信昵称">

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
              <th>微信昵称</th>
              <th>订单金额</th>
              <th>营销活动</th>
              <th>状态</th>
              <th>订单时间</th>
            </tr>
            <tr v-for="1 in 5">
              <td>{{$index + 1}}</td>
              <td>bright{{$index}}</td>
              <td>50.10</td>
              <td>营销活动1</td>
              <td>
                <span class="label label-info">已付款</span>
                <span class="label label-success">已兑换</span>
                <span class="label label-warning">未支付</span>
              </td>
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
      <!-- /.box -->
    </div>
  </div>
</template>
