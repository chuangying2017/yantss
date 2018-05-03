<template lang="html">
  <section class="component--GroupPurchase--group">
    <div class="capture_partone">
        <div class="header">
          <img src="http://oodqt1zhd.bkt.clouddn.com/capture_bg.png"/>
        </div>

          <div class="capture_text">
            <p>距离优鲜社区特权争夺战结束还有</p>
          </div>

          <div class="capture_time">
            <div class="capture_timebox">
              <p class="capture_num">
                <i :class="ic_num_day_tens"></i>
                  <i :class="ic_num_day_uni"></i>
              </p>
            </div>
            <span class="capture_colon">:</span>
            <div class="capture_timebox">
              <p class="capture_num">
                <i :class="ic_num_hour_tens"></i>
                  <i :class="ic_num_hour_uni"></i>
              </p>
            </div>
              <span class="capture_colon">:</span>
            <div class="capture_timebox">
              <p class="capture_num">
                <i :class="ic_num_min_tens"></i>
                  <i :class="ic_num_min_uni"></i>

              </p>
            </div>
            <span class="capture_colon">.</span>
          <div class="capture_timebox">
            <p class="capture_num">
              <i :class="ic_num_sec_tens"></i>
                <i :class="ic_num_sec_uni"></i>

            </p>
          </div>
          </div>
    </div>

    <div class="capture_parttwo" v-if="grouponDetail !== null">
      <p><b>{{grouponDetail.name}}专属</b></p>
      <img src="http://oodqt1zhd.bkt.clouddn.com/run_person.gif" class="run" :style="{left: `${barw < 2 ? 2 : barw}%`}" />
      <div class="capture_radius">


        <div class="capture_radius_up" :style="{width: `${barw < 8 ? 8 : barw}%`}">
          <span>{{barw}}%</span>
        </div>

      </div>

      <div class="parttwo_text">
        <p>{{grouponDetail.name}}已成功召集优鲜先锋<span>{{grouponDetail.complete}}</span>位</p>
        <p>再增加<span>{{grouponDetail.goal - grouponDetail.complete}}</span>兵力即可破敌</p>
        <p>抓住到手的战利品!</p>
      </div>
      <div class="capture_button">
        <button type="button" name="btn_get" @click="$router.go('/subscribe/orders/create')">立即参战</button>
        <button class="capture_btn2" type="button" name="btn_friends" @click="notice_flag = true">通知小伙伴</button>
      </div>
      <div class="parttwo_a">
          <a @click="rule_flag = true">争夺战规则</a>
      </div>

    </div>

    <div class="capture_foot">
      <p>温馨提示：<br/>
        优鲜特权争夺战仅对部分小区开放，同一小区用户参与方可累计
        同一用户多次订奶仅记录一次名额</p>
    </div>
    <Notice v-show="notice_flag" v-on:close="notice_flag = false"></Notice>
    <Rule v-show="rule_flag" v-on:close="rule_flag = false"></Rule>

  </section>
</template>

<script>
import wx from 'src/wx'
import { HOST } from 'src/config'
export default {
  components: {
    Notice:require('src/components/Mall/GroupPurchase/notice_friends'),
    Rule:require('src/components/Mall/GroupPurchase/battle_rule'),
  },
  data(){
    return{
        notice_flag:false,
        rule_flag:false,
        ic_num_day_tens:'',
        ic_num_day_uni:'',
        ic_num_hour_tens:'',
        ic_num_hour_uni:'',
        ic_num_min_tens:'',
        ic_num_min_uni:'',
        ic_num_sec_tens:'',
        ic_num_sec_uni:'',
        source: '',

        grouponDetail: null
    }
  },
  watch: {
    source(val){
      this.showCountDown(val)
    }
  },
  computed: {
    barw(){
      if(this.grouponDetail === null) return 0
      const { complete, goal } = this.grouponDetail
      if(goal == 0) return 0
      return Math.floor(complete/goal*100)
    }
  },
  methods:{
    countDown(timestamp = 1508126399){//TODO: test
      let urodz= new Date(timestamp*1000); 　
      let now = new Date();
      let source = (urodz.getTime() - now.getTime())/1000
      this.source = source

      let timer = setInterval(() => {
        if(this.source <= 0){
          clearInterval(timer)
          timer = null
        }
        this.source--;
      },1000)
    },
    showCountDown(val){
      if(val<2592000&&val>0){//max:30天
        let day_tens = parseInt(val/60/60/24/10);
        let day_uni = parseInt(val/60/60/24%10);
        let hour_tens = parseInt(val/60/60%24/10);//小时的十位数
        let hour_uni = parseInt(val/60/60%24%10);
        let min_tens = parseInt(val/60%60/10);
        let min_uni = parseInt(val/60%60%10);
        let sec_tens = parseInt(val%60/10);
        let sec_uni = parseInt(val%60%10);
        this.ic_num_day_tens = "ic-num-"+day_tens;
        this.ic_num_day_uni = "ic-num-"+day_uni;

        this.ic_num_hour_tens = "ic-num-"+hour_tens;
        this.ic_num_hour_uni = "ic-num-"+hour_uni;
        console.log(this.ic_num_hour_uni);
        console.log(this.ic_num_hour_tens);
        this.ic_num_min_tens = "ic-num-"+min_tens;
        this.ic_num_min_uni = "ic-num-"+min_uni;
        this.ic_num_sec_tens = "ic-num-"+sec_tens;
        this.ic_num_sec_uni = "ic-num-"+sec_uni;
      }else if(val>2592000){
        // console.log(val);
        this.ic_num_day_tens = "ic-num-"+3;
        this.ic_num_day_uni = "ic-num-"+0;
        this.ic_num_hour_tens = "ic-num-"+0;
        this.ic_num_hour_uni = "ic-num-"+0;
        this.ic_num_min_tens = "ic-num-"+0;
        this.ic_num_min_uni = "ic-num-"+0;
        this.ic_num_sec_tens = "ic-num-"+0;
        this.ic_num_sec_uni = "ic-num-"+0;
      }else{
        this.ic_num_day_tens = "ic-num-"+0;
        this.ic_num_day_uni = "ic-num-"+0;
        this.ic_num_hour_tens = "ic-num-"+0;
        this.ic_num_hour_uni = "ic-num-"+0;
        this.ic_num_min_tens = "ic-num-"+0;
        this.ic_num_min_uni = "ic-num-"+0;
        this.ic_num_sec_tens = "ic-num-"+0;
        this.ic_num_sec_uni = "ic-num-"+0;
      }
    }
  },
  route: {
    data: function(){
      return this.$http.get(`/subscribe/residence/${this.$route.params.residenceId}`)
                .then(({ data: { data: detail } }) => {
                  this.grouponDetail = detail
                })
                .catch(e => {
                  window.alert('获取数据有误')
                  console.log(e);
                })
    }
  },
  ready(){
    this.countDown()
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
  },
}
</script>

<style lang="scss" scoped>
.component--GroupPurchase--group{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2.33rem;
}
.run {
  position: relative;
  top: 0;
  // left:0%;
  width: 2.8rem;
}
.header{
      position: absolute;
      top: -2.916rem;//-70
      left: 0;
      z-index: -1;
      background: transparent;
      img{
        // position: absolute;
        // top: 50%;
        // left: 0;
        // transform: translateY(-50%);
        // display: block;
        // width: 100%;
        // height: 100%;
        display: block;
        max-width: 100%;
        background: transparent;
      }
}

.capture_text{
      width: 100%;
      // line-height: 1.571;
      text-align: center;
      p{
        font-size: 1.9rem;
        font-family: "PingFang SC";
        color: rgb(255, 255, 255);
      }
}

.capture_time{
      height: 4.16rem;
      line-height: 4.16rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 1.625rem;
      .capture_timebox{
           width: 4.5rem;
           height:4.5rem;
           border-radius: 0.62rem;
           display: inline-block;
           display: flex;
           align-items: center;
           justify-content: center;
           box-shadow: 0rem 0.04rem 0.125rem 0rem rgba(0, 0, 0, 0.7),inset 0rem 0.083rem 0rem 0rem rgba(255, 255, 255, 0.14);
           background-color: #2d2d31;
      }
}

.capture_colon{
    font-family: "PingFang SC";
    font-size: 2.7rem;
    color: rgb(255, 255, 255);
    text-shadow: 0.058rem 0.11rem 0.395rem rgba(0, 0, 0, 0.3);
}
.capture_num{
    font-family: "PingFang SC";
    color: rgb(255, 255, 255);
    line-height: 1.2;
    text-shadow: 0.058rem 0.11rem 0.395rem rgba(0, 0, 0, 0.3);
    i{
      font-size: 1.8rem;
    }

}
.capture_parttwo{
  margin-top: 5.16rem;
  padding:0 2.33rem;
    p{
      font-size: 1.91rem;
      font-family: "PingFang SC";

      color: rgb(90, 90, 90);
      // line-height: 2.33rem;
      // margin:0.6rem 0;
    }
}

.parttwo_a{
  text-align: center;
  margin-top: 1.25rem;
  text-decoration: underline;
  a{
    color: red;
    font-size: 1.4rem;
  }
}

.run_person{
  width: 100%;
  height: 4.16rem;
}

.capture_radius {
  border-radius: 1.04rem;
  margin-top: 0.61rem;
  background-color: rgb(241, 241, 241);
  box-shadow: inset -0.116rem 0.172rem 0.166rem 0rem rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 2.5rem;
  position: relative;
  z-index: 10;
}
.capture_radius_up{
  border-radius: 1.04rem;
  height: 2.5rem;
  padding-right: 0.83rem;
  background-color: red;
  text-align: right;
  display: flex;
  align-items: center;
  z-index: 12;
  span{
    padding-left: 0.5rem;
    height: 1.875rem;
    line-height: 1.875rem;
    color: white;

  }
}
.parttwo_text{
  margin-top: 2.5rem;
  p{
    font-size: 1.304rem;
    font-family: "PingFang SC";
    color: rgb(118, 118, 119);
    font-weight: bold;
    line-height: 2.3rem;
  }
  span{
    color: red;
    font-size: 1.558rem;
  }
}

.capture_button{
          // text-align: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 3.04rem;
          button{
            border: none;
            width: 15.5rem;
            height: 4.04rem;
            background:red;
            margin-right: 1.5rem;
            color: rgb(255, 255, 255);
            // text-shadow: 0.058rem 0.11rem 0.395rem rgba(0, 0, 0, 0.3);
            box-shadow: 0.019rem 0.036rem 0.158rem 0.008rem rgba(0, 0, 0, 0.1),0.097rem 0.184rem 0.475rem 0.025rem rgba(241, 53, 55, 0.3);
            font-size: 1.6rem;
            font-family: "PingFang SC";
            border-radius: 0.625rem;
          }
          .capture_btn2{
                    margin-right: 0;
                    background: yellow;
                    color: #b9a600;
          }
}
.capture_foot{
    font-size: 1.1rem;
    font-family: "PingFang SC";
    color: rgb(192, 192, 192);
    margin: 2rem 2.208rem;
    margin-top: 0;
    p{
      line-height: 1.557;
    }
}
</style>
