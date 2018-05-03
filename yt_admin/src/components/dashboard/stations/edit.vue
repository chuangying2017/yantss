<template>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">服务部详情</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">服务部名称</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="station.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">所属区域</label>
                  <div class="col-sm-6">
                    <select name="" id="" class="form-control" v-model="station.district_id">
                      <option :selected="district.id == station.district_id" value="{{district.id}}"
                              v-for="district in districts">{{district.name}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">服务部地址</label>
                  <div class="col-sm-6">
                    <textarea type="text" class="form-control" v-model="station.address"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">负责人</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="station.director">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">负责人手机</label>

                  <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="station.phone">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">服务部电话</label>
                  <div class="col-sm-6">
                    <input type="tel" class="form-control" v-model="station.tel">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">店面图片</label>
                  <div class="col-sm-6">
                    <gallery :limit="1" :url.sync="station.cover_image"></gallery>
                    <button type="button" class="btn btn-danger mb20" @click="openGallery">上传图片</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3" v-if="station.cover_image">
                        <div href="#" class="thumbnail thumbnail-mask">
                          <img :src="station.cover_image" alt="" width="64">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button @click.prevent="submit" type="submit" class="btn btn-danger pull-right">保存</button>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Gallery from 'components/gallery/index.vue'
  export default {
    name: 'EditStation',
    components: [Gallery],
    data () {
      return {
        station: {},
        districts: []
      }
    },
    route: {
      data ({to: {params: {station_id}}}) {
        return {
          station: api.stations.get(station_id),
          districts: api.stations.getDistricts()
        }
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.stations.update(this.station).then(function () {
          window.alert('更新成功!')
          self.$route.router.go('/dashboard/stations/list')
        })
      }
    }
  }
</script>
