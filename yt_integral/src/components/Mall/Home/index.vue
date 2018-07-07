<template>
	<div class="mallhome">
		<swipe class="my-swipe">
		  	<swipe-item class="swipeitme">
		      	<a class="swipe-link">
		        	<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg">
		      	</a>
		    </swipe-item>
  		</swipe>
  		<div class="datamodule">
  			<router-link to="/integralin/integrallist">
  				<div class="interpark">
	  				<i class="iconfont">&#xe61e;</i>
	  					积分
	  				<i class="interNum">100</i>
  				</div>
  			</router-link>
  			<router-link to="/exchange/exrecord">
	  			<div class="recordPark">
	  				<i class="iconfont">&#xe64b;</i>
	  				参与记录
	  			</div>
  			</router-link>
  		</div>
  		<div class="productShow">
  			<div class="productList">
  				<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
  				<p class="productName">燕塘乳酸大瓶燕塘乳酸大燕塘乳酸大奶 3100ml</p>
  				<p class="operation">
  					<i class="proInter">积分：9999</i>
  					<router-link to="/mall/productdetail">
  						<i class="exchangeBtn">立即兑换></i>
  					</router-link>
  				</p>
  			</div>
  			<div class="productList">
  				<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
  				<p class="productName">燕塘乳酸大瓶燕塘乳酸大燕塘乳酸大奶 3100ml</p>
  				<p class="operation">
  					<i class="proInter">积分：9999</i>
  					<i class="exchangeBtn">立即兑换></i>
  				</p>
  			</div>
  			<div class="productList">
  				<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
  				<p class="productName">燕塘乳酸大瓶燕塘乳酸大燕塘乳酸大奶 3100ml</p>
  				<p class="operation">
  					<i class="proInter">积分：9999</i>
  					<i class="exchangeBtn">立即兑换></i>
  				</p>
  			</div>
  			<div class="productList">
  				<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
  				<p class="productName">燕塘乳酸大瓶燕塘乳酸大燕塘乳酸大奶 3100ml</p>
  				<p class="operation">
  					<i class="proInter">积分：9999</i>
  					<i class="exchangeBtn">立即兑换></i>
  				</p>
  			</div>
  		</div>
  		<navfoot></navfoot>
	</div>
</template>
<script>
	import {Swipe,SwipeItem} from 'vue-swipe'
	import navfoot from "@/components/Customcp/navfoot.vue"
	export default{
		name:'home',
		components:{Swipe,SwipeItem,navfoot},
	}
</script>

<style scoped="scoped">
	.mallhome{min-height:100vh;padding:1px}
	.my-swipe {width:7.11rem;height: 251px;margin:auto;color: #fff;font-size: 30px;text-align: center;margin-top:0.2rem}	 
	.swipeitme{width:7.11rem;;position:absolute;}
	.swipeitme img{width:7.11rem;height: 251px;border-radius: 0.15rem;}
	.is-active{z-index:1;}
	
	.datamodule{width:7.11rem;background:#fff;border-radius: 0.15rem;margin:auto;margin-top:0.2rem;overflow: hidden;}
	.interpark{border-right:1px solid #eee}
	.interpark,.recordPark{width:50%;margin:0.14rem auto;padding:0.2rem 0;font-size:0.26rem;line-height:0.26rem;color:#000;float:left;text-align: center;box-sizing: border-box;}
	.interpark>.iconfont{color:#ff5500;margin-right:0.09rem}
	.recordPark>.iconfont{color:#1fbd00;margin-right:0.09rem}
	
	.productShow{width:7.11rem;margin:auto;margin-top:0.03rem;overflow: hidden;}
	.productList{float:left;background:#fff;font-size:0;width:3.45rem;margin-top:0.2rem}
	.productList:nth-child(2n+2){margin-left:0.2rem}
	.productList>img{width:100%;}
	.productList>p{padding:0.2rem 0.2rem 0px 0.2rem;}
	.productName{font-size:0.26rem;color:#000;text-align: center;}
	
	.operation{overflow: hidden;padding-bottom: 0.2rem !important;}
	.proInter{font-size:0.26rem;color:#fe4f51;vertical-align: middle;line-height:0.55rem;}
	.exchangeBtn{font-size:0.22rem;color:#fff;background:#ff003c;border-radius: 0.08rem;position:relative;float:right;padding:0.08rem 0.08rem;}
</style>