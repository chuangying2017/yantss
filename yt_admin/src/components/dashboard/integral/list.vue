<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">商品管理</h3>
          <div class="row">
            <div class="col-md-6">
              <a v-link="{path: '/dashboard/addgood/setgood'}" class="btn btn-social btn-info btn-sm mb20 mt20">
                <i class="fa fa-plus"></i> 添加商品
              </a>
            </div>

            <div class="col-md-6 mg20 mt20">
              <form action="" class="form-horizontal">
                <div class="form-group">
                  <select class="selC" v-model="">
                    <option value="0">上架</option>
                    <option value="1">下架</option>
                  </select><select class="selC" v-model="query.type">
                    <option value="0">商品分类</option>
                    <option value="1">礼品</option>
                  </select><input type="text" class="form-control w250" placeholder="请输入关键字" v-model="query.name"><button type="button" class="btn btn-info bn">搜索</button>
                </div>
                <div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <div class="col-md-12">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li :class="{active: !query.status}"><a href="#!/dashboard/integral/list">出售中</a></li>
                <li :class="{active: query.status == 'paid'}"><a
                  href="#!/dashboard/integral/list?status=paid">已售罄</a></li>
                <li :class="{active: query.status == 'shipping'}"><a
                  href="#!/dashboard/integral/list?status=shipping">仓库中</a>
                </li>
                <li :class="{active: query.status == 'unpaid'}"><a href="#!/dashboard/integral/list?status=unpaid">回收站</a>
                </li>
              </ul>
              <div class="tab-content order-tables">
                <!--<div class="btnCon">-->
                  <!--<input type="checkbox" class="checkC"/>-->
                  <!--<button type="button" class="btn"><i class="fa fa-arrow-up"></i>下架</button>-->
                  <!--<button type="button" class="btn"><i class="fa fa-arrow-down"></i>上架</button>-->
                  <!--<button type="button" class="btn"><i class="fa fa-trash"></i>删除</button>-->
                  <!--<button type="button" class="btn"><i class="fa fa-times"></i>彻底删除</button>-->
                <!--</div>-->
                <div class="row">
                  <div class="col-xs-12">
                      <!-- /.box-header -->
                      <div class="box-body table-responsive no-padding">
                        <table class="table table-hover table-striped goodsTable">
                          <tbody>
                          <tr>
                            <th>排序</th>
                            <th>商品</th>
                            <th>商品类型</th>
                            <th>消耗</th>
                            <th>参与/浏览</th>
                            <th>状态</th>
                            <th>操作</th>
                          </tr>
                          <tr>

                          <!--<tr v-for="order in orders">-->
                            <!--<td><input type="checkbox" class="checkC" value="0"/></td>-->
                            <td>1</td>
                            <td>
                              <div class="spCon">
                                <div class="imgGc">
                                  <img class="imgGood" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587"/>
                                </div>
                                <div>
                                  <p>[礼品]</p>
                                  <p>景德镇瓷器 蓝国华大师 古彩“三友图”笔筒</p>
                                </div>
                              </div>
                            </td>
                            <td>商品</td>
                            <td>-4900积分</td>
                            <td>0/6</td>
                            <td>
                              <a @click.prevent="action('down', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-if="query.status=='up'">不推荐</a>
                              <a @click.prevent="action('up', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-else>推荐</a>
                              <a @click.prevent="action('down', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-if="query.status=='up'">暂停</a>
                              <a @click.prevent="action('up', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-else>启动</a>
                              <a @click.prevent="action('down', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-if="query.status=='up'">下架</a>
                              <a @click.prevent="action('up', product)" href="#" type="button"
                                 class="btn btn-default btn-sm" v-else>上架</a>
                            </td>
                            <td>
                              <button type="button" class="btnC"><i class="fa fa-edit fac"></i></button>
                              <button type="button" class="btnC"><i class="fa fa-trash fac"></i></button>
                            </td>
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
              <!-- /.tab-content -->
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
    name: 'list',
    components: [Express],
    data () {
      return {
        orders: [],
        pagination: {},
        query: {}
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
  .nav-tabs-custom {
    box-shadow: none;
  }
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
  .bn{
    border-radius: 0px;
    height: 34px;
    position: relative;
    top:-1px;
  }
  .checkC{
    width: 18px;
    height: 18px;
    position: relative;
    top:5px;
  }
  .btnCon{
    padding-bottom: 10px;
    border-bottom: 1px solid #F5F5F5;
  }
  .imgGood{
    width: 50px;
    height: 50px;
    margin-top: 1px;
  }
  .spCon{
    display: flex;
    margin: 5px;
  }
  .goodsTable>tbody>tr>td{
    vertical-align: middle;
  }
  .btnC{
    width: 25px;
    height: 30px;
    background: white;
    border: 1px solid #cccccc;
  }
  .fac{
    color: #9D9D9D;
    font-size: 10px;
  }
  .imgGc{
    width: 53px;
    height: 53px;
    border: 1px solid #dddddd;
    margin-right: 10px;
  }
</style>
