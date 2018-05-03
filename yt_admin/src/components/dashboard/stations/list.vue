<template>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">服务部列表</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <div class="dataTables_wrapper form-inline dt-bootstrap">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th>No.</th>
                <th>名称</th>
                <th>KPI</th>
                <th>区域</th>
                <th>负责人</th>
                <th>联系电话</th>
                <th>固话</th>
                <th>地址</th>
                <th>操作</th>
              </tr>
              <tr is="StationItem" v-for="station in filterStations" :districtslist="districtsList" :station="station"
                  :index="$index"></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- /.box-body -->
        <div class="box-footer">
          <!--<ul class="pagination pagination-sm no-margin pull-right">-->
          <!--<li><a href="#">«</a></li>-->
          <!--<li><a href="#">1</a></li>-->
          <!--<li><a href="#">2</a></li>-->
          <!--<li><a href="#">3</a></li>-->
          <!--<li><a href="#">»</a></li>-->
          <!--</ul>-->
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import StationItem from './item.vue'
  export default {
    name: 'ListStations',
    components: {StationItem},
    data () {
      return {
        stations: [],
        districts: []
      }
    },
    computed: {
      filterStations () {
        if (window._user.roles.indexOf('StationContact') > -1 && window._user.associateStations) {
          var associateStations = window._user.associateStations.split(',')
          var temp = []
          this.stations.forEach(function (val) {
            if (associateStations.indexOf(val.id.toString()) > -1) {
              temp.push(val)
            }
          })
          return temp
        } else {
          return this.stations
        }
      },
      districtsList () {
        var list = {}
        this.districts.map(function (val, key) {
          list[val.id] = val
        })
        return list
      }
    },
    route: {
      data () {
        return {
          districts: api.stations.getDistricts(),
          stations: api.stations.getAll()
        }
      }
    },
    methods: {
      remove (station) {
        var self = this
        if (window.confirm('确认要删除该服务部?')) {
          api.stations.delete(station.id).then(function () {
            self.stations.$remove(station)
          })
        }
      }
    }
  }
</script>
