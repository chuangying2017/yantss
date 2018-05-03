<template>
  <div class="m-mask">
    <div class="mask-box">
      <p class="text">选择配送人员</p>
      <div class="media mt20">
        <p class="media-left txt fl">配送地址：</p>
        <p class="media-body f12">{{ preorder.address }}</p>
      </div>
      <select name="select" class="select mt20" v-model="staffID">
        <option disabled selected> -- 选择配送人员 --</option>
        <option v-for="staff in staffs" :value="staff.id">{{ staff.name }}</option>
      </select>
      <button type="button" class="btn btn-round btn-success mt20" :disabled="working" @click.prevent="confirm">
        <span v-show="!working">确认派单</span>
        <span v-show="working">系统处理中...</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SubsDeliver',

    data: function () {
      return {
        staffs: [],
        preorder: {},
        staffID: ''
      }
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
            preorder: preorder.data.data
          }
        })
        // return this.$http.get('/stations/staffs').then(
        //   function (data) {
        //     return {
        //       staffs: data.data.data
        //     }
        //   },
        //   function (data) {
        //     window.alert('获取服务人员失败，请刷新')
        //   }
        // )
      }
    },

    methods: {
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
      }
    }
  }
</script>
