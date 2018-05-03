<template>
  <gallery :limit="5" :images.sync="images"></gallery>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab"
                                                    data-toggle="tab">基本信息</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">行政区</label>
                      <div class="col-sm-6">
                        <select class="select mb20" v-model="residence.district_id">
                          <option selected disabled value="">-- 选择区域 --</option>
                          <option v-for="district in districts" :value="district.id">{{district.name}}</option>
                        </select>
                      </div>
                    </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">小区名称</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="residence.name">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">别名（以半角英文逗号分割多个别名）</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="residence.aliases">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">目标单数</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="residence.goal">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-footer">
                <button @click.prevent="submit" type="submit" class="btn btn-info pull-right">保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'CreateResidence',
    data: function () {
      return {
        limitTimeSales: false,
        residence: {
          district_id: '',
          name: '',
          aliases: '',
          goal: 0
        }
      }
    },
    route: {
      data () {
        return {
          districts: api.stations.getDistricts()
        }
      }
    },
    methods: {
      submit () {
        var self = this
        api.residences.create(this.residence).then(function (da) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/stations/residences/list')
        })
      }
    }
  }
</script>
<style>
  .mb20 {
    margin-bottom: 20px;
  }

  .cover-mask {
    position: absolute;
    top: 0;
    left: 15px;
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .thumbnail-mask .cover-mask {
    display: none;
  }

  .thumbnail-mask:hover .cover-mask {
    display: block;
  }

  .cover-label {
    position: absolute;
    top: 0;
    left: 15px;
    background: #00cc3d;
    color: #fff;
    padding: 2px 5px;
    font-size: 12px;
  }
</style>
