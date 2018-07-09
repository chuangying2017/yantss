<template>
  <gallery :limit="5" :images.sync="images"></gallery>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab"
                                                    data-toggle="tab">基本信息</a></li>
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
                        <input type="number" class="form-control" v-model="integral.file_sort" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">分类名称</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="integral.nickname">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">分类图片</label>
                      <div class="col-sm-6">
                        <button type="button" class="btn btn-danger mb20" @click="openGallery">上传图片</button>
                        <div class="row">
                          <div class="col-xs-6 col-md-3" v-for="image in images" track-by="$index">
                            <div href="#" class="thumbnail thumbnail-mask">
                              <img :src="image.url" alt="" width="64">
                              <div class="cover-mask" @click="setCover($index, image)">
                                <span>设为封面</span>
                              </div>
                              <span class="cover-label" v-if="images[$index]['cover']">封面</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">是否首页推荐</label>

                      <div class="col-sm-8">
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="1">
                            是
                          </label>
                        </div>
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="0" checked="checked">
                            否
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>

                      <div class="col-sm-8">
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="1">
                            是
                          </label>
                        </div>
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="0" checked="checked">
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
  import Gallery from '../../../gallery/index.vue'
  import Editor from '../../../editor.vue'
  import api from 'api/index.js'
  export default {
    name: 'addcategory',
    components: [Gallery, Editor],
    data: function () {
      return {
        limitTimeSales: false,
        product: {
          cat_id: null,
          title: '',
          sub_title: '',
          priority: 0,
          digest: '',
          cover_image: '',
          detail: '',
          type: 'entity',
          image_ids: [],
          group_ids: [],
          with_invoice: 0,
          with_care: 0,
          tags: '',
          open_time: '',
          end_time: '',
          skus: []
        },
        sku: {
          name: '',
          cover_image: '',
          display_price: 0,
          price: 0,
          unit: '瓶',
          express_fee: 0,
          bar_code: '',
          stock: 0,
          income_price: 0,
          settle_price: 0,
          attr_value_ids: []
        },
        editor: {},
        images: [],
        categories: [],
        groups: []
      }
    },
    route: {
      data () {
        return {
          categories: api.categories.getAll(),
          groups: api.groups.getAll()
        }
      }
    },
    watch: {
      images (newVal) {
        if (typeof newVal === 'object') {
          var self = this
          this.product.image_ids = []
          newVal.map(function (val) {
            self.product.image_ids.push(val.media_id)
          })
        }
      }
    },
    methods: {
      setCover (index, image) {
        this.$set('product.cover_image', image.url)
        this.images.forEach(function (val) {
          val.cover = false
        })
        var oldImage = this.images[index]
        oldImage.cover = true
        this.images.$set(index, oldImage)
      },
      removeImage (image) {
        this.images.$remove(image)
      },
      openGallery: function (cb) {
        this.$broadcast('openGallery', cb)
      },
      getSku () {
        this.sku.cover_image = this.product.cover_image
        this.sku.name = this.product.title
        this.product.skus.push(this.sku)
      },
      submit () {
        var self = this
        this.getSku()
        api.products.create(this.product).then(function (da) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/products/list')
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
