<template>
  <button class="refresh-btn" @click.prevent="reloadPage">
    <i class="iconfont">&#xe64b;</i>
  </button>
</template>

<script>
  export default{
    name: 'Refresh',

    methods: {
      reloadPage: function () {
        window.location.reload()
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1468841058_0466921.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1468841058_0466921.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1468841058_0466921.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1468841058_0466921.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1468841058_0466921.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .refresh-btn {
    -webkit-appearance: none;
    border: 0 none;
    background: #009e35;
    color: #fff;
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    outline: none;
  }

  .iconfont {
    font-size: 2rem;
  }
</style>
