<template>
  <div class="pt40">
    <div class="empty-wrap">
      <i class="iconfont">&#xe654;</i>
      <h1>
        <p v-if="$route.params.result === 'nostaff'">你不是配送员,请绑定后操作</p>
        <p v-else>你已经是配送员,无需再绑定</p>
      </h1>
    </div>
  </div>
</template>

<script>
  import Empty from './../Share/empty.vue'

  export default {
    name: 'Error',

    components: {
      Empty
    }
  }
</script>

<style scoped>
  .empty-wrap {
    margin-top: 60px;
    text-align: center;
    color: #B3B3B3;
  }

  .iconfont {
    font-size: 50px;
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    margin-top: 20px;
    font-size: 1.4rem;
  }
</style>
