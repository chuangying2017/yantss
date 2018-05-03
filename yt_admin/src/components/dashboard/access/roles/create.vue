<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">新增管理员角色</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">角色名称</label>

                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="role.name">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button @click.prevent="submit" type="submit" class="btn btn-info pull-right">保存</button>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'CreateAccessUserRole',
    data () {
      return {
        role: {
          'name': '',
          'associated-permissions': null,
          'permissions': [1],
          'sort': 1
        }
      }
    },
    methods: {
      submit () {
        var self = this
        api.access.roles.create(this.role).then(function () {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/access/roles/list')
        })
      }
    }
  }
</script>
