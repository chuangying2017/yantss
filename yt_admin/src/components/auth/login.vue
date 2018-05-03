<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>燕塘</b>优鲜达</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">请填写您的登录帐号</p>

      <form v-form name="logForm" @submit.prevent="onSubmit">
        <div class="form-group has-feedback">
          <input class="form-control" v-form-ctrl v-model="form.phone" required type="text" name="phone"
                 placeholder="手机号码"
                 custom-validator="phoneVerified">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <label v-show="(logForm.phone.$dirty || logForm.$submitted) && logForm.phone.$invalid"
                 class="error">请正确填写手机号码</label>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control" v-form-ctrl v-model="form.password" required type="password" name="password"
                 placeholder="密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <label v-show="(logForm.password.$dirty || logForm.$submitted) && logForm.password.$invalid"
                 class="error">请正确填写密码</label><br>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <a href="#">忘记密码</a><br>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
    <!-- /.login-box-body -->
  </div>
  <!-- /.login-box -->
</template>
<script>
  import {loginSuccess} from './../../vuex/actions.js'
  import authService from '../../services/authService'
  export default {
    name: 'Login',
    data: function () {
      return {
        logForm: {},
        form: {
          phone: '',
          password: ''
        }
      }
    },
    vuex: {
      actions: {
        loginSuccess
      }
    },
    methods: {
      onSubmit: function () {
        var self = this
        if (self.logForm.$invalid) {
          return false
        }
        authService.login({
          phone: self.form.phone,
          password: self.form.password
        }).then(
          function (token) {
            self.loginSuccess(token)
            window.location.href = '/yt-admin'
          },
          function (error) {
            console.log(error)
          }
        )
      },
      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      }
    }
  }
</script>
