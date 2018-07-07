<template>
	<div class="exchangedetail">
		<swipe class="my-swipe">
		  	<swipe-item class="swipeitme">
		      	<a class="swipe-link">
		        	<img src="http://o7tep4eu1.bkt.clouddn.com/Fhb61SHEQgw6B4BvlWypyrTRu85s-201805220936425856">
		      	</a>
		    </swipe-item>
		    <swipe-item class="swipeitme">
		      	<a class="swipe-link">
		        	<img src="http://o7tep4eu1.bkt.clouddn.com/FufWGRnxVKlYRv0W5NyKs34mLU0Z-201805251703538953">
		      	</a>
		    </swipe-item>
  		</swipe>
  		<div class="exlist">
			<div class="listl exlistred">
				<i class="moneyicon">￥</i>50
			</div>
			<div class="listr">
				<div class="extitle">满30瓶减<i class="exmoney">50</i>元</div>
				<p class="gratitud">燕塘三周年，感恩有你 <i class="integral">1000积分</i></p>
				<p class="validity">即兑换日内30天有效<i class="exchangebtn" @click="dd()">立即兑换</i></p>
			</div>
		</div>
		<div class="ruletit">
			<img src="@/assets/image/exrule.png" alt="" />
		</div>
		<div class="rulecont">
			fdsssssssfdsafdsaf
			fasfesfes
			fessaf
			fasfewsaf
			fseafesf
			fesafesa
			fesf
		</div>
		<transition name="fade">
    		<div class="pop" v-if="popstatus">
				<img src="@/assets/image/exsuc.png" alt="" />
				<div class="sucbtn">确定</div>
			</div>
  		</transition>
	</div>
</template>
<script>
	import {Swipe,SwipeItem} from 'vue-swipe'
	export default{
		name:'home',
		components:{Swipe,SwipeItem},
		data(){
			return{
				popstatus:false,
			}
		},
		methods:{
			dd(){
				this.popstatus=!this.popstatus
			}
		}
	}
</script>

<style scoped="scoped">
	.exchangedetail{background:#01ace4 !important;min-height:100vh;padding:1px}
	.my-swipe {width:7.11rem;height: 251px;margin:auto;color: #fff;font-size: 30px;text-align: center;margin-top:0.2rem}	 
	.swipeitme{width:7.11rem;;position:absolute;}
	.swipeitme img{width:7.11rem;height: 251px;border-radius: 0.15rem;}
	.is-active{z-index:1;}
	
	.exlist{width:7.11rem;height:2.22rem;margin:auto;margin-top:0.3rem;overflow: hidden;}
	.listl,.listr{float:left}
	.listl{width:1.87rem;height:2.22rem;font-size:0.7rem;color:#fff;text-align: center;line-height: 2.6rem;}
	.exlistred{background:url(../../assets/image/exlistred.png) no-repeat;background-size: 100%;}
	.moneyicon{font-size:0.42rem;}
	
	.listr{width:5.24rem;height:2.22rem;line-height: 0.34rem;background:url(../../assets/image/exlistpub.png) no-repeat;background-size: 100%;}
	.listr>div,.listr>p{padding-left:0.26rem;}
	.extitle{font-size:0.3rem;color:#000;margin-top:0.31rem}
	.exmoney{font-size:0.46rem;color:#ef2c4e;}
	.gratitud,.validity{font-size:0.26rem;color:#999;}
	.gratitud{margin-top:0.17rem}
	.validity{margin-top:0.2rem}
	.integral{font-size:0.34rem;color:#ef2c4e;margin-left:0.49rem}
	.exchangebtn{font-size:0.28rem;width:1.49rem;height:0.5rem;margin-left:0.77rem;vertical-align: text-bottom;line-height:0.5rem;text-align:center;display:inline-block;border-radius:0.1rem;border:1px solid #999;}

	.ruletit img{width:100%;display: inherit;}
	.rulecont{width:7.01rem;margin:auto;border:9px solid #6bdcfc;border-radius:0.28rem;box-sizing: border-box;overflow: hidden;}
	/*兑换成功*/
	.pop img{position: fixed;top:0.89rem;width:100%;}
	.sucbtn{width: 3.04rem;height: 0.98rem;background: #ef2c4e;margin: auto;margin-top: 7.1rem;color: #fff;font-size: 0.3rem;border-radius: 0.1rem;line-height: 0.98rem;text-align: center;z-index: 1111111;position: relative;}
	
</style>