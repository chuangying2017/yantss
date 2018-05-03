<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">商品管理</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="date" class="form-control w150 mb20 mt20" v-model="query.start_time">
                至
                <input type="date" class="form-control w150 mb20 mt20" v-model="query.end_time">

              </div>

            </div>
            <div class="col-md-6 mg20 mt20">
              <form action="" class="form-horizontal">
                <div class="form-group">
                  <select class="selC" v-model="query.type">
                    <option value="0">日常签到</option>
                    <option value="1">连签奖励</option>
                    <option value="2">总签奖励</option>
                  </select><select class="selC" v-model="query.info">
                  <option value="0">不按日期</option>
                  <option value="1">搜索日期</option>
                </select><input type="text" class="form-control w250" placeholder="请输入昵称/手机号进行搜索" v-model="query.name"><button type="button" class="btn btn-info bn">搜索</button>

                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <div class="col-md-12">
              <div class="tab-content order-tables">
                <div class="row">
                  <div class="col-xs-12">
                      <!-- /.box-header -->
                      <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-striped goodsTable">
                          <tbody>
                          <tr>
                            <th>ID</th>
                            <th>用户</th>
                            <th>类型</th>
                            <th>获得积分</th>
                            <th>备注</th>
                            <th>签到时间</th>
                          </tr>
                          <tr>
                          <!--<tr v-for="order in orders">-->
                            <td>54</td>
                            <td>
                              <div class="spCon">
                                <div class="imgCon">
                                  <img class="imgC b50" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587"/>
                                </div>
                                <div>
                                  <p class="middleP">牛奶</p>
                                </div>
                              </div>
                            </td>
                            <td>日常签到</td>
                            <td>
                              +10
                            </td>
                            <td>日常签到+10积分</td>
                            <td>2018.02.28 11:21:57</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <!-- /.box-body -->
                      <!--<div class="box-footer">-->
                      <!--<p>合计: {{pagination.total}}</p> 当前页:-->
                      <!--<pagination :pagination="pagination" :goto="search"></pagination>-->
                      <!--</div>-->
                    <!-- /.box -->
                  </div>
                </div>
              </div>
            <!-- /. box -->
          </div>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Express from 'components/express.vue'
  export default {
    name: 'ListMallOrders',
    components: [Express],
    data () {
      return {
        orders: [],
        pagination: {},
        query: {},
        checkedAll: false,
        checkModel: []
      }
    },
    route: {
      data ({to: {query: query}}) {
        return api.orders.getAll(query).then(function ({data: orders, meta: {pagination: pagination}}) {
          return {
            orders: orders,
            query: query,
            pagination: pagination
          }
        })
      }
    }

  }
</script>

<style scoped>
  .mt20{
    margin-top: 20px;
  }
  .selC{
    width: 100px;
    height: 34.5px;
    border-color: #d2d6de;
  }
  .w250{
    width:350px;
    display: inline;
  }
  .w150{
    width:150px;
    display: inline;
  }
  .bn{
    border-radius: 0px;
    height: 34px;
    position: relative;
    top:-1px;
  }
  .imgC{
    width: 30px;
    height: 30px;
  }
  .spCon{
    display: flex;

  }
  .imgCon{
    border: 1px solid #dddddd;
    width: 52px;
    height: 52px;
    margin-left: 0px;
    margin-right: 5px;
    border-radius: 50%;
  }
  .goodsTable>tbody>tr>td{
    vertical-align: middle;
  }
  .b50{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .middleP{
    margin-top: 15px;

  }
</style>
