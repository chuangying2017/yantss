<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">筛选</h3>
        </div>
        <div class="box-body">
          <form action="" class="form-horizontal">
            <div class="">
              <label for="groupRadios" class="col-sm-1 control-label">年份</label>
              <div class="col-sm-2">
                <select class="form-control">
                  <option>2016</option>
                  <option>2015</option>
                </select>
              </div>
            </div>
            <div class="">
              <label for="groupRadios" class="col-sm-1 control-label">月份</label>
              <div class="col-sm-2">
                <select class="form-control">
                  <option>12</option>
                  <option>12</option>
                </select>
              </div>
            </div>
            <div class="">
              <label for="groupRadios" class="col-sm-1 control-label">状态</label>
              <div class="col-sm-2">
                <select class="form-control">
                  <option>全部</option>
                  <option>已对账</option>
                  <option>未对账</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <button type="submit" class="btn btn-info pull-right">筛选</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">门店账单</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="门店名称">

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
              <th>
                <input type="checkbox" name="" id="">
              </th>
              <th>服务部</th>
              <th>负责任</th>
              <th>联系电话</th>
              <th>金额</th>
              <th>状态</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="1 in 5">
              <td>
                <input type="checkbox" name="" id="">
              </td>
              <td>天河门店A</td>
              <td>bright</td>
              <td>13281212312</td>
              <td>521.90</td>
              <td>未对账</td>
              <td>2016-5</td>
              <td>
                <a href="">确认 </a> -
                <a v-link="{path: '/dashboard/finance/stations/detail/123'}"> 明细</a>
              </td>
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
