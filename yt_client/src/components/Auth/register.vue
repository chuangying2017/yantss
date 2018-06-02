<template>
  <form v-form name="regForm" @submit.prevent="onSubmit">
    <input v-form-ctrl v-model="form.name" required type="text" name="name" placeholder="姓名"><br>
    <label v-show="(regForm.name.$dirty || regForm.$submitted) && regForm.name.$invalid"
           class="error">请正确填写姓名</label><br>

    <input v-form-ctrl v-model="form.phone" required type="tel" name="phone" placeholder="手机号码"
           custom-validator="phoneVerified">
    <button @click.prevent="getCode" :disabled="!allowToSendSms"><span v-show="allowToSendSms">获取验证码</span> <span
      v-show="!allowToSendSms">请 {{timer}}s 后再获取</span></button>
    <br>
    <label v-show="(regForm.phone.$dirty || regForm.$submitted) && regForm.phone.$invalid"
           class="error">请正确填写手机号码</label><br>

    <input v-form-ctrl v-model="form.code" required type="num" name="code" placeholder="验证码"><br>
    <label v-show="(regForm.code.$dirty || regForm.$submitted) && regForm.code.$invalid"
           class="error">请填写验证码</label><br>

    <input v-form-ctrl v-model="form.password" required type="password" name="password" placeholder="密码"><br>
    <label v-show="(regForm.password.$dirty || regForm.$submitted) && regForm.password.$invalid"
           class="error">请填写密码</label><br>

    <input v-form-ctrl v-model="form.password_confirmation" required type="password" name="password_confirmation"
           placeholder="重新输入密码" custom-validator="passwordVerified"><br>
    <label
      v-show="(regForm.password_confirmation.$dirty || regForm.$submitted) && regForm.password_confirmation.$invalid"
      class="error">两次密码输入不一致</label><br>

    <button type="submit" :disabled="working">
      <span v-show="!working">提交</span>
      <span v-show="working">提交中</span>
    </button>
  </form>
</template>

<script>
  import Auth from './../../auth/index.js'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions.js'

  export default {
    name: 'Register',

    data: function () {
      return {
        regForm: {},
        form: {
          name: '',
          phone: '',
          password: '',
          password_confirmation: '',
          code: ''
        },
        allowToSendSms: true,
        countDownObj: null,
        timer: 60,
        working: false
      }
    },

    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        self.working = true
        if (self.regForm.$invalid) {
          // window.alert('请正确填写注册表单')
          return false
        }
        self.$log('form')
        self.$http.post('/auth/register', self.form).then(
          function (data) {
            // success
            self.working = false
            var token = data.data.data.token
            if (token) {
              Auth.login(token)
              self.loginSuccess(token)
            }
            window.alert('成功注册，准备刷新')
            self.$route.router.go('/')
          },
          function (data) {
            // fail
            self.working = false
            window.alert('注册失败')
          }
        )
      },

      countDown: function () {
        var self = this
        self.allowToSendSms = false
        self.countDownObj = setInterval(function () {
          self.timer--
          if (self.timer <= 0) {
            self.clearCountDown()
            self.allowToSendSms = true
          }
        }, 1000)
      },

      clearCountDown: function () {
        var self = this
        clearInterval(self.countDownObj)
        self.timer = 60
        self.allowToSendSms = true
        self.countDownObj = null
      },

      getCode: function () {
        var self = this
        if (self.regForm.phone.$invalid) {
          window.alert('电话有误')
          return false
        }
        self.countDown()
        self.$http.post('/auth/sms/send-code', {
          phone: self.form.phone
        }).then(
          function (data) {
            window.alert('成功发送')
          },
          function (data) {
            window.alert('发送失败')
          }
        )
      },

      phoneVerified: function (value) {
        return /^1[3|4|5|7|8|6]\d{9}$/.test(value)
      },

      passwordVerified: function (value) {
        return this.form.password === this.form.password_confirmation
      }
    }
  }
</script>

<style>
  input, button {
    border: 1px solid #000;
  }
</style>
