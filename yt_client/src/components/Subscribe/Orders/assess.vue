<template>
	 <loader v-show="$loadingRouteData"></loader>
	<div class="assess" v-show="!$loadingRouteData">
		<div v-for="orderpro in starcont.preorders.skus" class="orderinfo">
			<div class="imgcont">
				<img :src="orderpro.cover_image" alt="" />
			</div>
			<div class="orderdetail">
				<p class="protit" v-if="starcont.preorders.order.refund_status === 'none'">{{orderpro.name|filtproductit}}
	              <i class="status" v-if="starcont.preorders.status === 'unpaid'">未支付</i>
	              <i class="status" v-if="starcont.preorders.status === 'shipping'">正常派送</i>
	              <i class="status" v-if="starcont.preorders.status === 'assigning'">待处理</i>
	              <i class="status" v-if="starcont.preorders.status === 'done'">订单结束</i>
	              <i class="status" v-if="starcont.preorders.status === 'cancel'">订单取消</i>
	            </p>
	            <p class="protit" v-else>{{orderpro.name|filtproductit}}
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'apply'">退款申请</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'reject'">退款被拒</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'approve'">审核通过</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'shipping'">退货中</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'shipped'">已退货</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'refunding'">退款中</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'done'">退款成功</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'fail'">退款失败</i>
	            </p>
				<p class="ordernum">订单号:{{starcont.preorders.order_no}}</p>
				<p class="time">配送时间：{{starcont.preorders.start_time}} <i class="num">{{orderpro.total}}{{orderpro.sku.unit}}</i></p>
			</div>
		</div>
		<div v-if="showdm" v-for="orderpro in starcont.preorders.skus|limitBy starcont.preorders.skus.length-2 2" class="orderinfo">
			<div class="imgcont">
				<img :src="orderpro.cover_image" alt="" />
			</div>
			<div class="orderdetail">
				<p class="protit" v-if="starcont.preorders.order.refund_status === 'none'">{{orderpro.name|filtproductit}}
	              <i class="status" v-if="starcont.preorders.status === 'unpaid'">未支付</i>
	              <i class="status" v-if="starcont.preorders.status === 'shipping'">正常派送</i>
	              <i class="status" v-if="starcont.preorders.status === 'assigning'">待处理</i>
	              <i class="status" v-if="starcont.preorders.status === 'done'">订单结束</i>
	              <i class="status" v-if="starcont.preorders.status === 'cancel'">订单取消</i>
	            </p>
	            <p class="protit" v-else>{{orderpro.name|filtproductit}}
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'apply'">退款申请</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'reject'">退款被拒</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'approve'">审核通过</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'shipping'">退货中</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'shipped'">已退货</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'refunding'">退款中</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'done'">退款成功</i>
	              <i class="status" v-if="starcont.preorders.order.refund_status === 'fail'">退款失败</i>
	            </p>
				<p class="ordernum">订单号：{{starcont.preorders.order_no}}</p>
				<p class="time">配送时间：{{starcont.preorders.start_time}} <i class="num">{{orderpro.total}}{{orderpro.sku.unit}}</i></p>
			</div>
		</div>
		<div class="showmore"  v-if="starcont.preorders.skus.length>2" @click="showmore">
			显示全部信息
		</div>
		<div class="talkarea">
			<div class="talkwrap">
				<div class="giveinfo">
					<p class="givename">{{starcont.preorders.staff.name}}</p>
					<p class="givetime">送奶时间:
						<i v-if="starcont.preorders.weekday_type=='all'">周一至周日</i>
						<i v-if="starcont.preorders.weekday_type=='workday'">周一至周五</i>
						&nbsp;&nbsp;
						<i v-if="starcont.preorders.daytime==1">上午6:00-8:00</i>
						<i v-if="starcont.preorders.daytime==0">下午4:00-6:00</i>
					</p>
					<!--<p class="givetime" v-if="starcont.preorders.weekday_type=='workday'">送奶时间:周一至周五&nbsp;&nbsp;上午9:00-11:00</p>-->
					<p class="stationaddr">服务部:{{starcont.preorders.station.name}}</p>
				</div>
				<div id="star" class="star">
		          	<span @click="setStar(1)" :class="{noselct:score<1}"><i class="ciconfont" v-if="score>=1">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(2)" :class="{noselct:score<2}"><i class="ciconfont" v-if="score>=2">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(3)" :class="{noselct:score<3}"><i class="ciconfont" v-if="score>=3">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(4)" :class="{noselct:score<4}"><i class="ciconfont" v-if="score>=4">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(5)" :class="{noselct:score<5}"><i class="ciconfont" v-if="score>=5">&#xe711;</i><i class="ciconfont" v-else>&#xe712;</i></span>
				</div>
				<p class="stationeval">感谢您的高评价！</p>
				<div class="evalcont" v-if="score==1">
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_one!=''">{{starcont.settingArray.value.star_one.one_one}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_two!=''">{{starcont.settingArray.value.star_one.one_two}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_three!=''">{{starcont.settingArray.value.star_one.one_three}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_four!=''">{{starcont.settingArray.value.star_one.one_four}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_five!=''">{{starcont.settingArray.value.star_one.one_five}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_one.one_six!=''">{{starcont.settingArray.value.star_one.one_six}}</p>
				</div>
				<div class="evalcont" v-if="score==2">
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_one!=''">{{starcont.settingArray.value.star_two.two_one}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_two!=''">{{starcont.settingArray.value.star_two.two_two}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_three!=''">{{starcont.settingArray.value.star_two.two_three}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_four!=''">{{starcont.settingArray.value.star_two.two_four}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_five!=''">{{starcont.settingArray.value.star_two.two_five}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_two.two_six!=''">{{starcont.settingArray.value.star_two.two_six}}</p>
				</div>
				<div class="evalcont" v-if="score==3">
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_one!=''">{{starcont.settingArray.value.star_three.three_one}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_two!=''">{{starcont.settingArray.value.star_three.three_two}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_three!=''">{{starcont.settingArray.value.star_three.three_three}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_four!=''">{{starcont.settingArray.value.star_three.three_four}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_five!=''">{{starcont.settingArray.value.star_three.three_five}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_three.three_six!=''">{{starcont.settingArray.value.star_three.three_six}}</p>
				</div>
				<div class="evalcont" v-if="score==4">
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_one!=''">{{starcont.settingArray.value.star_four.four_one}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_two!=''">{{starcont.settingArray.value.star_four.four_two}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_three!=''">{{starcont.settingArray.value.star_four.four_three}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_four!=''">{{starcont.settingArray.value.star_four.four_four}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_five!=''">{{starcont.settingArray.value.star_four.four_five}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_four.four_six!=''">{{starcont.settingArray.value.star_four.four_six}}</p>
				</div>
				<div class="evalcont" v-if="score==5">
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_one!=''">{{starcont.settingArray.value.star_five.five_one}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_two!=''">{{starcont.settingArray.value.star_five.five_two}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_three!=''">{{starcont.settingArray.value.star_five.five_three}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_four!=''">{{starcont.settingArray.value.star_five.five_four}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_five!=''">{{starcont.settingArray.value.star_five.five_five}}</p>
					<p @click="seled($event)" v-if="starcont.settingArray.value.star_five.five_six!=''">{{starcont.settingArray.value.star_five.five_six}}</p>
				</div>
				<div id="customtalk">
					<textarea type="text" placeholder="说说你的评价或者建议吧！" v-model="content"></textarea>
				</div>
				
			</div>
		</div>
		<div class="sendtalk" @click="sendtalk">
			提交
		</div>
	</div>
</template>

<script>
	import Loader from './../../Share/loader.vue'
	export default{
		name:'assess',
		components: {
      		Loader,
    	},
		data(){
			return{
				commentid:null,
				comment_label:[],
				content:"",
				showdm:false,
				starcont:null,
				score:5,
				starcont:{
					preorders:{
						skus:[]
					}
				},
				formData:{
					score:null,
					comment_label:null,
					content:""
				}
			}
		},
		route:{
			data:function(){	
				var self =this	
				
				return Promise.all([this.$http.get('/comments/clientComments/2?preorderId='+ this.$route.params.order_no)]).then(function([starcont]){
					
					if(starcont.data.comment_type.comment_type=='HaveUses'){
						self.$router.go({name: 'asseDetail', params: {order_no:starcont.data.preorders.skus[0].preorder_id}});			
					}
					return {
						commentid:starcont.data.comment_type.id,
						starcont:starcont.data
					}
				})
			}
		},
		watch:{
			score(){
				var self=this;
				self.comment_label=[];
			}
		},
		methods:{
			setStar(num){
				var self=this;
				self.score=num;
			},
//			删除数组中值
			del(obj,str){
				var index = obj.indexOf(str); 
				if (index > -1) { 
					obj.splice(index, 1); 
				} 
				return false;
			},
			seled(index){
				var self=this
				var el = event.currentTarget;
				if(el.getAttribute("class")!='seleced'){
					el.className='seleced'
					self.comment_label.push(el.innerHTML)
				}else{
					el.className=''
					self.del(self.comment_label,el.innerHTML)
				}
				
			},
			showmore(){
				this.showdm=!this.showdm
			},
			sendtalk(){
				var self =this
				self.formData.score=self.score,
				self.formData.comment_label=self.comment_label,
				self.formData.content=self.content,		
				self.$http.patch('/comments/clientComments/'+self.commentid, self.formData).then(function(data){
					window.alert('评价成功!')
            		window.location.href = 'http://yt2.l43.cn/yt-client/?#!/mall/user'
				},function(data){
					 window.alert('评价失败，请重试')
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
   .star{text-align: center;}
  .star span{margin-left:1.8rem}
  #star span:nth-child(1){margin-left:0px}
   .star span{color:#ffbb2a}
   .star .noselct i{color:#999}
	i{font-style:normal}
	.assess{background:#ecf3ff;width:100%;min-height:100%;overflow: hidden;}
	.orderinfo{overflow: hidden;background:#fff;margin:12px;border-radius: 5px;
	padding:15px;position: relative;}
	.imgcont,.orderdetail{float:left}
	.orderdetail{    width: 66%;}
	.imgcont{width:6.7rem;height:6.7rem;border:1px solid #bfbfbf;border-radius: 21px;text-align: center;}
	.imgcont img{width:3.2rem;}
	.protit{font-size:1.5rem;color:#000;margin-left:1rem;width:90%;}
	.status{font-size:1.4rem;color:#1ab500;    position: absolute;
    right: 22px;top:1.15rem;    right: 1.2rem;}
	.ordernum,.time{color:#a1a1a1;font-size:1.3rem;margin-left:1rem}
	.ordernum{margin:0.5rem 1rem;margin-right: 0;margin-top:0.8rem;width:110%;word-break:break-all;}
	.num{position: absolute;
    right: 22px;font-size:1.6rem}
    
    .talkarea{overflow: hidden;background:#fff;margin:12px;border-radius: 5px;
	padding:18px;margin-bottom: 7rem;}
	.talkwrap{width:95%;margin:auto}
	.givename{font-size:1.6rem;color:#000;}
	.givetime,.stationaddr{font-size:1.3rem;color:#999;}
	.givetime{margin:1.1rem auto;}
	.stationaddr{border-bottom:1px solid #eee;padding-bottom: 2.15rem;}
	.star{margin-top:2.7rem}
	.stationeval{padding:2.05rem 0 1.85rem 0;text-align: center;color:#999;font-size:1.4rem}
	
	.evalcont .seleced{
   		width: 47%;
	    float: left;
	    padding:0.6rem 0.4rem;
	    font-size: 1.4rem;
	    color: #ffbb2a;
	    border: 1px solid #ffbb2a;
	    margin-top: 1rem;
	    background: #fff3da;
	    color:#ffbb2a;
	    font-size:1.4rem;
	    text-align: center;
   	}
   	.evalcont p{
   		width: 46%;
	    float: left;
	    padding:0.6rem 0.4rem;
	    font-size: 1.4rem;
	    margin-top: 1rem;
	     border: 1px solid #f5f5f5;
	    background: #f5f5f5;
	    color:#999;
	    font-size:1.4rem;
	    text-align: center;
	    overflow: hidden;
	    white-space: nowrap;
   	}
   .evalcont p:nth-child(2n+2){margin-left:5.9%}
   .evalcont{margin: auto;overflow: hidden;padding-bottom: 2.5rem;}
	.sendtalk{position:fixed;bottom: 0px;font-size:1.6rem;width:100%;height:6rem;background:#ff5400;color:#fff;line-height:6rem;text-align: center;}
	#customtalk{background:#f5f5f5}
	#customtalk textarea{resize:none;margin:auto;width:95%;border:none;outline:none;background:none;font-size:1.6rem;color:#999;}
 	@media screen and (max-width: 374px) {
    	.ordernum{font-size:12px}
    	.imgcont{width: 3.6rem;width:3.6rem;border-radius: 1rem;}
    	.imgcont img{width: 3.2rem;border-radius: 1rem;}
    	.orderinfo{padding: 6px;}
    	.ciconfont {
	    
	    font-size: 2.6rem;
	   
   		}
	}
	.showmore{text-align: center;font-size:15px;}
</style>