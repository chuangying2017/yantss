<template>
  <div class="mapCheck">
    <div class="m-head">
      <div class="item">
        <p>查看服务区域</p>
        <a v-link="{ path: '/admin/logout' }">登出</a>
        <a v-link="{ path: '/admin/create' }">创建服务部</a>
        <a v-link="{ path: '/admin/edit' }">编辑服务区域</a>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-1-5">
        <div class="pd10">
          <p class="title">选择一个服务部:</p>
          <select class="select" v-model="selectedStation">
            <option selected disabled value="">-- 请选择一个服务部 --</option>
            <option v-for="station in stations | orderBy 'name'" :value="station">
              {{station.name}}
            </option>
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
          <!--<textarea v-model="area" class="areaGeo"></textarea>-->
          <p class="title">输入测试的地址:</p>
          <select class="select mb20" v-model="district">
            <option selected disabled value="">-- 选择区域 --</option>
            <option v-for="district in districts" :value="district.id">{{district.name}}</option>
          </select>
          <input class="input" v-model="address" placeholder="地址"/>
          <button type="submit" class="btn btn-success btn-round mt20" @click.prevent="getLocate">获取地理位置</button>
          <p class="title">地址位置坐标:{{locate | json}}</p>
          <p class="title">当前的服务部: {{currentStation}}</p>
        </div>
      </div>
      <div class="pure-u-4-5">
        <map-check :area="geos" :locate="locate" :district="district" :all="stations"></map-check>
      </div>
    </div>
  </div>
</template>

<script>
  import mapCheck from './mapCheck.vue'

  export default {
    name: 'MapCheck',

    components: {
      mapCheck
    },

    data: function () {
      return {
        area: '',
        locate: [],
        address: '',
        stations: [],
        selectedStation: {},
        district: null,
        currentStation: ''
      }
    },

    computed: {
      geos: function () {
        var geos = []
        if (!this.selectedStation.geo) {
          return []
        }
        var area = this.selectedStation.geo
        if (area.length < 4) {
          for (var j = 0; j < area.length; j++) {
            var arr = []
            for (var k = 0; k < area[j].length; k++) {
              var current = []
              current.push(area[j][k][1])
              current.push(area[j][k][0])
              arr.push(current)
            }
            geos.push(arr)
          }
        } else {
          for (var i = 0; i < area.length; i++) {
            var item = []
            item[0] = area[i][1]
            item[1] = area[i][0]
            geos.push(item)
          }
        }
        return geos
      }
    },

    methods: {
      getLocate: function () {
        var self = this
        var array = []
        var geocoder = new window.AMap.Geocoder({
          radius: 200
        })
        var searchCity = '广州市'
        if (this.district === 440201) {
          searchCity = '佛山市'
        }
        geocoder.getLocation(searchCity + this.address, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            array[1] = result.geocodes[0].location.lat
            array[0] = result.geocodes[0].location.lng
            self.locate = array
          } else {
            console.log('error')
          }
        })
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
          },
          function (error) {
            window.alert(error)
          }
        )
      }
    },

    events: {
      'currentArea': function (station) {
        this.currentStation = station
      }
    }
  }
</script>

<style>
  .mapCheck {
    width: 100%;
    height: 100%;
  }

  .mapCheck .title {
    font-size: 1.4rem;
    margin: 1rem 0 1rem 1rem;
  }

  .pure-g {
    width: 100%;
    height: 100%;
  }

  .areaGeo {
    height: 30rem;
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
