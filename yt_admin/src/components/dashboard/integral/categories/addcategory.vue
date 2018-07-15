<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab" data-toggle="tab">基本信息</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
                      <div class="col-sm-6">
                        <input type="number" class="form-control" v-model="integralData.sort_type" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">分类名称</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="integralData.title">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">分类图片</label>
                      <div class="col-sm-6">
                        <gallery :limit='1' :url.sync='integralData.cover_image'></gallery>
                        <button type="button" class="btn btn-danger mb20" @click="openGallery">上传图片</button>
                        <div class="row">
                          <div class='col-xs-6 col-md-3' v-show='integralData.cover_image'>
                            <div href='#' class='thumbnail thumbnail-mask'>
                              <img :src='integralData.cover_image' alt='' id="content" style="display: none;max-width: 300px;">
                              <a data-src="#content" data-fancybox>
                                <img :src='integralData.cover_image' alt=''>
                              </a>
                              <span class='cover-delete' @click="integralData.cover_image = ''">
                                <span class='glyphicon glyphicon-remove' aria-hidden='true'></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>

                      <div class="col-sm-8">
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="integralData.active" value="1" checked="checked">
                            是
                          </label>
                        </div>
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="integralData.active" value="0">
                            否
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label"></label>

                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  /* eslint-disable semi */

  import Gallery from '../../../gallery/index.vue'
  import Editor from '../../../editor.vue'
  import api from 'api/index.js'
  export default {
    name: 'addcategory',
    components: [Gallery, Editor],
    data: function () {
      return {
        integralData: {active: '', sort_type: '1', title: '', cover_image: ''}
      }
    },
    computed: {
      formValid () {
        return this.integralData.title.length > 0 && this.integralData.cover_image.length > 0 && this.integralData.url.length > 0
      }
    },
    methods: {
      openGallery: function (cb) {
        this.$broadcast('openGallery', cb)
      },
      submit () {
        var self = this
        api.integral.create(this.integralData).then(function (da) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/integral/categoriesList')
        })
      }
    }
  }
</script>
<style>
  .mb20 {
    margin-bottom: 20px;
  }

  .cover-mask {
    position: absolute;
    top: 0;
    left: 15px;
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .thumbnail-mask .cover-mask {
    display: none;
  }

  .thumbnail-mask:hover .cover-mask {
    display: block;
  }

  .cover-label {
    position: absolute;
    top: 0;
    left: 15px;
    background: #00cc3d;
    color: #fff;
    padding: 2px 5px;
    font-size: 12px;
  }
</style>
