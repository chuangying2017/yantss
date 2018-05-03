<template>
  <div class="pure-g m-wrap">
    <div class="pure-u-1-4">
      <div class="m-head">
        <div class="item">
          <p>编辑服务部</p>
          <a v-link="{ path: '/admin/logout' }">登出</a>
          <a v-link="{ path: '/admin/create' }">创建服务部</a>
          <a v-link="{ path: '/admin/check' }">查看服务区域</a>
        </div>
      </div>
      <div class="pt40">
        <div class="m-user">
          <p class="title">选择一个商户:</p>
          <select class="select" v-model="selectedStation">
            <option v-for="station in stations | orderBy 'name'" :value="station">{{station.name}}</option>
          </select>
          <p class="title">
            该服务部属于:
            <span v-show="selectedStation.district_id == 440103">荔湾区</span>
            <span v-show="selectedStation.district_id === 440104">越秀区</span>
            <span v-show="selectedStation.district_id === 440105">海珠区</span>
            <span v-show="selectedStation.district_id === 440106">天河区</span>
            <span v-show="selectedStation.district_id === 440111">白云区</span>
            <span v-show="selectedStation.district_id === 440112">黄埔区</span>
            <span v-show="selectedStation.district_id === 440113">番禺区</span>
            <span v-show="selectedStation.district_id === 440114">花都区</span>
            <span v-show="selectedStation.district_id === 440115">南沙区</span>
            <span v-show="selectedStation.district_id === 440116">萝岗区</span>
            <span v-show="selectedStation.district_id === 440117">从化区</span>
            <span v-show="selectedStation.district_id === 440118">增城区</span>
          </p>
          <hr>
          <form v-form name="regForm" @submit.prevent="onSubmit">
            <input v-form-ctrl name="name" type="text" class="input" v-model="selectedStation.name" placeholder="请输入店名"
                   required>
            <label v-show="(regForm.name.$dirty || regForm.$submitted) && regForm.name.$invalid"
                   class="error">请正确填写店名</label><br>
            <input v-form-ctrl name="tel" type="text" class="input" v-model="selectedStation.tel" placeholder="请输入店内座机"
                   required>
            <label v-show="(regForm.tel.$dirty || regForm.$submitted) && regForm.tel.$invalid"
                   class="error">请正确填写座机</label><br>
            <input v-form-ctrl name="director" type="text" class="input" v-model="selectedStation.director"
                   placeholder="请输入负责人姓名"
                   required>
            <label v-show="(regForm.director.$dirty || regForm.$submitted) && regForm.director.$invalid"
                   class="error">请正确填写负责人</label><br>
            <input v-form-ctrl name="phone" type="tel" class="input" v-model="selectedStation.phone"
                   placeholder="请输入电话号码"
                   required
                   custom-validator="phoneVerified">
            <label v-show="(regForm.phone.$dirty || regForm.$submitted) && regForm.phone.$invalid"
                   class="error">请正确填写手机号码</label><br>
            <select v-form-ctrl name="district" v-model="selectedDist" id="" class="select mb20" required>
              <option value="" selected disabled>请选择地区</option>
              <option :value="district" v-for="district in districts">{{district.name}}</option>
            </select>
            <label v-show="(regForm.district.$dirty || regForm.$submitted) && regForm.district.$invalid"
                   class="error">编辑服务部请选择地区</label><br>
            <input v-form-ctrl name="address" type="text" class="input" v-model="selectedStation.address"
                   placeholder="请输入地址"
                   required disabled>
            <label v-show="(regForm.address.$dirty || regForm.$submitted) && regForm.address.$invalid"
                   class="error">请正确填写地址</label><br>
            <textarea class="mb20" style="height: 300px;" v-model="selectedStation.geo | json"></textarea>
            <button type="submit" class="btn btn-success btn-round" :disabled="editProcess">
              <span v-show="!createProcess">提交</span>
              <span v-show="createProcess">正在处理中...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="pure-u-3-4">
      <!--<map-grab></map-grab>-->
    </div>
  </div>
</template>

<style>
  .title {
    font-size: 1.4rem;
  }
</style>

<script>
  export default{
    name: 'Edit',

    data: function () {
      return {
        editProcess: false,
        regForm: {},
        selectedDist: {},
        stations: [],
        districts: [],
        geos: '',
        selectedStation: {
          director: '',
          active: 1,
          address: '',
          cover_image: '123',
          district_id: null,
          geo: [],
          id: null,
          latitude: '',
          longitude: '',
          name: '',
          phone: '',
          tel: ''
        }
      }
    },

    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/admin/stations'),
          this.$http.get('/subscribe/districts')
        ]).then(
          function ([
            {data: {data: stations}},
            {data: {data: districts}}
          ]) {
            return {
              stations: stations,
              districts: districts
            }
          }
        )
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        if (self.regForm.$invalid) {
          return
        }
        this.selectedStation.district_id = this.selectedDist.id
//        this.selectedStation.geo = JSON.parse(this.geos)
        this.$http.put('/admin/stations/' + this.selectedStation.id, this.selectedStation).then(
          function (data) {
            window.alert('编辑完成')
          },
          function () {
            window.alert('编辑失败')
          }
        )
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

  .m-wrap {
    width: 100%;
    height: 100%;
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
