<template>
  <tr>
    <td>{{ preorder.address}}</td>
    <td>
      <span v-for="sku in preorder.skus">{{sku.name}} {{sku.quantity}}盒</span>
    </td>
  </tr>
</template>

<script>
  import _ from 'underscore'

  export default {
    name: 'DelItem',

    props: ['preorder'],

    computed: {
      products: function () {
        var today = new Date()
        var weekday = today.getDay()
        return _.find(this.preorder.products, function (item) {
          return item.weekday === weekday
        })
      }
    }
  }
</script>
