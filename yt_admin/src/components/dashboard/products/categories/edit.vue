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
                      <option value="0" :selected="category.pid == 0">无</option>
                      <option value="{{cat.id}}" v-for="cat in categories" :selected="cat.id == category.pid">
                        {{cat.name}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">分类小图</label>
                  <div class="col-sm-6">
                    <gallery v-if="!bigimg" :limit="1" :coverlimit="1" :url.sync="category.cover_image"></gallery>
                    <gallery v-else :limit="1" :coverlimit="1" :url.sync="category.big_image"></gallery>
                    <button type="button" class="btn btn-danger mb20" @click.mousedown="bimg(false)" @click="openGallery()">上传小图</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3">
                        <div href="#" class="thumbnail thumbnail-mask" v-if="category.cover_image">
                          <img :src="category.cover_image" alt="" width="64">
                          <!--<span class="cover-delete">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                          </span>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">分类大图</label>
                  <div class="col-sm-6">
                    <!--<gallery v-else :limit="1" :coverlimit="1" :url.sync="category.big_image"></gallery>-->
                    <button type="button" class="btn btn-danger mb20" @click.mousedown="bimg(true)" @click="openGallery()">上传大图</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3">
                        <div href="#" class="thumbnail thumbnail-mask" v-if="category.big_image">
                          <img :src="category.big_image" alt="" width="64">
                          <!--<span class="cover-delete">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                          </span>-->
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
    name: 'EditProductCategory',
    components: [Gallery],
    computed: {
      valid () {
        return this.category.name.length > 1 && this.category.cover_image !== ''
      }
    },
    data () {
      return {
      		bigimg:true,
        category: {},
        categories: []
      }
    },
    route: {
      data ({to: {params: {cat_id}}}) {
        return {
          categories: api.categories.getAll(),
          category: api.categories.get(cat_id)
        }
      }
    },
    methods: {
    	bimg(typeimg){
    		this.bigimg=typeimg
    	},
      openGallery () {
        this.$broadcast('openGallery')
      },
     
      submit () {
        var self = this
        api.categories.update(this.category).then(function () {
          window.alert('保存成功!')
          self.$route.router.go('/dashboard/products/cats/list')
        }, function (error) {
          console.error(error)
          window.alert('保存失败!')
          self.$route.router.go('/dashboard/products/cats/list')
        })
      }
    }
  }
</script>
