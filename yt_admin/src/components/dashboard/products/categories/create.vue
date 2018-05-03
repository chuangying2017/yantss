<template>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">创建分类</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">分类名称</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="category.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">优先级</label>

                  <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="category.priority" number>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">父级分类</label>
                  <div class="col-sm-6">
                    <select class="form-control" v-model="category.pid" number>
                      <option value="0">无</option>
                      <option value="{{cat.id}}" v-for="cat in categories">{{cat.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">分类图片</label>
                  <div class="col-sm-6">
                    <gallery :limit="1" :url.sync="category.cover_image"></gallery>
                    <button type="button" class="btn btn-danger mb20" @click="openGallery">上传图片</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3">
                        <div href="#" class="thumbnail thumbnail-mask" v-if="category.cover_image">
                          <img :src="category.cover_image" alt="" width="64">
                          <span class="cover-delete">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right" @click.prevent="submit" :disabled="!valid">保存
            </button>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Gallery from 'components/gallery/index.vue'
  export default {
    name: 'CreateProductCategory',
    components: [Gallery],
    computed: {
      valid () {
        return this.category.name.length > 1 && this.category.cover_image !== ''
      }
    },
    data () {
      return {
        category: {
          name: '',
          pid: 0,
          cover_image: '',
          priority: 1,
          desc: ''
        },
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
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.categories.create(this.category).then(function () {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/products/cats/list')
        }, function (error) {
          console.error(error)
          window.alert('创建失败!')
          self.$route.router.go('/dashboard/products/cats/list')
        })
      }
    }
  }
</script>
