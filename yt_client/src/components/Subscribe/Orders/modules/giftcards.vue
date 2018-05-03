<template>
  <button v-for='giftcard in giftcards'
          :class="['coupon-select', giftcard.using ? 'checked' : '']"
          @click.prevent='storeCurrentGiftCard(giftcard.ticket.id, giftcard.uniIndex)' :disabled="!giftcard.usable || (currentindex === null ? false : currentindex !== giftcard.uniIndex)">
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
        <div :class="['u-coupon', (!giftcard.usable || (currentindex === null ? false : currentindex !== giftcard.uniIndex)) ? 's-expired' : '']">
          <div class="info">
            <div class="pure-g">
              <div class="pure-u-1-4">
                <div class="price" id="_giftcard">
                  <span>{{giftcard.promotion.content.split(giftcard.promotion.content.slice(-1))[0]}}</span>{{giftcard.promotion.content.slice(-1)}}
                </div>
              </div>
              <div class="pure-u-3-4">
                <div class="detail-wrap" id="_wrapBg">
                  <div class="detail">
                    <h2 class="name">{{giftcard.name}}</h2>
                    <p class="des">{{giftcard.desc}}</p>
                    <p class="des">有效期: {{giftcard.ticket.start_time.split(' ')[0]}} 至
                      {{getPreviousTime(giftcard.ticket.end_time.split(' ')[0])}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="expired">
            <p id="_giftcardP"></p>
          </div>
        </div>
      </div>
    </div>
  </button>
  <empty v-show='!giftcards || !giftcards.length'>暂时没有可用的优鲜卡</empty>
  <toast v-show='giftcardProcess' icon='&#xe61b;'>优鲜卡使用中...</toast>
  <modal v-show="isShowCardModal"></modal>
</template>

<script>
  // const HAS_CONFIRM_TIPS = 'hasConfirmTips'

  import Toast from './toast.vue'
  import Empty from './../../../Share/empty.vue'
  import Modal from './card_modal.vue'
  import utils from 'src/utils'

  export default{
    name: 'Giftcards',

    data: function () {
      return {
        giftcardProcess: false,
        isShowCardModal: false,
        currentGiftCard: {}
      }
    },

    props: ['giftcards', 'tempid', 'currentindex'],

    components: {
      Toast,
      Empty,
      Modal
    },

    events: {
      selectGiftCard(){
        // sessionStorage.setItem(HAS_CONFIRM_TIPS, true)
        this.isShowCardModal = false
        const { ticketId, index } = this.currentGiftCard
        this.useGiftcard(ticketId, index)
      },
      closeCardModal(){
        this.isShowCardModal = false
      }
    },

    methods: {
      getPreviousTime(str){
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
      storeCurrentGiftCard(ticketId, index){
        this.currentGiftCard = Object.assign({}, {
          ticketId, index
        })
        const isDeselect = this.currentindex === index//取消选择时不显示弹窗
        if(isDeselect){
          this.useGiftcard(ticketId, index)
        } else {
          this.isShowCardModal = true
        }
        // const hasConfirmTips = sessionStorage.getItem(HAS_CONFIRM_TIPS)
        // if(hasConfirmTips){
        //   this.useGiftcard(ticketId, index)
        // } else {
        //   this.isShowCardModal = true
        // }
      },
      useGiftcard: function (ticketId, index) {
        var self = this

        if(this.currentindex === index){
          this.$dispatch('changeCurIndex', null)
        } else {
          this.$dispatch('changeCurIndex', index)
        }

        self.giftcardProcess = true
        this.$http.put('/subscribe/orders/' + this.tempid, {
          ticket: ticketId,
          type: 'giftcard'
        }).then(
          function (data) {
            self.giftcardProcess = false
            self.$dispatch('useGiftcard', self.generateIndex(data.data.data))
          },
          function (data) {
            self.giftcardProcess = false
            window.alert('使用失败,请重试')
          }
        )
      }
    }
  }
</script>

<style lang=scss>
  #_giftcard{
    font-size: 1.6rem;
    color: #ffc600;
    span{
      font-size: 1.6rem;
    }
  }
  #_wrapBg{
    background-image: url('http://ojk5o6vq5.bkt.clouddn.com/ytc-giftcard-bg.jpg');
  }
  #_giftcardP{
    background: #ffc600;
    padding: .2rem;
    color: #fff;
    font-size: 1.2rem;
  }
  .u-giftcard {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    &.s-expired {
      .info {
        .price {
          color: #d2d2d2;
        }
      }
      .detail {
        color: #d2d2d2;
        .des {
          color: #d2d2d2 !important;
        }
      }
      .expired {
        p {
          background: #d2d2d2;
        }
      }
    }
    &.s-get {
      .info .price {
        background: #ff8080;
        color: #fff;
        border: 0 none;
        padding: 2rem 0;
        display: block;
        outline: none;
        width: 100%;
        height: 100%;
      }
      .j-get.s-success span {
        color: #fff;
        background: #ff8080;
      }
      .j-get span {
        border: 1px solid #fff;
        border-radius: 3px;
        padding: .1rem .3rem;
        font-size: 1.2rem !important;
        display: inline-block;
        margin-top: 1rem;
        background: #fff;
        color: #ff8080;
      }
      .expired {
        display: none;
      }
    }
    .info {
      .pure-u-1-4 {
        position: relative;
      }
      .price {
        padding: 3rem 0rem;
        font-size: 1.4rem;
        text-align: center;
        color: #f95757;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        span {
          font-size: 2.6rem;
        }
      }
      .detail-wrap{
        background-image: url('http://ojk5o6vq5.bkt.clouddn.com/ytc-giftcard-bg.jpg');
        /*background-image: url('https://dn-weazm-work.qbox.me/coupons/bg.jpg');*/
        background-size: cover;
        background-position: 50% 50%;
        border-left: 2px dotted #ddd;
        margin: 0;
        padding: 2rem 0;
      }
      .detail {
        padding: 0 1rem;
        .name {
          font-size: 1.6rem;
        }
        .des {
          font-size: 1.2rem;
          color: #8c8c8c;
        }
      }
    }
    .expired {
      p {
        background: #ff8080;
        padding: .2rem;
        color: #fff;
        font-size: 1.2rem;
      }
    }
    & + .u-giftcard {
      margin-top: 1rem;
    }
  }

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

  .giftcard-select {
    -webkit-appearance: none;
    border: 0 none;
    background: none;
    width: 100%;
    text-align: left;
    outline: none;
    .iconfont {
      color: #8c8c8c;
    }
    & + .giftcard-select {
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
