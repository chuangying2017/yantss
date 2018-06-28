<template>
  <div class="gc">
  	<div class="u-head">
      <div class="pure-g">
        <div class="pure-u-1-5">
          <a href="javascript:history.back()"><i class="iconfont">&#xe628;</i></a>
        </div>
        <div class="pure-u-3-5">
          <h1>{{comment[0].preorders[0].staff.name}}</h1>
        </div>
        <div class="pure-u-1-5"></div>
      </div>
    </div>
    <div class="allAssess" v-if="cont.comment_type=='HaveUses'||cont.comment_type=='Additional'" v-for="cont in comment">
    	
      <div class="fl">
        <div id="shoplist">
          <p class="all" >
            <div class="star">
		          	<span @click="setStar(1)" :class="{noselct:cont.score<1}"><i class="iconfont" v-if="cont.score>=1">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(2)" :class="{noselct:cont.score<2}"><i class="iconfont" v-if="cont.score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(3)" :class="{noselct:cont.score<3}"><i class="iconfont" v-if="cont.score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(4)" :class="{noselct:cont.score<4}"><i class="iconfont" v-if="cont.score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(5)" :class="{noselct:cont.score<5}"><i class="iconfont" v-if="cont.score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						</div>
          </p>
        </div>
        <div class="breckw">
         	<i v-if="cont.content||cont.content!=''">评价：{{cont.content}}</i>
         	<br />
     			<i v-if="cont.additionComment!=0">追评：{{cont.additionComment}}</i>
        </div>
      </div>
      <div class="fr">
        <div class="date">
          {{cont.preorders[0].created_at.date|formatDate}}
        </div>
      </div>
    </div>
    <div class="pagelist" v-show="!$loadingRouteData&&comment.length!=0">
			<ul>
				<li class="pre" :show="currentPage!=1" @click="pre()">上一页</li>
				<li>
					<i>{{current_page}}</i>
				
				</li>
				<li class="next" :show="totalPages!=currentPage" @click="next()">下一页</li>
			</ul>
			<input type="number" value="1" v-model="inputNum" /><i @click="gourl(inputNum)">Go</i>
		</div> 
    <div  class="msg" v-show="!$loadingRouteData&&!comment.length">没有任何评价</div>
    <div class="hr20"></div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          comment:[],
          page:1,
          totalPages: null,
					inputNum: 1,
					current_page:1,
					
					start_time:null,
					end_time:null,
					staff_id:null,
        }
      },
     filters: {
			formatDate(time) {
			  var time = time.split(" ")[0]
				return time
			}
		},
     route: {
       data: function (transition) {
       	var self=this;
       	self.start_time=transition.to.query.start_time;
       	self.end_time=transition.to.query.end_time;
       	self.staff_id=transition.to.query.staff_id;
         return this.$http.get('/stations/station_comment_see',{start_time:self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:self.page}).then(       	
           function ({data:datas}) {     
         	console.log(datas.data)
             return {
               comment:datas.data,
               totalPages: datas.meta.pagination.total_pages
             }
           },
           function (data) {
             console.log(data)
           }
         )
       }
     },
     methods:{
     	pre() {
				var self = this
				var page
				if(1 >= self.current_page) {
					return
				}	
				page = self.current_page
				return this.$http.get('/stations/station_comment_see',{start_time:self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:page-1}).then(       	
          function(data) {		
						self.allcurrentPage = data.data.meta.pagination.current_page
						self.comment = data.data.data							
					},
					function(data) {
						
					}
				)
			},
			next() {
				var self = this
				var page
				if(self.current_page > self.totalPages) {
					return
				}
				page = self.current_page
				 return this.$http.get('/stations/station_comment_see',{start_time:	self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:page+1}).then(       	
         	function(data) {
						self.current_page = data.data.meta.pagination.current_page
						self.comment = data.data.data						
					},
					function(data) {
					
					}
				)
			},
			gourl(goNum) {
				var self = this
				var page
				if(0 > goNum || goNum > self.totalPages) {
					alert("最多页数" + self.totalPages)
					return
				}
				page = self.current_page
			
				return this.$http.get('/stations/station_comment_see',{start_time:	self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:goNum}).then(       	
					function(data) {
							self.current_page = data.data.meta.pagination.current_page
							self.comment = data.data.data				
					},
					function(data) {
						
					}
				)
			}
     }
    }
</script>

<style scoped>
	i{font-style:normal;}
 @font-face {
  font-family: 'iconfont';  /* project id 686760 */
  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot');
  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.woff') format('woff'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 2.5rem;
    font-style: normal;
  }
.allAssess{
  display: flex;
  justify-content: space-between;
  padding: 1.65rem 1rem;
  color: #999999;
  background: white;
  border-bottom: 1px solid #E4E4E4;
}

.all>input{opacity:0;position:absolute;width:3em;height:3em;margin:0;}
.all>input:nth-of-type(1),
.all>span:nth-of-type(1){display:none;}
.all>span{font-size:3em;color:gold;
  padding: 0rem 0.2rem;
  -webkit-transition:color .2s;
  transition:color .2s;
}
.breckw{overflow-wrap: break-word;}
.all>input:checked~span{color:#666;}
.all>input:checked+span{color:gold;}
  .date{
    font-size: 1.3rem;
    height: 1rem;
    word-wrap:break-word;
    position: absolute;
    margin:auto;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    text-align: center;
  }
  .fr p{
    font-size: 1.5rem;
    margin-top: 1.05rem;
  }
  .fr p a{
    color: #999999;
  }
  .fr{
  	position: relative;
    width: 32%;
  }
  .gc{
    background: #F5F5F5;
     width: 100%;
    height: 100%;
  }
  .hr20{
    background: #F5F5F5;
    height: 1rem;
    width: 100%;
  }
  .iconRight{
    font-size: 1.75rem;
  }
  .fl{width:69%}
  .star span i{color:#ffbb2a}
  .star .noselct i{color:#999}
  /**/
	
	.pagelist {
		text-align: center;
	}
	
	.pagelist ul {
		clear: both;
		display: inline-block;
		vertical-align: middle;
	}
	
	.pagelist li {
		float: left;
		float: left;
		width: 27px;
		border: 1px solid #968f2f;
		height: 27px;
		text-align: center;
		color: #a3a49d;
		line-height: 27px;
		margin-left: 10px;
		border-radius: 3px;
	}
	
	.pagelist .pre,
	.pagelist .next {
		width: 53px;
	}
	
	.pagelist input {
		width: 66px;
		height: 27px;
		display: inline-block;
		vertical-align: middle;
		margin-left: 10px;
		margin-right: 10px;
		outline: none;
		border: 1px solid #968f2f;
		border-radius: 3px;
		text-align: center;
	}
	
	.pagelist i {
		/*display: inline-block;*/
		font-style: normal;
		padding: 7px;
		cursor: pointer;
	}
	.importbtn{
		margin-left:15px
	}
	.pagelist{margin-top:1rem}
	 .msg{text-align: center;margin-top:1rem}
</style>
