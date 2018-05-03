<template>
  <div class="m-head">
    <div class="item">配送员绑定</div>
  </div>
  <div class="pt20">
    <div class="m-user bind-info">
      <p class="info">配送员名称: {{staff.name}}</p>
      <p class="info">配送员电话: {{staff.phone}}</p>
      <p class="info">配送员工号: {{staff.staff_no}}</p>
      <button class="btn btn-success btn-round mt20" @click.prevent="bind()" :disabled="bindProcess">
        <span v-show="!bindProcess">确认绑定</span>
        <span v-show="bindProcess">正在处理...</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bind',

    data: function () {
      return {
        staff: {},
        bindProcess: false
      }
    },

    vuex: {
      getters: {
        user: function (state) {
          return state.user.info
        }
      }
    },

    route: {
      data: function () {
        return this.$http.get('/staffs/' + this.$route.params.staff_id + '/bind', {
          bind_token: this.$route.query.bind_token
        }).then(
          function (data) {
            return {
              staff: data.data.data
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    },

    methods: {
      bind: function () {
        this.bindProcess = true
        var self = this
        this.$http.post('/staffs/' + this.$route.params.staff_id + '/bind', {
          bind_token: this.$route.query.bind_token
        }).then(
          function (data) {
            self.bindProcess = false
            self.$route.router.go('/deliver/addresses?time=0')
            console.log(data)
          },
          function (data) {
            window.alert('绑定出错,请重试')
            self.bindProcess = false
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style>
  .bind-info .info {
    font-size: 16px;
    padding: 5px;
  }
</style>
