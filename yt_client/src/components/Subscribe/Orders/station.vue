<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
        <a v-link="{ path: '/subscribe/orders/' + $route.params.order_no }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          服务点信息
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
      </div>
    </div>
  </div>
  <div class="m-order-list">
    <div class="pure-g">
      <div class="pure-u-1-3">
        <span class="title">服务部名称</span>
      </div>
      <div class="pure-u-2-3">
        <div class="content">
          <span>{{order.station.name}}</span>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-1-3">
        <span class="title">服务部地址</span>
      </div>
      <div class="pure-u-2-3">
        <div class="content">
          <span>{{order.station.address}}</span>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-2-5">
        <span class="title">服务部电话</span>
      </div>
      <div class="pure-u-3-5">
        <div class="content">
          <a class="phone-link" :href="'tel:' + order.station.tel"><span>{{order.station.tel}}</span></a>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-2-5">
        <span class="title">当前配送员</span>
      </div>
      <div class="pure-u-3-5">
        <div class="content">
          <span>{{order.staff.name}}</span>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-2-5">
        <span class="title">配送员电话</span>
      </div>
      <div class="pure-u-3-5">
        <div class="content">
          <a class="phone-link" :href="'tel:' + order.staff.phone"><span>{{order.staff.phone}}</span></a>
        </div>
      </div>
    </div>
    <div class="pure-g">
      <div class="pure-u-2-5">
        <span class="title">配送员编号</span>
      </div>
      <div class="pure-u-3-5">
        <div class="content">
          <span>{{order.staff.staff_no}}</span>
        </div>
      </div>
    </div>
  </div>
  <p class="bottom-info">燕塘服务电话: <a class="phone-link" href="tel:400-888-1956"><span>400-888-1956</span></a>
  </p>
</template>

<script>
  export default {
    name: 'PreStation',

    data: function () {
      return {
        order: {}
      }
    },

    route: {
      data: function () {
        return this.$http.get('/subscribe/preorders/' + this.$route.params.order_no).then(
          function ({data: {data: order}}) {
            return {
              order: order
            }
          },
          function (data) {
            window.alert('获取数据有误')
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .bottom-info {
    position: fixed;
    bottom: 1rem;
    text-align: center;
    color: #bbb;
    font-size: 1.2rem;
    width: 100%;
  }

  .m-order-list {
    margin: 1rem;
    padding: 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 1.4rem;
  }

  .m-order-list .title {
    display: inline-block;
    width: 100%;
    font-weight: bold;
  }

  .m-order-list .pure-g {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
  }

  .m-order-list .content {
    display: inline-block;
    width: 100%;
    text-align: right;
    color: #C71A40;
  }

  .m-order-list .pure-g:last-child {
    border-bottom: 0 none;
  }
</style>
