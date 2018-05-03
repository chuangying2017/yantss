<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/products/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建商品
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">筛选</h3>
        </div>
        <div class="box-body">
          <form action="" class="form-horizontal">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">上下架状态</label>
                  <div class="col-sm-8">
                    <select name="" id="" class="form-control" v-model="query.status" v-on:change="changeStatus">
                      <option value="down">下架</option>
                      <option value="up">上架</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">商品列表 ({{pagination.total}})</h3>

          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="Search"
                     v-model="query.keyword">

              <div class="input-group-btn">
                <button type="submit" class="btn btn-default" @click.prevent="search"><i class="fa fa-search"></i>
                </button>
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
              <th>封面</th>
              <th>商品名称</th>
              <th>价格</th>
              <th>库存</th>
              <th>销量</th>
              <th>序号</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="product in products">
              <td>{{$index + 1}}</td>
              <td>
                <img :src="product.cover_image" alt="" class="thumbnail" width="32">
              </td>
              <td>{{product.title}}</td>
              <td>{{product.price}}</td>
              <td>{{product.meta.stock}}</td>
              <td>{{product.meta.sales}}</td>
              <td>{{product.priority}}</td>
              <td>{{product.created_at.date | date}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/products/edit/' + product.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <a @click.prevent="remove(product)" type="button" class="btn btn-default btn-sm">删除</a>
                  <a @click.prevent="action('down', product)" href="#" type="button"
                     class="btn btn-default btn-sm" v-if="query.status=='up'">下架</a>
                  <a @click.prevent="action('up', product)" href="#" type="button"
                     class="btn btn-default btn-sm" v-else>上架</a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <select v-on:change="jump" v-model="goTo" v-if="pagination.total_pages > 1">
            <option value="{{page}}" v-for="page in pagination.total_pages">{{page}}</option>
          </select>
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
        goTo: 1,
        query: {
          type: 'entity',
          status: 'up',
          keyword: '',
          page: 1
        },
        products: [],
        pagination: {}
      }
    },
    route: {
      data (transition) {
        if (transition.to.query.page) {
          this.query.page = transition.to.query.page
        }
        return api.products.getAll(this.query).then(function ({data: products, meta: {pagination: pagination}}) {
          return {
            products: products,
            pagination: pagination
          }
        })
      }
    },
    methods: {
      jump () {
        this.$route.router.go('/dashboard/products/list?page=' + this.goTo)
      },
      load () {
        var self = this
        api.products.getAll(this.query).then(function ({data: products, meta: {pagination: pagination}}) {
          self.products = products
          self.pagination = pagination
        })
      },
      remove (product) {
        var self = this
        if (window.confirm('删除此商品会导致关联的商品组不能使用, 确认删除?')) {
          api.products.delete(product.id).then(function () {
            self.products.$remove(product)
          })
        }
      },
      changeStatus () {
        this.load()
      },
      search () {
        this.load()
      },
      action (action, product) {
        var self = this
        api.products.status(action, product.id).then(function () {
          self.products.$remove(product)
        })
      }
    }
  }
</script>
