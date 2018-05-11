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
                      <label for="inputEmail3" class="col-sm-2 control-label">商品分类</label>
                      <div class="col-sm-6">
                        <select class="form-control" v-model="product.cat_id">
                          <option :selected="product.cat_id == cat.id" v-for="cat in categories" value="{{cat.id}}">
                            {{cat.name}}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">商品分组</label>
                      <div class="col-sm-6">
                        <select class="form-control" multiple v-model="product.group_ids">
                          <option :selected="product.group_ids.indexOf(group.id) > -1" v-for="group in groups"
                                  value="{{group.id}}">{{group.name}}
                          </option>
                        </select>
                      </div>
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
                      <label for="inputPassword3" class="col-sm-2 control-label">商品单位</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="sku.unit">
                      </div>
                    </div>
                     <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">配送方式</label>
                    	<div class="col-sm-6"> 
                        	<button type="button" class="btn btn-default mb20" v-bind:class="{'btn-danger':dismode==1}" @click="dismode=1">多次配送<i v-show="dismode==1">√</i></button>
                        	<button type="button" class="btn btn-default mb20 col-sm-offset-1" v-bind:class="{'btn-danger':dismode==0}" @click="dismode=0">单次配送<i v-show="dismode==0">√</i></button>
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
                      <label for="inputPassword3" class="col-sm-2 control-label">备注</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="sku.bar_code">
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

                      <div class="col-sm-10">
                        <editor :model.sync="product.detail"></editor>
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
    name: 'EditProduct',
    components: [Gallery, Editor],
    data: function () {
      return {
        limitTimeSales: false,
        product: {
          info: {},
          group_ids: []
        },
        sku: {},
        editor: {},
        images: [],
        categories: [],
        groups: [],
        dismode:null //0为单次配送 1为多次配送
      }
    },
    route: {
      data ({to: {params: {product_id}}}) {
        var self = this
        return Promise.all([api.categories.getAll(), api.groups.getAll(), api.products.get(product_id)]).then(function ([categories, groups, product]) {
          self.$broadcast('init')
          var groupIds = []
          product.groups.forEach(function (val) {
            groupIds.push(val.id)
          })
          product.images.forEach(function (val) {
            if (product.cover_image.indexOf(val.media_id) > -1) {
              val.cover = true
            } else {
              val.cover = false
            }
          })
          return {
            categories: categories,
            groups: groups,
            images: product.images,
            product: {
              id: product.id,
              cat_id: product.cats.length > 0 ? product.cats[0]['id'] : null,
              title: product.title,
              sub_title: product.sub_title,
              priority: product.priority,
              digest: product.digest,
              cover_image: product.cover_image,
              detail: product.info.detail,
              type: product.type,
              image_ids: product.image_ids,
              group_ids: groupIds,
              with_invoice: product.with_invoice,
              with_care: product.with_care,
              tags: product.info.tags,
              open_time: product.open_time,
              end_time: product.end_time,
              skus: []
            },
            sku: {
              name: product['skus']['name'],
              cover_image: product['skus']['cover_image'],
              display_price: product['skus']['display_price'],
              price: product['skus']['price'],
              express_fee: product['skus']['express_fee'],
              bar_code: product['skus']['bar_code'],
              stock: product['skus']['stock'],
              unit: product['skus']['unit'],
              income_price: product['skus']['income_price'],
              settle_price: product['skus']['settle_price'],
              attr_value_ids: []
            }
          }
        })
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
        this.product.skus = [this.sku]
      },
      submit () {
        var self = this
        this.getSku()
        api.products.update(this.product.id, this.product).then(function (da) {
          window.alert('更新成功!')
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
