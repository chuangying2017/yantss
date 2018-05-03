<template>
  <div class="u-tab">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <a @click.prevent="viewType = 'client'"
           :class="[ viewType === 'client' ? 'active' : '' ]">
          <i class="iconfont">&#xe64e;</i> 客户列表
        </a>
      </div>
      <div class="pure-u-1-2">
        <a @click.prevent="viewType = 'assess'"
           :class="[ viewType === 'assess' ? 'active' : '' ]">
          <i class="iconfont">&#xe65f;</i> 评价列表
        </a>
      </div>
    </div>
  </div>
    <div v-show="viewType === 'client'">
      <loader v-show="$loadingRouteData"></loader>
      <empty v-show="!$loadingRouteData && !preorders.length">暂时没有任何客户</empty>
      <div class="u-table" v-show="!$loadingRouteData && preorders.length">
        <div>
          <ul>
            <li v-for="preorder in preorders">
              <!--<a v-link="{ path: '/deliver/orders/' + preorder.id }">-->
              <!--{{preorder.name}} <i class="iconfont">&#xe603;</i>-->
              <!--</a>-->
              <div class="user-card">
                <p class="info clearfix">
                  <span class="fl">{{preorder.name}}</span>
                  <span class="fr"><a :href="'tel:' + preorder.phone"><i
                    class="iconfont">&#xe667;</i> {{preorder.phone}}</a></span>
                </p>
                <p v-for="sku in preorder.skus" class="sku clearfix">
              <span class="fl">
              <i class="iconfont">&#xe666;</i> {{sku.name}}</span>
                  <span class="fr">共{{sku.total}}瓶/剩余{{sku.remain}}瓶</span>
                </p>
                <p class="address">
                  <i class="iconfont">&#xe64c;</i> 地址: {{preorder.address}}
                </p>
                <p class="peek clearfix">
                  <a v-link="{ path: '/deliver/orders/' + preorder.id }" class="fr"><i class="iconfont">&#xe65c;</i>
                    查看详情</a>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <button class="ios-btn ios-btn-success" @click.prevent="loadmore" v-show="currentPage !== totalPages"
                :disabled="processing">
          <span v-show="!processing">加载更多</span>
          <span v-show="processing">正在处理中...</span>
        </button>
      </div>
    </div>
  <div v-show="viewType === 'assess'">
    <div class="gc">
      <div class="allAssess">
        <div class="fl">
          <div id="shoplist">
            <p class="all" >
              <input type="radio" name="b" value="0"  v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
              <input type="radio" name="b" value="1" v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
              <input type="radio" name="b" value="2" v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
              <input type="radio" name="b" value="3" v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
              <input type="radio" name="b" value="4" v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
              <input type="radio" name="b" value="5" v-model="inputdata" disabled/>
              <span><i class="iconfonts">&#xe72a;</i></span>
            </p>
          </div>
          <div class="date">
            2018-01-04
          </div>
        </div>
        <div class="fr">
          <p><a v-link="{ path: '/deliver/assessInfo' }">查看详情<i class="iconfont iconRight">&#xe603;</i></a></p>
        </div>
      </div>
      <div class="hr20"></div>
    </div>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'
  import Empty from './../Share/empty.vue'

  export default {
    name: 'orders',

    data () {
      return {
        inputdata: '3',
        viewType: 'client',
        preorders: [],
        currentPage: null,
        totalPages: null,
        processing: false
      }
    },
    components: {
      Loader,
      Empty
    },
    route: {
      data: function () {
        return this.$http.get('/staffs/preorders').then(
          function (data) {
            return {
              preorders: data.data.data,
              currentPage: data.data.meta.pagination.current_page,
              totalPages: data.data.meta.pagination.total_pages
            }
          },
          function (data) {
            console.log(data)
          }
        )
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
      loadmore: function () {
        var self = this
        self.processing = true
        this.$http.get('/staffs/preorders?page=' + (this.currentPage + 1)).then(
          function (data) {
            self.preorders = self.preorders.concat(data.data.data)
            self.currentPage = data.data.meta.pagination.current_page
            self.processing = false
          },
          function (data) {
            self.processing = false
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 552280 */
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot');
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.svg#iconfont') format('svg');
  }
  .iconfonts {
    font-family: "iconfont";
    font-size: 3rem;
    font-style: normal;
  }
  .iconfont {
    -webkit-font-smoothing: antialiased;
  }
  .qrcode-wrap img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  .info {
    text-align: center;
    font-size: 1.2rem;
    color: #bbb;
  }

  .ios-btn {
    display: block;
    -webkit-appearance: none;
    border-right: 0 none;
    border-left: 0 none;
    outline: none;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }

  .ios-btn.ios-btn-link {
    background: none;
    border: 0 none;
  }

  .ios-btn + .ios-btn {
    margin-top: -1px;
  }

  .ios-btn.ios-btn-danger {
    color: red;
    margin-top: 20px;
    text-decoration: underline;
  }

  .ios-btn:disabled {
    color: #bbb;
  }

  .empty-wrap .iconfont {
    font-size: 50px;
  }

  .empty-wrap h1 {
    margin-top: 20px;
    font-size: 1.4rem;
  }
  .user-list a {
    font-size: 1.4rem;
    padding: 1rem;
    color: #616161;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    display: block;
    margin-bottom: -1px;
  }

  .user-list a .iconfont {
    float: right;
    color: #25AD25;
  }

  .ios-btn {
    display: block;
    -webkit-appearance: none;
    border-right: 0 none;
    border-left: 0 none;
    outline: none;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }

  .ios-btn:disabled {
    color: #bbb;
  }

  .user-card {
    padding: 1rem;
    font-size: 1.4rem;
    margin: 1rem;
    background: #fff;
    border-radius: .3rem;
    border: 1px solid #ddd;
  }

  .user-card p {
    padding: .4rem 0;
    border-bottom: 1px dotted #ECECEC;
  }

  .user-card p:last-child {
    border-bottom: 0 none;
  }

  .user-card .info {
    color: #000;
    font-size: 1.4rem;
  }

  .user-card a {
    color: #25AD25;
  }

  .user-card .peek {
    font-size: 1.2rem;
  }

  .user-card .peek .iconfont {
    font-size: 1.4rem;
  }

  .user-card .sku, .user-card .address {
    color: #8C8C8C;
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

