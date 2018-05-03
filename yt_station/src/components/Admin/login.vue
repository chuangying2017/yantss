<template>
  <div class="login-content">
    <div class="login-wrapper">
      <div class="login-center">
        <h1 class="title">服务部管理后台 beta</h1>
        <form v-form name="adminForm" @submit.prevent="onSubmit">
          <input class="input mb20" type="text" v-model="form.phone" v-form-ctrl required name="phone" placeholder="帐号">
          <input class="input mb20" type="password" v-model="form.password" v-form-ctrl required name="password"
                 placeholder="密码">
          <button type="submit" class="btn btn-success btn-round">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import authService from './../../auth/index'
  import {loginSuccess} from './../../vuex/actions'

  export default {
    name: 'Admin',

    data: function () {
      return {
        form: {
          phone: '',
          password: ''
        }
      }
    },

    route: {
      activate: function (transition) {
        if (authService.check()) {
          transition.redirect('/admin/create')
        } else {
          transition.next()
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
        if (this.adminForm.$invalid) {
          return false
        }
        authService.adminLogin(this.form).then(
          function (token) {
            self.loginSuccess(token)
            self.$route.router.go('/admin/create')
          },
          function (error) {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<style>
  .login-content {
    width: 100%;
    height: 100%;
    display: table;
  }

  .login-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .login-center {
    width: 350px;
    margin: 0 auto;
    padding: 3rem 3rem;
    background: #fff;
    border-radius: .3rem;
    box-shadow: 0 0 20px #ddd;
  }

  .login-center .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
    color: #4a4a4a;
  }
</style>
