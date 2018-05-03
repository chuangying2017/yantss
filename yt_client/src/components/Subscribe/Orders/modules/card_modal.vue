<template lang="html">
  <div class="address-box pay-box" style="z-index: 100000">
    <div class="box-wrap">
      <div class="box-content">
        <h2 class="head">
          <i class="ic-info"></i>
          温馨提示
          <span class="close" @click.stop="$dispatch('closeCardModal')">
            <i class="iconfont">&#xe634;</i>
          </span>
        </h2>
        <div class="agreement m-blog">
          <h1>优鲜卡使用须知</h1>
          <p>优鲜卡可直接于付款时抵扣对应金额，一张礼品卡仅能使用一次，不找零不返现，超出票面金额部分需额外支付；成功使用后不退换。</p>
        </div>
        <button class="confirmBtn" @click.stop="$dispatch('selectGiftCard')">
          <span>确认</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      agreement: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content{
  .ic-info{
    padding: 0.1rem 0.3rem 0 0;
    display: inline-block;
    font-size: 2rem;
    vertical-align: top;
    color: #c71a40;
  }
}
.confirmBtn{
  display: block;
  width: 100%;
  padding: 1rem;
  height: 4rem;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  background: #c71a40;
  outline: none;
  border: 0 none;
  box-sizing: border-box;
  &:active{
    opacity: 0.7;
  }
}

.address-box {
  width: 100%;
  height: 100%;
  display: table;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.address-box .box-content {
  overflow: hidden;
  -webkit-border-radius: .3rem;
  -moz-border-radius: .3rem;
  border-radius: .3rem;
}

.address-box .box-content .title {
  padding: 1rem;
  background: #fff;
  font-size: 1.4rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.address-box .box-content .close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.box-wrap {
  display: table-cell;
  vertical-align: middle;
}

.box-content {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.box-content ul {
  background: #fff;
  padding: 1rem;
  max-height: 30rem;
  min-height: 25rem;
  overflow-y: scroll;
}

.box-content .adr label {
  float: none;
  margin-bottom: .5rem;
}

.pay-box .box-content {
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}

.pay-box .box-content .agreement {
  margin: 2rem 2rem 0;
  padding: 1rem;
  // border: 1px solid #ddd;
  border-radius: .3rem;
  height: 16.5rem;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.pay-box .box-content .head {
  font-size: 1.6rem;
  /*text-align: center;*/
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.pay-box .box-content .head .iconfont {
  font-size: 2rem;
  padding: 0 1rem;
  color: #09A909;
}

.pay-box .box-content .head .close .iconfont {
  color: #000;
  float: right;
}

.pay-box .box-content .price span {
  font-size: 3.6rem;
}

button {
  outline: none;
}

.center-box {
  display: table;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.center-content {
  display: table-cell;
  vertical-align: middle;
}

.m-blog h1 {
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
}

.m-blog p {
  text-indent: 3rem;
  font-size: 1.4rem;
  color: #7D7D7D;
  margin: 1rem 0;
  line-height: 160%;
}

</style>
