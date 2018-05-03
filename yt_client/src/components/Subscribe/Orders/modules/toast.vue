<template>
  <div class="toast">
    <div class="toast-wrap">
      <div class="toast-content">
        <i class="iconfont">{{icon}}</i><br>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style>
  .toast {
    width: 100%;
    height: 100%;
    display: table;
    position: fixed;
    top: 0;
    left: 0;
  }

  .toast-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  .toast-content {
    width: 50%;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.8);
    padding: 2rem;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    font-size: 1.4rem;
  }

  .toast-content .iconfont {
    display: inline-block;
    font-size: 4rem;
    margin-bottom: 2rem;
  }
</style>
<script>
  export default{
    props: ['icon']
  }
</script>
