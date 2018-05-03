<template>
  <div class="pt20">
    <div class="m-head">
      <div class="text">
        <a v-link="{ path: '/station/subscribes/' + $route.params.subs_id }" class="icon">
          <i class="iconfont">&#xe604;</i><span>返回</span>
        </a>
      </div>
    </div>
    <div class="m-tabs">
      <ul class="clearfix">
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=0'}"
               :class="['item', $route.query.weekday === '0' ? 'active' : '']">周</br>日</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=1'}"
               :class="['item', $route.query.weekday === '1' ? 'active' : '']">周</br>一</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=2'}"
               :class="['item', $route.query.weekday === '2' ? 'active' : '']">周</br>二</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=3'}"
               :class="['item', $route.query.weekday === '3' ? 'active' : '']">周</br>三</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=4'}"
               :class="['item', $route.query.weekday === '4' ? 'active' : '']">周</br>四</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=5'}"
               :class="['item', $route.query.weekday === '5' ? 'active' : '']">周</br>五</a></li>
        <li><a v-link="{path: '/station/subscribes/' + $route.params.subs_id + '/weekinfo?weekday=6'}"
               :class="['item', $route.query.weekday === '6' ? 'active' : '']">周</br>六</a></li>
      </ul>
    </div>
  </div>
  <div class="pd10" v-show="!$loadingRouteData">
    <div class="pay-message" style="margin-top: 0">
      <div class="content">
        <p class="clearfix text">
          <span class="fl">配送时间</span>
          <span class="fr">早上6:00-8:00</span>
        </p>
        <div class="m-list">
          <ul class="clearfix">
            <li class="item" v-for="product in currentProduct[0]">
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
        <p style="padding: 5px; color: #ddd;" v-show="!currentProduct[0].length">无需配送</p>
      </div>
      <div class="content">
        <p class="clearfix text">
          <span class="fl">配送时间</span>
          <span class="fr">下午4:00-8:00</span>
        </p>
        <div class="m-list">
          <ul class="clearfix">
            <li class="item" v-for="product in currentProduct[1]">
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
        <p style="padding: 5px; color: #ddd;" v-show="!currentProduct[1].length">无需配送</p>
      </div>
    </div>
  </div>
  <div class="m-footer">
    <div class="footer-btn">
      <a v-link="{ path: '/station/subscribes/' + $route.params.subs_id + '/edit'}" type="button"
         class="btn btn-round btn-success">
        修改订单配置
      </a>
    </div>
  </div>
</template>

<script>
  //  import _ from 'underscore'

  export default {
    name: 'WeekInfo',

    data: function () {
      return {
        products: [
          [[], []], [[], []], [[], []], [[], []], [[], []], [[], []]
        ]
      }
    },

    computed: {
      currentDay: function () {
        return parseInt(this.$route.query.weekday)
      },
      currentProduct: function () {
        var self = this
        return self.products[this.currentDay]
      }
    },

    route: {
      data: function () {
        var self = this
        return self.$http.get('/subscribe/preorders/' + this.$route.params.subs_id).then(
          function (data) {
            return {
              products: data.data.data.skus
            }
          },
          function (data) {
            // 获取消息失败
            window.alert('获取消息失败，请刷新重试')
          }
        )
      }
    }
  }
</script>
