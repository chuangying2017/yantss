<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
      </div>
      <div class="pure-u-3-5">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          我的奶卡
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
      </div>
    </div>
  </div>
  <!--<loader v-show="$loadingRouteData"></loader>-->
  <ul>
    <li class="m-milkcard">
      <h2 class="title clearfix">
        <img src="http://o7tep4eu1.bkt.clouddn.com/logo.png" alt="" width="100">
        <span>11111111111111111</span>
      </h2>
      <div class="body">
        <div class="milk-list">
          <div class="pure-g">
            <div class="pure-u-1-6">
              <div class="img-wrap">
                <img src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587" alt="" width="50" height="50">
              </div>
            </div>
            <div class="pure-u-1-2">
              <p>瓶装乳酸奶</p>
            </div>
            <div class="pure-u-1-3">
              <p class="tr">共 <span class="highlight">30</span> 瓶</p>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-6">
            </div>
            <div class="pure-u-1-2">
              <p>预计配送开始时间</p>
            </div>
            <div class="pure-u-1-3">
              <p class="tr"><span class="highlight">2018-01-30</span></p>
            </div>
          </div>
        </div>
        <div class="milk-status">
          <div class="pure-g">
            <div class="pure-u-1-2">
              <p>
                <span>状态:</span>
                <span>正常派送</span>
              </p>
            </div>
            <div class="pure-u-1-2">
              <p class="tr">
                <a v-link="{ path: '/subscribe/orders/' + order.id }">查看详情</a>
              </p>
            </div>
          </div>
          <div class="pure-g">
            <p class="tr">
              <a class="wc" v-link="{ path: '/subscribe/orders/assess' }">评价</a>
            </p>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <!--<empty v-show="!$loadingRouteData && !orders.length">暂时没有订单</empty>-->
  <!--<div style="margin: 1rem">-->
    <!--<button class="add-link" @click.prevent="loadMore" :disabled="loadProcess"-->
            <!--v-show="currentPage !== totalPages && orders.length">-->
      <!--<span v-show="!loadProcess">加载更多</span>-->
      <!--<span v-show="loadProcess">正在加载中...</span>-->
    <!--</button>-->
  <!--</div>-->
  <div class="notice">
    <h1>温馨提示:</h1>
    <ul>
      <li>瓶装产品空瓶均需回收，损坏或遗失按1元/瓶赔偿</li>
      <li>送奶服务部为公司合作配送方，商城订单将由服务部承接和完成</li>
    </ul>
  </div>
  <p class="item-info">* 如订单24小时内未受理,请致电: <a class="phone-link" href="tel:400-888-1956">400-888-1956</a>
  </p>
  <div style="padding-bottom: 6rem;"></div>
  <nav-foot></nav-foot>
</template>

<script>
  import NavFoot from './../../Mall/Shared/navfoot.vue'
  import Empty from './../../Share/empty.vue'
  import Loader from './../../Share/loader.vue'
  //  import Trackr from './modules/trackr.vue'

  export default {
    name: 'List',

    data: function () {
      return {
        orders: [],
        loadProcess: false,
        currentPage: null,
        totalPages: null,
        trackrOrder: {},
        trackrShow: false
      }
    },

//    vuex: {
//      getters: {
//        getUser: function (state) {
//          return state.user.info
//        }
//      }
//    },

    components: {
      NavFoot,
      Empty,
      Loader
//      Trackr
    },

    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/subscribe/preorders')
        ]).then(function ([
          data
        ]) {
          return {
            orders: data.data.data,
            currentPage: data.data.meta.pagination.current_page,
            totalPages: data.data.meta.pagination.total_pages
          }
        })
      }
    },

    ready: function () {
//      if (this.$route.query.trackr === 'true') {
//        if (window.localStorage.getItem('trackOrder')) {
//          this.trackrOrder = JSON.parse(window.localStorage.getItem('trackOrder'))
//          this.trackrShow = true
//        }
//      }
    },

    methods: {
      loadMore: function () {
        var self = this
        self.loadProcess = true
        this.$http.get('/subscribe/preorders?page=' + (this.currentPage + 1)).then(
          function (data) {
            self.orders = self.orders.concat(data.data.data)
            self.currentPage = data.data.meta.pagination.current_page
            self.loadProcess = false
          },
          function (data) {
            self.loadProcess = false
            console.log(data)
          }
        )
      }
    },

    events: {
//      'tracked': function () {
//        this.trackrShow = false
//        window.localStorage.removeItem('trackOrder')
//      }
    }
  }
</script>

<style scoped>
  .m-milkcard {
    margin: 2rem 1rem 3rem;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    border-top: 5px solid #C71A40;
  }

  .m-milkcard .title {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: .5rem 1rem;
  }

  .m-milkcard .title span {
    color: #000;
    float: right;
    font-size: 1.4rem;
  }

  .m-milkcard .body {
    padding: 1rem;
  }

  .milk-list {
    display: table;
    width: 100%;
  }

  .milk-list .img-wrap {
    display: table-cell;
    vertical-align: middle;
    width: 20%;
  }

  .milk-list .img-wrap img {
    width: 30px;
    height: auto;
    border-radius: 3px;
    vertical-align: middle;
  }

  .milk-list .pure-g {
    padding: .5rem 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .milk-list p {
    font-size: 1.4rem;
  }

  .milk-status {
    padding: 1rem 0 .5rem 0;
    font-size: 1.4rem;
    color: #3bab5e;
  }

  .milk-status a {
    color: #3bab5e;
    text-decoration: underline;
  }

  .milk-list .highlight {
    color: #3bab5e;
  }

  .item-info {
    color: #bbb;
    font-size: 1.2rem;
    text-align: center;
  }

  .add-link {
    -webkit-appearance: none;
    display: block;
    padding: 1rem;
    border: 0 none;
    color: #C71A40;
    text-align: center;
    font-size: 1.6rem;
    background: transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    outline: none;
  }

  .add-link:disabled {
    color: #ddd;
  }

  .notice {
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem;
    color: #fff;
    background: #bfbfbf;
  }

  .notice ul {
    list-style-type: circle;
    padding-left: 2rem;
  }

  .wc{
    color: white!important;
  }
</style>
