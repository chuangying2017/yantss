<template>
  <div class="m-head m-head-info">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/mall/home' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title">
          产品列表
        </h1>
      </div>
    </div>
  </div>
  <swipe class="my-swipe">
    <!--<swipe-item>-->
    <!--<img src="http://o7tep4eu1.bkt.clouddn.com/banner1.png" alt="">-->
    <!--</swipe-item>-->
    <swipe-item>
      <img class="imgBanner" :src="cat.big_image" alt="">
    </swipe-item>
  </swipe>
  <div class="m-nav">
    <div class="pure-g">
      <div class="pure-u-1-1">
        <a><i class="iconfont">&#xe660;</i> {{cat.name}}</a>
      </div>
      <!--<div class="pure-u-1-2">-->
      <!--<a href="#" :class="{ 's-active': productView !== 'mall' }" @click.prevent="productView = 'subs'">优鲜达</a>-->
      <!--</div>-->
    </div>
  </div>
  <ul class="m-list-links">
    <li v-for="product in products | orderBy 'priority'">
      <a v-link="{ path: '/mall/subsproducts/' + product.id }">
        <div class="m-pd-item">
          <div class="pd-item-left">
            <img :src="product.cover_image" height="350" width="350" alt="" class="thumbnail">
          </div>
          <div class="pd-item-right">
            <h2 class="title">{{product.title|filtproductit}}</h2>
            <p class="clearfix">
              <span class="price">￥{{ product.price }}</span>
              <span class="cart fr">+ 订购</span>
            </p>
            <!--<p class="info">产品销量：{{ product.sales }}</p>-->
          </div>
        </div>
      </a>
    </li>
  </ul>
  <div style="padding-bottom: 60px;"></div>
  <nav-foot></nav-foot>
</template>

<script>
  import NavFoot from './../Shared/navfoot.vue'
  import {Swipe, SwipeItem} from 'vue-swipe'

  export default{
    name: 'Products',

    components: {
      NavFoot,
      Swipe,
      SwipeItem
    },

    data () {
      return {
        products: [],
        cat: {},
        //urlMsh:null //"http://yt.l43.cn/images/"+this.$route.query.cat+".jpg"
      }
    },
    route: {
      data (transition) {
        var self = this
        return Promise.all([
          self.$http.get('/mall/products?cat=' + this.$route.query.cat),
          self.$http.get('/mall/cats/' + this.$route.query.cat)
        ]).then(function ([
                            {data: {data: products}},
                            {data: {data: cat}}
                          ]) {
          return {
            products: products,
            cat: cat
          }
        }, function () {
          window.alert('获取数据失败,请重新获取')
        })
      }
    }
  }
</script>

<style scoped>
  .imgBanner{
    width: 100%;
    height: 100%;
  }
  fieldset, img{
    border:0
  }
  #yt-mall .m-head-info .title {
    color: #000;
  }

  #yt-mall .m-list-links {
    margin-top: 0;
  }

  #yt-mall .m-pd-item .thumbnail {
    width: 4rem;
    height: auto;
  }

  #yt-mall .pd-item-right {
    width: 100%;
  }

  #yt-mall .m-pd-item .cart {
    display: inline-block;
    margin-top: 1rem;
    padding: .3rem 1rem;
    background: #fd733e;
    color: #fff;
    border-radius: 3px;
    font-size: 1.2rem;
  }
</style>


