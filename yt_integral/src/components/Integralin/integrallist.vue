<template>
	<div class="integrallist">
		<div class="cumintearal">
			累积积分：2500分
		</div>
		<div class="interderlist">
			<p class="interderive">每日签到</p>
			<p class="derivetime">2017-08-30  10：39</p>
			<div class="countinter">
				<i>+</i>10888积分
			</div>
		</div>
		<div class="interderlist">
			<p class="interderive">卖辣条</p>
			<p class="derivetime">2017-08-30  10：39</p>
			<div class="countinter">
				<i>+</i>10888积分
			</div>
		</div>
		<div class="interderlist">
			<p class="interderive">买苹果</p>
			<p class="derivetime">2017-08-30  10：39</p>
			<div class="countinter">
				<i>-</i>10888积分
			</div>
		</div>
		<navfoot></navfoot>
	</div>
</template>

<script>
	import navfoot from "@/components/Customcp/navfoot.vue"
	export default{
		name:'Integrallist',
		components:{navfoot}
	}
</script>

<style scoped="scoped">
	.integrallist{width:7.11rem;margin:auto;}
	.integrallist>div{margin-top:0.2rem}
	.cumintearal{border-radius:0.1rem;font-size:0.28rem;line-height: 0.9rem;background:#ff5400;text-align: center;color:#fff}
	
	.interderlist{background:#fff;border-radius:0.1rem;padding:0.33rem;position: relative;}
	.interderive{font-size:0.28rem;color:#333}
	.derivetime{font-size:0.22rem;color:#999;margin-top:0.22rem}
	
	.countinter{font-size:0.28rem;color:#ff5400;position:absolute;top:0px;bottom: 0px;right:0.33rem;margin:auto;line-height: 1.5rem;}
	
</style>