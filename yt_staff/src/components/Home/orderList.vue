<template>
  <div class="u-head">
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/staff/info' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1>用户列表</h1>
      </div>
      <div class="pure-u-1-5"></div>
    </div>
  </div>
  <div class="m-user mt20">
    <ul>
      <li class="user-list" v-for="preorder in preorders">
        <a v-link="{ path: '/staff/orders/' + preorder.id }">
          {{preorder.name}} <i class="iconfont">&#xe603;</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'UserList',

    data: function () {
      return {
        preorders: []
      }
    },

    route: {
      data: function () {
        return this.$http.get('/staffs/preorders').then(
          function ({data: {data: preorders}}) {
            return {
              preorders: preorders
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
  }
</script>
