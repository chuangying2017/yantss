<template>
  <form v-form name="regForm" @submit.prevent="onSubmit">
    <input v-form-ctrl v-model="form.name" type="text" name="name" placeholder="名字" required><br>
    <label v-show="(regForm.name.$dirty || regForm.$submitted) && regForm.name.$invalid"
           class="error">请正确填写姓名</label><br>

    <input v-form-ctrl v-model="form.desc" type="text" name="desc" placeholder="描述" required><br>
    <label v-show="(regForm.desc.$dirty || regForm.$submitted) && regForm.desc.$invalid"
           class="error">请正确填写描述</label><br>

    <textarea v-form-ctrl v-model="form.address" name="address" cols="30" rows="10" required
              placeholder="地址"></textarea><br>
    <label v-show="(regForm.address.$dirty || regForm.$submitted) && regForm.address.$invalid"
           class="error">请正确填写地址</label><br>

    <input v-form-ctrl v-model="form.tel" type="tel" name="tel" placeholder="座机：xxxx-xxxxxxx"
           custom-validator="telVerified" required><br>
    <label v-show="(regForm.tel.$dirty || regForm.$submitted) && regForm.tel.$invalid"
           class="error">请正确填写座机号码</label><br>

    <input v-form-ctrl v-model="form.phone" type="tel" name="phone" placeholder="手机" custom-validator="phoneVerified"
           required><br>
    <label v-show="(regForm.phone.$dirty || regForm.$submitted) && regForm.phone.$invalid"
           class="error">请正确填写手机号码</label><br>

    <input v-form-ctrl v-model="form.director" type="text" name="director" placeholder="负责人" required><br>
    <label v-show="(regForm.director.$dirty || regForm.$submitted) && regForm.director.$invalid"
           class="error">请正确填写负责人</label><br>

    <button type="submit">提交</button>
    <img :src="qrUrl" alt="" v-show="qrUrl">
  </form>
</template>

<script>
  import qrcode from 'qrcode-js'

  export default {
    name: 'Login',

    data: function () {
      return {
        regForm: {},
        form: {
          name: '',
          desc: '',
          address: '',
          tel: '',
          phone: '',
          director: '',
          longitude: '',
          latitude: ''
        },
        qrUrl: null
      }
    },

    // ready: function () {
    //   this.getLocation()
    // },

    methods: {
      onSubmit: function () {
        var self = this
        var ak = '3568d2c6308513408e7dae1afc55c4cd'

        if (this.regForm.$invalid) {
          return false
        }

        // 计算地址的经纬度
        self.$http.jsonp('http://api.map.baidu.com/geocoder/v2/?address=' + self.form.address + '&output=json&ak=' + ak).then(
          function (data) {
            self.form.longitude = data.data.result.location.lng.toString()
            self.form.latitude = data.data.result.location.lat.toString()
            console.log(self.form.longitude, self.form.latitude)
            self.submitData()
          },
          function (data) {
            console.log(data)
          }
        )
      },

      // getLocation: function () {
      //   var self = this
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       function (p) {
      //         self.form.latitude = p.coords.latitude
      //         self.form.longitude = p.coords.longitude
      //       },
      //       function (e) {
      //         window.alert('获取地址失败')
      //       }
      //     )
      //   } else {
      //     window.alert('该设备无法获取当前地理位置')
      //   }
      // },

      submitData: function () {
        var self = this
        console.log(self.form)
        var data = {
          name: self.form.name,
          desc: self.form.desc,
          director: self.form.director,
          address: self.form.address,
          cover_image: '123',
          longitude: self.form.longitude,
          latitude: self.form.latitude
        }
        console.log(data)
        self.$http.post('/admin/stations', {
          name: self.form.name,
          desc: self.form.desc,
          director: self.form.director,
          address: self.form.address,
          cover_image: '123',
          longitude: self.form.longitude,
          latitude: self.form.latitude
        }).then(
          function (data) {
            console.log(data)
            // success
            // 跳转到二维码页面
            // self.$route.redirect('/station')
            // 获取station的链接
            self.qrUrl = qrcode.toDataURL(data.data.data.mete.bind_url, 4)
//            self.$http.get('/admin/stations/' + data.data.data.id).then(
//              function (data) {
//                // 获取到url
//                console.log(data.data.data.mete.bind_url)
//                self.qrUrl = qrcode.toDataURL(data.data.data.mete.bind_url, 4)
//              }
//            )
          },
          function () {
            // fail
          }
        )
      },

      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      },

      telVerified: function (value) {
        return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)
      }
    }
  }
</script>

<style>
  input, textarea, button {
    border: 1px solid #000;
  }
</style>
