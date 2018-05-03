<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/products/cats/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建分类
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row" v-if="!$loadingRouteData">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">分类列表</h3>

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
              <th>商品分类名称</th>
              <th>商品数量</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="category in categories">
              <td>
                <img :src="category.cover_image" alt="" class="thumbnail" width="32">
              </td>
              <td>{{category.name}}</td>
              <td>{{category.item_count}}</td>
              <td>{{category.created_at}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/products/cats/edit/' + category.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a href="#" type="button" class="btn btn-default btn-sm" @click.prevent="delete(category)">删除</a>
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
    name: 'ProductCategoryList',
    data () {
      return {
        categories: []
      }
    },
    route: {
      data () {
        return {
          categories: api.categories.getAll()
        }
      }
    },
    methods: {
      delete (category) {
        var self = this
        if (window.confirm('确定要删除此分类?')) {
          api.categories.delete(category.id).then(function () {
            self.categories.$remove(category)
          })
        }
      }
    }
  }
</script>
