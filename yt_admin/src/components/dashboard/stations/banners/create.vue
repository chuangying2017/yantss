<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">创建Banner</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">名称</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="banner.title">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">图片</label>
                  <div class='col-sm-8'>
                    <gallery :limit='1' :url.sync='banner.cover_image'></gallery>
                    <button type='button' class='btn btn-danger mb20' @click.prevent='openGallery'>上传图片</button>
                    <div class='row'>
                      <div class='col-xs-6 col-md-6' v-show='banner.cover_image'>
                        <div href='#' class='thumbnail thumbnail-mask'>
                          <img :src='banner.cover_image' alt='' id="content" style="display: none;max-width: 600px;">
                          <a data-src="#content" data-fancybox>
                            <img :src='banner.cover_image' alt=''>
                          </a>
                          <!--<a class='fancybox' data-fancybox="images" :href="banner.cover_image">-->
                          <!--<img :src='banner.cover_image' alt=''>-->
                          <!--</a>-->
                          <span class='cover-delete' @click.prevent="banner.cover_image = ''"><span
                            class='glyphicon glyphicon-remove' aria-hidden='true'></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">跳转链接</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="banner.url">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">顺序</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="banner.index">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" :disabled="!formValid" class="btn btn-danger left" @click.prevent="submit">保存
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
    name: 'CreateBanner',
    components: [Gallery],
    data () {
      return {
        banner: {
          title: '',
          type: 'slider',
          cover_image: '',
          url: '',
          index: 1
        }
      }
    },
    computed: {
      formValid () {
        return this.banner.title.length > 0 && this.banner.cover_image.length > 0 && this.banner.url.length > 0
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.banners.create(this.banner).then(function (data) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/stations/banners/list')
        }, function () {
          window.alert('创建失败!')
        })
      }
    }
  }
</script>
