<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/access/roles/create'}" class="btn btn-social btn-google mb20 btn-sm">
        <i class="fa fa-plus"></i> 新增角色
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
          <h3 class="box-title">角色列表</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>#</th>
              <th>角色</th>
              <th>操作</th>
            </tr>
            <tr v-for="role in roles">
              <td>{{$index + 1}}</td>
              <td>{{role.name}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/access/roles/edit/' + role.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a @click.prevent="remove(role)" type="button" class="btn btn-default btn-sm">删除</a>
                  <!--<a href="#" type="button" class="btn btn-default btn-sm">停用</a>-->
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListRoles',
    data () {
      return {
        roles: []
      }
    },
    route: {
      data () {
        return {
          roles: api.access.roles.getAll()
        }
      }
    },
    methods: {
      remove (role) {
        var self = this
        if (window.confirm('确认要删除该角色?')) {
          api.access.roles.delete(role.id).then(function () {
            self.stations.$remove(role)
          })
        }
      }
    }
  }
</script>
