<template>
  <div class="empty-wrap">
    <i class="iconfont">&#xe63e;</i>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped>
  .empty-wrap {
    text-align: center;
    color: #B3B3B3;
  }

  .iconfont {
    font-size: 50px;
  }

  h1 {
    margin-top: 20px;
    font-size: 16px;
  }
</style>
