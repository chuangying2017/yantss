<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/mall/user' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          用户使用协议
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
      </div>
    </div>
  </div>
  <div class="container">
    <agreement></agreement>
  </div>
</template>

<script>
  import Agreement from './modules/agreement.vue'

  export default{
    components: {
      Agreement
    }
  }
</script>

<style scoped>
  .container {
    padding: 1rem 2rem;
  }
</style>
