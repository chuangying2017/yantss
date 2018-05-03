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
                <div class="col-md-12">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">商品分类</label>
                      <div class="col-sm-6">
                        <select class="form-control" v-model="product.cat_id">
                          <option v-for="cat in categories" value="{{cat.id}}">{{cat.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">商品分组</label>
                      <div class="col-sm-6">
                        <select class="form-control" multiple v-model="product.group_ids">
                          <option v-for="group in groups" value="{{group.id}}">{{group.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">添加商品</label>
                      <div class="col-sm-6">
                        <button @click="openSearchProduct" type="button" class="btn btn-danger mb20">选择商品</button>
                        <table class="table table-bordered" v-if="products.length > 0">
                          <thead>
                          <tr>
                            <th>封面</th>
                            <th>商品名称</th>
                            <th>价格</th>
                            <th>数量</th>
                            <th>操作</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="product in products">
                            <th scope="row">
                              <img :src="product.item.cover_image" alt="" class="thumbnail" width="32"
                                   style="margin-bottom: 0;">
                            </th>
                            <td>
                              {{product.item.name}}
                            </td>
                            <td>
                              {{product.item.price}}
                            </td>
                            <td>
                              <input type="text" number v-model="products[$index]['quantity']">
                            </td>
                            <td>
                              <div class="btn-group">
                                <a @click.prevent="removeProduct(product)" type="button" class="btn btn-default btn-sm">删除</a>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--// search product-->
                      <product-search :type="entity"></product-search>
                    </div>
                    <hr>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商家编码</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="sku.bar_code">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品名称</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="product.title">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品序号</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="product.priority">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">零售价格</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="sku.price" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">结算价格</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="sku.settle_price" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品库存</label>

                      <div class="col-sm-6">
                        <input type="number" class="form-control" v-model="sku.stock" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品图片</label>
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
                    <div class="form-group" v-if="h">
                      <label for="inputPassword3" class="col-sm-2 control-label">每人限购</label>
                      <div class="col-sm-6">
                        <input type="number" class="form-control" number>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">限时销售</label>

                      <div class="col-sm-6">
                        <input type="checkbox" name="" id="" v-model="limitTimeSales">
                        <label for="" class="control-label">是</label>
                      </div>
                    </div>
                    <div class="form-group" v-if="limitTimeSales">
                      <label for="inputPassword3" class="col-sm-2 control-label">开放时间</label>

                      <div class="col-sm-6">
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                          </div>
                          <input type="text" class="form-control pull-right" id="reservation">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品标签</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="product.tags">
                      </div>
                      <div class="col-sm-4">
                        <label class="control-label">多个标签请用逗号隔开</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品简介</label>
                      <div class="col-sm-6">
                        <textarea type="text" class="form-control" v-model="product.digest"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品详情</label>

                      <div class="col-sm-6">
                        <editor :content.sync="product.detail"></editor>
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
  import productSearch from 'components/dashboard/products/search.vue'
  import Gallery from 'components/gallery/index.vue'
  import Editor from 'components/editor.vue'
  import api from 'api/index.js'
  export default {
    name: 'CreateProductPackage',
    components: [productSearch, Gallery, Editor],
    data () {
      return {
        limitTimeSales: false,
        products: [],
        product: {
          cat_id: null,
          title: '',
          sub_title: '',
          priority: 0,
          digest: '',
          cover_image: '',
          detail: '',
          type: 'mix',
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
          express_fee: 0,
          bar_code: '',
          stock: 0,
          income_price: 0,
          settle_price: 0,
          attr_value_ids: [],
          mix_skus: []
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
      'openSearchProduct' () {
        this.$broadcast('toggle')
      },
      removeProduct (product) {
        this.products.$remove(product)
      },
      setCover (index, image) {
        console.log(image)
        this.$set('product.cover_image', image.url)
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
        var self = this
        this.sku.cover_image = this.product.cover_image
        this.sku.name = this.product.title
        this.products.forEach(function (product) {
          self.sku.mix_skus.push({
            sku_id: product.item.id,
            quantity: product.quantity
          })
        })
        this.product.skus.push(this.sku)
      },
      submit () {
        var self = this
        this.getSku()
        api.products.create(this.product).then(function (da) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/products/packages/list')
        })
      }
    },
    events: {
      'selectProduct' (product) {
        this.products.push({
          item: product,
          quantity: 1
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

  .thumbnail-mask:hover .cover-mask,
  .thumbnail-mask:hover .cover-delete {
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

  .cover-delete {
    display: none;
    position: absolute;
    top: -8px;
    right: -9px;
    background: #f00;
    color: #fff;
    font-size: 10px;
    border-radius: 30px;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }

  .list-group-item > a {
    float: right;
  }
</style>

