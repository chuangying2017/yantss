<template>
  <div class="empty-wrap">
    <i class="iconfont">&#xe651;</i>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped>
  .empty-wrap {
    margin-top: 60px;
    text-align: center;
    color: #B3B3B3;
  }

  .iconfont {
    font-size: 50px;
  }

  h1 {
    margin-top: 20px;
    font-size: 1.4rem;
  }
</style>
