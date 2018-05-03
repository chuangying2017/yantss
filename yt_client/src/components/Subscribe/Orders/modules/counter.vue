<template>
  <span class="m-count">
    <div class="pure-g">
      <div class="pure-u-1-3">
        <span class="btn min" @click.prevent="dec">-</span>
      </div>
      <div class="pure-u-1-3">
        <input type="tel" :value="qty" v-model="qtyModel">
      </div>
      <div class="pure-u-1-3">
        <span class="btn plus" @click.prevent="inc">+</span>
      </div>
    </div>
  </span>
</template>

<script>
  export default {
    name: 'Counter',

    data: function () {
      return {
        qtyModel: null
      }
    },

    props: ['qty', 'min', 'max'],

    methods: {
      dec: function () {
        if (this.qty > this.min) {
          this.qty--
        } else {
          return false
        }
      },
      inc: function () {
        if (this.qty < this.max) {
          this.qty++
        } else {
          return false
        }
      }
    },

    watch: {
      qtyModel: function (newVal, oldVal) {
        if (newVal < this.min) {
          newVal = this.min
        } else if (newVal > this.max) {
          newVal = this.max
        }
        this.qty = parseInt(newVal)
        this.$dispatch('counterChange', newVal)
      },
      qty: function (newVal, oldVal) {
        this.$dispatch('counterChange', newVal)
      }
    }
  }
</script>

<style scoped>
  .m-count .btn {
    height: auto;
  }
</style>
