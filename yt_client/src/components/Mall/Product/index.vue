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
        <a href="#" @click.prevent="addToFav">
          <i class="iconfont" v-show="!fav">&#xe615;</i>
          <i class="iconfont" v-show="fav">&#xe613;</i>
        </a>
      </div>
    </div>
  </div>
  <div class="m-pd f-shadow-bottom">
    <div class="swiper-container">
      <swipe class="my-swipe" :auto="0">
        <swipe-item v-for="image in product.images" track-by="$index">
          <img :src="image" alt="">
        </swipe-item>
      </swipe>
    </div>
    <div class="wrap">
      <h1 class="title" v-html="product.title"></h1>
      <p><span class="price">￥{{ product.price }}</span>
        <!--<span class="origin">￥219</span>-->
        <span class="sales fr">产品销量：{{ product.sales }}</span>
      </p>
    </div>
    <!--<attr v-for="attr in product.attributes" :attr="attr" :index="$index"></attr>-->
    <div class="wrap">
      <span class="qty f-table-cell">数量</span>
      <div class="f-table-cell">
        <counter :qty.sync="qty" :min="1" :max="9999"></counter>
      </div>
    </div>
  </div>
  <div class="m-article">
    <h2 class="title">商品介绍</h2>
    <div class="content">
      <p>
        <img src="http://o7tep4eu1.bkt.clouddn.com/detail/4.jpg" alt="">
        <img src="http://o7tep4eu1.bkt.clouddn.com/detail/5.jpg" alt="">
        <img src="http://o7tep4eu1.bkt.clouddn.com/detail/1.jpg" alt="">
        <img src="http://o7tep4eu1.bkt.clouddn.com/detail/2.jpg" alt="">
        <img src="http://o7tep4eu1.bkt.clouddn.com/detail/3.jpg" alt="">
      </p>
      <!--{{{ product.info.detail }}}-->
    </div>
  </div>
  <div class="m-fixed-nav">
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/mall/cart' }" class="u-nav-btn">
          <i class="iconfont">&#xe62f;</i>
        </a>
      </div>
      <div class="pure-u-4-5">
        <button class="u-nav-btn u-btn-primary" @click.prevent="addToCart" :disabled="cartProcess">
          <span v-show="!cartProcess">加入购物车</span>
          <span v-show="cartProcess">正在处理中...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore'
  import {Swipe, SwipeItem} from 'vue-swipe'
  import Attr from './attr.vue'
  import Counter from './../Shared/counter.vue'

  export default{
    name: 'Product',

    data () {
      return {
        fav: 0,
        qty: 1,
        selectedSku: {},
        selectedValueIds: [],
        cartProcess: false,
        product: {
          img: {
            data: []
          },
          info: {
            detail: null
          }
        }
      }
    },

    components: {
      Swipe,
      SwipeItem,
      Attr,
      Counter
    },

    route: {
      data (transition) {
        var self = this
        return this.$http.get('/mall/products/' + transition.to.params.product_id).then(
          function (data) {
            self.product = data.data.data
            self.fav = self.product.favs
          },
          function (data) {
            window.alert('无法获取产品数据,请刷新重试')
          }
        )
      }
    },

    methods: {
      addToCart: function () {
//        if (!this.selectedSku.id) {
//          window.alert('请选择商品')
//          return false
//        }
        this.cartProcess = true
        this.$http.post('/mall/cart', {
          product_sku_id: this.product.skus.id,
          quantity: this.qty
        }).then(
          function (data) {
            this.cartProcess = false
            window.alert('成功添加入购物车')
          },
          function (data) {
            window.alert('添加购物车失败')
          }
        )
      },
      addToFav: function () {
        var self = this
        this.$http.put('/mall/products/' + this.$route.params.product_id + '/fav').then(
          function (data) {
            self.fav = !self.fav
          },
          function (data) {
            window.alert('操作失败,请重新尝试')
          }
        )
      }
    },

    events: {
      selectedValue: function (valueId, index) {
        var self = this
        this.selectedValueIds[index] = valueId
        _.map(this.product.skus.data, function (val, key) {
          var attributeValueIds = _.map(val.attribute_value_ids, function (val) {
            return parseInt(val)
          })
          attributeValueIds = attributeValueIds.sort()
          var selectedValueIds = _.map(self.selectedValueIds, function (val) {
            return parseInt(val)
          })
          selectedValueIds = selectedValueIds.sort()
          if (_.isEqual(attributeValueIds, selectedValueIds)) {
            self.selectedSku = val
          }
        })
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
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
</style>
