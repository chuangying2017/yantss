<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#basic" data-toggle="tab" aria-expanded="true">活动信息</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">活动名称</label>

                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="campaign.name">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">活动图片</label>
                      <div class="col-sm-6">
                        <gallery :limit="1" :url.sync="campaign.cover_image"></gallery>
                        <button @click="openGallery" type="button" class="btn btn-danger mb20">上传图片</button>
                        <div class="row">
                          <div class="col-xs-6 col-md-3">
                            <div href="#" class="thumbnail thumbnail-mask" v-if="campaign.cover_image">
                              <img :src="campaign.cover_image" alt="" width="64">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">活动时间</label>

                      <div class="col-sm-6">
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                          </div>
                          <input v-model="campaign.start_time" type="text" class="form-control pull-right"
                                 id="reservation">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">关联商品包</label>
                      <div class="col-sm-6">
                        <select number class="form-control" v-model="campaign.product_sku" v-if="packages.length > 0">
                          <option value="{{package.skus.id}}" v-for="package in packages">{{package.title}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">活动简介</label>
                      <div class="col-sm-6">
                        <textarea v-model="campaign.desc" type="text" class="form-control"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">活动详情</label>

                      <div class="col-sm-6">
                        <textarea v-model="campaign.detail" type="text" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button @click.prevent="submit" type="submit" class="btn btn-danger pull-right">保存</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
        </div>
      </div>

      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import productSearch from 'components/dashboard/products/search.vue'
  import Gallery from 'components/gallery/index.vue'
  import Editor from 'components/editor.vue'
  export default {
    name: 'CreateCampagin',
    components: [productSearch, Gallery, Editor],
    data () {
      return {
        campaign: {
          name: '',
          desc: '',
          detail: '',
          start_time: '',
          end_time: '',
          product_sku: null,
          active: 1,
          cover_image: ''
        },
        packages: []
      }
    },
    route: {
      data () {
        return api.products.getMix().then(function ({data: packages}) {
          return {
            packages: packages
          }
        })
      }
    },
    methods: {
      'openSearchProduct' () {
        this.$broadcast('toggle')
      },
      removeProduct (product) {
        this.products.$remove(product)
      },
      openGallery: function (cb) {
        this.$broadcast('openGallery', cb)
      },
      submit () {
        var self = this
        api.campaigns.create(this.campaign).then(function (data) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/stores/campaigns/list')
        })
      }
    },
    events: {
      'selectProduct' (product) {
        this.products.push(product)
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
