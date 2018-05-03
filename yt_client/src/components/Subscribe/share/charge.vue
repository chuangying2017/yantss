<template>
  <div class="recharge b-radius">
    <form v-form name="payForm" @submit.prevent="onSubmit">
      <fieldset>
        <ul>
          <li class="item">
            <input type="radio" id="300" name="prepay" checked v-model="form.amount" value="300" class="checkbox">
            <label for="300">
              <p class="text">充300元</p>
            </label>
          </li>
          <li class="item">
            <input type="radio" id="500" name="prepay" v-model="form.amount" value="500" class="checkbox">
            <label for="500">
              <p class="text">充500元</p>
            </label>
          </li>
          <li class="item">
            <input type="radio" id="1000" name="prepay" v-model="form.amount" value="1000" class="checkbox">
            <label for="1000">
              <p class="text">充1000元</p>
            </label>
          </li>
          <li class="item">
            <input type="radio" id="1500" name="prepay" v-model="form.amount" value="1500" class="checkbox">
            <label for="1500">
              <p class="text">充1500元</p>
            </label>
          </li>
        </ul>
      </fieldset>
      <button type="submit" class="btn btn-round btn-success mt10 mb10" :disabled="working">
        <span v-show="!working">提交</span>
        <span v-show="working">处理中...</span>
      </button>
      <p class="text mt30">＊充值只限于订奶服务＊</p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Charge',

    data: function () {
      return {
        payForm: {},
        working: false,
        form: {
          amount: 300,
          channel: 'wx_pub'
        }
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        self.working = true
        // 提交订单
        this.$http.post('/users/recharge', {
          amount: parseInt(this.form.amount),
          channel: this.form.channel
        }).then(
          function (data) {
            // console.log(data.data.data)
            self.working = false
            // 创建订单成功，调用支付接口
            window.pingpp.createPayment(data.data.meta.charge, function (result, error) {
              if (result === 'success') {
                // 公众号内支付成功
//                self.$route.router.go('/subscribe/step3')
                self.$dispatch('chargeSuccess')
              } else if (result === 'fail') {
                // 支付失败
//                self.$route.router.go('/subscribe/step2')
                self.$dispatch('chargeFail')
              } else if (result === 'cancel') {
                // 支付取消
//                self.$route.router.go('/subscribe/step2')
                self.$dispatch('chargeCancel')
              }
            })
          },
          function (data) {
            // charge获取失败
            self.working = false
            window.alert('网络出错')
            self.$route.router.go('/subscribe/step2')
          }
        )
      }
    }
  }
</script>
