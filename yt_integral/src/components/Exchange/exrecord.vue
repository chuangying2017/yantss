<template>
	<div class="exrecord">
		<div class="recordlist">
			<p class="orderNumber">订单号：11112999999999999999999</p>
			<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
			<div class="recordinfow">
				<p class="recordname">瓶装乳酸奶</p>
				
				<p class="recordTime">2017-08-30 10:39</p>
				<p class="singleNum"><i class="traffic">申通快递:</i>526893356489fe999999999sesee611212</p>
			</div>
			<div class="recordStatus">
				<p class="status collect">待收货</p>
				<p class="intestatu">-180分</p>
			</div>
		</div>
		<div class="recordlist">
			<p class="orderNumber">订单号：11112999999999999999999</p>
			<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
			<div class="recordinfow">
				<p class="recordname">瓶装乳酸奶</p>
				
				<p class="recordTime">2017-08-30 10:39</p>
				<p class="singleNum"><i class="traffic">申通快递:</i>526893356489611212</p>
			</div>
			<div class="recordStatus">
				<p class="status deliver">待发货</p>
				<p class="intestatu">-180分</p>
			</div>
		</div>
		<navfoot></navfoot>
	</div>
</template>

<script>
	import navfoot from "@/components/Customcp/navfoot.vue"
	export default{
		name:'Exrecord',
		components:{navfoot},
		data(){
			return{
				
			}
		},
	}
</script>

<style scoped="scoped">
	.recordlist{width:7.1rem;margin:auto;background:#fff;border-radius: 0.2rem;margin-top:0.2rem;padding:0.2rem 0.28rem 0.2rem 0.2rem;position:relative;box-sizing: border-box;}
	.recordlist img{width:1.18rem;height:1.4rem;}
	.recordlist img,.recordinfow{display: inline-block;font-size:0;vertical-align: top;}
	.recordinfow{word-break: break-all;width:4.9rem;margin-left:0.15rem}
	.recordname,.orderNumber{font-size:0.28rem;color:#000;}
	.recordname{line-height: 0.28rem;}
	.orderNumber{padding-bottom: 0.1rem;}
	.recordTime{font-size:0.22rem;color:#999;margin:0.2rem 0px 0.18rem 0;}
	.singleNum{font-size:0.26rem;color:#999;}
	
	.intestatu{color:#ff5400;font-size:0.28rem;}
	.status{font-size:0.28rem;}
	/*待收货*/
	.collect{color:#26a300}
	/*待发货*/
	.deliver{color:#ff5400}
	.recordStatus{top:0.58rem;right:0.28rem;position:absolute;}
</style>