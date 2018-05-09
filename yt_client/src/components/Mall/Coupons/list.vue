<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a v-link="{ path: '/mall/user' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          优惠券列表
        </h1>
      </div>
      <div class="pure-u-1-3 tr">
      </div>
    </div>
  </div>
  <div class="m-nav f-border-bottom" style="margin-top: -1rem;">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <a v-link="{ path: '/coupons/list/usable', activeClass: 's-active' }">可用券</a>
      </div>
      <div class="pure-u-1-2">
        <a v-link="{ path: '/coupons/list/expired', activeClass: 's-active' }">过期券</a>
      </div>
    </div>
  </div>
  <div class="panel" v-show="!$loadingRouteData">
    <router-view></router-view>
  </div>
  <div class="coupon-rules dark mt20">
    <h3><span>使用方法</span></h3>
    <div v-html="useragre"></div>
    <!--<ul>
      <li>选购完商品后，进入结算页面，点击"使用满减券"</li>
      <li>系统会列出可使用的优惠券，您可选择一张券点击"立即使用"，使用成功后提交订单即可</li>
    </ul>
    <p>
      注：满减券是用来直接减免部分订单金额的优惠券。满减券的使用受订单金额和商品的限制。订单必须符合满减券的使用条件才可使用。比如：满50减10元代金券，需要在订单金额中，购买商品金额大于等于50元时才可减免10元。单张订单最多只能使用一张满减券。</p>-->
  </div>
</template>

<script>
  export default{
    name: 'coupons',
    data: function () {
      return {
        useragre:null
      }
    },

     route: {
      data (transition) {
      	var self=this
        return this.$http.get('/others/reception').then(
          function (data) {
//        	console.log(data.data.protocols)
          	data.data.protocols.map(function(val){
//        		console.log(val)
          		if(val.type==2){
          			self.useragre=val.protocol_content;
          		}
          	})
//        return {
//          useragre: 1
//        }
          },
          function (data) {
            console.log(data.data.data)
          }
        )
      }
    },
  }
  
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }

  .panel {
    padding: 1rem 2rem;
  }
</style>
