<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/banners/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建banner
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">banner管理</h3>
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
              <th>名称</th>
              <th>banner链接</th>
              <th>操作</th>
            </tr>
            <tr v-for="banner in banners">
              <td>{{$index + 1}}</td>
              <td><img :src="banner.cover_image" alt="" width="50"></td>
              <td>{{banner.title}}</td>
              <td><a href="{{banner.url}}">右键复制链接</a></td>
              <td>
                <a v-link="{path: '/dashboard/stations/banners/detail/' + banner.id}">编辑</a>
                <a @click="remove(banner.id, $index)">删除</a>
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
    name: 'ListBanners',
    data () {
      return {}
    },
    route: {
      data () {
        return {
          banners: api.banners.list({params: {'type': 'slider'}})
        }
      }
    },
    methods: {
      changeStatus (bannerId, status) {
        api.banners.changeStatus(bannerId, status).then(function (data) {
          window.alert('修改成功')
          window.location.reload()
        }, function (error) {
          console.log(error)
          window.alert('修改失败, 请重试!')
          window.location.reload()
        })
      },
      remove (id, index) {
        if (window.confirm('确定要删除该banner?')) {
          api.banners.remove(id).then(() => {
            this.banners.splice(index, 1)
          })
        }
      }
    }
  }
</script>
