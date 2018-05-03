<template>
  <div class="m-head">
    <div class="item">服务点绑定</div>
  </div>
  <div class="pt20">
    <div class="m-user bind-info">
      <p class="info">服务点名: {{store.name}}</p>
      <p class="info">服务点地址: {{store.address}}</p>
      <p class="info">服务点负责人: {{store.director}}</p>
      <p class="info">服务点电话: {{store.phone}}</p>
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
        store: {},
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
        return this.$http.get('/stations/' + this.$route.params.station_id + '/bind', {
          bind_token: this.$route.query.bind_token
        }).then(
          function (data) {
            return {
              store: data.data.data
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
        this.$http.post('/stations/' + this.$route.params.station_id + '/bind', {
          bind_token: this.$route.query.bind_token
        }).then(
          function (data) {
            self.bindProcess = false
            self.$route.router.go('/station/subscribes/list')
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
  }
</style>
