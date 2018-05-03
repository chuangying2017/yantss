<template>
  <div class="row titleHead">
    <div class="col-md-6">
      <h4 class="fw">优鲜卡</h4>
      <a v-link="{path: '/dashboard/stations/orders/newCreateCard'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 添加
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">添加优鲜卡</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">名称</label>

                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="card.name">
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">图片</label>
                  <div class="col-sm-6">
                    <gallery :limit="1" :url.sync="card.pic_url"></gallery>
                    <button type="button" class="btn btn-danger mb20" @click.prevent="openGallery">上传图片</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3" v-if="card.pic_url">
                        <div href="#" class="thumbnail thumbnail-mask">
                          <img :src="card.pic_url" alt="" width="64">
                          <span class="cover-delete"><span class="glyphicon glyphicon-remove"
                                                           aria-hidden="true"></span></span>
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
  import Gallery from '../../../gallery/index.vue'
  var date = new Date()
  export default {
    name: 'new-create-card',
    components: [Gallery],
    computed: {
      valid () {
        return this.card.name.length > 1 && this.card.pic_url !== ''
      }
    },
    data () {
      return {
        card: {
          name: '',
          pic_url: '',
          created_at: date
        }
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.allcards.create(this.card).then(function () {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/stations/orders/newCard')
        }, function (error) {
          console.error(error)
          window.alert('创建失败!')
          self.$route.router.go('/dashboard/stations/orders/newCard')
        })
      }
    }
  }
</script>
<style scoped>
  .fw{
    font-weight:bolder;
  }
  .titleHead{
    padding-left: 20px;
    margin-bottom: 20px;
  }

</style>
