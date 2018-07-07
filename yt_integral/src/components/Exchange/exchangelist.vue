<template>
	<div class="exchangelist">
		<div class="exlist">
			<div class="listl exlistred">
				<i class="moneyicon">￥</i>50
			</div>
			<div class="listr">
				<div class="extitle">满30瓶减<i class="exmoney">50</i>元</div>
				<p class="gratitud">燕塘三周年，感恩有你 <i class="integral">1000积分</i></p>
				<p class="validity">即兑换日内30天有效<i class="exchangebtn" @click="goexdetail()">立即兑换</i></p>
			</div>
		</div>
		<div class="exlist">
			<div class="listl exlistblue">
				<i class="moneyicon">￥</i>50
			</div>
			<div class="listr">
				<div class="extitle">满30瓶减<i class="exmoney">50</i>元</div>
				<p class="gratitud">燕塘三周年，感恩有你 <i class="integral">1000积分</i></p>
				<p class="validity">即兑换日内30天有效<i class="exchangebtn">立即兑换</i></p>
			</div>
		</div>
		<div class="exlist">
			<div class="listl exlistgreen">
				<i class="moneyicon">￥</i>50
			</div>
			<div class="listr">
				<div class="extitle">满30瓶减<i class="exmoney">50</i>元</div>
				<p class="gratitud">燕塘三周年，感恩有你 <i class="integral">1000积分</i></p>
				<p class="validity">即兑换日内30天有效<i class="exchangebtn">立即兑换</i></p>
			</div>
		</div>
		<navfoot></navfoot>
	</div>
</template>

<script>
	import navfoot from "@/components/Customcp/navfoot.vue"
	export default{
		name:'exchangelist',
		components:{navfoot},
		methods:{
			goexdetail(){
				this.$router.push({name:'Exchangedetail',params:{id:23}})
			},
		}
	}
</script>

<style scoped="scoped">
	.exchangelist{min-height:100%;background:#ecf3ff;overflow: hidden;}
	
	.exlist{width:7.11rem;height:2.22rem;margin:auto;margin-top:0.3rem;overflow: hidden;}
	.listl,.listr{float:left}
	.listl{width:1.87rem;height:2.22rem;font-size:0.7rem;color:#fff;text-align: center;line-height: 2.6rem;}
	.exlistred{background:url(../../assets/image/exlistred.png) no-repeat;background-size: 100%;}
	.exlistblue{background:url(../../assets/image/exlistblue.png) no-repeat;background-size: 100%;}
	.exlistgreen{background:url(../../assets/image/exlistgreen.png) no-repeat;background-size: 100%;}
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
</style>