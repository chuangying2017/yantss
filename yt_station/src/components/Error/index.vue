<template>
  <div class="pt40">
    <empty icon="&#xe65d;">
      <p v-if="$route.params.result === 'nostation'">你不是服务点人员,请绑定后操作</p>
      <p v-else>你已经是服务点人员,无需再绑定</p>
    </empty>
  </div>
</template>

<script>
  import Empty from './../Share/empty.vue'

  export default {
    name: 'Error',

    components: {
      Empty
    },

    route: {
      activate: function () {
        console.log('error')
      }
    }
  }
</script>
