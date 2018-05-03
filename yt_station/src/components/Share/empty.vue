<template>
  <div class="empty-wrap">
    <i class="iconfont">{{icon}}</i>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'Empty',

    props: ['icon']
  }
</script>

<style scoped>
  .empty-wrap {
    text-align: center;
    color: #B3B3B3;
    padding-top: 6rem;
  }

  .iconfont {
    font-size: 50px;
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    margin-top: 20px;
    font-size: 14px;
  }
</style>
