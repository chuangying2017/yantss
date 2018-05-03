<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/activities/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建活动
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">活动管理</h3>
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
              <th>封面</th>
              <th>活动ID</th>
              <th>名称</th>
              <th>描述</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>活动链接</th>
              <th>操作</th>
            </tr>
            <tr v-for="activity in activities">
              <td>{{$index + 1}}</td>
              <td><img :src="activity.cover_image" alt="" width="50"></td>
              <td>{{activity.id}}</td>
              <td>{{activity.name}}</td>
              <td>{{activity.desc}}</td>
              <td>{{activity.start_time}}</td>
              <td>{{activity.end_time}}</td>
              <td><a href="{{activity.url}}">右键复制链接</a></td>
              <td>
                <a v-link="{path: '/dashboard/stations/activities/detail/' + activity.id}">编辑</a>
                <a @click.prevent="changeStatus(activity.id, 'unactive')" v-if="activity.status == 1">暂停</a>
                <a @click.prevent="changeStatus(activity.id, 'active')" v-if="activity.status == 2">启用</a>
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
    name: 'ListActivities',
    data () {
      return {}
    },
    route: {
      data () {
        return {
          activities: api.activities.list()
        }
      }
    },
    methods: {
      changeStatus (activityId, status) {
        api.activities.changeStatus(activityId, status).then(function (data) {
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
