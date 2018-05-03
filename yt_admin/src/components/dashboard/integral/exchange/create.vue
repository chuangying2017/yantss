<template>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">添加兑换码</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">兑换码</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="couponNum" v-model="coupon.num">
                    <p class="rc">兑换码为10位，包含数字和大小写字母，兑换码不可重复。</p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">过期时间</label>

                  <div class="col-sm-6">
                    <input type="date" class="form-control" v-model="category.priority" number>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">积分</label>

                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="" number>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right" @click.prevent="submit">添加
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
    name: 'CreateProductCategory',
    components: [Gallery],
    computed: {
      valid () {
        return this.category.name.length > 1 && this.category.cover_image !== ''
      }
    },
    data () {
      return {
        // category: {
        //   name: '',
        //   pid: 0,
        //   cover_image: '',
        //   priority: 1,
        //   desc: ''
        // },
        // categories: []
        coupon: {
          num: ''
        }
      }
    },
    route: {
      data () {
        return {
          categories: api.categories.getAll()
        }
      }
    },
    methods: {
      openGallery () {
        this.$broadcast('openGallery')
      },
      submit () {
        var couponNum = this.coupon.num
        var reg = /^(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10}$/
        if (reg.test(couponNum) === false) {
          window.alert('兑换码为10位，包含数字和大小写字母，兑换码不可重复！')
          return false
        }
        var self = this
        api.categories.create(this.category).then(function () {
          window.alert('创建成功!')
          self.$route.router.go('/dashboard/products/cats/list')
        }, function (error) {
          console.error(error)
          window.alert('创建失败!')
          self.$route.router.go('/dashboard/products/cats/list')
        })
      }
    }
  }
</script>
<style>
  .rc{
    color: red;
  }
</style>
