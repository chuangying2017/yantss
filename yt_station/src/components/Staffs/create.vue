<template>
  <div :class="{'blur': imgTag}">
    <div class="pt40">
      <div class="m-head">
        <span class="fl text">
          <a v-link="{ path: '/station/staffs/list' }" class="icon"><i class="iconfont">&#xe604;</i>返回</a>
        </span>
      </div>
      <div class="pd10">
        <div class="m-user">
          <form v-form name="createForm" @submit.prevent="onSubmit">
            <!--<input v-form-ctrl v-model="form.staff_no" name="staff_no" type="num" placeholder="工号" class="input mb10"><br>-->
            <input v-form-ctrl v-model="form.name" name="name" type="text" placeholder="姓名" class="input mb10"
                   required><br>
            <label v-show="(createForm.name.$dirty || createForm.$submitted) && createForm.name.$invalid" class="error">请正确填写姓名</label><br>
            <input v-form-ctrl v-model="form.phone" name="phone" type="tel" placeholder="电话" class="input mb10"
                   custom-validator="phoneVerified" required><br>
            <label v-show="(createForm.phone.$dirty || createForm.$submitted) && createForm.phone.$invalid"
                   class="error">请正确填写手机号码</label><br>
            <button type="submit" class="btn btn-round btn-success mt10 mb10" :disabled="createProcess">
              <span v-show="!createProcess">创建新配送员</span>
              <span v-show="createProcess">正在处理中...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-show="imgTag" class="qrcode-mask">
    <div class="qr-table">
      <div class="qr-table-cell">
        <div class="qrwrap">
          <a v-link="{ path: '/station/staffs/list' }" class="close"><i class="iconfont">&#xe634;</i></a>
          {{{imgTag}}}
          <p class="text">扫描绑定派送员</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qrcode from 'qrcode-generator'

  export default {
    name: 'CreateStaff',

    data: function () {
      return {
        createForm: {},
        form: {
          name: '',
          phone: ''
        },
        imgTag: null,
        createProcess: false
      }
    },

    methods: {
      onSubmit: function () {
        if (this.createForm.$invalid) {
          return false
        }
        var self = this
        self.createProcess = true
        self.$http.post('/stations/staffs', self.form).then(
          function ({data: {data: staff}}) {
            // 成功添加
            var url = 'http://yt.l43.cn/yt-staff/#!/bind/' + staff.id + '?bind_token=' + staff.bind_token
            console.log(url)
            self.imgTag = self.makeQrcode(url, 6)
            self.createProcess = false
//            self.$route.router.go('/staffs')
          },
          function (data) {
            // 添加失败
            self.createProcess = false
            window.alert('添加失败，请重试')
          }
        )
      },
      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      },
      makeQrcode: function (url, type) {
        var qr = qrcode(type || 6, 'M')
        qr.addData(url)
        qr.make()
        return qr.createImgTag()
      }
    }
  }
</script>

<style>
  label.error {
    display: inline-block;
    text-align: center;
    color: red;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .qrwrap {
    position: relative;
  }

  .qrcode-mask .close {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    color: #000;
  }

  .qrcode-mask .close .iconfont {
    font-size: 1.2rem;
  }

  .btn.btn-success:disabled {
    background: #ddd;
    border: 1px solid #ddd;
  }
</style>
