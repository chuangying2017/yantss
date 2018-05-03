<template>
  <div class="add">
    <span class="left" @click.prevent="decQty">-</span>
    <span class="middle">{{ qty }}</span>
    <span class="right" @click.prevent="incQty">+</span>
  </div>
</template>

<script>
  export default {
    name: 'skucounter',

    props: ['qty'],

    methods: {
      decQty: function () {
        if (this.qty !== 0) {
          this.qty --
        } else {
          return false
        }
      },
      incQty: function () {
        this.qty ++
      }
    }
  }
</script>