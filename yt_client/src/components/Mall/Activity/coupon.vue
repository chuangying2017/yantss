<template>
  <div class="u-coupon s-get">
    <div class="info">
      <div class="pure-g">
        <div class="pure-u-3-4">
          <div class="detail-wrap">
            <div class="detail">
              <h2 class="name">{{coupon.name}}</h2>
              <p class="des">{{coupon.desc}}</p>
              <p class="des">有效期: {{startTime}} 至 {{endTime}}</p>
            </div>
          </div>
        </div>
        <div class="pure-u-1-4">
          <button class="price" @click.prevent="getCoupon(coupon.id)" :disabled="getProcess || getSuccess">
            <span>{{coupon.content.split(coupon.content.slice(-1))[0]}}</span>{{coupon.content.slice(-1)}}<br>
            <a :class="['j-get', getSuccess ? 's-success' : '']">
              <span v-show="!getProcess && !getSuccess">立即领取</span>
              <span v-show="getProcess && !getSuccess">领取中..</span>
              <span v-show="!getProcess && getSuccess">已领取</span>
            </a>
          </button>
        </div>
      </div>
    </div>
    <div class="expired">
      <p></p>
    </div>
  </div>
</template>

<script>
  import utils from 'src/utils'
  export default{
    name: 'Coupon',
    props: ['coupon'],
    data: function () {
      return {
        getProcess: false,
        getSuccess: false
      }
    },
    computed: {
      startTime(){
        if(this.coupon){
          return this.coupon.start_time
        }
      },
      endTime(){
        if(this.coupon){
          return this.coupon.end_time
          // let str = this.coupon.end_time
          // return utils.getPreviousTime(str)
        }
      }
    },
    methods: {
      getCoupon: function (ticket) {
        var self = this
        self.getProcess = true
        this.$http.post('/promotions/tickets', {
          coupon_id: ticket
        }).then(
          function (data) {
            window.mixpanel.track('领取优惠券', self.coupon)
            window.mixpanel.people.increment({
              'get_coupon_time': 1
            })
            self.getProcess = false
            self.getSuccess = true
            self.$dispatch('getSuccess')
          },
          function (data) {
            self.getProcess = false
            // if (data.data.message !== '') {
            //   window.alert(data.data.message)
            //   return
            // }
            self.$dispatch('getFail', data.data.message)
          }
        )
      }
    }
  }
</script>
