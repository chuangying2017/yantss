<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">用户列表</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" v-model="keyword" class="form-control pull-right"
                     placeholder="微信昵称">

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
              <th>头像</th>
              <th>微信昵称</th>
              <th class="text-center">是否新用户</th>
              <th>性别</th>
              <!--<th>积分</th>-->
              <!--<th>余额</th>-->
              <!--<th>是否会员</th>-->
              <th>加入时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="user in users | filterBy search in 'nickname'">
              <td>
                <img :src="user.avatar" alt="" width="30">
              </td>
              <td>{{user.nickname}}</td>
              <td class="text-center">是</td>
              <td>{{user.sex}}</td>
              <!--<td>125</td>-->
              <!--<td>0.00</td>-->
              <!--<td>否</td>-->
              <td>{{user.created_at}}</td>
              <td>
                <a href="">设置会员 </a> -
                <a href=""> 送积分</a>
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
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListUsers',
    data () {
      return {
        users: [],
        pagination: {},
        keyword: ''
      }
    },
    route: {
      data () {
        return api.users.getAll().then(function ({data: users, meta: {pagination: pagination}}) {
          return {
            users: users,
            pagination: pagination
          }
        })
      }
    },
    methods: {}
  }
</script>
