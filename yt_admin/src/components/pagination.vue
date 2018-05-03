<template>
  <select v-model="pagination.current_page" v-on:change="change">
    <option value="{{n+1}}" v-for="n in pagination.total_pages">{{n+1}}</option>
  </select>
</template>
<script>
  export default {
    name: 'Pagination',
    props: ['pagination', 'goto'],
    methods: {
      change: function () {
        this.goto(this.pagination.current_page)
      }
    }
  }
</script>
