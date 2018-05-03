<template>
  <div class="container">
    <ul class="progressbar clearfix">
      <li class="active-small active">地址</li>
      <li>充值</li>
      <li>确认</li>
    </ul>
  </div>
  <div class="pd10">
    <div class="m-user">
      <form v-form name="subsForm" @submit.prevent="onSubmit">
        <input v-form-ctrl v-model="form.phone" class="input mb10" type="tel" name="phone" placeholder="电话" required
               custom-validator="phoneVerified">
        <label v-show="(subsForm.phone.$dirty || subsForm.$submitted) && subsForm.phone.$invalid" class="error">请正确填写手机号码</label><br>
        <select v-form-ctrl name="select" class="select mb10" v-model="form.area" required>
          <option selected disabled>-- 请选择地址 --</option>
          <option :value="district.id" v-for="district in districts">{{district.name}}</option>
        </select>
        <textarea v-form-ctrl v-model="form.address" name="address" placeholder="地址" cols="30" rows="10"
                  required></textarea><br>
        <label v-show="(subsForm.address.$dirty || subsForm.$submitted) && subsForm.address.$invalid" class="error">请正确填写地址</label><br>
        <button type="submit" :disabled="working" class="btn btn-round btn-success mt10 mb10">
          <span v-show="!working">提交</span>
          <span v-show="working">处理中...</span>
        </button>
        <p class="text">＊当前订奶服务只限广州＊</p>
      </form>
    </div>
  </div>
</template>

<script>
  import {getUser} from './../../../vuex/getters'

  export default {
    name: 'Step1',

    data: function () {
      return {
        subsForm: {},
        form: {
          name: '',
          phone: '',
          address: ''
        },
        working: false,
        location: {
          longitude: '',
          latitude: ''
        },
        districts: []
      }
    },

    vuex: {
      getters: {
        user: getUser
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        var ak = '3568d2c6308513408e7dae1afc55c4cd'
        self.working = true

        if (self.subsForm.$invalid) {
          self.working = false
          return false
        }

        // 获取地理位置的经纬度
        self.$http.jsonp('http://api.map.baidu.com/geocoder/v2/?address=' + self.form.area + self.form.address + '&output=json&ak=' + ak).then(
          function (data) {
            self.location.longitude = data.data.result.location.lng
            self.location.latitude = data.data.result.location.lat
            self.createOrder(self.location.longitude, self.location.latitude)
            // self.checkAddress(self.location)
            // console.log(data)
          },
          function (data) {
            console.log(data)
          }
        )
      },

      checkAddress: function (location) {
        var self = this
        self.$http.get('/subscribe/stations', location).then(
          function (data) {
            // 成功，提交订单
            self.createOrder(data.data.data)
          },
          function (data) {
            // 失败，该地址不支持
            window.alert('对不起，该地址暂未开通线上订奶服务')
            self.working = false
            return false
          }
        )
      },

      createOrder: function (lng, lat) {
        var self = this
        self.$http.post('/subscribe/preorders', {
          name: self.user.nickname,
          phone: self.form.phone,
          district: self.form.area,
          address: self.form.address,
          longitude: lng,
          latitude: lat
        }).then(
          function () {
            // 成功，进入充值
            console.log('success')
            self.$route.router.go('/subscribe/step2')
          },
          function () {
            // 失败，网络出错
            window.alert('网络出错，请刷新重试')
            self.working = false
          }
        )
      },

      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      }
    },

    route: {
      activate: function (transition) {
        this.$http.get('/subscribe/preorders').then(
          function ({data: {data: preorder}}) {
            if (!preorder.length) {
              transition.next()
            } else {
              if (preorder[0].status === 'assigning' && preorder[0].charge_status === 0) {
                transition.redirect('/subscribe/step2')
              } else {
                transition.redirect('/subscribe/step3')
              }
            }
          },
          function (data) {
            window.alert('获取订单失败,请刷新重试')
            transition.redirect('/subscribe/init')
          }
        )
      },
      data: function () {
        return this.$http.get('/subscribe/districts').then(
          function ({data: {data: districts}}) {
            console.log(districts)
            return {
              districts: districts
            }
          },
          function (data) {
            console.log(data)
          }
        )
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
</style>
