<template>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">星级标签</h3>
        </div>
        <div class="p20 starCon">
          <p><span class="fs20">1星：</span>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
          </p>
          <p><span class="fs20">2星：</span>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
          </p>
          <p><span class="fs20">3星：</span>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
          </p>
          <p><span class="fs20">4星：</span>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
          </p>
          <p><span class="fs20">5星：</span>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
            <input type="text" value="牛奶变质"/>
          </p>
          <p>用户获得<input type="text" v-model="" class="score"/>积分</p>
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right" @click.prevent="submit" :disabled="!valid">保存
            </button>
          </div>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Gallery from '../../gallery/index.vue'
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
  .box-title{
    font-weight: bold;
  }
  .p20{
    padding: 20px;
  }
  .starCon p{
    padding: 6px;
  }
  .starCon p input{
    margin-right: 20px;
  }
  .fs20{
    font-size: 15px;
    font-weight: bold;
  }
  .score{
    margin-left: 20px;
  }
</style>
