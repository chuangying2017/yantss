<template>
  <div class="gc">
  	<div class="u-head">
      <div class="pure-g">
        <div class="pure-u-1-5">
          <a href="javascript:history.back()"><i class="iconfont">&#xe628;</i></a>
        </div>
        <div class="pure-u-3-5">
          <h1>{{comment[0].staff.name}}</h1>
        </div>
        <div class="pure-u-1-5"></div>
      </div>
    </div>
    <div class="allAssess" v-for="cont in comment">
      <div class="fl">
        <div id="shoplist">
          <p class="all" >
            <div class="star">
		          	<span @click="setStar(1)" :class="{noselct:cont.comments[0].score<1}"><i class="iconfont" v-if="cont.comments[0].score>=1">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(2)" :class="{noselct:cont.comments[0].score<2}"><i class="iconfont" v-if="cont.comments[0].score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(3)" :class="{noselct:cont.comments[0].score<3}"><i class="iconfont" v-if="cont.comments[0].score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(4)" :class="{noselct:cont.comments[0].score<4}"><i class="iconfont" v-if="cont.comments[0].score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(5)" :class="{noselct:cont.comments[0].score<5}"><i class="iconfont" v-if="cont.comments[0].score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						</div>
          </p>
        </div>
        <div class="breckw">
         {{cont.comments[0].content}}
        </div>
      </div>
      <div class="fr">
        <div class="date">
          {{cont.comments[0].created_at|formatDate}}
        </div>
      </div>
    </div>
      
     
    <div class="hr20"></div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          comment: []
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
       	console.log(transition)
         return this.$http.put('/stations/all/staff/comment/'+ transition.to.params.staffid).then(
           function ({data: {preorders:comment}}) {       
             return {
               comment
             }
           },
           function (data) {
             console.log(data)
           }
         )
       }
     }
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
</style>
