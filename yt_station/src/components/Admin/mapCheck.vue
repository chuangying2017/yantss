<template>
  <div class="map-wrap">
    <div id="map"></div>
    <div class="btn-groups">
      <input type="button" class="button" value="绘图" id="polygon" @click.prevent="draw"/>
      <input type="button" class="button" value="全局绘图" id="polygonAll" @click.prevent="drawAll"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MapCheck',

    props: ['area', 'locate', 'district', 'all'],

    computed: {
      stations: function () {
        if (this.all.length === 0) {
          return
        }
        var newStation = []
        for (var s = 0; s < this.all.length; s++) {
          if (this.all[s].geo.length > 4) {
            var newArr = {
              name: '',
              geos: []
            }
            newArr.name = this.all[s].name
            for (var i = 0; i < this.all[s].geo.length; i++) {
              var item = []
              item.push(this.all[s].geo[i][1])
              item.push(this.all[s].geo[i][0])
              newArr.geos.push(item)
            }
            newStation.push(newArr)
          } else {
            var newShortArr = {
              name: '',
              geos: []
            }
            newArr.name = this.all[s].name
            for (var m = 0; m < this.all[s].geo.length; m++) {
              var arr = []
              for (var n = 0; n < this.all[s].geo[m].length; n++) {
                var current = []
                current.push(this.all[s].geo[m][n][1])
                current.push(this.all[s].geo[m][n][0])
                arr.push(current)
              }
              newShortArr.geos.push(arr)
            }
            newStation.push(newShortArr)
          }
        }
        return newStation
      }
    },

    methods: {
      exchangePosition: function (arr) {
        var newArr
        newArr.push(arr[1])
        newArr.push(arr[0])
        return newArr
      },
      draw: function () {
//        var self = this
        if (!this.area.length) {
          window.alert('请选择一个服务部')
          return false
        }
        window.map = new window.AMap.Map('map', {
          resizeEnable: true,
          zoom: 11,
          center: [113.3223163, 23.1496839]
        })
        if (this.locate.length !== 0 && this.district) {
          console.log(123)
          window.marker = new window.AMap.Marker({
            map: window.map,
            position: this.locate
          })
          this.$http.get('/test/address/check?district_id=' + this.district + '&longitude=' + this.locate[1] + '&latitude=' + this.locate[0]).then(
            function (data) {
              window.alert('该地址由' + data.data.name + '进行配送')
            },
            function (data) {
              window.alert('该地址暂未开通配送服务')
            }
          )
        }
        var path = this.area
        var polyObj = {}
        if (path.length < 4) {
          for (var n = 0; n < path.length; n++) {
            polyObj[n] = new window.AMap.Polygon({
              map: window.map,
              path: path[n],
              fillOpacity: 0.3
            })
          }
        } else {
          var polygon = new window.AMap.Polygon({
            map: window.map,
            path: path,
            fillOpacity: 0.3
          })
          console.log(polygon)
        }
        window.map.setFitView()
      },
      drawAll: function () {
        var self = this
        window.map = new window.AMap.Map('map', {
          resizeEnable: true,
          zoom: 11,
          center: [113.3223163, 23.1496839]
        })
        if (this.locate.length !== 0 && this.district) {
          console.log(123)
          window.marker = new window.AMap.Marker({
            map: window.map,
            position: this.locate
          })
          this.$http.get('/test/address/check?district_id=' + this.district + '&longitude=' + this.locate[1] + '&latitude=' + this.locate[0]).then(
            function (data) {
              window.alert('该地址由' + data.data.name + '进行配送')
            },
            function (data) {
              window.alert('该地址暂未开通配送服务')
            }
          )
        }
        var _onClick = function (e) {
          self.$dispatch('currentArea', e.target.getExtData())
        }
        var polyObj = {}
        for (var s = 0; s < this.stations.length; s++) {
          if (this.stations[s].geos.length < 4) {
            for (var t = 0; t < this.stations[s].geos.length; t++) {
              polyObj[s] = {}
              polyObj[s][t] = new window.AMap.Polygon({
                map: window.map,
                path: this.stations[s].geos[t],
                fillOpacity: 0.3,
                extData: this.stations[s].name
              })
            }
          } else {
            polyObj[s] = new window.AMap.Polygon({
              map: window.map,
              path: this.stations[s].geos,
              fillOpacity: 0.3,
              extData: this.stations[s].name
            })
            window.AMap.event.addListener(polyObj[s], 'mouseover', _onClick)
          }
        }
        window.map.setFitView()
      }
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  .btn-groups {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .button {
    -webkit-appearance: none;
    border: 0 none;
    background: #5DACFF;
    border-radius: 3px;
    outline: none;
    color: #fff;
    padding: 1rem;
  }

  .map-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
