<template lang="html">
  <section class="components_common_modal">
    <div class="modal_overlay" v-if="detail !== null">
        <div class="modal_data">
          <i class="ic-shut" @click="$dispatch('closeModal')"></i>

            <div style="clear:both;"></div>

            <div class="modal_text">
              <p>{{detail.residence}}小区正在参加<span class="modal_text_span">优鲜社区特权争夺战</span></p>
              <p>你已成功助力</p>
              <p>街坊同心，战利品手到擒来</p>
            </div>

            <div class="gift">
              <img  src="http://oodqt1zhd.bkt.clouddn.com/modal_gift.png">
            </div>

            <div class="modal_button">
              <button type="button" name="btn_get" @click="$router.go(`/group/${detail.residence_id}`)">领取战利品</button>
              <button class="modal_btn2" type="button" name="btn_friends" @click="isShowNotice = true">通知小伙伴</button>
            </div>

            <div class="modal_bottom_img">
              <img src="http://oodqt1zhd.bkt.clouddn.com/modal_background.png">
            </div>

        </div>
    </div>
    <Notice v-show="isShowNotice" v-on:close="isShowNotice = false"></Notice>
  </section>


</template>

<script>
import wx from 'src/wx'
import { HOST } from 'src/config'
export default {
  name: 'modal_flag',
  props: {
    detail: {
      type: Object,
      require: true
    }
  },
  components: {
    Notice: require('src/components/Mall/GroupPurchase/notice_friends'),
  },
  data(){
    return {
      isShowNotice: false
    }
  },
  ready(){
    this.$nextTick(() => {
      let options = {
        share_type: 'groupon',
        imgUrl: 'http://oow71igho.bkt.clouddn.com/ytg-share-logo.jpg',
        title: '我们小区正在参加燕塘优鲜达社区订奶团购，快来拼单！',
        timelineTitle: '燕塘优鲜达社区订奶团购进行时！优惠+好礼等着你！',
        timelinelink: `${HOST}/?#!/group/${this.$route.params.residenceId}`,
        messagelink: `${HOST}/?#!/group/${this.$route.params.residenceId}`,
        // timelinelink: HOST + '/?#!/coupons/activity?utm_source=timeline_share_coupon',
        // messagelink: HOST + '/?#!/coupons/activity?utm_source=app_share_coupon',
        desc: '街坊同心，抓住到手的神秘好礼！'
      }
      wx.init(options)
    })
  },
  // beforeDestroy(){
  //   wx.init()
  // }
}
</script>

<style lang="scss" scoped>
@import "config";//config.scss
.modal_overlay {
              position: fixed;
              z-index: 1000;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              overflow: hidden;
        }
        .ic-shut{
          position: absolute;
          top: 1.3rem;
          right: 1.04rem;
          display: block;
          width: 1.45rem;
          height: 1.45rem;
          line-height: 1.45rem;
          text-align: center;
          font-size:  1.2rem;
          color: $lightGrey;
        }

.modal_data{
             position: absolute;
             z-index: 1001;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
             width:32.6rem;
             height: 35.3rem;
             background-color: #fff;
             border:0.041rem solid #000;
             border-radius: 1.25rem;
             display: flex;
             flex-direction: column;
             justify-content: space-between;
        }
  .modal_close {
            margin: 1.25rem 1.375rem 0.416rem 0.416rem;
            float: right;
            width: 1rem;
  }
  .modal_text {
            width: 100%;
            text-align: center;
            font-size: 1.5rem;
            color: rgb(87, 89, 88);
            font-family: "PingFang SC";
            margin-top: 3rem;
            padding:0.5rem;
            p{
              line-height: 1.476;
            }
  }
  .modal_text_span {
            color: red;
  }
  .gift{
            img{
              width: 16.1rem;

            }
            text-align: center;
            margin-top: 2rem;
  }
  .modal_button{
            text-align: center;
            margin-top: 3.04rem;
            button{
              width: 13.5rem;
              height: 4.04rem;
              border: none;
              background:red;
              margin-right: 0.83rem;
              color: rgb(255, 255, 255);
              box-shadow: 0.469px 0.883px 3.8px 0.2px rgba(0, 0, 0, 0.1),2.347px 4.415px 11.4px 0.6px rgba(241, 53, 55, 0.3);
              font-size: 1.6rem;
              font-family: "PingFang SC";
              border-radius: 0.625rem;
            }
            .modal_btn2{
                      margin-right: 0;
                      background: yellow;
                      color: #b9a600;

            }
  }
  .modal_bottom_img{
    img{
      width: 100%;
    }
            position: absolute;
            height: 100%;
            bottom: 0;
            z-index: -1;
  }




</style>
