<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        积分管理
        <small>Integral</small>
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{path: '/dashboard/home'}"><i class="fa fa-dashboard"></i> 概况</a></li>
        <li class="active">积分管理</li>
      </ol>
    </section>
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">添加商品</h3>
          <div class="u-tab">
            <div class="tabitem">
              <div>
                <a v-link="{ path: '/dashboard/addgood/setgood', activeClass: 'active' }">
                  商品设置
                </a>
              </div>
              <div>
                <a v-link="{ path: '/dashboard/addgood/goodinfo', activeClass: 'active' }">
                  详情
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'addgood'
  }
</script>

<style scoped>
  .u-tab {
    margin: 1rem;
    text-align: center;
    border-bottom: 1px solid #dddddd;
  }
  .u-tab a {
    display: block;
    padding: .5rem;
    font-size: 1.4rem;
    color: #666666;
    background: #fff;
  }
  .u-tab a.active {
    color: #666666;
    border-top: 2px solid #3C8DBC;
    border-right: 1px solid #dddddd;
    border-bottom: none;
    border-left: 1px solid #dddddd;
    position: relative;
    top:1px;
  }
  .tabitem{
    display: flex;
  }
  .content-header{
    margin-bottom: 20px;
  }
  .box{
    box-shadow: none;
  }

</style>

