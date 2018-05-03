<template>
  <loader v-show="$loadingRouteData"></loader>
  <empty v-show="!$loadingRouteData && !preorders.length">暂时没有任何客户</empty>
  <div v-show="!$loadingRouteData && preorders.length">
    <div>
      <ul>
        <li v-for="preorder in preorders">
          <!--<a v-link="{ path: '/deliver/orders/' + preorder.id }">-->
          <!--{{preorder.name}} <i class="iconfont">&#xe603;</i>-->
          <!--</a>-->
          <div class="user-card">
            <p class="info clearfix">
              <span class="fl">{{preorder.name}}</span>
              <span class="fr"><a :href="'tel:' + preorder.phone"><i
                class="iconfont">&#xe667;</i> {{preorder.phone}}</a></span>
            </p>
            <p v-for="sku in preorder.skus" class="sku clearfix">
              <span class="fl">
              <i class="iconfont">&#xe666;</i> {{sku.name}}</span>
              <span class="fr">共{{sku.total}}瓶/剩余{{sku.remain}}瓶</span>
            </p>
            <p class="address">
              <i class="iconfont">&#xe64c;</i> 地址: {{preorder.address}}
            </p>
            <p class="peek clearfix">
              <a v-link="{ path: '/deliver/orders/' + preorder.id }" class="fr"><i class="iconfont">&#xe65c;</i>
                查看详情</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <button class="ios-btn ios-btn-success" @click.prevent="loadmore" v-show="currentPage !== totalPages"
            :disabled="processing">
      <span v-show="!processing">加载更多</span>
      <span v-show="processing">正在处理中...</span>
    </button>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'
  import Empty from './../Share/empty.vue'

  export default {
    name: 'orders',

    data: function () {
      return {
        inputdata: '3',
        viewType: 'client',
        preorders: [],
        currentPage: null,
        totalPages: null,
        processing: false
      }
    },

    components: {
      Loader,
      Empty
    },

    route: {
      data: function () {
        return this.$http.get('/staffs/preorders').then(
          function (data) {
            return {
              preorders: data.data.data,
              currentPage: data.data.meta.pagination.current_page,
              totalPages: data.data.meta.pagination.total_pages
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    },

    methods: {
      loadmore: function () {
        var self = this
        self.processing = true
        this.$http.get('/staffs/preorders?page=' + (this.currentPage + 1)).then(
          function (data) {
            self.preorders = self.preorders.concat(data.data.data)
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
  .m-user {
    margin: 2rem 0;
    padding: 0;
  }

  .user-list a {
    font-size: 1.4rem;
    padding: 1rem;
    color: #616161;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    display: block;
    margin-bottom: -1px;
  }

  .user-list a .iconfont {
    float: right;
    color: #25AD25;
  }

  .ios-btn {
    display: block;
    -webkit-appearance: none;
    border-right: 0 none;
    border-left: 0 none;
    outline: none;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }

  .ios-btn:disabled {
    color: #bbb;
  }

  .user-card {
    padding: 1rem;
    font-size: 1.4rem;
    margin: 1rem;
    background: #fff;
    border-radius: .3rem;
    border: 1px solid #ddd;
  }

  .user-card p {
    padding: .4rem 0;
    border-bottom: 1px dotted #ECECEC;
  }

  .user-card p:last-child {
    border-bottom: 0 none;
  }

  .user-card .info {
    color: #000;
    font-size: 1.4rem;
  }

  .user-card a {
    color: #25AD25;
  }

  .user-card .peek {
    font-size: 1.2rem;
  }

  .user-card .peek .iconfont {
    font-size: 1.4rem;
  }

  .user-card .sku, .user-card .address {
    color: #8C8C8C;
  }
</style>
