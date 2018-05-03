<template lang="html">
  <section class="shade_modal">

    <div class="common_modals-rule_modal">
      <div class="modal">

        <div class="rule_header">
            <div class="rule_row"></div><div class="rule_col"></div>
            <p>争夺战规则</p>
            <div class="rule_col"></div><div class="rule_row"></div>

              <i class="ic-shut" @click="$emit('close')"></i>
        </div>
        <div class="rule_text">
          <p>1、 活动期间，线上征订满 30 瓶减 12 元，满 90 瓶减 45 元，除满减优惠外，部分小区将开展 “社区优鲜特权争夺战” 团购活动，同一小区用户线上成功订奶后，系统将自动累计数据参与团购；<br />
              2、同一小区内订奶用户总数累计达一定数值，将晋升为 优鲜小区（具体数值视社区实际情况而定），活动结束后参与者每人除享受优惠券满减优惠外，均可额外获得优鲜搭档礼品（保温杯垫）一份，不参与团购活动不影响原有优惠；<br />
              3、每个微信号仅能参与活动一次，工作人员将在活动结束后 7 天内联系优鲜小区中所有在活动期内订奶的用户，并派发奖品；<br />
              4、活动进度可以在 “查看战况” 中实时查询，如有疑问可以致电燕塘优鲜达官方新鲜热线 400-888-1956，或添加微信客服咨询；<br />
              5、用户在活动中领取的 12 元/ 45 元满减优惠券，领取后即可立即在燕塘优鲜达线上商城使用，满减券使用有效期为领券日起 30 天内，逾期作废；<br />
              6、用户在活动中领取的 12 元/ 45 元满减优惠券，分别对应用于 30 瓶/ 90 瓶订奶订单，于付款时直接抵扣部分商品金额，优惠券不可在同一订单上累积使用，不找零、不兑现、不可转送他人；<br />
              7、本次活动以特定小区为优惠区域，属于特殊情况，为不损害同一小区内参与团购的其他用户的利益，如无特殊情况一经下单将不允许更改配送地址或取消订单，请用户谨慎填写相关信息。
            </p>
        </div>
        <div class="rule_foot">
          <div class="rule_foot-border"></div>
          <div class="rule_foot_img">
              <img src="http://oodqt1zhd.bkt.clouddn.com/modal_background.png">
          </div>

            <button type="button" name="button" @click="$emit('close')">我知道了</button>
        </div>

      </div>

    </div>
  </section>

</template>

<script>
export default {
  name: 'battle_rule'
}
</script>

<style lang="scss" scoped>
@import "config";//config.scss
.shade_modal{
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.common_modals-rule_modal{
  width: 100%;
  height: 100%;
  .ic-shut{
    position: absolute;
    top: 0.5rem;
    right: 1.8rem;
    display: block;
    width: 1.45rem;
    height: 1.45rem;
    line-height: 1.45rem;
    text-align: center;
    font-size:  1.2rem;
    color: $lightGrey;
  }
  .modal{
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 0.83rem;
    transform: translate(-50%, -50%);
    width: 31.54rem;
    height: 36.8rem;
    background-color: white;
    .rule_header{
      p{
        display: inline-block;
        margin:0.41rem;
      }

      text-align: center;
      font-family: "PingFang SC";
      color: rgb(249, 63, 63);
      line-height: 0.972;
      font-size: 1.7rem;
      margin-top: 0.1rem;
      .rule_row{
        width: 1.875rem;
        height: 0.05rem;
        background-color: red;
        display: inline-block;
        margin:0.416rem 0;
      }
      .rule_col{
        width: 0.05rem;
        height: 0.833rem;
        background-color: red;
        display: inline-block;
      }
    }
    .rule_text{
      // width: 24.2rem;
      width: 100%;
      padding:0 1.5rem;
    //  margin:1.25rem 1.875rem;
      margin-top: 1rem;
      margin-bottom: 0;
      max-height: 26.04rem;
      overflow: auto;

      p{
        font-size: 1.3rem;
        font-family: "PingFang SC";
        color: rgb(87, 89, 88);
        line-height: 1.571;
        margin-bottom: 0.83rem;

      }
    }
    .rule_foot{
        width: 100%;
        height: 7.5rem;
        border-bottom-left-radius: 0.83rem;
        border-bottom-right-radius: 0.83rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        .rule_foot-border{
          position: absolute;
          top: -0.625rem;
          left: 0;
          width: 100%;
          height: 3.33rem;
          &::before{
            display: block;
            content: '';
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
          }
        }
        .rule_foot_img{

          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: -1;
          img{
            width: 100%;
            // height: 100%;


          }
        }

        button{
          width: 15.5rem;
          height: 4.04rem;
          background: #f6181a;
          border: none;
          border-radius: 0.416rem;
          font-family: "PingFang SC";
          color: rgb(255, 255, 255);
          text-transform: uppercase;
          line-height: 1.2;
          font-size: 1.6rem;

          // position: absolute;
          // bottom: 1.79rem;
          // left: 7.91rem;
          z-index: 3;
        }
    }
  }

}
</style>
