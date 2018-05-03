<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/products/packages/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建组合
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
          <h3 class="box-title">组合列表</h3>

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
              <th>商品组合名称</th>
              <th>价格</th>
              <th>库存</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="product in products">
              <td>
                <img :src="product.cover_image" alt="" class="thumbnail" width="32">
              </td>
              <td>{{product.title}}</td>
              <td>{{product.price}}</td>
              <td>{{product.meta.stock}}</td>
              <td>{{product.meta.sales}}</td>
              <td>{{product.priority}}</td>
              <td>{{product.created_at.date}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/products/edit/' + product.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a @click.prevent="remove(product)" type="button" class="btn btn-default btn-sm">删除</a>
                  <a href="#" type="button" class="btn btn-default btn-sm">下架</a>
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
    name: 'ProductList',
    data () {
      return {
        products: [],
        pagination: {}
      }
    },
    route: {
      data () {
        return api.products.getAll({
          type: 'mix'
        }).then(function ({data: products, meta: {pagination: pagination}}) {
          return {
            products: products,
            pagination: pagination
          }
        })
      }
    },
    methods: {
      remove (product) {
        var self = this
        if (window.confirm('确定要删除此商品?')) {
          api.products.delete(product.id).then(function () {
            self.products.$remove(product)
          })
        }
      }
    }
  }
</script>
