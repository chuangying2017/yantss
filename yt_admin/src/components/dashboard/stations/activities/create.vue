<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">创建活动</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">名称</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="activity.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">描述</label>

                  <div class="col-sm-8">
                    <textarea name="" id="" cols="30" rows="5" v-model="activity.desc" class="form-control"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">权重</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="activity.priority">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">封面图</label>
                  <div class="col-sm-8">
                    <gallery :limit="1" :url.sync="activity.cover_image"></gallery>
                    <button type="button" class="btn btn-danger btn-xs mb20" @click="openGallery">上传图片</button>
                    <div class="row">
                      <div class='col-xs-6 col-md-6' v-show='activity.cover_image'>
                        <div href='#' class='thumbnail thumbnail-mask'>
                          <img :src='activity.cover_image' alt='' id="content" style="display: none;max-width: 600px;">
                          <a data-src="#content" data-fancybox>
                            <img :src='activity.cover_image' alt=''>
                          </a>
                          <span class='cover-delete' @click.prevent="activity.cover_image = ''"><span
                            class='glyphicon glyphicon-remove' aria-hidden='true'></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">背景颜色</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="activity.background_color">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">开始时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="activity.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">结束时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="activity.end_time">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">关联优惠券</label>

                  <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-12" class="checkbox" v-for="coupon in coupons">
                        <label for=""><input type="checkbox" v-model="activity.coupons" value="{{coupon.id}}">
                          {{coupon.name}}
                          - {{coupon.desc}}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">是否可以分享</label>

                  <div class="col-sm-8">
                    <input type="checkbox" v-model="activity.can_share">
                  </div>
                </div>
                <div v-if="activity.can_share">
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-4 control-label">分享图片</label>
                    <div class="col-sm-8">
                      <gallery :limit="1" :url.sync="activity.share_image"></gallery>
                      <button type="button" class="btn btn-danger btn-xs mb20" @click="openGallery">上传图片</button>
                      <div class="row">
                        <div class="col-xs-6 col-md-3">
                          <div href="#" class="thumbnail thumbnail-mask" v-if="activity.share_image">
                            <img :src="activity.share_image" alt="" width="64">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-4 control-label">分享描述</label>

                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="activity.share_desc">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-4 control-label">分享给朋友标题</label>

                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="activity.share_friend_title">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-4 control-label">分享到朋友圈标题</label>

                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="activity.share_moment_title">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" :disabled="activity.coupons.length <= 0" class="btn btn-danger left"
                    @click.prevent="submit">保存
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
    name: 'CreateActivity',
    components: [Gallery],
    data () {
      return {
        coupons: [],
        activity: {
          name: '',
          desc: '',
          priority: 1,
          cover_image: '',
          background_color: '',
          start_time: '2016-10-12',
          end_time: '2016-10-22',
          coupons: [],
          share_image: '',
          share_friend_title: '',
          share_desc: '',
          share_moment_title: '',
          can_share: true
        }
      }
    },
    route: {
      data () {
        return {
          coupons: api.coupons.getAll({all: 1})
        }
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.activities.create(this.activity).then(function (data) {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/stations/activities/list')
        }, function () {
          window.alert('创建失败!')
        })
      }
    }
  }
</script>
