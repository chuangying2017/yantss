<template>
  <li class="f-tap-transparent">
    <input type="checkbox" name="cart" value="1" :id="'pd' + sku.id">
    <label :for="'pd' + sku.id" class="f-table-cell" @click="select(sku, sku.id);">
      <div class="item-select item-select-right">
        <i class="iconfont uncheck">&#xe61a;</i>
        <i class="iconfont checked">&#xe616;</i>
      </div>
    </label>
    <div class="m-pd-item f-table-cell">
      <div class="pd-item-left">
        <img :src="sku.sku.cover_image" :alt="sku.title"
             class="thumbnail">
      </div>
      <div class="pd-item-right">
        <h2 class="title">{{sku.sku.name}}</h2>
        <p class="info">
          商品属性：
            <span v-for="attr in sku.sku.attributes">
              {{attr.attr_value_name}}
            </span>
        </p>
        <span class="price">￥{{sku.sku.price}}</span>
        <counter :max="sku.sku.stock" :min="1" :qty.sync="sku.quantity"></counter>
      </div>
    </div>
  </li>
</template>

<script>
  import Counter from './../Shared/counter.vue'

  export default{
    name: 'CartItem',

    props: ['sku', 'cartId'],

    components: {
      Counter
    },

    watch: {
      'sku.quantity': function (newVal, oldVal) {
        this.$http.put('/mall/carts/' + this.sku.id).then(
          function (data) {
            // 成功修改,不作操作
          },
          function (data) {
            window.alert('修改产品数量失败,请重试')
          }
        )
      }
    },

    methods: {
      select: function (sku, skuID) {
        this.$dispatch('selectSKU', {sku, skuID})
      }
    }
  }
</script>

<style scoped>
  #yt-mall input[type=checkbox] + .f-table-cell {
    display: table-cell;
    vertical-align: middle;
  }

  #yt-mall .m-list .m-count {
    width: 100px;
    margin-left: 20px;
  }
</style>
