<template>
	<div class="intergralin">
		<div class="siginhead">
			<img src="@/assets/image/exchangesuc.png" alt="" />
			<div class="rinfo">
				<p class="username">天下第一刀</p>
				<p class="selfintergral">我的积分：<i class="myinter">8869分</i></p>
			</div>
			<div class="signinbtn" @click="signin">签到</div>
		</div>
	    <!-- 年份 月份 -->
	    <div class="month">
	        <ul>
	            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
	            <li class="arrow iconfont" @click="pickPre(currentYear,currentMonth)">&#xe612;</li>
	            <li class="year-month">
	                <span class="choose-year">{{ currentYear }}年</span>
	                <span class="choose-month">{{ currentMonth }}月</span>
	            </li>
	            <li class="arrow iconfont" @click="pickNext(currentYear,currentMonth)">&#xe629;</li>
	        </ul>
	    </div>
	    <div class="contwrap">
	    	<div class="contsignin">
	    		<div class="signinday">
	    			您已签到<i class="signinnum">14</i>天啦！连续签到<i class="continu">7</i>天
		    	</div>
			    <!-- 星期 -->
			    <ul class="weekdays">
			    	<li style="color:#999">日</li>
			        <li>一</li>
			        <li>二</li>
			        <li>三</li>
			        <li>四</li>
			        <li>五</li>
			        <li style="color:#999">六</li>
			       
			    </ul>
			    <!-- 日期 -->
			    <ul class="days">
			        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
			        <li  v-for="dayobject in days">
			            <!--本月-->
			            <!--如果不是本月  改变类名加灰色-->
			
			            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
			
			            <!--如果是本月  还需要判断是不是这一天-->
			            <span v-else>
			          <!--今天  同年同月同日-->
			                <span v-if=" dayobject.isSign===true" class="active">{{ dayobject.day.getDate() }}</span>
			                <span v-else>{{ dayobject.day.getDate() }}</span>
			            </span>
			
			        </li>
			    </ul>
			    <div class="seerulebtn" @click="siginrule">
			    	签到规则
			    </div>
	    	</div>
	    	<div class="continuwrap">
	    		<div class="continutit">
	    			<p class="continul">
	    				<i class="iconfont gift">&#xe842;</i><i class="continutxtl">连续签到有礼</i>
		    		</p>
		    		<p class="continur">
		    			<i class="continutxtr">连续签到即可领取</i>
		    		</p>
	    		</div>
	    		<div class="siginshow">
	    			<div class="siginlist">
	    				<p class="integralnum">+7积分</p>
	    				<img src="@/assets/image/ylqgift.png" alt="" />
	    				<p class="haveday">签到7天</p>
	    			</div>
	    			<div class="siginlist">
	    				<p class="integralnum">+7积分</p>
	    				<img src="@/assets/image/ylqgift.png" alt="" />
	    				<p class="haveday">签到14天</p>
	    			</div>
	    			<div class="siginlist">
	    				<p class="integralnum">+7积分</p>
	    				<img src="@/assets/image/ylqgift.png" alt="" />
	    				<p class="haveday">签到21天</p>
	    			</div>
	    			<img src="@/assets/image/interline.png" alt="" />
	    		</div>
	    	</div>
	    </div>
	    <!--签到规则-->
		<transition name="fade">
			<div class="pop rulecont" v-if="ruluepop">
				<div class="rconts">
					<img src="@/assets/image/interribbon.png" alt="" />
					<i class="rulet">签到规则</i>
					<ul>
						<li><i class="role"></i>每天签到，奖励 7 积分；</li>
						<li><i class="role"></i>连续签到 <i class="ruleday">7</i>天，另外奖励 7 积分；  </li>
						<li><i class="role"></i>连续签到<i class="ruleday">7</i>天，另外奖励 14 积分；</li>
						<li><i class="role"></i>连续签到 <i class="ruleday">7</i>天；另外奖励 21 积分；</li>
						<li><i class="role"></i>每个月的签到，到下一个自然月自动清零；</li>
						<li><i class="role"></i>满168积分后，即可到积分商城兑换礼品。</li>
					</ul>
					<div class="rulebtn" @click="knowrule">
						我知道了
					</div>
				</div>
			</div>
	  	</transition>
	  	<!--签到获取积分-->
		<transition name="fade">
			<div class="pop rulecont" v-if="sucpop">
				<div class="rconts succonts">
					<img src="@/assets/image/interribbon.png" alt="" />
					<i class="rulet">获得奖励</i>
					<p class="sucmsg">恭喜你获得积分 <i class="sucmsginter">+7</i></p>
					<div class="rulebtn knowsucbtn" @click="knowsiginin">
						我知道了
					</div>
				</div>
			</div>
	  	</transition>
	</div>
</template>

<script>
	export default{
		data(){
            return{
	            currentDay:1,
	            currentMonth:1,
	            currentYear:1970,
	            currentWeek:1,
	            days:[],
	            arrDate:[1,2,10,12,,30,31,32],
	            
	            ruluepop:false,
	            sucpop:false,
            }
        },
        created: function() {  //在vue初始化时调用
        	console.log(this.days)
            this.initData(null);
        },
       	methods: {
       		siginrule(){
       			this.ruluepop=!this.ruluepop
       		},
       		knowrule(){
       			this.ruluepop=!this.ruluepop
       		},
			signin(){
				this.sucpop=!this.sucpop
			},
			knowsiginin(){
				this.sucpop=!this.sucpop
			},
            initData: function(cur) {
                var leftcount=0; //存放剩余数量
                var date;
                if (cur) {
                  console.log(cur)
                    date = new Date(cur);
                } else {
                    var now=new Date();
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    
                    dayobject = {day: d,isSign: this.isVerDate(d.getDate())}
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 42 - this.currentWeek-1; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                   
                    dayobject = {day: d,isSign: this.isVerDate(d.getDate())}
                    this.days.push(dayobject);
                }
            },
            isVerDate (v) {
                return this.arrDate.includes(v)
            },
            pickPre: function(year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickNext: function(year, month) {
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(42);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
           

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            },


        },
    }
</script>

<style scoped="scoped">
	.rulebtn{width:6.29rem;height:0.98rem;background:#ff5400;line-height:0.98rem;text-align: center;font-size:0.3rem;color:#fff;margin:0.36rem auto 0.49rem auto;border-radius: 0.2rem;}
	.role{display: inline-block;width:0.12rem;vertical-align:middle;margin-right:0.24rem;height:0.12rem;border-radius: 50%;background: #ff0629;}
	.rulecont ul{background:#fff;border-radius: 0.2rem;padding-top: 0.8rem;}
	.rulecont ul li{font-size:0.28rem;width:6.29rem;margin: auto;border-bottom: 1px dashed #ecf3ff;padding:0.16rem}
	.ruleday{color:#0691ff;}
	.rconts{background:#fff;height:7rem;width:7.11rem;margin:auto;border-radius: 0.2rem;top:0px;bottom: 0px;left:0px;right:0px;position:absolute}
	.succonts{height:4.6rem}
	.rconts>img{width:5.57rem;position:absolute;margin:auto;left:0px;right:0px;top:-1.35rem}
	.rulet{font-size:0.42rem;text-align:center;display:block;color:#ff9600;position:absolute;margin:auto;left:0px;right:0px;top:-0.43rem}
	
	.sucmsg{font-size:0.42rem;text-align:center;color:#333;margin-top:1rem}
	.sucmsginter{color:#ff5400;}
	.knowsucbtn{margin-top:1rem;}

	.siginhead{width:100%;height:4.37rem;position:relative;overflow:hidden;background: url(../../assets/image/intergralin.png) no-repeat;background-size:100%;}
	.siginhead img,.rinfo{vertical-align: middle;display: inline-block;margin:0.4rem 0 0 0.2rem;}
	.rinfo{margin-left:0px;}
	.rinfo{line-height: 1;}
	.siginhead img{width:1.62rem;height:1.62rem;border-radius: 50%;border:6px solid #95cdff}
	.username,.selfintergral{color:#fff}
	.username,.myinter{font-size:0.3rem}
    .selfintergral{font-size:0.26rem;margin-top:0.2rem}
    .myinter{color:#ffd74e}
    .signinbtn{width:2.24rem;height:0.82rem;z-index:1;position:absolute;top:2.4rem;margin:auto;left:0;right:0;border:2px solid #ffbe23;border-radius: 0.25rem;font-size:0.42rem;color:#ff9600;text-align: center;line-height:0.82rem;}
    
    .month{overflow: hidden;margin-top: -1.45rem;z-index: 0;position: relative;text-align: center;}
    .month ul{list-style:none}
    .month span{font-size:0.34rem;color:#fff}
    .month li{display: inline-block;vertical-align: bottom;}
    .arrow{font-size: 0.56rem;}
    .signinday{font-size:0.3rem;text-align: center;height:0.9rem;line-height:0.9rem;background:#fff;margin-top: 0.138rem;}
    .signinday i{color:#0692ff;}  
	.year-month{font-size: 0.56rem;line-height:0.67rem;}
    .weekdays {
        margin: 0;
        padding: 10px 0;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        color: #333;
        justify-content: space-around;
        border-bottom: 1px dashed #ecf3ff;
    }

    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
        font-size:0.3rem;
    }

    .days {
        padding: 0;
        background: #FFFFFF;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 6px;
        padding-top: 6px;
        font-size: 0.3rem;
        color: #000;
    }

    .days li .active {
       
        border-radius:0.3rem;
        background: #00B8EC;
        color: #fff;
        width:0.74rem;
        height:0.5rem;
        line-height: 0.5rem;
        display: inline-block;
    }

    .days li .other-month {
        padding: 5px;
        color: gainsboro;
    }

	.contwrap{width:7.11rem;margin:auto;}
	.continutit{overflow: hidden;}
    .contsignin{border-bottom-left-radius:0.2rem;height:7.5rem;border-bottom-right-radius: 0.2rem;background:#fff}  
    .seerulebtn{width:1.78rem;height:0.57rem;background:#0691ff;font-size:0.28rem;color:#fff;text-align: center;line-height: 0.57rem;border-radius: 0.3rem;margin:0.3rem auto;}
	.continul{font-size:0.28rem;color:#333;float:left}
	.gift{color:#666;padding-right:0.13rem;}
	.continur{font-size:0.24rem;color:#999;float:right}
	
    .continuwrap{overflow: hidden;background:#fff;margin-top:0.2rem;border-radius: 0.2rem;font-size:0;padding:0.3rem;margin-bottom: 0.3rem;}
   	.continutit{padding-bottom: 0.3rem;}
   	.siginshow{position:relative}	
    .siginshow .siginlist{float:left}
    .integralnum{color:#ffa200;font-size:0.26rem}
    .siginlist{width:33.3%;text-align: center;}
    .siginshow>img{width:100%;position:absolute;left:0;top: 0.7rem;z-index:1;}
    .siginlist>img{width:0.77rem;height:0.51rem;position:relative;z-index:2;padding:0.1rem;}
    .haveday{color:#333;font-size:0.26rem}
</style>