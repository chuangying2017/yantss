<template>
  <div class="pd10">
    <div class="m-head">
      <div class="text">
        <a v-link="{ path: '/subscribe/order/' + $route.params.order_no }" class="icon">
          <i class="iconfont">&#xe604;</i><span>客户奶卡</span>
        </a>
      </div>
    </div>
    <div class="pay-message">
      <div class="content" v-for="record in records.data">
        <p class="title">
          {{ record.pay_at }}
        </p>
        <p class="text">
          充值 {{ record.amount }} 元
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PayRecord',

    data: function () {
      return {
        records: {}
      }
    },

    route: {
      data: function (transition) {
        return this.$http.get('/users/recharge').then(
          function (data) {
            return {
              records: data.data
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
  }
</script>
