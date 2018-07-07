<template>
	<div class="productpreview">
		<div class="preview">
			<div class="userinfo">
				<div class="address">
					<p class="contact"><i class="iconfont">&#xe603;</i>19394449139<i class="username">天下第一刀</i></p>
					<p class="useraddre"><i class="iconfont">&#xe61f;</i>广州市花都区新华曙光路27号六扇门总部</p>
				</div>
				<div class="addadr">
					<i class="iconfont">&#xe6df;</i>
					添加地址
				</div>
			</div>
			<!---->
			<div class="shopdeatilw">
	  			<div class="shopdtw">
	  				<i class="iconfont">&#xe655;</i>
	  				商品详情
	  			</div>
	  			<div class="sdeatilcont">
	  				<img src="http://img2.imgtn.bdimg.com/it/u=3459552282,1575593874&fm=27&gp=0.jpg" alt="" />
	  				<div class="productinfo">
	  					<p class="productname">燕塘加钙dfsaffsdafsesefs酸奶 210ml</p>
	  					<div class="nulsele">
	  						<i class="intergral">288积分</i>
	  						<p><i class="iconfont">&#xeee2;</i><input type="number" /><i class="iconfont">&#xe6df;</i></p>
	  					</div>
	  				</div>
	  			</div>
	  			<p class="statistics">共1件商品，合计：<i>288积分</i></p>
  			</div>
  			<!---->
  			<div class="integralrule">
  				<div class="ruletit">商品兑换规则</div>
  				<div class="rulecont">
  					fdsadfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  				</div>
  			</div>
		</div>
		<!--兑换按钮-->
		<div class="foothr"></div>
		<div class="exchangebtn">
			<div class="needinteralw">
				需支付：<i class="needinteral">288积分</i>
			</div>
			<div class="paybtn">
				立即支付
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	
	.preview{width:7.1rem;margin:auto;}
	
	.userinfo{background:#fff;border-radius: 0.2rem;padding:0.3rem 0.22rem;margin-top:0.2rem}
	.address{border-bottom:2px solid #eee;}
	.address .iconfont{color:#999;margin-right:0.1rem}
	.contact{font-size:0.3rem;color:#666;}
	.useraddre{font-size:0.26rem;color:#666;margin:0.21rem 0 0.23rem 0;}
	.addadr .iconfont{color:#3d73f8}
	.addadr{color:#3d73f8;font-size:0.26rem;margin-top:0.16rem}
	
	.shopdeatilw{background:#fff;border-radius: 0.2rem;margin-top:0.2rem;overflow: hidden;}
	.shopdtw{color:#999;font-size:0.28rem;border-bottom: 1px solid #eee;padding:0.3rem 0.25rem;}
	.shopdtw .iconfont{color:#999}
	.sdeatilcont{overflow: hidden;padding:0.23rem;}
	.sdeatilcont>img{width:1.9rem;height:1.9rem;border-radius: 0.1rem;}
	.sdeatilcont>img,.productinfo{float:left;}
	.productinfo{margin-left:0.33rem;font-size: 0px;position:relative}
	.productname{width:4.4rem;font-size:0.32rem;color:#000;margin-top:0.2rem;padding-bottom:0.85rem;}
	.nulsele{position: absolute;top:1.2rem;width:100%;}
	.nulsele>p{float:right}
	.nulsele .iconfont{font-size:0.6rem;color:#999;}
	
	.nulsele .iconfont,.nulsele input{display:inline-block;vertical-align: top;border:1px solid #eee;height:0.65rem}
	.intergral{font-size:0.32rem;color:#ff5400;display: inline-block;line-height: 0.7rem;}
	.nulsele input{border:none;outline: none;border:1px solid #eee;width: 0.95rem;font-size:0.26rem}
	
	.statistics{font-size:0.26rem;color:#999;text-align: right;height:0.9rem;line-height: 0.9rem;border-top:1px solid #eee;padding-right:0.23rem}
	.statistics>i{color:#ff5400}
	
	.integralrule{background:#fff;margin-top:0.2rem;border-radius: 0.2rem;}
	.ruletit{font-size:0.28rem;color:#999;height:0.9rem;border-bottom:1px solid #eee;line-height: 0.9rem;width:6.57rem;margin:auto;}
	.rulecont{width:6.57rem;margin:auto;overflow: hidden;}
	
	.exchangebtn{position:fixed;overflow: hidden;bottom: 0px;width:100%;}
	.needinteralw{background:#fff;font-size:0.28rem;color:#999;}
	.needinteral{font-size:0.32rem;color:#ff5400;}
	.paybtn{background:#ff5400;font-size:0.28rem;color:#fff;}
	.needinteralw,.paybtn{width:50%;float:left;height:1.2rem;text-align: center;line-height: 1.2rem;}
	
</style>