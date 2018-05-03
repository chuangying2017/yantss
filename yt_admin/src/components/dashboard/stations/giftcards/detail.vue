<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">编辑优惠券</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-6">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">名称</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="giftcard.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">描述</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="giftcard.desc">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">显示内容</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="giftcard.content">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">开始时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="giftcard.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">结束时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="giftcard.end_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">是否显示</label>

                  <div class="col-sm-8">
                    <div class="radio">
                      <label for="">
                        <input type="radio" number v-model="giftcard.active" value="1">
                        是
                      </label>
                    </div>
                    <div class="radio">
                      <label for="">
                        <input type="radio" number v-model="giftcard.active" value="0">
                        否
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-4 control-label">优惠券图片</label>
                  <div class="col-sm-8">
                    <gallery :limit="1" :url.sync="giftcard.cover_image"></gallery>
                    <button type="button" class="btn btn-danger mb20" @click.prevent="openGallery">上传图片</button>
                    <div class='row'>
                      <div class='col-xs-6 col-md-6' v-show='giftcard.cover_image'>
                        <div href='#' class='thumbnail thumbnail-mask'>
                          <img :src='giftcard.cover_image' alt='' id="content" style="display: none;max-width: 600px;">
                          <a data-src="#content" data-fancybox>
                            <img :src='giftcard.cover_image' alt=''>
                          </a>
                          <!--<a class='fancybox' data-fancybox="images" :href="giftcard.cover_image">-->
                          <!--<img :src='giftcard.cover_image' alt=''>-->
                          <!--</a>-->
                          <span class='cover-delete' @click.prevent="giftcard.cover_image = ''"><span
                            class='glyphicon glyphicon-remove' aria-hidden='true'></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">领券后有效时间(天)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="giftcard.effect_days" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">优惠券数量(张)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="giftcard.total" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">每人限领(张)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="qualify.quantity" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">订单金额</label>

                  <div class="col-sm-2">
                    <select class="form-control" v-model="selectRange" v-on:change="changeRange" disabled>
                      <option value="all">不限制</option>
                      <option value="min">满</option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <label for="" v-if="selectRange == 'min'">
                      <input type="text" number v-model="range.min | money" disabled>
                      元可使用</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">优惠金额(元)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="discount.value | money" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">适用商品</label>

                  <div class="col-sm-4">
                    <select class="form-control" v-model="items.type" disabled>
                      <option value="all">全店通用</option>
                      <option value="group">指定分类</option>
                    </select>
                  </div>
                  <div class="col-sm-4">
                    <select class="form-control" v-model="items.values" v-if="items.type == 'group'" disabled>
                      <option value="">选择商品分组</option>
                      <option value="{{group.id}}" v-for="group in groups">{{group.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存
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
  import _ from 'lodash'

  export default {
    name: 'CreateGiftcard',
    components: [Gallery],
    data () {
      return {
        groups: [],
        selectRange: 'all',
        qualify: {
          type: 'all',
          quantity: 1,
          values: null
        },
        range: {
          type: 'amount', // amount
          min: 0, // 0 订单金额不限
          max: 100000000 // null
        },
        discount: {
          type: 'amount', // amount
          mode: 'equal',
          value: 0 //
        },
        items: {
          type: 'all',
          values: []
        },
        giftcard: {
          name: '',
          desc: '',
          content: '',
          cover_image: '',
          start_time: '',
          end_time: '',
          active: 1,
          effect_days: '',
          total: 10000,
          rules: []
        }
      }
    },
    route: {
      data ({to: to, from}) {
        var self = this
        return Promise.all([api.groups.getAll(), api.giftcards.get(to.params.giftcard_id)]).then(function ([groups, giftcard]) {
          self.groups = groups
          self.giftcard = {
            id: giftcard.id,
            name: giftcard.name,
            desc: giftcard.desc,
            content: giftcard.content,
            cover_image: giftcard.cover_image,
            start_time: giftcard.start_time,
            end_time: giftcard.end_time,
            active: giftcard.active,
            effect_days: giftcard.counter.effect_days,
            total: giftcard.counter.total,
            rules: []
          }
          self.qualify = giftcard.rules[0].qualify
          self.range = giftcard.rules[0].range
          self.discount = giftcard.rules[0].discount
          self.items = giftcard.rules[0].items
          self.selectRange = giftcard.rules[0].range.min === 0 ? 'all' : 'min'
        })
      }
    },
    computed: {
      rule: function () {
        return {
          name: this.giftcard.name,
          desc: this.giftcard.desc,
          qualify: this.qualify,
          range: this.range,
          discount: this.discount,
          items: this.items,
          weight: 1,
          multi: 1,
          memo: ''
        }
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      changeRange () {
        if (this.selectRange === 'all') {
          this.range.min = 0
        }
      },
      changeItems () {
        if (this.items.type === 'all') {
          this.items.values = []
        }
      },
      submit () {
        var self = this
        this.giftcard.rules = []
        this.giftcard.rules.push(this.rule)
        const giftcard = _.pick(this.giftcard, ['active', 'name', 'desc', 'content', 'cover_image'])
        api.giftcards.update(this.giftcard.id, giftcard).then(function (data) {
          window.alert('更新成功!')
          self.$route.router.go('/dashboard/stations/giftcards/list')
        }, function () {
          window.alert('更新失败!')
        })
      }
    }
  }
</script>
