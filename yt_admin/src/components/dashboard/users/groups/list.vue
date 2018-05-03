<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/users/groups/create'}" class="btn btn-social btn-success mb20 btn-sm">
        <i class="fa fa-plus"></i> 新增分组
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">用户分组</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>分组名称</th>
              <th>用户数量</th>
              <th>分组类型</th>
              <th>优先级</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>金牌会员</td>
              <td>25</td>
              <td>会员</td>
              <td>20</td>
              <td>2016-5-23 05:23:12</td>
              <td>
                <a href="">编辑 </a> -
                <a href=""> 删除</a>
              </td>
            </tr>
            <tr>
              <td>天河CBD</td>
              <td>52</td>
              <td>普通</td>
              <td>5</td>
              <td>2016-5-23 05:23:12</td>
              <td>
                <a href="">编辑 </a> -
                <a href=""> 删除</a>
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
