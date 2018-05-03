<template>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
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
                  <label for="optionsRadios" class="col-sm-4 control-label">服务点区域</label>
                  <div class="col-sm-8">
                    <select name="" id="" class="form-control">
                      <option value="">天河区</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-3 control-label">根据条件</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="姓名、电话、服务地址">
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
          <h3 class="box-title">门店列表</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <div class="dataTables_wrapper form-inline dt-bootstrap">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th>名称</th>
                <th>区域</th>
                <th>负责人</th>
                <th>联系电话</th>
                <th>固话</th>
                <th>地址</th>
                <th>操作</th>
              </tr>
              <tr>
                <td>天河门店A</td>
                <td>天河区</td>
                <td>李先生</td>
                <td>13246665701</td>
                <td>0755-6620448</td>
                <td>深圳市留学生创业大厦1311</td>
                <td>
                  <div class="btn-group">
                    <a v-link="{ path: '/dashboard/stores/123' }" type="button" class="btn btn-default btn-sm">查看</a>
                    <a v-link="{ path: '/dashboard/stores/edit' }" type="button" class="btn btn-default btn-sm">编辑</a>
                    <a href="#" type="button" class="btn btn-default btn-sm">删除</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
