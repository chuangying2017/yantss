<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/packets/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建红包规则
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">红包规则管理</h3>
          <!--<div class="box-tools">-->
          <!--<div class="input-group input-group-sm" style="width: 150px;">-->
          <!--<input type="text" name="table_search" class="form-control pull-right" placeholder="微信昵称">-->

          <!--<div class="input-group-btn">-->
          <!--<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>名称</th>
              <th>类型</th>
              <th>描述</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>数量</th>
              <th>有效日期</th>
              <th>操作</th>
            </tr>
            <tr v-for="packet in packets">
              <td>{{$index + 1}}</td>
              <td>{{packet.name}}</td>
              <td>{{packet.type_name}}</td>
              <td>{{packet.desc}}</td>
              <td>{{packet.start_time}}</td>
              <td>{{packet.end_time}}</td>
              <td>{{packet.quantity}}</td>
              <td>{{packet.effect_days}}天</td>
              <td>
                <a v-link="{path: '/dashboard/stations/packets/detail/' + packet.id}">编辑</a>
                <a @click.prevent="changeStatus(packet.id, 'unactive')" v-if="packet.status == 1">暂停</a>
                <a @click.prevent="changeStatus(packet.id, 'active')" v-if="packet.status == 2">启用</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">

        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListPackets',
    data () {
      return {}
    },
    route: {
      data () {
        return {
          packets: api.packets.list()
        }
      }
    },
    methods: {
      changeStatus (packetId, status) {
        api.packets.changeStatus(packetId, status).then(function (data) {
          window.alert('修改成功')
          window.location.reload()
        }, function (error) {
          console.log(error)
          window.alert('修改失败, 请重试!')
          window.location.reload()
        })
      }
    }
  }
</script>
