<template>
  <div class="gc">
    <div class="allAssess">
      <div class="fl">
        <div id="shoplist">
          <p class="all" >
            <input type="radio" name="b" value="0"  v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
            <input type="radio" name="b" value="1" v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
            <input type="radio" name="b" value="2" v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
            <input type="radio" name="b" value="3" v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
            <input type="radio" name="b" value="4" v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
            <input type="radio" name="b" value="5" v-model="inputdata" disabled/>
            <span><i class="iconfont">&#xe72a;</i></span>
          </p>
        </div>
        <div class="date">
          2018-01-04
        </div>
      </div>
      <div class="fr">
        <p><a v-link="{ path: '/station/subscribes/assessInfo' }">查看详情<i class="iconfont iconRight">&#xe603;</i></a></p>
      </div>
    </div>
    <div class="hr20"></div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          inputdata: '3'
        }
      }
      // route: {
      //   data: function () {
      //     return this.$http.get('/staffs/preorders/' + this.$route.params.order_id).then(
      //       function ({data: {data: order}}) {
      //         return {
      //           order: order
      //         }
      //       },
      //       function (data) {
      //         console.log(data)
      //       }
      //     )
      //   }
      // }
    }
</script>

<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 552280 */
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot');
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 3rem;
    font-style: normal;
  }
.allAssess{
  display: flex;
  justify-content: space-between;
  padding: 1.65rem 1rem;
  color: #999999;
  background: white;
}
.all>input{opacity:0;position:absolute;width:3em;height:3em;margin:0;}
.all>input:nth-of-type(1),
.all>span:nth-of-type(1){display:none;}
.all>span{font-size:3em;color:gold;
  padding: 0rem 0.2rem;
  -webkit-transition:color .2s;
  transition:color .2s;
}
.all>input:checked~span{color:#666;}
.all>input:checked+span{color:gold;}
  .date{
    font-size: 1.3rem;
    padding-left: 0.5rem;
    margin-top: 0.5rem;
  }
  .fr p{
    font-size: 1.5rem;
    margin-top: 1.05rem;
  }
  .fr p a{
    color: #999999;
  }
  .fr{
    width: 30%;
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
</style>
