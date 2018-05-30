<template>
	<div class="assess">
		<div class="orderinfo">
			<div class="imgcont">
				<img src="http://o7tep4eu1.bkt.clouddn.com/FkAkx7KLM_KQS8wbxeq76QIshsvM-201607201118158646" alt="" />
			</div>
			<div class="orderdetail">
				<p class="protit">瓶装乳酸奶 210ml <i class="status">已完成</i></p>
				<p class="ordernum">订单号：EE20180515173609426822</p>
				<p class="time">配送时间：2018-01-04 <i class="num">30瓶</i></p>
			</div>
		</div>
		<div class="talkarea">
			<div class="talkwrap">
				<div class="giveinfo">
					<p class="givename">独孤送奶</p>
					<p class="givetime">送奶时间:周一至周日&nbsp;&nbsp;上午9:00-11:00</p>
					<p class="stationaddr">服务部:昌岗中服务部</p>
				</div>
				<div class="star">
		          	<input type="radio" name="b" value="1" v-model="" @click="setStar('1')"/>
		          	<span><i class="ciconfont">&#xe711;</i></span>
		          	<input type="radio" name="b" value="2" v-model="" @click="setStar('2')"/>
		          	<span><i class="ciconfont">&#xe711;</i></span>
		          	<input type="radio" name="b" value="3" v-model="" @click="setStar('3')"/>
		          	<span><i class="ciconfont">&#xe711;</i></span>
		          	<input type="radio" name="b" value="4" v-model="" @click="setStar('4')"/>
		          	<span><i class="ciconfont">&#xe711;</i></span>
		          	<input type="radio" name="b" value="5" v-model="" @click="setStar('5')"/>
		          	<span class="noselct"><i class="ciconfont">&#xe712;</i></span>
				</div>
				<p class="stationeval">感谢您的高评价！</p>
				<div class="evalcont">
					<p class="seleced">热情健谈</p>
					<p>及时送达</p>
					<p>热情健谈</p>
					<p>及时送达</p>
				</div>
				<div id="customtalk">
					<textarea type="text" placeholder="说说你的评价或者建议吧！"></textarea>
				</div>
				
			</div>
		</div>
		<div class="sendtalk">
			提交
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	@font-face {
  font-family: 'iconfont';  /* project id 686760 */
  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot');
  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.woff') format('woff'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.svg#iconfont') format('svg');
}
	.ciconfont {
	    font-family: "iconfont";
	    font-size: 3.5rem;
	    font-style: normal;
   }
   .star input{opacity:0;}
   .star span{color:#ffbb2a}
   .star .noselct{color:#999}
	i{font-style:normal}
	.assess{background:#ecf3ff;width:100%;min-height:100%;overflow: hidden;}
	.orderinfo{overflow: hidden;background:#fff;margin:12px;border-radius: 5px;
	padding:18px}
	.imgcont,.orderdetail{float:left}
	.imgcont img{width:7.2rem;height:7.2rem;border-radius: 21px;border:1px solid #bfbfbf}
	.protit{font-size:1.4rem;color:000;margin-left:1rem;margin-top: 0.35rem;}
	.status{font-size:1.3rem;color:#1ab500;    position: absolute;
    right: 22px;}
	.ordernum,.time{color:#a1a1a1;font-size:1.2rem;margin-left:1rem}
	.ordernum{margin: 1rem;}
	.num{position: absolute;
    right: 22px;font-size:1.5rem}
    
    .talkarea{overflow: hidden;background:#fff;margin:12px;border-radius: 5px;
	padding:18px}
	.talkwrap{width:95%;margin:auto}
	.givename{font-size:1.5rem;color:#000;}
	.givetime,.stationaddr{font-size:1.2rem;color:#999;}
	.givetime{margin:1.1rem auto;}
	.stationaddr{border-bottom:1px solid #eee;padding-bottom: 2.15rem;}
	.star{margin-top:2.7rem}
	.stationeval{padding:2.05rem 0 1.85rem 0;text-align: center;color:#999;font-size:1.3rem}
	
	.evalcont .seleced{
   		width: 47%;
	    float: left;
	    padding:0.6rem 0.4rem;
	    font-size: 1.3rem;
	    color: #ffbb2a;
	    border: 1px solid #ffbb2a;
	    margin-top: 1rem;
	    background: #fff3da;
	    color:#ffbb2a;
	    font-size:1.3rem;
	    text-align: center;
   	}
   	.evalcont p{
   		width: 47%;
	    float: left;
	    padding:0.6rem 0.4rem;
	    font-size: 1.3rem;
	    margin-top: 1rem;
	     border: 1px solid #f5f5f5;
	    background: #f5f5f5;
	    color:#999;
	    font-size:1.3rem;
	    text-align: center;
   	}
   .evalcont p:nth-child(2n+2){margin-left:5.9%}
   .evalcont{margin: auto;overflow: hidden;padding-bottom: 2.5rem;}
	.sendtalk{position:fixed;bottom: 0px;font-size:1.5rem;width:100%;height:6rem;background:#ff5400;color:#fff;line-height:6rem;text-align: center;}
	#customtalk{background:#f5f5f5}
	#customtalk textarea{resize:none;margin:auto;width:95%;border:none;outline:none;background:none;font-size:1.4rem;color:#999}

</style>