<template>
  <div class="row">
    <div class="col-md-4">
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">{{station.name}}</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table no-border">
            <tbody>
            <tr>
              <td><span class=""><i class="fa fa-user"></i></span></td>
              <td>{{station.director}}</td>
            </tr>
            <tr>
              <td><span class=""><i class="fa fa-home"></i></span></td>
              <td>{{station.tel}}</td>
            </tr>
            <tr>
              <td><span class=""><i class="fa fa-phone"></i></span></td>
              <td>{{station.phone}}</td>
            </tr>
            <tr>
              <td><span class=""><i class="fa fa-location-arrow"></i></span></td>
              <td>{{station.address}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <div class="box box-solid">
        <div class="box-header with-border">
          <i class="fa fa-bank"></i>

          <h3 class="box-title">绑定二维码</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <img width="100%" :src="'http://qr.liantu.com/api.php?text=' + qrcode_url" alt="">
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <div class="col-md-8">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">绑定帐号</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="text" class="form-control pull-right" id="reservation">
              <div class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>No.</th>
              <th>微信头像</th>
              <th>微信昵称</th>
              <th>操作</th>
            </tr>
            <tr v-for="user in station.user">
              <td>{{$index + 1}}</td>
              <td><img width="30" :src="user.avatar" alt=""></td>
              <td>{{user.nickname}}</td>
              <td>
                <button @click.prevent="unbind(user.id)" class="btn btn-sm btn-primary">解绑</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <!--<div class="box-footer">-->
        <!--<button class="btn btn-default btn-sm">导出</button>-->
        <!--<ul class="pagination pagination-sm no-margin pull-right">-->
        <!--<li><a href="#">«</a></li>-->
        <!--<li><a href="#">1</a></li>-->
        <!--<li><a href="#">2</a></li>-->
        <!--<li><a href="#">3</a></li>-->
        <!--<li><a href="#">»</a></li>-->
        <!--</ul>-->
        <!--</div>-->
      </div>
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">订单明细</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="text" class="form-control pull-right" id="reservation">
              <div class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>起送日期时间</th>
              <th>用户名</th>
              <th>手机号</th>
              <th>地址</th>
              <th>配送员</th>
              <th>状态</th>
              <th>下单日期</th>
            </tr>
            <tr v-for="order in orders">
              <td>{{order.start_time}}</td>
              <td>{{order.name}}</td>
              <td>{{order.phone}}</td>
              <td>{{order.address}}</td>
              <td>{{order.staff.id}}</td>
              <td>
                <span class="label label-warning" v-if="order.status == 'assigning'">等待分配</span>
                <span class="label label-success" v-if="order.status == 'shipping'">正常</span>
                <span class="label label-danger" v-if="order.status == 'unpaid'">未付款</span>
              </td>
              <td>{{order.created_at.date | date}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <!--<div class="box-footer">-->
        <!--<button class="btn btn-default btn-sm">导出</button>-->
        <!--<ul class="pagination pagination-sm no-margin pull-right">-->
        <!--<li><a href="#">«</a></li>-->
        <!--<li><a href="#">1</a></li>-->
        <!--<li><a href="#">2</a></li>-->
        <!--<li><a href="#">3</a></li>-->
        <!--<li><a href="#">»</a></li>-->
        <!--</ul>-->
        <!--</div>-->
      </div>
    </div>
    <!-- ./col -->
  </div>
</template>

<script>
  import api from 'api/index.js'
  import { STATION_DOMAIN } from 'src/config'
  export default {
    name: 'StationDetail',
    data () {
      return {
        station: {},
        districts: [],
        orders: []
      }
    },
    computed: {
      'qrcode_url' () {
        return STATION_DOMAIN + '/bind/' + this.station.id + '?bind_token=' + this.station.bind_token
      }
    },
    route: {
      data ({to: {params: {station_id}}}) {
        return {
          station: api.stations.get(station_id),
          districts: api.stations.getDistricts(),
          orders: api.stations.orders.getByStation(station_id)
        }
      }
    },
    methods: {
      unbind: function (userId) {
        if (window.confirm('确定解绑改用户?')) {
          api.stations.unbind(this.station.id, userId).then(function () {
            window.alert('解绑成功!')
            window.location.reload()
          })
        }
      }
    }
  }
</script>
