<template>
  <img :src="product.cover_image" alt="" width="50" height="50">
  <p>{{product.name}}</p>
  <p>
    <span v-show="!inCart">{{product.price}}</span>
    <span v-show="inCart">{{product.price * sku.quantity}}</span>
  </p>
  <a href="#" @click.prevent="addToCart" v-show="!inCart">
    <span>+ 添加</span>
  </a>
  <a href="#" @click.prevent="deleteCart" v-show="inCart">
    <span>x 删除</span>
  </a><br>
  <div v-show="inCart">
    <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="30"
           :id="'q' + product.id + '30'"> <label
    :for="'q' + product.id + '30'">30</label><br>
    <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="60"
           :id="'q' + product.id + '60'"> <label
    :for="'q' + product.id + '60'">60</label><br>
    <input type="radio" v-model="sku.quantity" :name="'q' + product.id + 'quantity'" value="120"
           :id="'q' + product.id + '120'"> <label
    :for="'q' + product.id + '120'">120</label><br>
    <counter :qty.sync="sku.per_day" :max="10" :min="1"></counter>
  </div>
</template>

<script>
  import Counter from './counter.vue'

  export default {
    name: 'Product',

    props: ['product'],

    components: {
      Counter
    },

    data: function () {
      var self = this
      return {
        inCart: false,
        quantity: null,
        sku: {
          product_sku_id: self.product.id,
          quantity: null,
          per_day: 1
        }
      }
    },

//    computed: {
//      maxAmount: function () {
//        return this.quantity || 30
//      }
//    },

    methods: {
      addToCart: function () {
        this.inCart = true
        this.sku.quantity = 30
      },
      deleteCart: function () {
        this.inCart = false
        this.skuDelete()
      },
      skuChange: function () {
        this.$dispatch('skuChanged', this.sku)
      },
      skuDelete: function () {
        console.log('123')
        this.$dispatch('skuDeleted', this.sku)
      }
    },

    watch: {
      'sku.quantity': function (newVal, oldVal) {
        this.skuChange()
      },
      'sku.per_day': function (newVal, oldVal) {
        this.skuChange()
      }
    }
  }
</script>
