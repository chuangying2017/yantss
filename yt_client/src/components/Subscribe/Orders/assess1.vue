<template>
  <div class="assess">
    <div v-for="sku in order.skus" class="top">
      <div class="topLeft fl">
        <div><img class="imgC" :src="sku.cover_image"/></div>
        <div class="tlt"><p class="name">{{sku.name}}</p>
        <p class="gc">购买日期：{{order.start_time}}</p></div>
      </div>
      <div class="fr gc num">{{sku.total}}瓶</div>
    </div>
    <div class="clearfix"></div>
    <div class="hr20"></div>
    <div class="content">
      <p><img class="tx" :src="info.avatar" /></p>
      <p class="name">{{order.name}}</p>
      <p class="gc"><span v-if="order.weekday_type === 'all'">周一到周日</span>
        <span v-else>周一到周五</span></p>
      <p class="gc"><span v-if="order.daytime === 1">上午</span>
        <span v-else>下午</span></p>
      <div id="shoplist">
        <p class="all">
          <input type="radio" name="b" value="0"  v-model="form.score" @click="setStar"/>
          <span><i class="iconfont">&#xe72a;</i></span>
          <input type="radio" name="b" value="1" v-model="form.score" @click="setStar('1')"/>
          <span><i class="iconfont">&#xe72a;</i></span>
          <input type="radio" name="b" value="2" v-model="form.score" @click="setStar('2')"/>
          <span><i class="iconfont">&#xe72a;</i></span>
          <input type="radio" name="b" value="3" v-model="form.score" @click="setStar('3')"/>
          <span><i class="iconfont">&#xe72a;</i></span>
          <input type="radio" name="b" value="4" v-model="form.score" @click="setStar('4')"/>
          <span><i class="iconfont">&#xe72a;</i></span>
          <input type="radio" name="b" value="5" v-model="form.score" @click="setStar('5')"/>
          <span><i class="iconfont">&#xe72a;</i></span>
        </p>
      </div>
      <textarea class="assessCon" rows="8" placeholder="亲，送奶工服务态度如何，送奶时间准确吗?对送奶服务还满意吗？" v-model="form.content">{{form.content}}</textarea>
      <div id="num5" class="numbers">
        <button class="btn" @click="setBtn('态度好')">态度好</button>
        <button class="btn" @click="setBtn('服务棒')">服务棒</button>
        <button class="btn" @click="setBtn('准时送达')">准时送达</button>
        <button class="btn" @click="setBtn('产品新鲜')">产品新鲜</button>
      </div>
      <div id="num4" class="numbers">
        <button class="btn" @click="setBtn('奶箱不卫生')">奶箱不卫生</button>
        <button class="btn" @click="setBtn('送错口味')">送错口味</button>
        <button class="btn" @click="setBtn('送奶不及时')">送奶不及时</button>
        <button class="btn" @click="setBtn('无提前打电话沟通')">无提前打电话沟通</button>
      </div>
      <div id="num3" class="numbers">
        <button class="btn" @click="setBtn('服务态度差')">服务态度差</button>
        <button class="btn" @click="setBtn('安装奶箱不及时')">安装奶箱不及时</button>
        <button class="btn" @click="setBtn('牛奶随意乱放')">牛奶随意乱放</button>
        <button class="btn" @click="setBtn('牛奶无冷链配送')">牛奶无冷链配送</button>
      </div>
      <div id="num2" class="numbers">
        <button class="btn" @click="setBtn('未按要求瓶数配送')">未按要求瓶数配送</button>
        <button class="btn" @click="setBtn('未按时配送')">未按时配送</button>
        <button class="btn" @click="setBtn('服务态度恶劣')">服务态度恶劣</button>
        <button class="btn" @click="setBtn('未装奶箱')">未装奶箱</button>
      </div>
      <div id="num1" class="numbers">
        <button class="btn" @click="setBtn('牛奶变质')">牛奶变质</button>
        <button class="btn" @click="setBtn('拒绝配送')">拒绝配送</button>
        <button class="btn" @click="setBtn('配送瓶数错误')">配送瓶数错误</button>
        <button class="btn" @click="setBtn('未按订单配送')">未按订单配送</button>
        <button class="btn" @click="setBtn('服务态度恶劣')">服务态度恶劣</button>
        <button class="btn" @click="setBtn('投诉反馈不处理')">投诉反馈不处理</button>
      </div>
      <div class="clearfix"></div>
      <!--<p class="subP" id="subP"><a v-link="{ path: '/subscribe/orders/assessSuccess' }"><input type="button" value="提交" class="subBtn" @click="saveSubmit"/></a></p>-->
      <p class="subP" id="subP"><a><input type="button" value="提交" class="subBtn" @click="saveSubmit"/></a></p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        order: [],
        form: {
          score: 5,
          content: '',
          commentable_id: this.$route.params.order_no,
          user_id: '',
          order_no: ''
        }
      }
    },
    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/subscribe/preorders/' + this.$route.params.order_no),
          this.$http.get('/users/info')
        ]).then(function ([preorder, info]) {
          return {
            order: preorder.data.data,
            info: info.data.data
            // currentPage: data.data.meta.pagination.current_page,
            // totalPages: data.data.meta.pagination.total_pages
          }
        })
      }
    },
    methods: {
      setBtn (display) {
        if (this.form.content === '') {
          this.form.content += display
        } else {
          if (this.form.content.indexOf(display) !== -1) {
            return
          }
          this.form.content += ',' + display
        }
      },

      setStar (num) {
        if (num === '5') {
          document.getElementById('num5').style.display = 'block'
          document.getElementById('num1').style.display = 'none'
          document.getElementById('num2').style.display = 'none'
          document.getElementById('num3').style.display = 'none'
          document.getElementById('num4').style.display = 'none'
        } else if (num === '4') {
          document.getElementById('num4').style.display = 'block'
          document.getElementById('num1').style.display = 'none'
          document.getElementById('num2').style.display = 'none'
          document.getElementById('num3').style.display = 'none'
          document.getElementById('num5').style.display = 'none'
        } else if (num === '3') {
          document.getElementById('num3').style.display = 'block'
          document.getElementById('num1').style.display = 'none'
          document.getElementById('num2').style.display = 'none'
          document.getElementById('num4').style.display = 'none'
          document.getElementById('num5').style.display = 'none'
        } else if (num === '2') {
          document.getElementById('num2').style.display = 'block'
          document.getElementById('num1').style.display = 'none'
          document.getElementById('num3').style.display = 'none'
          document.getElementById('num4').style.display = 'none'
          document.getElementById('num5').style.display = 'none'
        } else if (num === '1') {
          document.getElementById('num1').style.display = 'block'
          document.getElementById('num2').style.display = 'none'
          document.getElementById('num3').style.display = 'none'
          document.getElementById('num4').style.display = 'none'
          document.getElementById('num5').style.display = 'none'
        }
      },
      saveSubmit: function () {
        this.form.user_id = this.order.user.id
        this.form.order_no = this.order.order_no
        var self = this
        self.$http.post('/subscribe/assessSuccess2', self.form).then(
          function (result) {
            console.log(result.data)
            // 成功添加
            window.alert('提交成功!')
            self.$route.router.go('/subscribe/assessSuccess')
          },
          function (data) {
            // 添加失败
            window.alert('添加失败，请重试')
          }
        )
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
    font-size: 3.5rem;
    font-style: normal;
  }
.fl{
  float: left;

}
.fr{
  float: right;
}
.imgC{
  width: 6rem;
  height: 6rem;
  border: 1px solid #dddddd;
  border-radius: 10px;
}
.topLeft{
  display: flex;
}
.top{
  margin: 1.5rem;
  padding-bottom: 6rem;
}
.tlt{
  margin-top: 1.2rem;
  line-height: 1.85rem;
  margin-left: 1rem;
}
.name{
  font-size: 1.5rem;
}
  .gc{
    color: #A1A1A1;
  }
  .num{
    margin-top: 1.5rem;
  }
  .tx{
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 1px solid #dddddd;
  }
.content p{
  text-align: center;
  line-height: 2rem;
}
  .content{
    margin-top: 2rem;
  }
  .hr20{
    background: #F5F5F5;
    height: 1rem;
    width: 100%;
  }
.all>input{opacity:0;position:absolute;width:3.5em;height:2.5em;margin:0;}
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
    margin-top: 2rem;
  }
  .assessCon{
    width: 90%;
    border: 1px solid #E9E9E9;
    border-radius: 0.5rem;
    outline: none;
    padding: 1rem;
    font-size: 1.4rem;
    color: #333;
    margin: 1rem 1.5rem;
  }
  .btn{
    width: 28%;
    height: 4rem;
    border: 1px solid #dddddd;
    border-radius: 10px;
    font-size: 1.2rem;
    color: #999999;
  }
  .numbers button{
    float: left;
    margin: 0.57rem;
  }
.numbers{
  padding-left: 1.27rem;
  display: none;
}
.numbers button:focus{
  border: 1px solid gold;
  color: gold;
}
  .subBtn{
    background: #0DBA00;
    height: 3.5rem;
    width: 90%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1.4rem;
  }
  .subP {
    text-align: center;
    margin: 2rem 0rem;
  }
  #num5{
    display: block;
  }
</style>
