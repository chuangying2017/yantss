<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/products/groups/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建分组
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">分组列表</h3>

          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

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
              <th>封面</th>
              <th>商品分组名称</th>
              <th>商品数量</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="group in groups">
              <td>
                <img :src="group.cover_image" alt="" class="thumbnail" width="32">
              </td>
              <td>{{group.name}}</td>
              <td>{{group.item_count}}</td>
              <td>{{group.created_at}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/products/groups/edit/' + group.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a href="#" type="button" class="btn btn-default btn-sm" @click.prevent="remove(group)">删除</a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <ul class="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ProductGroupList',
    data () {
      return {
        groups: []
      }
    },
    route: {
      data () {
        return {
          groups: api.groups.getAll()
        }
      }
    },
    methods: {
      remove (group) {
        var self = this
        if (window.confirm('确定要删除此分组?')) {
          api.groups.delete(group.id).then(function () {
            self.groups.$remove(group)
          })
        }
      }
    }
  }
</script>
