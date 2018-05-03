<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/subscribe/orders/' + $route.params.order_no }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          配送记录
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
      </div>
    </div>
  </div>
  <empty v-show="!exchanges.length">
    暂时还没有配送记录
  </empty>
  <ul>
    <li v-for="exchange in exchanges" class="milk-exchange">
      <p class="date">{{exchange.deliver_at}}</p>
      <p v-for="sku in exchange.skus" class="sku clearfix">
        <span class="fl">
          {{sku.name}}
        </span>
        <span class="fr">
           * {{sku.quantity}}
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
  import Empty from './../../Share/empty.vue'

  export default {
    name: 'Exchanges',

    data: function () {
      return {
        exchanges: []
      }
    },

    components: {
      Empty
    },

    route: {
      data: function () {
        return this.$http.get('/subscribe/preorders/' + this.$route.params.order_no + '/deliver').then(
          function ({data: {data: exchanges}}) {
            return {
              exchanges: exchanges
            }
          },
          function (data) {
            window.alert('获取配送数据失败,请刷新重试')
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .milk-exchange {
    margin: 1rem;
    font-size: 1.4rem;
  }

  .milk-exchange .date {
    padding-bottom: 1rem;
    border-bottom: #ddd;
    color: #C71A40;
  }
</style>
