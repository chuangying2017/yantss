<template>
  <router-view></router-view>
</template>
<style>
html,body{min-height:100vh;}
.content-wrapper, .right-side{min-height:calc(100vh - 1.42857143rem)}
</style>
<script>
  import store from './vuex/store'
  export default {
    name: 'App',
    store: store
  }
</script>
