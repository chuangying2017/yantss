<template>
  <div v-show="!$loadingRouteData">
    <div class="u-coupon s-expired" v-for="coupon in coupons">
      <div class="info">
        <div class="pure-g">
          <div class="pure-u-1-4">
            <div class="price">
              <span>{{coupon.coupon.content.split(coupon.coupon.content.slice(-1))[0]}}</span>{{coupon.coupon.content.slice(-1)}}
            </div>
          </div>
          <div class="pure-u-3-4">
            <div class="detail-wrap">
              <div class="detail">
                <h2 class="name">{{coupon.coupon.name}}</h2>
                <p class="des">{{coupon.coupon.desc}}</p>
                <p class="des">
                  <!--使用时间: {{coupon.created_at.split(' ')[0]}} 至 {{getPreviousTime(coupon.end_time.split(' ')[0])}}</p>-->
                使用时间: {{coupon.created_at}} 至 {{coupon.end_time}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="expired">
        <p></p>
      </div>
    </div>
    <empty v-show="!coupons.length">当前分类没有券哦</empty>
    <button class="u-btn u-btn-danger" v-show="currentPage < totalPages"
            @click.prevent="loadMore" :disabled="loading">
      <span v-show="!loading">加载更多</span>
      <span v-show="loading">加载中...</span>
    </button>
  </div>
  <loader v-show="$loadingRouteData"></loader>
</template>

<script>
  import utils from 'src/utils'
  import Empty from './../../../Share/empty.vue'
  import Loader from './../../../Share/loader.vue'

  export default{
    name: 'usable',

    data: function () {
      return {
        coupons: [],
        totalPages: 1,
        currentPage: 1,
        loading: false
      }
    },

    components: {
      Empty,
      Loader
    },

    route: {
      data: function () {
        return this.$http.get('/promotions/tickets?status=2').then(
          function (data) {
            return {
              coupons: data.data.data,
              totalPages: data.data.meta.pagination.total_pages,
              currentPage: data.data.meta.pagination.current_page
            }
          },
          function (data) {
            window.alert('获取优惠券失败,请刷新重试')
          }
        )
      }
    },

    methods: {
      getPreviousTime: function (str) {
        return utils.getPreviousTime(str)
      },
      loadMore: function () {
        var self = this
        self.loading = true
        this.$http.get('/promotions/tickets?status=2&page=' + (this.currentPage + 1)).then(
          function (data) {
            self.coupons = self.coupons.concat(data.data.data)
            self.totalPages = data.data.meta.pagination.total_pages
            self.currentPage = data.data.meta.pagination.current_page
            self.loading = false
          },
          function (data) {
            window.alert('加载失败,请重新尝试')
          }
        )
      }
    }
  }
</script>
