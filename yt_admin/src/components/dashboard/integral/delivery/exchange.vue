<template>
  <div class="row titleHead">
  </div>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">确认领奖</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">收件人信息</label>
                  <div class="col-sm-6">
                    <p>收件人： 哈哈 / 13522536253</p>
                    <p>收货地址: 广东省 广州市 花都区 盛美大厦 </p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">快递公司</label>
                  <div class="col-sm-6">
                    <select name="" id="" class="form-control">
                      <option>其他快递</option>
                      <option>顺丰</option>
                    </select>
                    <!--<select name="" id="" class="form-control" v-model="station.district_id">-->
                      <!--<option :selected="district.id == station.district_id" value="{{district.id}}"-->
                              <!--v-for="district in districts">{{district.name}}-->
                      <!--</option>-->
                    <!--</select>-->
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">快递单号</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right" @click.prevent="submit">确认兑换
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
    name: 'exchange',
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
  .titleHead{
    padding-left: 20px;
    margin-bottom: 20px;
  }
</style>
