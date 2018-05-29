<template>
  <div class="m-head m-head-info">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/mall/home' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title">
          商品详情
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
        <!--<a href="#" @click.prevent="addToFav">-->
        <!--<i class="iconfont" v-show="!fav">&#xe615;</i>-->
        <!--<i class="iconfont" v-show="fav">&#xe613;</i>-->
        <!--</a>-->
      </div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <div v-show="!$loadingRouteData">
    <div class="m-pd f-shadow-bottom">
      <div class="swiper-container">
        <swipe class="my-swipe" :auto="0">
          <swipe-item v-for="image in product.images" track-by="$index">
            <img :src="image" alt="">
          </swipe-item>
        </swipe>
      </div>
      <div class="wrap">
        <h1 class="title">{{product.title|filtproductit}}</h1>
        <p v-if="product.dismode!=1"><span class="price">{{ product.price * sku.quantity | currency '￥' }}</span>
          <!--<span class="origin">￥219</span>-->
          <span class="sales fr">产品单价：￥{{product.price}}</span>
        </p>
        <p v-else><span class="price">{{ product.price * sku.per_day| currency '￥' }}</span>
          <!--<span class="origin">￥219</span>-->
          <span class="sales fr">产品单价：￥{{product.price}}</span>
        </p>
      </div>
      <!--fafesef-->
      <div class="wrap" v-if="product.dismode!=1">
       <span class="spec f-table-cell">总数量</span>
        <!-- 修改单位 -->
        <!--<div class="f-table-cell">
              <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="1"
                       :id="'q' + product.id + '1'"> <label
                :for="'q' + product.id + '1'">1{{product.skus.unit}}</label>
              </span>
        </div>-->
        <div class="f-table-cell">
          <!--<span class="m-check">-->
          <!--<input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="20"-->
          <!--:id="'q' + product.id + '20'"> <label-->
          <!--:for="'q' + product.id + '20'">20瓶</label>-->
          <!--</span>-->
          <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="30"
                       :id="'q' + product.id + '30'"> <label
            :for="'q' + product.id + '30'">30</label>
              </span>
          <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="60"
                       :id="'q' + product.id + '60'"> <label
            :for="'q' + product.id + '60'">60</label>
              </span>
          <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="90"
                       :id="'q' + product.id + '90'"> <label
            :for="'q' + product.id + '90'">90</label>
              </span>
            <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="120"
                       :id="'q' + product.id + '120'"> <label
            :for="'q' + product.id + '120'">120</label>
              </span>
            <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="150"
                       :id="'q' + product.id + '150'"> <label
            :for="'q' + product.id + '150'">150</label>
              </span>
            <span class="m-check">
                <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="180"
                       :id="'q' + product.id + '180'"> <label
            :for="'q' + product.id + '180'">180</label>
              </span>
          <!--<span class="m-check">-->
          <!--<input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="180"-->
          <!--:id="'q' + product.id + '180'"> <label-->
          <!--:for="'q' + product.id + '180'">180瓶</label>-->
          <!--</span>-->
        </div>
      </div>
      <div class="wrap" v-if="product.dismode!=1">
        <span class="qty f-table-cell">单位:</span>
        <div class="f-table-cell">
          <span class="qty f-table-cell">{{product.skus.unit}}</span>
        </div>
      </div>
      <div class="wrap" v-if="product.dismode!=1">
        <span class="qty f-table-cell">每日送</span>
        <div class="f-table-cell">
          <counter :qty.sync="sku.per_day" :min="1" :max="sku.quantity"></counter>
        </div>
      </div>
      <div class="wrap" v-if="product.dismode==1">
        <span class="qty f-table-cell" style="vertical-align: center;">数量</span>
        <div class="f-table-cell">
          <counter :qty.sync="sku.per_day" :min="1" :max="9999"></counter><span class="qty">{{product.skus.unit}}</span>
        </div>
      </div>
      <!--fesfesf-->
      <!--<attr v-for="attr in product.attributes" :attr="attr" :index="$index"></attr>-->
    </div>
    <div class="m-article">
      <h2 class="title"><i class="iconfont">&#xe61c;</i> 商品介绍</h2>
      <div class="content">
        <p
          style="color: #5D5D5D;font-size: 1.4rem;line-height: 150%;margin: 2rem 0rem; padding-left: 1rem; border-left: 3px solid #da6a83;"
          v-show="product.digest">
          {{product.digest}}</p>
        {{{ product.info.detail }}}
      </div>
    </div>
    <div style="padding-bottom: 4rem;"></div>
    <div class="m-fixed-nav">
      <div class="pure-g">
        <div class="pure-u-1-5">
          <a v-link="{ path: '/subscribe/orders/create?cart=show' }" class="u-nav-btn u-btn-black">
            <i class="iconfont">&#xe60f;</i> <span class="badge" v-show="cart.length">{{cart.length}}</span>
          </a>
        </div>
        <div class="pure-u-2-5">
          <a href="#" class="u-nav-btn u-btn-primary"
             style="border: 0 none;" @click.prevent="addToCart">
            <span>加入购物车</span>
          </a>
        </div>
        <div class="pure-u-2-5">
          <a href="#" class="u-nav-btn u-btn-danger" @click.prevent="orderProduct">
            <span>立即购买</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <toast icon="&#xe62a;" v-show="cartProcess">成功加入购物车</toast>
</template>

<script>
  import loader from './../../Share/loader.vue'
  import Toast from './../../Subscribe/Orders/modules/toast.vue'
  import Counter from './../../Subscribe/Orders/modules/counter.vue'
  import {Swipe, SwipeItem} from 'vue-swipe'
  import {newCart, addCart, cleCart, delCart} from './../../../vuex/actions'
  export default{
    name: 'SubsProduct',
    data () {
      return {
        product: {
          img: {
            data: []
          },
          skus: {
            unit: '瓶' // 修改单位
          },
          info: {
            detail: null
          }
        },
        sku: {
          name: null,
          per_day: 1,
          product_sku_id: null,
          quantity: '30',
          unit: '瓶' // 修改单位
        },
        cartProcess: false
      }
    },
    vuex: {
      actions: {
        addCart: addCart,
        newCart: newCart,
        cleCart: cleCart,
        delCart: delCart
      },
      getters: {
        cart: function (state) {
          return state.cart.skus
        }
      }
    },
    components: {
      Swipe,
      SwipeItem,
      loader,
      Counter,
      Toast
    },
    route: {
      activate: function () {
        var skus = window.localStorage.getItem('cart')
        if (!skus) {
          window.localStorage.setItem('cart', JSON.stringify([]))
          skus = '[]'
        }
        this.newCart(JSON.parse(skus))
      },
      data (transition) {
        var self = this
        return this.$http.get('/mall/products/' + transition.to.params.product_id).then(
          function (data) {
            self.product = data.data.data
            self.fav = self.product.favs
            //
            if (self.product.dismode==1) {
              self.sku = {
                name: null,
                per_day: 1,
                product_sku_id: null,
                quantity: 1,
                unit: product.skus.unit
              }
            }
            // 修改单位
//          if (['箱','杯'].indexOf(self.product.skus.unit) > -1) {
//            self.sku = {
//              name: null,
//              per_day: 1,
//              product_sku_id: null,
//              quantity: 1,
//              unit: '瓶'
//            }
//          }
          },
          function (data) {
            window.alert('无法获取产品数据,请刷新重试')
          }
        )
      }
    },   
    methods: {
      addToCart: function () {
        this.delCart(this.sku)
        this.cartProcess = true
        this.sku.name = this.product.skus.name
        this.sku.product_sku_id = this.product.skus.id
        // 修改单位
        this.sku.unit = this.product.skus.unit
        this.addCart(this.sku)
        var self = this
        setTimeout(function () {
          self.cartProcess = false
        }, 1600)
      },
      orderProduct: function () {
        this.cleCart()
        this.sku.name = this.product.skus.name
        this.sku.product_sku_id = this.product.skus.id
        // 修改单位
        this.sku.unit = this.product.skus.unit
        this.addCart(this.sku)
        this.$route.router.go('/subscribe/orders/create?step=2')
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }

  #yt-mall .m-head-info .title .sub {
    color: #000;
    font-size: 1.2rem;
  }

  .swipe, .swipe-items-wrap {
    overflow: hidden;
    position: relative
  }

  .swipe-items-wrap {
    height: 100%
  }

  .swipe-items-wrap > div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none
  }

  .swipe-items-wrap > div.active {
    display: block;
    -webkit-transform: none;
    transform: none
  }

  .swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: .2;
    margin: 0 3px
  }

  .swipe-indicator.active {
    background: #fff
  }

  .my-swipe {
    height: 190px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    background: #fff;
  }

  .my-swipe img {
    display: block;
    height: 160px;
    margin: 0 auto;
  }

  .u-btn-black {
    position: relative;
  }

  .u-btn-black .iconfont {
    -webkit-font-smoothing: antialiased;
  }

  .u-btn-black .badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #C71A40;
    border-radius: 100%;
    line-height: 20px;
    text-align: center;
    font-size: 1.2rem;
    position: absolute;
    left: 50%;
    margin-left: .5rem;
    margin-top: -.5rem;
  }

  .u-nav-btn.u-btn-danger {
    background: #C71A40;
    border-left: 1px solid #FFB5B5;
  }

  #yt-mall .m-article .title {
    padding: 1rem;
  }

  #yt-mall .m-article .title .iconfont {
    color: #C71A40;
  }

  #yt-mall .m-article .content {
    /*padding: 1rem 2rem;*/
  }
  .spec{vertical-align: top !important;width:5rem !important;}
</style>
