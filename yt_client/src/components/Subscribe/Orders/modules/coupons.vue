<template>
  <button v-for='coupon in coupons'
          :class="['coupon-select', coupon.using ? 'checked' : '']"
          @click.prevent='useCoupon(coupon.ticket.id, coupon.uniIndex)' :disabled="!coupon.usable || (currentindex === null ? false : currentindex !== coupon.uniIndex)">
    <div class=pure-g>
      <div class=pure-u-1-6>
        <div class=select-wrap>
          <div class=select-icon>
            <i class='iconfont uncheck'>&#xe61a;</i>
            <i class='iconfont checked'>&#xe648;</i>
          </div>
        </div>
      </div>
      <div class=pure-u-5-6>
        <div :class="['u-coupon', (!coupon.usable || (currentindex === null ? false : currentindex !== coupon.uniIndex)) ? 's-expired' : '']">
          <div class="info">
            <div class="pure-g">
              <div class="pure-u-1-4">
                <div class="price">
                  <span>{{coupon.promotion.content.split(coupon.promotion.content.slice(-1))[0]}}</span>{{coupon.promotion.content.slice(-1)}}
                </div>
              </div>
              <div class="pure-u-3-4">
                <div class="detail-wrap">
                  <div class="detail">
                    <h2 class="name">{{coupon.name}}</h2>
                    <p class="des">{{coupon.desc}}</p>
                    <p class="des">有效期: {{coupon.ticket.start_time.split(' ')[0]}} 至
                      {{getPreviousTime(coupon.ticket.end_time.split(' ')[0])}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="expired">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </button>
  <empty v-show='!coupons.length'>暂时没有可用的优惠券</empty>
  <toast v-show='couponProcess' icon='&#xe61b;'>优惠券使用中...</toast>
</template>

<script>
  import utils from 'src/utils'
  import Toast from './toast.vue'
  import Empty from './../../../Share/empty.vue'

  export default{
    name: 'Coupons',

    data: function () {
      return {
        couponProcess: false
      }
    },

    props: ['coupons', 'tempid', 'currentindex'],

    components: {
      Toast,
      Empty
    },

    methods: {
      getPreviousTime: function (str) {
        return utils.getPreviousTime(str)
      },
      generateIndex(tempOrder){
        let index = 0
        tempOrder.coupons.forEach(item => {
          item.uniIndex = index
          index++
        })
        tempOrder.giftcards.forEach(item => {
          item.uniIndex = index
          index++
        })
        return tempOrder
      },
      useCoupon: function (ticketId, index) {
        var self = this

        if(this.currentindex === index){
          this.$dispatch('changeCurIndex', null)
        } else {
          this.$dispatch('changeCurIndex', index)
        }

        self.couponProcess = true
        this.$http.put('/subscribe/orders/' + this.tempid, {
          ticket: ticketId
        }).then(
          function (data) {
            self.couponProcess = false
            self.$dispatch('useCoupon', self.generateIndex(data.data.data))
          },
          function (data) {
            self.couponProcess = false
            window.alert('使用失败,请重试')
          }
        )
      }
    }
  }
</script>

<style lang=scss>
  .select-wrap {
    display: table;
    width: 100%;
    height: 11rem;
  }

  .select-icon {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .coupon-select {
    -webkit-appearance: none;
    border: 0 none;
    background: none;
    width: 100%;
    text-align: left;
    outline: none;
    .iconfont {
      color: #8c8c8c;
    }
    & + .coupon-select {
      margin-top: 1rem;
    }
    &.checked {
      .iconfont {
        color: #C71A40;
      }
      .uncheck {
        display: none;
      }
      .checked {
        display: inline-block;
      }
    }
    .checked {
      display: none;
    }
    .uncheck {
      display: inline-block;
    }
  }
</style>
