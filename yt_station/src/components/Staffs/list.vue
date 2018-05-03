<template>
  <div class="tab4" v-show="!$loadingRouteData">
    <div class="m-user">
      <ul>
        <li class="user-list" v-for="staff in staffs">
          <a v-link="{ path: '/station/staffs/' + staff.id + '/info' }">
            {{staff.name}} <i class="iconfont">&#xe603;</i>
          </a>
        </li>
      </ul>
    </div>
    <a v-link="{ path: '/station/staffs/create' }" class="ios-btn ios-btn-success mt20"
       v-show="staffs.length">添加配送员
    </a>
    <empty v-show="!staffs.length" icon="&#xe654;">当前没有配送员</empty>
    <div class="pd30" v-show="!staffs.length">
      <a v-link="{ path: '/station/staffs/create' }" type="button" class="btn btn-success btn-round">
        添加配送员
      </a>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <!-- <a v-link="{ path: '/staffs/create' }">添加新配送员</a> -->
</template>

<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'

  export default {
    name: 'StaffsList',

    data: function () {
      return {
        staffs: []
      }
    },

    components: {
      Empty,
      Loader
    },

    route: {
      data: function (transition) {
        var self = this
        return this.$http.get('/stations/staffs').then(
          function (data) {
            // 成功获取
            return {
              staffs: data.data.data
            }
          },
          function (data) {
            // 获取失败
            window.alert('获取失败，请重试')
            self.$route.router.go('/')
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
</style>

