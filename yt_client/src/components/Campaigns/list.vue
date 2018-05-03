<template>
  <div v-if="$loadingRouteData" transition="fade">
    <loader></loader>
  </div>
  <div v-if="!$loadingRouteData" transition="show">
    <a v-link="{ path: '/campaigns/' + campaign.id }" class="m-card mt20" v-for="campaign in campaigns">
      <div class="cover">
        <img :src="campaign.cover_image" alt="" width="100%" class="image">
        <div class="mask">
          <div class="message message-green">
            {{ campaign.name }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Campaigns',

    data: function () {
      return {
        campaigns: []
      }
    },

    components: {
      Loader
    },

    route: {
      data: function (transition) {
        return this.$http.get('/campaigns/campaigns').then(
          function (data) {
            // 成功获取活动列表
            return {
              campaigns: data.data.data
            }
          },
          function (data) {
            // 获取活动列表失败
            window.alert('获取活动列表失败，请刷新重试')
          }
        )
      }
    }
  }
</script>

<style>
  .m-card {
    display: block;
  }
</style>
