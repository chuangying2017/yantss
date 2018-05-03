<template>
  <!-- <h1>订单设置页面</h1>
  <p>姓名：{{ subscribe.name }}</p>
  <p>地址：{{ subscribe.address }}</p>
  <p v-show="isAccept">电话：{{ subscribe.phone }}</p>
  <a v-show="isAccept" v-link="{ path: '/subscribes/' + $route.params.subs_id + '/edit' }">去设置订奶服务</a><br>
  <button @click.prevent="accept" v-show="!isAccept">接受</button>
  <button @click.prevent="reject" v-show="!isAccept">拒绝</button> -->
  <div class="m-mask">
    <div class="mask-box">
      <div v-show="!$loadingRouteData">
        <p class="text">订单服务 <a v-link="{ path: '/station/subscribes/list' }" class="close"><span><i class="iconfont">&#xe634;</i></span></a>
        </p>
        <div class="media mt20">
          <p class="media-left txt fl">用户：</p>
          <p class="media-body f12">{{ subscribe.name }}</p>
          <p class="media-left txt fl">地址：</p>
          <p class="media-body f12">{{ subscribe.address }}</p>
          <p class="media-left txt fl">手机：</p>
          <p class="media-body f12">{{ subscribe.phone }}</p>
        </div>
        <select name="select" class="select mt20" v-model="staffID">
          <option value="" disabled selected> -- 选择配送人员 --</option>
          <option v-for="staff in staffs" :value="staff.id">{{ staff.name }}</option>
        </select>
        <a v-show="isAccept" v-link="{ path: '/station/subscribes/' + $route.params.subs_id + '/deliver' }"
           class="btn btn-round btn-success mt20">设置配送员</a>
        <button type="button" class="btn btn-round btn-success mt20" @click.prevent="confirm" :disabled="!staffID">
          <span v-if="!acceptWorking">接受订单</span>
          <span v-else>订单处理中...</span>
        </button>
        <button type="button" class="btn btn-round mt10" @click.prevent="reject" v-show="!isAccept"
                :disabled="rejectWorking">
          <span v-if="!rejectWorking">拒绝订单</span>
          <span v-else>订单处理中...</span>
        </button>
      </div>
      <loader v-show="$loadingRouteData"></loader>
    </div>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Setting',

    data: function () {
      return {
        subscribe: {},
        isAccept: false,
        acceptWorking: false,
        rejectWorking: false,
        staffs: [],
        staffID: null
      }
    },

    components: {
      Loader
    },

    route: {
      data: function (transition) {
        var self = this
        return Promise.all([
          self.$http.get('/stations/staffs'),
          self.$http.get('/stations/preorders/' + self.$route.params.subs_id)
        ]).then(function ([staffs, preorder]) {
          return {
            staffs: staffs.data.data,
            subscribe: preorder.data.data
          }
        })
      }
    },

    methods: {
      accept: function () {
        var self = this
        self.isAccept = true
//        this.$http.put('/stations/preorders/' + this.$route.params.subs_id + '/operation', {
//          action: 'apply'
//        }).then(
//          function (data) {
//            // 成功
//          },
//          function (data) {
//            // 失败
//            window.alert('请重新尝试操作')
//          }
//        )
      },
      confirm: function () {
        var self = this
        self.working = true
        this.$http.post('/stations/preorders/' + this.$route.params.subs_id + '/assign', {
          staff: self.staffID
        }).then(
          function () {
            // 成功派单
            self.$route.router.go('/station/subscribes/list')
            self.working = false
          },
          function () {
            window.alert('派单失败，请重新尝试')
            self.working = false
          }
        )
      },
      reject: function () {
        var self = this
        self.rejectWorking = true
        this.$http.put('/stations/preorders/' + this.$route.params.subs_id + '/reject', {
          memo: ''
        }).then(
          function (data) {
            // 成功
            self.$route.router.go('/station/subscribes/list')
            self.rejectWorking = false
          },
          function (data) {
            // 失败
            window.alert('请重新尝试操作')
          }
        )
      }
    }
  }
</script>
<style scoped>
  .media .media-left,
  .media .media-body {
    height: 2rem;
    font-size: 1.6rem;
    vertical-align: middle;
  }

  .btn:disabled {
    background: #ddd;
    border: 1px solid #b3b3b3;
  }

  .close {
    float: right;
    color: #555757;
  }
</style>
