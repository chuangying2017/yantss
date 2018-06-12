<template>
	<div class="assedetail">
		<div class="asscont">
			
			<h3 class="milkname">{{starcont.preorders.staff.name}}</h3>
			<p class="givetime">送奶时间:
				<i v-if="starcont.preorders.weekday_type=='all'">周一至周日</i>
				<i v-if="starcont.preorders.weekday_type=='workday'">周一至周五</i>
				&nbsp;&nbsp;
				<i v-if="starcont.preorders.daytime==1">上午6:00-8:00</i>
				<i v-if="starcont.preorders.daytime==0">下午4:00-6:00</i>
			</p>
			<p class="stationaddr">服务部:{{starcont.preorders.station.name}}</p>
			<div class="evaluate">
				<p class="stationeval">服务评价</p>
				<div class="star">
		          	<span @click="setStar(1)" :class="{noselct:starcont.comment.score<1}"><i class="ciconfont" v-if="starcont.comment.score>=1">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(2)" :class="{noselct:starcont.comment.score<2}"><i class="ciconfont" v-if="starcont.comment.score>=2">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(3)" :class="{noselct:starcont.comment.score<3}"><i class="ciconfont" v-if="starcont.comment.score>=3">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(4)" :class="{noselct:starcont.comment.score<4}"><i class="ciconfont" v-if="starcont.comment.score>=4">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(5)" :class="{noselct:starcont.comment.score<5}"><i class="ciconfont" v-if="starcont.comment.score>=5">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
				</div>
				<div class="evalcont">
					<p v-for="concont in starcont.comment.comment_label">{{concont}}</p>
				</div>
			</div>
		</div>
		<div class="comments">
			<h2>留言评价</h2>
			<div class="comcont">
				{{starcont.comment.content}}
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"assedetail",
		data(){
			return{
				starcont:null,
			}
		},
		route:{
			data:function(){	
				return Promise.all([this.$http.get('/comments/clientComments/2?preorderId='+ this.$route.params.order_no)]).then(function([starcont]){
					
					return {
						starcont:starcont.data
					}
				})
			}
		},
	}
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
   .milkname{font-size:1.8rem;text-align: center;padding-top:2rem}
   .givetime,.stationaddr{color:#999;font-size:1.5rem;text-align: center;margin-top:0.7rem}
   .stationaddr{border-bottom: 1px solid #f5f5f5;
    padding-bottom: 1.5rem;}
   .evaluate{margin-top:1.5rem;text-align: center;}
   .stationeval{font-size:1.7rem;color:#999}
   .star{margin-top:1.5rem;text-align: center;}
   .star input{opacity:0;}
   /*.star span{color:#ffbb2a}*/
   .star .noselct i{color:#999}
   .evalcont p{
   		width: 47%;
	    float: left;
	    padding:0.6rem 0.4rem;
	    font-size: 1.6rem;
	    color: #ffbb2a;
	    border: 1px solid #ffbb2a;
	    margin-top: 1rem;
	    background: #fff3da;
	    color:#ffbb2a;
	    font-size:1.6rem;
	    text-align: center;
   	}
   .evalcont p:nth-child(2n+2){margin-left:5.9%}
   .evalcont{width: 86%;margin: auto;overflow: hidden;margin-top:1.5rem; padding-bottom: 2.5rem;}
   .comments h2{padding:0.8rem;text-align: center;font-size:1.7rem;color:#999;border-bottom:1px solid #f5f5f5;}
	.comcont{padding:1.3rem 2.1rem;color:#999;font-size:1.4rem}
	i{font-style: normal;}
</style>