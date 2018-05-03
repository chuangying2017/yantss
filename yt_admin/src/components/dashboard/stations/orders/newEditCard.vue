<template>
  <div class="row titleHead">
    <div class="col-md-6">
      <h4 class="fw">优鲜卡</h4>
      <!--<a v-link="{path: '/dashboard/stations/orders/newEditCard/'+card.id}" class="btn btn-social btn-google btn-sm mb20">-->
        <!--<i class="fa fa-plus"></i> 编辑-->
      <!--</a>-->
    </div>
  </div>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">编辑优鲜卡</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">名称{{card.id}}</label>
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
        card: {},
        category: {}
      }
    },
    route: {
      data ({to: {params: {card_id}}}) {
        return {
          card: api.allcards.get(card_id),
          category: api.categories.get(card_id)
        }
      }
    },
    // created () {
    //   this.$http.get('/admin/card/categories/1/edit').then((response) => {
    //     this.carts = response.data
    //     console.log(this.carts)
    //   })
    // },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var self = this
        api.allcards.update(this.card).then(function () {
          window.alert('更新成功!')
          self.$route.router.go('/dashboard/stations/orders/newCard')
        }, function (error) {
          console.error(error)
          window.alert('更新失败!')
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
