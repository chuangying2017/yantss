<template>
	<div class="productdetail">
		<swipe class="my-swipe">
		  	<swipe-item class="swipeitme">
		      	<a class="swipe-link">
		        	<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg">
		      	</a>
		    </swipe-item>
  		</swipe>
  		<div class="quantitywrap">
  			<div class="quantit">
  				<img src="@/assets/image/shopsign.png" alt="" />
  				<div class="productinfow">
  					<p class="productinfo">
  						燕塘加钙酸奶
  					<i class="stock">库存：115件</i>
	  				</p>
	  				<p class="unitprice">
	  					180积分<i class="originalprice">原价：<del>380.00</del>元</i>
	  				</p>
  				</div>
  			</div>
  		</div>
  		<div class="numselew">
  			<div class="numsele">
  				<i class="iconfont">&#xe676;</i>
  				请选择规格数量
  				<i class="iconfont more">&#xe629;</i>
  			</div>
  		</div>
  		<div class="shopdeatilw">
  			<div class="shopdtw">
  				<i class="iconfont">&#xe655;</i>
  				商品详情
  			</div>
  			<div class="sdeatilcont">
  				酸奶是一种半流体的发酵乳制品，因其含有乳酸成分而带有柔 和的酸味，它可帮助人体更好地消化吸收奶中的营养成分。
  			</div>
  		</div>
  		<transition name="downup">
  			<div class="pop quantnumwrap" v-if="selestatus">
			<div class="quantnumw">
				<div class="quantnum">
					<div class="quantnumhead">
						<img src="@/assets/image/exchangesuc.png" alt="" />
						<div class="quantinfo">
							<p class="shopname">燕塘加钙奶 <i class="iconfont closepop"  @click="dd">&#xe62a;</i></p>
							<p class="shopinters">228积分</p>
							<p class="popstrok">库存：115件</p>
						</div>
					</div>
					<!--规格-->
					<div class="quantsele">
						<p class="quantseletit">请选择规格</p>
						<ul>
							<li class="quantactive">210ml</li>
							<li>210ml</li>
							<li>210ml</li>
							<li>210ml</li>
							<li>210ml</li>
							<li>210ml</li>
							<li>210ml</li>
							<li>210ml</li>
						</ul>
					</div>
					<!--数量-->
					<div class="nulsele">
						<p class="nulseletit">请选择规格</p>
						<i class="iconfont">&#xeee2;</i><input type="number" /><i class="iconfont">&#xe6df;</i>
					</div>
				</div>
				<div class="foothr"></div>
				<router-link to="/mall/productpreview">
					<div class="nowexchangepop" @click="dd">
			  			立即兑换
			  		</div>
				</router-link>
			</div>
  		</div>
  		</transition>
  		<div class="nowexchange" @click="dd">
  			立即兑换
  		</div>
  		<div class="foothr"></div>
  		<navfoot></navfoot>
	</div>
</template>
<script>
	import {Swipe,SwipeItem} from 'vue-swipe'
	import navfoot from "@/components/Customcp/navfoot.vue"
	export default{
		name:'home',
		components:{Swipe,SwipeItem,navfoot},
		data(){
			return {
				selestatus:false,
			}
		},
		methods:{
			dd(){
				this.selestatus=!this.selestatus
			},		
		}
	}
</script>
<style scoped="scoped">
	.quantitywrap{background:#fff;padding-bottom:0.36rem;}
	.quantit,.numsele,.shopdtw{width:7rem;margin:auto;font-size: 0;overflow: hidden;}
	.quantit>img{width:0.57rem;height:0.63rem;position:absolute;}
	.productinfow{margin-top:0.26rem;margin-left:0.2rem;padding-left:0.55rem}
	.productinfo{font-size:0.3rem;color:#333;position:relative;}
	.stock{font-size:0.24rem;color:#909090;float:right;right:0;}
	.unitprice{font-size:0.35rem;color:#ff5400;margin-top:0.21rem}
	.originalprice{font-size:0.24rem;color:#909090;margin-left:0.25rem}
	
	.numselew{height:0.9rem;background:#fff;margin-top:0.2rem;line-height:0.9rem;}
	.iconfont{color:#999}
	.more{float: right;}
	.numsele,.shopdtw{font-size:0.28rem;color:#999;}
	
	.shopdeatilw{background:#fff;}
	.shopdtw{margin-top:0.2rem;border-bottom: 1px solid #eee;height:0.9rem;line-height:0.9rem;}
	.sdeatilcont{width:7rem;margin:auto;overflow: hidden;}
	
	.quantnumw{width:100%;background:#fff;position:absolute;bottom:0rem;}
	.quantnum{width:7.15rem;margin:auto;background:#fff;}
	.quantnumhead{font-size:0px;padding-bottom: 0.4rem;border-bottom: 1px solid #eee;}
	.quantnumhead>img{width:2.11rem;height:2.11rem;position:absolute;top:-0.44rem}
	.quantinfo{margin-left:2.38rem}
	.shopname{font-size:0.32rem;color:#000;margin-top:0.3rem;line-height:0.32rem;}
	.shopinters{font-size:0.32rem;color:#ff9521;margin:0.19rem auto 0.17rem auto;line-height:0.32rem;}
	.popstrok{font-size:0.26rem;color:#909090;line-height:0.26rem;}
	.closepop{color:#3e3e3e;font-size:0.39rem;float:right}

	/*选择规格*/
	.quantseletit{font-size:0.26rem;color:#999;margin:0.35rem auto 0.22rem auto;}
	.quantsele li{width:1.78rem;height:0.67rem;float:left;margin:0.17rem;text-align:center;line-height:0.67rem;border-radius: 0.2rem;border:1px solid #eee;color:#999;font-size:0.26rem}
	.quantsele .quantactive{border:1px solid #ff5400;color:#ff5400;}
	.quantsele{overflow: hidden;}
	
	
	.nulseletit{font-size:0.26rem;color:#999;margin:0.35rem auto 0.22rem auto;}
	.nulsele .iconfont{font-size:0.6rem}
	.nulsele .iconfont,.nulsele input{display:inline-block;vertical-align: middle;border:1px solid #eee;height:0.65rem}
	.nulsele input{border:none;outline: none;border:1px solid #eee;width: 0.96rem;font-size:0.26rem}
	
	
	
	.nowexchange{width:100%;position:fixed;bottom:1.38rem;color:#fff;background:#ff5400;line-height:1.2rem;height:1.2rem;text-align: center;font-size:0.28rem}
	.nowexchangepop{width:100%;position:fixed;bottom:0rem;color:#fff;background:#ff5400;line-height:1.2rem;height:1.2rem;text-align: center;font-size:0.28rem}
	
</style>