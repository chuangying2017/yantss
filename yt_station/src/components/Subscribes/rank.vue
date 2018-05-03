<template>
  <div class="u-head">
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/subscribes/list/all' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1>服务部排行榜</h1>
      </div>
      <div class="pure-u-1-5"></div>
    </div>
  </div>
  <div class="m-user mt20">
    <ul>
      <li class="user-list" v-for="item in rank">
        <a>
          <span class="winner">
            <i class="iconfont" v-show="$index < 3">&#xe669;</i>
          </span>
          <span class="price">
            <i class="iconfont" v-show="$index > 2 && $index < 10">&#xe66a;</i>
          </span>
          第{{$index + 1}}名: {{item.name}} <span class="fr">接单数量: {{item.quantity}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: 'Rank',

    data: function () {
      return {
        rank: []
      }
    },

    route: {
      data: function () {
        return this.$http.get('/stations/board').then(
          function ({data: {data: rank}}) {
            return {
              rank: rank
            }
          },
          function (data) {
            window.alert('获取数据失败,请刷新重试')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .m-user {
    padding: 0;
  }

  .m-user a {
    color: #000;
  }

  .m-user .iconfont {
    float: none;
    font-size: 2rem;
    vertical-align: bottom;
    -webkit-font-smoothing: antialiased;
  }

  .m-user li:nth-child(1) .winner .iconfont {
    color: #fdd225;
  }

  .m-user li:nth-child(2) .winner .iconfont {
    color: #c1c1c1;
  }

  .m-user li:nth-child(3) .winner .iconfont {
    color: #ffa900;
  }

  .m-user li .price .iconfont {
    color: #c32f00;
    font-size: 1.6rem;
  }
</style>
