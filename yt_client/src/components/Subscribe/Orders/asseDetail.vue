<template>
	<div class="assedetail">
		<div class="asscont">
			<h3 class="milkname">送奶工</h3>
			<p class="givetime">送奶时间:周一至周日&nbsp;&nbsp;上午9:00-11:00</p>
			<p class="stationaddr">服务部:昌岗中服务部</p>
			<div class="evaluate">
				<p class="stationeval">服务评价</p>
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
				<div class="evalcont">
					<p>热情健谈</p>
					<p>及时送达</p>
					<p>热情健谈</p>
					<p>及时送达</p>
				</div>
			</div>
		</div>
		<div class="comments">
			<h2>留言评价</h2>
			<div class="comcont">
				服务真棒，送货好及时，准时准点的，又好说话，太喜欢了！
			</div>
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
   .assedetail{background:#ecf3ff;width:100%;min-height:100%;overflow: hidden;}
   .asscont,.comments{background:#fff;margin:12px;border-radius: 5px;}
   .milkname{font-size:1.5rem;text-align: center;padding-top:2rem}
   .givetime,.stationaddr{color:#999;font-size:1.2rem;text-align: center;margin-top:0.7rem}
   .stationaddr{border-bottom: 1px solid #f5f5f5;
    padding-bottom: 1.5rem;}
   .evaluate{margin-top:1.5rem;text-align: center;}
   .stationeval{font-size:1.4rem;color:#999}
   .star{margin-top:1.5rem}
   .star input{opacity:0;}
   .star span{color:#ffbb2a}
   .star .noselct{color:#999}
   .evalcont p{
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
   .evalcont p:nth-child(2n+2){margin-left:5.9%}
   .evalcont{width: 86%;margin: auto;overflow: hidden;margin-top:1.5rem; padding-bottom: 2.5rem;}
   .comments h2{padding:0.8rem;text-align: center;font-size:1.4rem;color:#999;border-bottom:1px solid #f5f5f5;}
	.comcont{padding:1.3rem 2.1rem;color:#999;}
</style>