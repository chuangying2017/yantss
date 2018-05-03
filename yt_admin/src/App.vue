<template>
  <router-view></router-view>
</template>

<script>
  import store from './vuex/store'
  export default {
    name: 'App',
    store: store
  }
</script>
