<template>
  <div class="pt40">
    <div class="m-head">
      <ul class="clearfix">
        <li class="item">
          <a v-link="{ path: '/campaigns/list' }" class="icon"><i class="iconfont">&#xe604;</i></a>
        </li>
        <li class="item">我的劵包</li>
      </ul>
    </div>
    <div class="m-tabs">
      <ul class="clearfix">
        <li><a v-link="{ path: '/campaigns/tickets?status=' }"
               :class="['item', $route.query.status == '' ? 'active' : '']">全部</a></li>
        <li><a v-link="{ path: '/campaigns/tickets?status=used' }"
               :class="['item', $route.query.status == 'used' ? 'active' : '']">已使用</a></li>
        <li><a v-link="{ path: '/campaigns/tickets?status=ok' }"
               :class="['item', $route.query.status == 'ok' ? 'active' : '']">未使用</a></li>
      </ul>
    </div>
  </div>
  <div v-if="$loadingRouteData" transition="fade">
    <loader></loader>
  </div>
  <div v-if="!$loadingRouteData" class="pd10" transition="show">
    <a v-link="{ path: '/campaigns/tickets/' + ticket.ticket_no }" class="m-card mb10"
       v-for="ticket in tickets | filterBy $route.query.status in 'status'" v-show="ticket.status !== 'expired'">
      <div class="cover">
        <img :src="ticket.campaign.cover_image" alt="" width="100%" class="image">
        <div class="mask">
          <p :class="['title','f14', ticket.status === 'used' ? 'gray' : '']">
            <span class="name f16">{{ticket.campaign.name}}</span>
            <!-- <span class="date fr">有效期至：2017.6.20</span> -->
          </p>
          <span type="button" class="btn btn-defalute btn-round" disabled="disabled" style="font-size: 1.4rem;">
            点击使用
          </span>
        </div>
      </div>
  </div>
  <!-- <a class="m-card mb10">
    <div class="cover">

      <div class="mask">
        <p class="title f14 gray">
          <span class="name f20">冰糖雪梨劵</span>
          <span class="date fr">有效期至：2017.6.20</span>
        </p>
        <button type="button" class="btn btn-defalute btn-round btn-disable" disabled="disabled">
          已使用
        </button>
      </div>
    </div>
  </div> -->
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Tickets',

    data: function () {
      return {
        tickets: []
      }
    },

    components: {
      Loader
    },

    route: {
      data: function (transition) {
        var self = this
        return self.$http.get('/campaigns/tickets').then(
          function (data) {
            return {
              tickets: data.data.data
            }
          },
          function (data) {
            window.alert('加载数据失败，请刷新重试')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .m-card {
    display: block;
  }
</style>
