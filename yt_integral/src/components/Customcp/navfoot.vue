<template>
	<div class="navfoot">
		<div class="foothr"></div>
		<div class="foot">
			<div>
				<router-link to="/mall/home">
					<img src="@/assets/image/home.png" alt="" />
					<p>商城首页</p>
				</router-link>
			</div>
			<div>
				<router-link to="/integralin/integralsignin">
					<img src="@/assets/image/signin.png" alt="" />
					<p>积分签到</p>
				</router-link>
			</div>
			<div>
				<router-link to="/exchange/exchangelist">
					<img src="@/assets/image/integral.png" alt="" />
					<p>积分兑换</p>
				</router-link>
			</div>
			<div>
				<router-link to="/exchange/exchangelist">
					<img src="@/assets/image/personal.png" alt="" />
					<p>个人中心</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Navfoot',
	}
</script>
	
<style scoped="scoped">
	.foot{width:100%;height:1.38rem;border-top: 1px solid #dddddd;overflow: hidden;position:fixed;bottom: 0px;background:#fff;}
	.foot div{width:25%;text-align: center;float:left;margin:auto;margin-top:0.3rem}
	.foot img{width:0.46rem;height:0.46rem;display:block;margin:auto;}
	.foot p{font-size:0.28rem;color:#333}
</style>