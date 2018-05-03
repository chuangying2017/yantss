<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">签到规则说明</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive p20">
          <p>签到周期：签到周期是计算连续签到天数、总签到天数的依据，自然月则读取本月的连续签到天数、总签到天数，不限制签则计算所有签到天数</p>
          <p>补签设置：可以设置开启补签功能，可设置补签费用(积分或者余额)，费用可为空</p>
          <p>普通奖励：可以使用自定义替换页面中出现的文字</p>
          <p>普通奖励：普通奖励分为首次签到奖励、日常签到奖励</p>
          <p>连签奖励：可设置连续签到指定天数领取指定奖励，不设置则不显示</p>
          <p>总签奖励：可设置总签到到达指定天数领取指定奖励，不设置则不显示</p>
          <p>特殊奖励：可根据日期设置特殊日期，并可以设置奖励，例如“周年庆”奖励100积分(可只设置标题不设置奖励)</p>
        </div>

      </div>

    </div>
  </div>
  <gallery :limit="5" :images.sync="images"></gallery>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab"
                                                    data-toggle="tab">签到规则</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label">开启积分签到</label>
                      <div class="col-sm-8">
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="1">
                            开启
                          </label>
                        </div>
                        <div class="radio">
                          <label for="">
                            <input type="radio" number v-model="giftcard.active" value="0" checked="checked">
                            关闭
                          </label>
                        </div>
                      </div>
                    </div>


                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">签到规则设置</label>
                       <div>
                         <p><input type="checkbox" name="">
                         开启补签，补签扣除(每天/次)
                         <input type="number" class="w200 inputClass" v-model="product.tags"/>
                         <input type="radio" number v-model="" value="1" name="signR">
                         余额
                         <input type="radio" number v-model="" value="1" name="signR">
                         积分</p>
                         <p style="padding-left: 120px;color: red">提示：补签只发放日常奖励请在规则中说明，仅可扣除余额或积分，补签只可为当月漏签日期补签</p>
                       </div>
                    </div>

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">普通奖励（自动发放）</label>
                      <div>
                        <p><input type="checkbox" name="">
                          首次奖励
                          <input type="number" class="w200 inputClass" v-model=""/>
                          天，日常奖励
                          <input type="number" class="w200 inputClass" v-model=""/>
                          积分
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">连续奖励（需手动领取）</label>
                      <div>
                        <p><input type="checkbox" name="">
                          连续签到
                          <input type="number" class="w200 inputClass" v-model=""/>
                          天，奖励
                          <input type="number" class="w200 inputClass" v-model=""/>
                          积分
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">总签奖励（需手动领取）</label>
                      <div>
                        <p><input type="checkbox" name="">
                          总签到
                          <input type="number" class="w200 inputClass" v-model=""/>
                          天，奖励
                          <input type="number" class="w200 inputClass" v-model=""/>
                          积分
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">特殊奖励（自动发放）</label>
                      <div>
                        <p><input type="checkbox" name="">
                          日期
                          <input type="date" class="w200 inputClass" v-model=""/>
                          标题
                          <input type="text" class="w200 inputClass" placeholder="非必填"/>
                          奖励
                          <input type="number" class="w200 inputClass" v-model=""/>
                          积分
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">签到规则</label>

                      <div class="col-sm-10">
                        <editor :model.sync="product.detail"></editor>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label"></label>

                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">提交</button>
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
    name: 'CreateProduct',
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
  .p20{
    padding: 20px;
  }

  .thumbnail-mask .cover-mask {
    display: none;
  }

  .thumbnail-mask:hover .cover-mask {
    display: block;
  }
  .w200{
    width: 200px;
  }
  .inputClass{
    border-radius: 0;
    box-shadow: none;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;

  }
</style>
