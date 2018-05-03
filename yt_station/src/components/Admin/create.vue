<template>
  <div :class="{'blur': imgTag}" style="height: 100%;">
    <div class="pure-g m-wrap">
      <div class="pure-u-1-4">
        <div class="m-head">
          <div class="item">
            <p>创建新商户</p>
            <a v-link="{ path: '/admin/logout' }">登出</a>
            <a v-link="{ path: '/admin/edit' }">编辑服务部</a>
            <a v-link="{ path: '/admin/check' }">查看服务区域</a>
          </div>
        </div>
        <div class="pt40">
          <div class="m-user">
            <form v-form name="regForm" @submit.prevent="onSubmit">
              <input v-form-ctrl name="name" type="text" class="input" v-model="form.name" placeholder="请输入店名" required>
              <label v-show="(regForm.name.$dirty || regForm.$submitted) && regForm.name.$invalid"
                     class="error">请正确填写店名</label><br>
              <input v-form-ctrl name="tel" type="text" class="input" v-model="form.tel" placeholder="请输入店内座机"
                     required>
              <label v-show="(regForm.tel.$dirty || regForm.$submitted) && regForm.tel.$invalid"
                     class="error">请正确填写座机</label><br>
              <input v-form-ctrl name="director" type="text" class="input" v-model="form.director"
                     placeholder="请输入负责人姓名"
                     required>
              <label v-show="(regForm.director.$dirty || regForm.$submitted) && regForm.director.$invalid"
                     class="error">请正确填写负责人</label><br>
              <input v-form-ctrl name="phone" type="tel" class="input" v-model="form.phone" placeholder="请输入电话号码"
                     required
                     custom-validator="phoneVerified">
              <label v-show="(regForm.phone.$dirty || regForm.$submitted) && regForm.phone.$invalid"
                     class="error">请正确填写手机号码</label><br>
              <select v-form-ctrl name="district" v-model="selectedDist" id="" class="select mb20" required>
                <option value="" selected disabled>请选择地区</option>
                <option :value="district" v-for="district in districts">{{district.name}}</option>
              </select>
              <input v-form-ctrl name="address" type="text" class="input" v-model="form.address" placeholder="请输入地址"
                     required>
              <label v-show="(regForm.address.$dirty || regForm.$submitted) && regForm.address.$invalid"
                     class="error">请正确填写地址</label><br>
              <textarea class="mb20" style="height: 300px;">{{geos | json}}</textarea>
              <button type="submit" class="btn btn-success btn-round" :disabled="createProcess">
                <span v-show="!createProcess">提交</span>
                <span v-show="createProcess">正在处理中...</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="pure-u-3-4">
        <map-grab></map-grab>
      </div>
    </div>
  </div>
  <div v-show="imgTag" class="qrcode-mask">
    <div class="qr-table">
      <div class="qr-table-cell">
        <div class="qrwrap">
          {{{imgTag}}}
          <p class="text">扫描绑定商户</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import qrcode from 'qrcode-generator'
  import MapGrab from './mapGrab.vue'

  export default{
    name: 'Create',
    data: function () {
      return {
        bind_token: null,
        regForm: {},
        qrUrl: null,
        imgTag: null,
        form: {
          name: '',
          adderss: '',
          phone: '',
          director: '',
          cover_image: '',
          tel: ''
        },
        selectedDist: {},
        createProcess: false,
        geos: [],
        districts: []
      }
    },
    components: {
      qrcode,
      MapGrab
    },
    route: {
      data: function () {
        return this.$http.get('/subscribe/districts').then(
          function ({data: {data: districts}}) {
            return {
              districts: districts
            }
          },
          function () {
            window.alert('获取区域信息失败,请刷新重试')
          }
        )
      }
    },
    methods: {
      onSubmit: function () {
        var self = this
        this.createProcess = true
        if (this.regForm.$invalid) {
          return false
        }
        var geocoder = new window.AMap.Geocoder({
          city: '020',
          radius: 200
        })

        geocoder.getLocation(self.selectedDist.name + self.form.address, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            self.form.longitude = result.geocodes[0].location.lat
            self.form.latitude = result.geocodes[0].location.lng
            self.submitData()
          } else {
            console.log('error')
          }
        })
      },
      submitData: function () {
        var self = this
        var data = {
          name: self.form.name,
          desc: self.form.desc,
          director: self.form.director,
          address: self.form.address,
          tel: self.form.tel,
          phone: self.form.phone,
          cover_image: '123',
          longitude: self.form.longitude,
          latitude: self.form.latitude,
          geo: self.geos,
          district_id: self.selectedDist.id
        }
        self.$http.post('/admin/stations', data).then(
          function (data) {
            // 获取station的链接
            var url = 'http://yt.l43.cn/yt-station/#!/bind/' + data.data.data.id + '?' + 'bind_token=' + data.data.data.bind_token
            console.log(url)
            self.imgTag = self.makeQrcode(url, 6)
            self.createProcess = false
          },
          function () {
            window.alert('创建失败,请重新尝试')
            self.createProcess = false
            // fail
          }
        )
      },
      makeQrcode: function (url, type) {
        var qr = qrcode(type || 6, 'M')
        qr.addData(url)
        qr.make()
        return qr.createImgTag()
      },
      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      }
    },
    events: {
      mapDraw: function (arr) {
        this.geos.push(arr)
      },
      cancelDraw: function () {
        this.geos = []
      },
      mapStart: function () {
        this.geos = []
      }
    }
  }
</script>

<style scoped>
  .m-user form input {
    margin-bottom: 20px;
  }

  label.error {
    display: inline-block;
    text-align: center;
    color: red;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: -1rem;
  }

  .bindQR {
    width: 30%;
    margin: 0 auto;
    text-align: center;
  }

  .bindQR img {
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
  }

  .qrcode-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.6)
  }

  .qrcode-mask .qr-table {
    width: 100%;
    height: 100%;
    display: table;

  }

  .qrcode-mask .qr-table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .qrwrap {
    width: 30%;
    padding: 20px;
    margin: 0 auto;
    background: #fff;
    border-radius: 3px;
  }

  .qrwrap > img {
    width: 200px;
    height: 200px;
  }

  .blur {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }

  .m-head .item {
    text-align: center;
    float: none;
    width: 100%;
  }

  .m-head .item p {
    float: left;
    margin-left: 2rem;
  }

  .m-head .item a {
    float: right;
    color: #009e35;
    font-size: 1.4rem;
    margin-right: 2rem;
  }

  .m-wrap {
    width: 100%;
    height: 100%;
  }
</style>

