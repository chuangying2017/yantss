<template>
  <router-view><div></div></router-view>
</template>

<script>
  import store from './vuex/store.js'

  export default {
    name: 'App',
    store
  }
</script>
