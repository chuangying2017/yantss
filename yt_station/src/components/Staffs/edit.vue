<template>
  <div class="pt40">
    <div class="m-head">
        <span class="fl text">
          <a v-link="{ path: '/station/staffs/' + $route.params.staff_id + '/info' }" class="icon"><i class="iconfont">&#xe604;</i>返回</a>
        </span>
    </div>
    <div class="pd10">
      <div class="m-user">
        <form v-form name="createForm" @submit.prevent="onSubmit">
          <!--<div class="pure-g">-->
          <!--<div class="pure-u-1-4">-->
          <!--<label class="title">工号:</label>-->
          <!--</div>-->
          <!--<div class="pure-u-3-4">-->
          <!--<input v-form-ctrl v-model="form.staff_no" name="staff_no" type="num"-->
          <!--placeholder="工号" class="input mb10">-->
          <!--</div>-->
          <!--</div>-->
          <div class="pure-g">
            <div class="pure-u-1-4">
              <label class="title">姓名:</label>
            </div>
            <div class="pure-u-3-4">
              <input v-form-ctrl v-model="form.name" name="name" type="text" placeholder="姓名" class="input mb10"
                     required>
              <label v-show="(createForm.name.$dirty || createForm.$submitted) && createForm.name.$invalid"
                     class="error">请正确填写姓名</label>
            </div>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-4">
              <label class="title">手机:</label>
            </div>
            <div class="pure-u-3-4">
              <input v-form-ctrl v-model="form.phone" name="phone" type="tel" placeholder="电话" class="input mb10"
                     custom-validator="phoneVerified" required>
            </div>
          </div>
          <label v-show="(createForm.phone.$dirty || createForm.$submitted) && createForm.phone.$invalid" class="error">请正确填写手机号码</label>
          <button type="submit" class="btn btn-round btn-success mt10 mb10" :disabled="editProcess">确认修改</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateStaff',

    data: function () {
      return {
        createForm: {},
        form: {
          staff_no: '',
          name: '',
          phone: ''
        },
        editProcess: false
      }
    },

    route: {
      data: function () {
        var self = this
        return this.$http.get('/stations/staffs/' + this.$route.params.staff_id).then(
          function (data) {
            return {
              form: data.data.data
            }
          },
          function () {
            window.alert('获取用户信息失败，请重试')
            self.$route.router.go('/staffs/' + self.$route.params.staff_id + '/info')
          }
        )
      }
    },

    methods: {
      onSubmit: function () {
        if (this.createForm.$invalid) {
          return false
        }
        var self = this
        self.editProcess = true
        self.$http.put('/stations/staffs/' + self.$route.params.staff_id, self.form).then(
          function (data) {
            // 成功添加
            self.editProcess = false
            window.alert('成功修改配送员')
            self.$route.router.go('/station/staffs/list')
          },
          function (data) {
            // 添加失败
            self.editProcess = false
            window.alert('修改失败，请重试')
          }
        )
      },

      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      }
    }
  }
</script>

<style>
  label.title {
    display: block;
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 4rem;
  }
</style>
