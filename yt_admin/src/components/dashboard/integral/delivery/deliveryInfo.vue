<template>
    <div class="changeInfo">
      <div class="row lastRow">
        <div class="col-xs-12">
          <div class="orderTitle noneBorder2">
            <p><i class="fa fa-university"></i><span class="userTitle">兑换记录详细信息</span></p>
          </div>
          <div class="">
            <table class="table tablehead">
              <tr>
                <td width="15%">类型</td>
                <td><span class="label label-primary">兑换</span></td>
              </tr>
              <tr>
                <td>商品</td>
                <td><img class="imgC" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587" />1111111</td>
              </tr>
              <tr>
                <td>粉丝</td>
                <td><img class="imgC" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587" />1111111</td>
              </tr>
              <tr>
                <td>消耗</td>
                <td>-3990积分</td>
              </tr>
              <tr>
                <td>参与时间</td>
                <td>2018-02-26 14:33:44</td>
              </tr>
              <tr>
                <td>状态</td>
                <td><span class="label label-primary">待发货</span></td>
              </tr>
              <tr>
                <td>支付状态</td>
                <td><span class="label label-primary">无需支付</span></td>
              </tr>
              <tr>
                <td>运费支付状态</td>
                <td><span class="label label-primary">无需支付</span></td>
              </tr>
              <tr>
                <td>收件人信息</td>
                <td>
                  <p>收件人： 哈哈 / 13522536253 </p>
                  <p>收货地址:  广东省广州市花都区 盛美大厦</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-group">
                    <label for="inputPassword3" class="col-sm-2 control-label"></label>

                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">确认兑换</button>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import api from 'api/index.js'
  export default {
    name: 'changInfo',
    data () {
      return {
        order: {}
      }
    },
    route: {
      data (transition) {
        return {
          order: api.cardorder.get(transition.to.params.order_id)
        }
      }
    },
    // created () {
    //   this.$http.get('/admin/card/cardorder/detail/41114').then((response) => {
    //     this.carts = response.data
    //     console.log(this.carts)
    //   })
    // },
    methods: {}
  }
</script>

<style scoped>
  .tablehead>tbody>tr>td{
    border-style:none ;
    border-top: none!important;
    padding: 15px 0px 15px 20px;
  }
  .imgC{
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border: 1px solid #dddddd;
  }
  .userTitle{
    padding-left: 10px;
    font-size: 19px;
  }
  tr{
    padding: 20px 0px;
  }
  .orderTitle{
    border-bottom: 1px solid #cccccc;
    padding: 10px 0px 0px 10px;
  }
  .tableClass tr{
    padding-bottom: 20px;
    line-height: 35px;
  }
  .lastRow{
    background: #ffffff;
    margin-left: 9px;
    margin-right: 10px;
    margin-top: 20px;
  }
  .col-xs-12{
    padding: 0px;
    margin: 0px;
  }
  .table{
    margin-bottom: 0px;
  }

</style>
