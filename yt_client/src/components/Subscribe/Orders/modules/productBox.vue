<template>
  <div class="product-box">
    <div class="product-content">
      <div class="product-detail">
        <div class="m-pd">
          <span class="closeBox"><i class="iconfont" @click.prevent="closeBox">&#xe634;</i></span>
          <div class="cover">
            <img :src="product.images[0]" alt="">
          </div>
          <div class="wrap">
        <h1 class="title">{{ product.title }} </h1>
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
          <span class="qty f-table-cell">{{product.unit}}</span>
        </div>
      </div>
      <div class="wrap" v-if="product.dismode!=1">
        <span class="qty f-table-cell">每日送</span>
        <div class="f-table-cell">
          <counter :qty.sync="sku.per_day" :min="1" :max="9999"></counter>
        </div>
      </div>
      <div class="wrap" v-if="product.dismode==1">
        <span class="qty f-table-cell" style="vertical-align: center;">数量</span>
        <div class="f-table-cell">
          <counter :qty.sync="sku.per_day" :min="1" :max="9999"></counter><span class="qty">{{product.unit}}</span>
        </div>
      </div>
          <button @click.prevent="addToCart" class="u-nav-btn u-btn-primary mt10">添加到购物车</button>
          <div class="m-article">
            <h2 class="title"><i class="iconfont">&#xe61c;</i> 商品介绍</h2>
            <div class="content">
              <p
                style="color: #5D5D5D;font-size: 1.4rem;line-height: 150%;margin: 1rem 0rem; padding-left: 1rem; border-left: 3px solid #da6a83;"
                v-show="product.digest">
                {{product.digest}}</p>
              {{{product.detail}}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Counter from './counter.vue'
  export default {
    name: 'ProductBox',
    data: function () {
      return {
        sku: {
          quantity: 30,
          per_day: 1
        },
        free: 3
      }
    },
    components: {
      Counter
    },
    props: ['product'],
    methods: {
      addToCart: function () {
        this.sku.product_sku_id = this.product.id
        this.sku.name = this.product.name
        this.sku.unit = this.product.unit
        this.$dispatch('addSku', this.sku)
      },
      closeBox: function () {
        this.$dispatch('closeBox')
      }
    },
    // 修改单位
    events: {
      checkUnit: function (unit) {
        console.log(unit)
        if (['箱', '杯'].indexOf(unit) > -1) {
          this.sku = {
            quantity: 1,
            per_day: 1
          }
        } else {
          this.sku = {
            quantity: 30,
            per_day: 1
          }
        }
      }
    }
  }
</script>

<style scoped>
  .product-box {
    position: fixed;
    display: table;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 10000;
  }

  #yt-mall .m-pd {
    background: #eee;
  }

  #yt-mall .m-pd .wrap {
    background: #fff;
  }
.f-table-cell{vertical-align: top !important;}
.spec{width:62px !important;}
  .product-box .product-content {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }

  .product-box .product-content .product-detail {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }

  .product-detail img {
    width: 80%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  #yt-mall .m-pd .wrap {
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
  }

  #yt-mall .m-pd .title {
    margin-bottom: .5rem;
    font-size: 1.4rem;
    font-weight: bold;
  }

  #yt-mall .m-pd {
    margin: 0;
  }

  #yt-mall .u-nav-btn.u-btn-primary {
    border: 0 none;
    /*position: absolute;*/
    /*bottom: 0;*/
  }

  .closeBox {
    position: absolute;
    display: inline-block;
    padding: .6rem;
    border-radius: 100%;
    right: 10px;
    top: 10px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
  }

  .closeBox .iconfont {
    font-size: 1.2rem;
  }

  .m-article {
    padding-bottom: 4rem;
  }

  .product-box {
    transform: translateY(100%);
    -webkit-transition: .3s all ease;
    -moz-transition: .3s all ease;
    -ms-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
  }

  .product-box.boxShow {
    transform: translateY(0%);
  }

  #yt-mall .m-article .title {
    padding: 1rem;
  }

  #yt-mall .m-article .title .iconfont {
    color: #C71A40;
  }

  #yt-mall .m-pd .cover {
    border-bottom: 1px solid #EAEAEA;
  }
  .m-check label{padding:.5rem .9rem !important;}
</style>
