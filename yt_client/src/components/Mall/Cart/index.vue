<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a href="javascript:window.history.go(-1)"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          购物车
        </h1>
      </div>
      <div class="pure-u-1-3 tr action">
        <a href="#" @click.prevent="toggleEdit">
          <span class="act" v-show="!editMode">编辑</span>
          <span class="act" v-show="editMode">取消编辑</span>
        </a>
      </div>
    </div>
  </div>
  <ul class="m-list m-list-select">
    <li is="CartItem" v-for="sku in cart" :sku.sync="sku"></li>
  </ul>
  <div class="m-foot m-foot-act">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <p class="price" v-show="!editMode">¥{{totalPrice}}</p>
        <p class="tips" v-show="!editMode">选中了{{selectedSKUs.length}}件</p>
        <p class="info" v-show="editMode">共 <span class="num">{{selectedSKUs.length}}</span> 件</p>
      </div>
      <div class="pure-u-1-2">
        <a href="#" class="u-btn u-btn-default" @click.prevent="cartConfirm();" v-show="!editMode">立即结算</a>
        <a href="#" class="u-btn u-btn-default" @click.prevent="deleteSKU();" v-show="editMode">删除商品</a>
      </div>
    </div>
  </div>
</template>

<script>
  import CartItem from './cartItem.vue'

  export default{
    name: 'Cart',

    data: function () {
      return {
        cart: [],
        editMode: false,
        selectedIDs: [],
        selectedSKUs: []
      }
    },

    components: {
      CartItem
    },

    computed: {
      totalPrice: function () {
        var price = 0
        for (var i = 0; i < this.selectedSKUs.length; i++) {
          price = this.selectedSKUs[i].quantity * this.selectedSKUs[i].sku.price
        }
        return price
      }
    },

    route: {
      data (transition) {
        return this.$http.get('/mall/cart').then(
          function (data) {
            return {
              cart: data.data.data
            }
          },
          function (data) {
            console.log(data.data.data)
          }
        )
      }
    },

    methods: {
      toggleEdit: function () {
        this.editMode = !this.editMode
      },
      cartConfirm: function () {
        if (!this.selectedIDs.length) {
          window.alert('请选择商品再结算')
          return false
        }
        var self = this
        this.$http.post('/mall/orders/cart', {
          cart_ids: this.selectedIDs
        }).then(
          function (data) {
            // 成功,获取订单号并跳转
            self.$route.router.go('/mall/confirm/' + data.data.data.temp_order_id)
          },
          function () {
            // 失败,请重新提交
            window.alert('订单提交失败,请重试')
          }
        )
      },
      deleteSKU: function () {
        if (!this.selectedSKUs.length) {
          window.alert('请选择产品后再商品')
          return false
        }
        var self = this
        this.$http.delete('/mall/cart', {
          carts_id: this.selectedIDs
        }).then(
          function (data) {
            // 删除成功
            for (var i = 0; i < self.selectedSKUs.length; i++) {
              self.cart.$remove(self.selectedSKUs[i])
            }
            self.selectedSKUs = []
            self.selectedIDs = []
          },
          function (data) {
            // 删除失败
            window.alert('网络出错,请重新操作')
          }
        )
      }
    },

    events: {
      selectSKU: function (obj) {
        if (this.selectedIDs.indexOf(obj.skuID) === -1) {
          this.selectedIDs.push(obj.skuID)
        } else {
          this.selectedIDs.$remove(obj.skuID)
        }

        if (this.selectedSKUs.indexOf(obj.sku) === -1) {
          this.selectedSKUs.push(obj.sku)
        } else {
          this.selectedSKUs.$remove(obj.sku)
        }
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }

  #yt-mall .m-head-info .action {
    font-size: 1.4rem;
  }

  #yt-mall .m-head-info .action span {
    margin-right: 20px;
  }
</style>
