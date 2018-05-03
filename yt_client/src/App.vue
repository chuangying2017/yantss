<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './vuex/store.js'

  export default {
    name: 'App',
    store
  }
</script>
<style lang="scss">
@import "./css/iconfont.css";
</style>
