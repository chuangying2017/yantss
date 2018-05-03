<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">编辑管理员</h3>
        </div>
        <validator name="userForm">
          <form class="form-horizontal">
            <div class="row">
              <div class="col-md-8">
                <div class="box-body">
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">管理员姓名</label>

                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="user.username"
                             v-validate:username="['required']">
                    </div>
                    <div class="col-sm-4">
                      <span></span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">手机号码</label>

                    <div class="col-sm-6">
                      <input type="tel" v-model="user.phone" class="form-control"
                             v-validate:phone="['required', 'phone']">
                    </div>
                    <div class="col-sm-4">
                      <span class="text-danger" v-if="$userForm.phone.phone">请输入正确的手机号码</span>
                    </div>
                  </div>
                  <!--<div class="form-group">-->
                  <!--<label for="inputEmail3" class="col-sm-2 control-label">登录密码</label>-->

                  <!--<div class="col-sm-6">-->
                  <!--<input type="password" class="form-control" v-model="user.password"-->
                  <!--v-validate:password="{ required: true, minlength: 8}">-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--<div class="form-group">-->
                  <!--<label for="inputEmail3" class="col-sm-2 control-label">重复密码</label>-->

                  <!--<div class="col-sm-6">-->
                  <!--<input type="password" class="form-control" v-model="user.password_confirmation"-->
                  <!--v-validate:passwordConfirmation="{ required: true, minlength: 8}">-->
                  <!--</div>-->
                  <!--</div>-->
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">权限设置</label>

                    <div class="col-sm-8">
                      <div class="row">
                        <div class="col-sm-4 checkbox" v-for="role in roles" v-if="role_names[role.name] !== 'weazm'">
                          <label for=""><input number :disabled="role.name == 'StationContact'"
                                               :checked="ischeck(role.id)" v-model="user.role_ids"
                                               type="checkbox"
                                               value="{{role.id}}">{{role_names[role.name]}}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" v-if="isAssociateStation">
                    <label for="inputEmail3" class="col-sm-2 control-label">关联服务部</label>

                    <div class="col-sm-8">
                      <div class="row">
                        <div class="col-sm-4">
                          <select class="form-control" v-model="associateStation" v-on:change="checkAssociate">
                            <option value="no">不关联</option>
                            <option value="yes">关联</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" v-if="associateStation == 'yes'">
                    <label for="inputEmail3" class="col-sm-2 control-label"></label>
                    <div class="col-sm-8" v-if="gettingStation">正在获取服务部...</div>
                    <div class="col-sm-8" v-else>
                      <div class="row">
                        <div class="col-sm-4 checkbox" v-for="station in stations">
                          <label for=""><input v-model="associateStations" type="checkbox" value="{{station.id}}">{{station.name}}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label"></label>
                    <div class="col-sm-6">
                      <button @click.prevent="submit" type="submit" :disabled="$userForm.invalid"
                              class="btn btn-danger pull-left">保存
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </validator>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index'
  import validators from 'src/mixins/validators.js'
  export default {
    name: 'editAdministrator',
    mixins: [validators],
    data: function () {
      return {
        stations: [],
        associateStation: 'no',
        associateStations: [],
        gettingStation: false,
        roles: [],
        user: {
          role_ids: []
        },
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
    computed: {
      isAssociateStation () {
        var flag = false
        this.user.roles.forEach(function (val) {
          if (val.name === 'StationContact') {
            flag = true
          }
        })
        return flag
      }
    },
    route: {
      activate (transition) {
        var self = this
        window.wilddog.sync().ref(transition.to.params.user_id).once('value', function (snapshot) {
          if (snapshot.exists() && snapshot.val().split(',').length > 0) {
            self.associateStation = 'yes'
            self.associateStations = snapshot.val().split(',')
          }
          transition.next()
        })
      },
      data ({to: {params: {user_id}}}) {
        const data = {
          roles: api.access.roles.getAll(),
          user: api.access.users.get(user_id),
          sync: window.wilddog.sync()
        }
        if (this.associateStation === 'yes') {
          data.stations = api.stations.getAll()
        }
        return data
      }
    },
    methods: {
      getUser () {
        return {
          id: this.user.id,
          username: this.user.username,
          phone: this.user.phone,
          assignees_roles: this.user.role_ids
        }
      },
      callback () {
        window.alert('更新成功!')
        this.$route.router.go('/dashboard/access/users/list')
      },
      submit () {
        var self = this
        api.access.users.update(this.getUser()).then(function (user) {
          if (self.associateStation === 'yes') {
            self.sync.ref(user.id.toString()).set(self.associateStations.join(','))
            self.callback()
          } else {
            self.callback()
          }
        })
      },
      ischeck (roleId) {
        return (this.user.role_ids.indexOf(roleId) > -1)
      },
      checkAssociate () {
        if (this.associateStation === 'no') {
          this.associateStations = []
        }
        if (this.stations.length > 0) return
        var self = this
        this.gettingStation = true
        api.stations.getAll().then(function (data) {
          self.stations = data
          self.gettingStation = false
        })
      }
    }
  }
</script>
