<template>
  <div class="map-wrap">
    <div id="map"></div>
    <div class="btn-groups">
      <input type="button" class="button" value="鼠标绘制区域" id="polygon" @click.prevent="startMap()"/>
      <input type="button" class="button" value="删除绘制区域" id="polyDel" @click.prevent="deleteMap()"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MapGrab',

    ready: function () {
      /* eslint-disable*/
      var self = this
      window.map = new window.AMap.Map('map', {
        resizeEnable: true,
        zoom: 11,
        center: [113.3223163, 23.1496839]
      })
      window.mouseTool = new AMap.MouseTool(map)
      window.AMap.event.addDomListener(document.getElementById('polygon'), 'click', function (e) {
        window.polygon = window.mouseTool.polygon()
      }, false)
    },

    methods: {
      startMap: function () {
        var self = this
        self.$dispatch('mapStart')
        window.clickListener = window.AMap.event.addListener(map, "click", function (e) {
          self.$dispatch('mapDraw', [e.lnglat.getLat(), e.lnglat.getLng()])
        })
        console.log(window.clickListener)
      },
      deleteMap: function () {
        var self = this
        window.mouseTool.close(true)
        this.$dispatch('cancelDraw')
        if (window.clickListener) {
          window.AMap.event.removeListener(window.clickListener)
        }
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
