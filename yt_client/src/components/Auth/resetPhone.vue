<template>
  <form v-form @submit.prevent="onSubmit">
    <input type="tel" placeholder="手机号码" v-model="form.phone" required>
    <button type="submit">提交</button>
  </form>
</template>

<script>
  export default {
    name: 'PhoneReset',

    data: {
      form: {
        phone: ''
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        this.$http.post('http://localhost:4010/api/auth/users/phone', {
          phone: this.form.phone
        }).then(
          function () {
            // 更改成功
            self.$route.router.go('/')
          },
          function () {
            // 更改失败
            window.alert('更改手机号码失败，请重试')
          }
        )
      }
    }
  }
</script>