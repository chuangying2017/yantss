<template>
  <div class="pt40">
    <div class="m-head">
      <ul class="clearfix">
        <li class="item">
          <a v-link="{ path: '/campaigns/tickets?status=' }" class="icon"><i class="iconfont">&#xe604;</i></a>
        </li>
        <li class="item">详情</li>
      </ul>
    </div>
    <div v-if="$loadingRouteData" transition="fade">
      <loader></loader>
    </div>
    <div v-if="!$loadingRouteData" transition="show" class="exchange mt20">
      <p class="title">
        <span class="name">兑换商品</span>
        <span class="time fr">数量</span>
      </p>
      <div class="m-list">
        <ul class="clearfix">
          <li class="item item1" v-for="product in ticket.skus">
            <div class="cover">
              <img :src="product.cover_image" alt="">
            </div>
            <div class="content">
              {{ product.name }}
            </div>
            <div class="num">
              *{{ product.quantity }}
            </div>
          </li>
        </ul>
      </div>
      <div class="code">
        <div class="code-wrap">
          <div class="code-mask" v-if="ticket.status !== 'ok'">
            <p>该二维码已经使用或者过期</p>
          </div>
          <img :src="qrUrl" alt="" class="thumbnail">
        </div>
        <p class="text">（请供此二维码与商家兑换商品）<br></p>
      </div>
    </div>
  </div>
</template>

<script>
  import qrcode from 'qrcode-js'
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Ticket',

    data: function () {
      return {
        ticket: {},
        qrUrl: ''
      }
    },

    components: {
      Loader
    },

    route: {
      data: function (transition) {
        return this.$http.get('/campaigns/tickets/' + transition.to.params.ticket_no).then(
          function (data) {
            console.log('http://store.yt.weazm.com/store/exchange/ticket/' + transition.to.params.ticket_no)
            return {
              ticket: data.data.data,
              qrUrl: qrcode.toDataURL('http://store.yt.weazm.com/store/exchange/ticket/' + transition.to.params.ticket_no, 4)
            }
          },
          function (data) {
            window.alert('获取数据失败，请刷新重试')
          }
        )
      }
    }
  }
</script>
