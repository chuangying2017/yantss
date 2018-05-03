<template>
  <div class="gc">
    <div class="top">
      <p><img class="imgC" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587" /></p>
      <p class="name">彭晓某</p>
    </div>
    <div class="content">
      <p class="service">服务评价</p>
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
      <p class="starScore">
        <span>优秀</span>
      </p>
    </div>
    <div class="hr20"></div>
    <div class="assessInfo">
      <p class="service">评价内容</p>
      <hr/>
      <textarea rows="7" v-model="assessContent" class="sinfo">111111111</textarea>
    </div>
    <div class="allAssess">
      <p class="allAssessTitle" @click="back">查看所有评价&gt;&gt;</p>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          inputdata: '3'
        }
      },
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
      // },
      methods: {
        back: function () {
          window.history.go(-1)
        }
      }
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
    font-size: 3.6rem;
    font-style: normal;
  }
  .gc{
    width: 100%;
    height: 100%;
    background: white;
  }
  *{
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"SimSun";
  }
  p{
    text-align: center;
  }
  .top{
    border-bottom: 1px solid #F5F5F5;
    padding-top: 1.5rem;
  }
  .imgC{
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 1px solid #F5F5F5;
  }
.name{
  margin-top: 1rem;
  font-size: 1.55rem;
  margin-bottom: 2rem;
}
  .all>input{opacity:0;position:absolute;width:3.5em;height:3.5em;margin:0;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{font-size:3.5em;color:gold;
    padding: 0rem 0.5rem;
    -webkit-transition:color .2s;
    transition:color .2s;
  }
  .all>input:checked~span{color:#666;}
  .all>input:checked+span{color:gold;}
  #shoplist{
    margin-top: 1rem;
  }
  .starScore{
    margin: 1rem 0rem 2rem 0rem;
    font-size: 1.55rem;
    color: #333;
  }
  .hr20{
    background: #F5F5F5;
    height: 1rem;
    width: 100%;
  }
  .service{
    font-size: 1.5rem;
    color: #999999;
    margin-bottom: 0.5rem;
  }
  .assessInfo{
    margin-top: 1.5rem;
  }
  hr{
    border-top: #F5F5F5;
  }
  .sinfo{
    font-size: 1.5rem;
    text-align: left;
    width: 90%;
    border: none;
    outline: none;
    color: #333;
    margin: 0rem 1.5rem;
  }
  .allAssess{
    background: #F5F5F5;
    width: 100%;
  }
  .allAssessTitle{
    font-size: 1.5rem;
    padding: 2.5rem 0rem 1.5rem 0rem;
    color: #999999;
  }
  .content{
    margin-top: 1.5rem;
  }
</style>
