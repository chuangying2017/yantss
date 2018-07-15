<template>
  <div class="row" v-if="!$loadingRouteData">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">分类管理</h3>
        </div>
        <div class="row">
          <div class="col-md-6 pl20">
            <a v-link="{path: '/dashboard/integral/addcategory'}" class="btn btn-social btn-info btn-sm mb20 mt20">
              <i class="fa fa-plus"></i> 添加新商品分类
            </a>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>ID</th>
              <th>显示顺序</th>
              <th>标题</th>
              <th>图标</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="cate in integral_data.integral_categories">
              <td>{{$index + 1}}</td>
              <td>{{cate.sort_type}}</td>
              <td>{{cate.title}}</td>
              <td><img class="imgC" :src="cate.cover_image"/> 礼品</td>
              <td><a @click.prevent="" type="button" class="btn btn-default btn-sm">隐藏</a></td>
              <td><a v-link="{path: '/dashboard/products/edit/' + cate.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                <a @click.prevent="remove(cate.id, $index)" type="button" class="btn btn-default btn-sm">删除</a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <!--<div class="box-footer">-->
        <!--<p>合计: {{pagination.total}}</p> 当前页:-->
        <!--<pagination :pagination="pagination" :goto="search"></pagination>-->
        <!--</div>-->
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Pagination from '../../../pagination.vue'

  export default {
    name: 'integral',
    components: {
      Pagination
    },
    data () {
      return {
        integral_data: []
      }
    },
    route: {
    data () {
      return {
        integral_data: api.integral.getAll()
      }
    }
    },
    methods: {
      remove: function (id, index) {
        var self = this;
        if (window.confirm('你确定要删除分类吗？')) {
          api.integral.remove(id).then(() => {
            console.log(self.integral_data)
            self.integral_data.integral_categories.splice(index, 1)
          })
        }
      }
    }
  }
</script>
<style>
  .imgC{
    width: 30px;
    height: 30px;
  }
  .pl20{
    padding-left: 20px;
  }
</style>
