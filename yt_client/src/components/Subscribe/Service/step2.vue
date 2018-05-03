<template>
  <div class="container">
    <ul class="progressbar clearfix">
      <li class="active-small">地址</li>
      <li class="active-small active">充值</li>
      <li>确认</li>
    </ul>
  </div>
  <charge></charge>
</template>

<script>
  import Charge from './../share/charge.vue'

  export default {
    name: 'Step2',

    components: {
      Charge
    },

    route: {
      activate: function (transition) {
        this.$http.get('/subscribe/preorders').then(
          function ({data: {data: preorder}}) {
            if (!preorder.length) {
              transition.redirect('/subscribe/step1')
            } else {
              if (preorder[0].status === 'assigning' && preorder[0].charge_status === 0) {
                transition.next()
              } else {
                transition.redirect('/subscribe/step3')
              }
            }
          },
          function (data) {
            window.alert('获取订单失败,请刷新重试')
            transition.redirect('/subscribe/init')
          }
        )
      }
    },

    events: {
      chargeSuccess: function () {
        this.$route.router.go('/subscribe/step3')
      }
    }
  }
</script>
