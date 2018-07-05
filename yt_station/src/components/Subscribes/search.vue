<template>
  <div class="search-bar">
    <div class="pure-g">
      <div class="pure-u-3-4">
        <input type="text" class="u-input" placeholder="输入手机号码、姓名、地址搜索订单" v-model="phone">
      </div>
      <div class="pure-u-1-4">
        <button class="u-button" @click.prevent="search" :disabled="!phone"><i class="iconfont">&#xe664;</i> 搜索</button>
      </div>
    </div>
    <empty icon="&#xe665;" v-show="!$loadingRouteData && !items.length">暂时没有数据</empty>
    <loader v-show="$loadingRouteData"></loader>
    <div class="u-table mt20" v-show="!$loadingRouteData && items.length">
      <table width="100%" class="pure-table pure-table-bordered">
        <thead>
        <tr>
          <th>用户地址</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr is="SubsItem" v-for="subscribe in items" :item="subscribe"></tr>
        </tbody>
      </table>
    </div>
  </div>
  <button class="ios-btn ios-btn-success" @click.prevent="loadmore"
          v-show="currentPage !== totalPages && items.length"
          :disabled="processing">
    <span v-show="!processing">加载更多</span>
    <span v-show="processing">正在处理中...</span>
  </button>
</template>

<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'
  import SubsItem from './subsItem.vue'

  export default {
    name: 'Search',

    data: function () {
      return {
        phone: '',
        items: [],
        processing: false,
        currentPage: 1,
        totalPages: 1
      }
    },

    components: {
      Empty,
      Loader,
      SubsItem
    },

    methods: {
      search: function () {
        var self = this
        this.$loadingRouteData = true
        this.$http.get('/stations/preorders?keyword=' + this.phone).then(
          function (data) {
            this.$loadingRouteData = false
            var items = data.data.data
            var meta = data.data.meta
            self.items = items
            self.currentPage = meta.pagination.current_page
            self.totalPages = meta.pagination.total_pages
          },
          function (data) {
            console.log(data)
          }
        )
      },
      loadmore: function () {
        var self = this
        self.processing = true
        this.$http.get('/stations/preorders?page=' + (this.currentPage + 1) + '&keyword=' + this.phone).then(
          function (data) {
            self.items = self.items.concat(data.data.data)
            self.currentPage = data.data.meta.pagination.current_page
            self.processing = false
          },
          function (data) {
            self.processing = false
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .u-table {
    font-size: 1.4rem;
  }

  .u-table table {
    background: #fff;
    text-align: center;
  }

  .u-table thead th {
    text-align: center;
  }

  .search-bar {
    padding: 1rem;
  }

  .u-input {
    -webkit-appearance: none;
    border: 1px solid #bbb;
    padding: .5rem;
    font-size: 1.4rem;
    outline: none;
    border-radius: .3rem;
    width: 100%;
  }

  .u-button {
    -webkit-appearance: none;
    font-size: 1.4rem;
    width: 100%;
    border: 0 none;
    background: transparent;
    padding: .5rem;
    text-align: center;
    color: #25AD25;
    outline: none;
  }
</style>
