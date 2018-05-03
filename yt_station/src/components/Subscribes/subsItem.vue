<template>
  <tr>
    <td width="45%" style="text-align: left;">{{ item.address }}</td>
    <td>
      <span v-if="item.assign.status === 'untreated'">未处理 <i class="iconfont">&#xe653;</i></span>
      <span v-if="item.assign.status === 'confirm'">已接单</span>
      <span v-if="item.assign.status === 'assign'">已派单</span>
      <span v-if="item.assign.status === 'reject'">已拒绝</span>
    </td>
    <td v-if="item.status === 'assigning'">
      <a v-link="{ path: '/station/subscribes/' + item.id + '/setting'}"
         class="act-link"><i class="iconfont">&#xe65b;</i> 设置</a></td>
    <td v-else><a v-link="{ path: '/station/subscribes/' + item.id }"
                  class="act-link"><i class="iconfont">&#xe65c;</i> 查看</a>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'SubsItem',

    props: ['item']
  }
</script>

<style scoped>
  .iconfont {
    -webkit-font-smoothing: antialiased;
    color: red;
  }

  .act-link {
    display: block;
    text-align: center;
    background: #fff;
    padding: .5rem;
    color: #25AD25;
    border-radius: 3px;
  }

  .act-link .iconfont {
    color: #25AD25;
  }

  .ios-btn {
    display: block;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }
</style>
