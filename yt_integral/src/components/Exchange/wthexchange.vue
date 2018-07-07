<template>
	<div class="exchangesuc">
		<img src="@/assets/image/wthexchange.png" alt="" />
		<p>确认要兑换吗？</p>
		<div class="confirmbut">
			确认
		</div>
		<!--兑换按钮-->
		<div class="exchangebtn">
			<div class="needinteralw">
				取消
			</div>
			<div class="paybtn">
				确认兑换
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.exchangesuc{text-align: center;background:#ecf3ff;min-height:100vh;}
	img{width:2.32rem;height:2.51rem;margin-top:2.85rem}
	p{font-size:0.36rem;color:#000;}
	.confirmbut{width:100%;height:1.2rem;background:#ff5400;color:#fff;font-size:0.3rem;position:fixed;bottom: 0;line-height:1.2rem;}
	
	.exchangebtn{position:fixed;overflow: hidden;bottom: 0px;width:100%;}
	.needinteralw{background:#fff;font-size:0.28rem;color:#999;}
	.needinteral{font-size:0.32rem;color:#ff5400;}
	.paybtn{background:#ff5400;font-size:0.28rem;color:#fff;}
	.needinteralw,.paybtn{width:50%;float:left;height:1.2rem;text-align: center;line-height: 1.2rem;}
	
</style>