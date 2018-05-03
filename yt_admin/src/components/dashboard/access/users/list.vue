<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/access/users/create'}" class="btn btn-social btn-google mb20 btn-sm">
        <i class="fa fa-plus"></i> 新增管理员
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">管理员列表</h3>

          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="管理员手机">

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
              <th>名字</th>
              <th>电话</th>
              <th>权限</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="user in users" v-if="user.phone">
              <td width="10%">{{user.username}}</td>
              <td>{{user.phone}}</td>
              <td>
                <span v-for="role in user.roles" v-if="role_names[role.name] !== 'weazm'">
                  <span v-if="$index !== 0">|</span>
                  {{role_names[role.name]}}
                </span>
              </td>
              <td width="15%">{{user.created_at}}</td>
              <td width="15%">
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/access/users/edit/' + user.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a @click.prevent="remove(user)" type="button" class="btn btn-default btn-sm">删除</a>
                  <!--<a href="#" type="button" class="btn btn-default btn-sm">停用</a>-->
                </div>
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
    name: 'ListAccessUsers',
    vuex: {
      getters: {
        user: function (state) {
          return state.user.info
        }
      }
    },
    data () {
      return {
        users: [],
        role_names: {
          'Supervisor': '超级管理员',
          'Client': '客户管理',
          'Station': '服务部',
          'Store': '门店',
          'Staff': '配送员',
          'StationAdmin': '服务部管理员',
          'StoreAdmin': '门店管理员',
          'Mall': '邮寄商城',
          'Finance': '财务',
          'User': '用户管理',
          'Weazm': 'weazm',
          'StationContact': '服务部业务员'
        }
      }
    },
    route: {
      data () {
        return {
          users: api.access.users.getAll()
        }
      }
    },
    methods: {
      remove (user) {
        var self = this
        if (window.confirm('确认要删除该管理员?')) {
          api.access.users.delete(user.id).then(function () {
            self.users.$remove(user)
          })
        }
      }
    }
  }
</script>
