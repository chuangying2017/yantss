<template>
  <div class="container">
    <ul class="progressbar clearfix">
      <li class="active-small">地址</li>
      <li class="active-small">充值</li>
      <li class="active">确认</li>
    </ul>
  </div>
  <div class="success">
    <p class="icon mb20">
      <i class="iconfont">&#xe608;</i>
    </p>
    <p class="title f20 mb10">您已充值成功</p>
    <p class="text f16">我们的服务人员将会尽快联系您</p>
    <p class="text f16">并处理订奶服务</p>
    <a href="tel:86-132-4666-5701" type="button" class="btn btn-round btn-success mt40 mb10">手动联系</a>
  </div>
</template>

<script>
  export default {
    name: 'Step3'
  }
</script>
