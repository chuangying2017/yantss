<template>
  <div class="m-head">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/mall/user' }"><i class="iconfont">&#xe629;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title">首页</h1>
      </div>
      <div class="pure-u-1-5 tr">
        <!--<a href="#"><i class="iconfont">&#xe607;</i></a>-->
      </div>
    </div>
  </div>
  <swipe class="my-swipe" id="swh">
    <!-- <swipe-item>
      <a class="swipe-link" v-link="{ path: '/activities/activity_58faba78d78b8' }">
        <img src="http://o8swwgh2r.bkt.clouddn.com/WechatIMG14.jpeg" alt="">
      </a>
    </swipe-item>
    <swipe-item>
      <a class="swipe-link">
        <img src="https://ocie5114k.qnssl.com/banner_fxhb.jpg" alt="">
      </a>
    </swipe-item> -->
    <swipe-item v-for="(index,banner) in mallBanners">
      <a class="swipe-link" href="{{ banner.url }}">
        <img id="d{{index}}" :src="banner.cover_image" v-el:mf alt="">
      </a>
    </swipe-item>
  </swipe>
  <div class="m-home-grid m-home-grid-icon f-mg-bottom">
    <div class="pure-g">
    	<div class="pure-u-1-4" v-for="cat in cats">
        <a v-link="{path: '/mall/products?cat='+cat.id}">
          <img :src="cat.cover_image" alt="" class="icon">
          <p class="info">{{cat.name}}</p>
        </a>
      </div>
      <!--<div class="pure-u-1-4">
        <a v-link="{ path: '/mall/products?cat=7' }">
          <img src="http://o7tep4eu1.bkt.clouddn.com/icon/v2/1.png" alt="" class="icon">
          <p class="info">瓶装鲜奶/酸奶</p>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/products?cat=2' }">
          <img src="http://o7tep4eu1.bkt.clouddn.com/icon/v2/2.png" alt="" class="icon">
          <p class="info">屋型酸奶/鲜奶</p>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/products?cat=6' }">
          <img src="http://o7tep4eu1.bkt.clouddn.com/icon/v2/3.png" alt="" class="icon">
          <p class="info">杯装酸奶</p>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/products?cat=5' }">
          <img src="http://o7tep4eu1.bkt.clouddn.com/icon/v2/4.png" alt="" class="icon">
          <p class="info">袋装酸奶</p>
        </a>
      </div>-->
    </div>
  </div>
  <div class="m-nav">
    <div class="pure-g">
      <div class="pure-u-1-1">
        <!--<a><i class="iconfont">&#xe660;</i> 每日优鲜</a>-->
        <a><img src="../../../assets/indexzwater.png" alt="" /> 每日优鲜<img src="../../../assets/indexywater.png" alt="" /></a>
      </div>
      <!--<div class="pure-u-1-2">-->
      <!--<a href="#" :class="{ 's-active': productView !== 'mall' }" @click.prevent="productView = 'subs'">优鲜达</a>-->
      <!--</div>-->
    </div>
  </div>
  <!--<div class="m-home-grid m-home-grid-pd f-mg-bottom" v-if="productView === 'mall'">-->
  <!--<div class="pure-g">-->
  <!--<div class="pure-u-1-2" v-for="product in mallProducts">-->
  <!--<a v-link="{ path: '/mall/products/' + product.id}" class="milk-box">-->
  <!--<img :src="product.cover_image" alt="product.title" class="thumbnail"-->
  <!--style="width: 100%;height: auto;">-->
  <!--<p class="title">-->
  <!--{{product.title}}<br>-->
  <!--<span>￥{{product.price}}</span>-->
  <!--</p>-->
  <!--</a>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <loader v-show="$loadingRouteData"></loader>
  <div class="m-home-grid m-home-grid-pd f-mg-bottom" v-show="!$loadingRouteData">
  	
    <div class="pure-g">
    	<div class="pure-u-1-2" v-for="product in mallProducts | orderBy 'priority'">
       <a v-link="{ path: '/mall/subsproducts/' + product.id}" class="milk-box">
      
      <div class="milk-box">
       		<div class="milkl">
       			<p class="milktitle" style="-webkit-box-orient: vertical;">{{product.title}}</p>
       			<p class="milkmoney"><i class="milkicon">￥</i>{{product.price}}</p>
       			<!--<div class="milkbuy">立即购买></div>-->
       		</div>
       		<div class="milkr">
       			<img :src="product.cover_image" alt="" />
       		</div>
       		
       </div>
         <!--  <div class="milk-box">
          <div class="cover" :style="'border:1px solid #EAEAEA;background-image: url(' + product.cover_image + ')'"></div>
          <p class="title">
            <span class="main">{{product.title}}</span><br>-->
            <!--<span class="sub">健康食品</span><br>-->
            <!--<span class="price">￥{{product.price}}</span>
          </p>
          </div>-->
        </a>
      </div>
      <!--<div class="pure-u-1-2" v-for="product in mallProducts | orderBy 'priority'">
       <a v-link="{ path: '/mall/subsproducts/' + product.id}" class="milk-box">
      
      <div class="milk-box">
       		<div class="milkl">
       			<p class="milktitle">{{product.title}}</p>
       			<p class="milkmoney"><i class="milkicon">￥</i>{{product.price}}</p>
       			<div class="milkbuy">立即购买></div>
       		</div>
       		<div class="milkr">
       			<img :src="product.cover_image" alt="" />
       		</div>
       		
       </div>
         <!--  <div class="milk-box">
          <div class="cover" :style="'border:1px solid #EAEAEA;background-image: url(' + product.cover_image + ')'"></div>
          <p class="title">
            <span class="main">{{product.title}}</span><br>-->
            <!--<span class="sub">健康食品</span><br>-->
            <!--<span class="price">￥{{product.price}}</span>
          </p>
          </div>-->
        <!--</a>
      </div>-->
    </div>
    <!--<a v-link="{ path: '/mall/products?cat=' }" class="u-btn u-btn-default mt20">所有商品</a>-->
  </div>
  <div style="padding-bottom: 4rem;"></div>
  <nav-foot></nav-foot>
</template>

<script>
	
  import Loader from './../../Share/loader.vue'
  import NavFoot from './../Shared/navfoot.vue'
  import {Swipe, SwipeItem} from 'vue-swipe'

  export default {
    name: 'Home',

    data: function () {
      return {
        mallProducts: [],
        subsProducts: [],
        mallBanners: [],
        cats:[],
        productView: 'mall'
      }
    },

    components: {
      NavFoot,
      Swipe,
      SwipeItem,
      Loader
    },
//		ready:function(){
//				console.log(this.$els.mf)
// 				
//		},
    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/mall/products'),
          this.$http.get('/subscribe/products'),
          this.$http.get('/mall/banner'),
          this.$http.get('/mall/cats')
        ]).then(function ([
          {data: {data: mallProducts}},
          {data: {data: subsProducts}},
          {data: {sliders: mallBanners}},
          {data: {data: cats}}
        ]) {

          return {
            mallProducts: mallProducts,
            subsProducts: subsProducts,
            mallBanners:mallBanners,
            cats: cats
          }
        })
      }
    },
  
	watch:{
		 mallBanners:function(val,oldval){  
		 							
                document.getElementById("d0").onload=function(){
                	var cliw=document.body.clientWidth
                	var imgw=document.getElementById("d0").width
                	var imgh=document.getElementById("d0").height
                	var cliwh=Math.ceil((cliw*imgh)/imgw)
                	document.getElementById("swh").style.height=cliwh+"px"
                	
                }

            } 
	}
  		
  }
</script>

<style scoped>
  .pure-g{
    flex-flow:row wrap;
    -webkit-flex-flow:row wrap;
    -ms-flex-flow:row wrap;
  }
  .swipe, .swipe-items-wrap {
    overflow: hidden;
    position: relative
  }

  .swipe-items-wrap {
    height: 100%
  }

  .swipe-items-wrap > div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none
  }

  .swipe-items-wrap > div.active {
    display: block;
    -webkit-transform: none;
    transform: none
  }

  .swipe-indicators {
    position: absolute;
    bottom: 5px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: .2;
    margin: 0 3px
  }

  .swipe-indicator.active {
    background: red;
    opacity: .8;
  }

  .my-swipe {
    height: 190px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    background: #fff;
  }

  .my-swipe img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon {
    background: #fff;
  }

  .milk-box {
    position: relative;
   
  }
  /**/
  
  .milk-box {
  	position: relative;
  }
  
  .milkl {
  	width: 56%;
  	/*position: absolute;*/
  	padding-left: 1rem;
  	bottom: -14rem;
  }
  
  .milkr {
  
  	     width: 41%;
    height: 17rem;
    position: relative;
    /*margin-left: 1rem;*/ 
  	/*margin-left: 1.2rem;*/
  }
  
  .milkr,
  .milkl {
  	float: left
  }
  
  .milkr img {
  	width: 93%;
    position: absolute;
    bottom: 2.8rem;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
    max-height: 14.4rem;
  
  }
  
  .milktitle {
  
  	/*position: absolute;*/
  	
  
  	overflow: hidden;
  	text-overflow: ellipsis;
  	display: -webkit-box;
  	/* autoprefixer: off*/
  	-webkit-box-orient: vertical;
  	/* autoprefixer: on*/
  	-webkit-box-orient: vertical;
  	-webkit-line-clamp: 2;
  	
  	margin-top: 4.5rem;
    font-size: 13px;
   
    
  }
  
  .milkmoney {
  	       font-size: 1.5rem;
    color: #ff003c;
    padding: .3rem;
    font-weight: 600;
    position: absolute;
    top: 11rem;
  }
  
  .milkicon {
  	font-style: normal;
  	font-size: 1.2rem
  }
  
  .milkbuy {
  	background: #ff003c;
  	color: #fff;
  	text-align: center;
  	width: 6.1rem;
  	padding: 0.5em;
  	padding-top: 0.4em;
  	border-radius: 0.3rem;
  	position: absolute;
  	top:12rem
  }
  
  .pure-u-1-2 {
  	height: 16rem !important;
  }
  /* .milk-box .cover{
    width: 100%;
    padding-bottom: 100%;
    background-size: cover;
    background-position: 50% 50%;
  }
  .milk-box img {
    border-radius: 3px;
  }

  .milk-box .title {
    padding: 1rem 0rem .5rem;
    color: #000;
    font-size: 1.4rem;
    /*background: red; !* For browsers that do not support gradients *!*/
  /*background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)); !* For Safari 5.1 to 6.0 *!*/
  /*background: -o-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)); !* For Opera 11.1 to 12.0 *!*/
  /*background: -moz-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)); !* For Firefox 3.6 to 15 *!*/
  /*background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)); !* Standard syntax *!*/
  /*position: absolute;*/
  /*bottom: 0;*/
  /*width: 100%;
  }

  .milk-box .title .main {
    font-weight: bold;
    color: #484848;
  }

  .milk-box .title .sub {
    font-size: 1.2rem;
    color: #8C8C8C;
  }

  .milk-box .title .price {
    font-size: 1.2rem;
    color: #C71A40;
  }*/

.pure-u-1-2{
	border-bottom: 1px solid #EAEAEA;
}
.pure-u-1-2:nth-child(2n+1){
	border-right: 1px solid #EAEAEA;
}
  .m-nav {
    /*padding: .5rem;*/
    font-size: 1.6rem;
    border-bottom: 1px solid #f1f1f1;
  }

  .m-nav .iconfont {
    color: #C71A40;
  }

  .m-home-grid.m-home-grid-icon .info {
    color: #868686;
  }

  .u-btn.u-btn-default {
    color: #000;
  }

  .swipe-link {
    display: block;
  }
  .m-home-grid{padding:0 !important;}
  .pure-u-1-1>a>img{width:1.5rem;vertical-align: middle;}
</style>
