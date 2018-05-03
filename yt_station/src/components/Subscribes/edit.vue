<template>
  <div class="m-date">
    <div class="form-input">
      <div class="item clearfix">
        <span>订奶开始时间:</span> <input type="date" v-model="start_time">
      </div>
      <div class="item clearfix">
        <span>订奶结束时间:</span> <input type="date" v-model="end_time">
      </div>
    </div>
  </div>
  <div class="m-tabs">
    <ul class="clearfix">
      <li><a href="#" :class="['item', currentDay === 0 ? 'active' : '']" @click.prevent="current(0)">周</br>日</a></li>
      <li><a href="#" :class="['item', currentDay === 1 ? 'active' : '']" @click.prevent="current(1)">周</br>一</a></li>
      <li><a href="#" :class="['item', currentDay === 2 ? 'active' : '']" @click.prevent="current(2)">周</br>二</a></li>
      <li><a href="#" :class="['item', currentDay === 3 ? 'active' : '']" @click.prevent="current(3)">周</br>三</a></li>
      <li><a href="#" :class="['item', currentDay === 4 ? 'active' : '']" @click.prevent="current(4)">周</br>四</a></li>
      <li><a href="#" :class="['item', currentDay === 5 ? 'active' : '']" @click.prevent="current(5)">周</br>五</a></li>
      <li><a href="#" :class="['item', currentDay === 6 ? 'active' : '']" @click.prevent="current(6)">周</br>六</a></li>
    </ul>
  </div>
  <skus :current.sync="currentProducts[currentDay]"></skus>
  <div class="m-footer">
    <div class="footer-btn">
      <button type="button" class="btn btn-round btn-success" :disabled="working" @click.prevent="setPreorder">
        <span v-show="!working">确认设置</span>
        <span v-show="working">设置中...</span>
      </button>
    </div>
  </div>
</template>

<script>
  // import _ from 'underscore'
  import Skus from './skus.vue'

  export default {
    name: 'SubsEdit',

    components: {
      Skus
    },

    data: function () {
      return {
        defaultProducts: [], // 默认加载的所有产品
        orderProducts: [], // 订单的所有产品
//        dfCurrentProducts: [], // 默认当天的产品
//        odCurrentProducts: [], // 订单当天的产品
        currentProducts: [], // 生成后用于双向数据绑定的产品数据
        currentDay: 0,
        start_time: null,
        end_time: null,
        working: false
      }
    },

    route: {
      data: function (transition) {
        var self = this
        return Promise.all([
          self.$http.get('/stations/products'),
          self.$http.get('/stations/preorders/' + self.$route.params.subs_id)
        ]).then(function ([skus, products]) {
          self.generateCurrent(skus.data.data)
          return {
            defaultProducts: skus.data.data,
            orderProducts: products.data.data.products
          }
        })
      }
    },

    methods: {
      current: function (num) {
        this.currentDay = num
      },
      generateCurrent: function (defaultProducts) {
        var dProducts = defaultProducts
        for (var j = 0; j < 7; j++) {
          var perDay = {
            weekday: j,
            daytime: 0,
            skus: []
          }
          for (var i = 0; i < dProducts.length; i++) {
            var product = {
              product_sku_id: dProducts[i].id,
              quantity: 0,
              name: dProducts[i].name,
              cover_image: dProducts[i].cover_image
            }
            perDay.skus.push(product)
          }
          this.currentProducts.push(perDay)
        }
      },
      setPreorder: function () {
        var self = this
        self.working = true
        this.$http.put('/stations/preorders/' + this.$route.params.subs_id, {
          start_time: self.start_time,
          end_time: self.end_time,
          product_skus: this.currentProducts
        }).then(
          function (data) {
            // 成功设置
            self.$route.router.go('/station/subscribes/' + this.$route.params.subs_id + '/deliver')
            self.working = false
          },
          function (data) {
            // 设置失败
            window.alert('网络出错，请重新提交')
            self.working = false
          }
        )
      }
    }

    // watch: {
    //   currentProducts: function (newVal, oldVal) {
    //   }
    // }
  }
</script>

<style scoped>
  .m-date {
    padding: 10px;
  }

  .m-date .item {
    /*width: 50%;*/
    /*float: left;*/
    text-align: center;
    margin-bottom: 10px;
  }

  .m-date span {
    font-size: 14px;
    float: left;
    line-height: 30px;
  }

  .m-date input {
    width: auto;
    font-size: 14px;
    float: right;
    /*margin-top: 10px;*/
    text-align: center;
  }
</style>
