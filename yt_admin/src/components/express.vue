<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-warning btn-sm" data-toggle="modal"
          data-target="#myModal">发货
  </button>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">订单号：{{order.order_no}}</h4>
        </div>
        <div class="modal-body order-tables">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>商品</th>
              <th>数量</th>
            </tr>
            </thead>
            <tbody>
            <tr style="text-align: left;" v-for="sku in order.skus">
              <td>
                <span>{{sku.name}}</span>
              </td>
              <td>{{sku.quantity}}</td>
            </tr>
            </tbody>
          </table>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-2"><label for="" class="form-label">物流公司：</label></div>
              <div class="col-sm-4">
                <select name="" id="" class="form-control" v-model="info.company">
                  <option value="default" disabled="disabled">请选择一个物流公司</option>
                  <option value="德邦物流">德邦物流</option>
                  <option value="DHL">DHL</option>
                  <option value="EMS">EMS</option>
                  <option value="Fedex">Fedex</option>
                  <option value="国通快递">国通快递</option>
                  <option value="汇通快运">汇通快运</option>
                  <option value="联邦快递">联邦快递</option>
                  <option value="龙邦物流">龙邦物流</option>
                  <option value="全峰快递">全峰快递</option>
                  <option value="全日通快递">全日通快递</option>
                  <option value="如风达">如风达</option>
                  <option value="申通快递">申通快递</option>
                  <option value="顺丰速运">顺丰速运</option>
                  <option value="速尔物流">速尔物流</option>
                  <option value="天天快递">天天快递</option>
                  <option value="TNT">TNT</option>
                  <option value="UPS">UPS</option>
                  <option value="优速物流">优速物流</option>
                  <option value="圆通速递">圆通速递</option>
                  <option value="韵达快运">韵达快运</option>
                  <option value="银捷速递">银捷速递</option>
                  <option value="宅急送">宅急送</option>
                  <option value="中铁快运">中铁快运</option>
                  <option value="中通快递">中通快递</option>
                  <option value="中邮物流">中邮物流</option>
                  <option value="中国邮政">中国邮政</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-2"><label for="" class="form-label">物流单号：</label></div>
              <div class="col-sm-4">
                <input type="text" class="form-control" v-model="info.post_no">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">
            取消
          </button>
          <button @click.prevent="submit" type="button" class="btn btn-primary" :disabled="!valid">确认发货</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'Express',
    props: ['order'],
    computed: {
      valid () {
        return this.info.company && this.info.post_no.length > 0
      }
    },
    data () {
      return {
        info: {
          company: '',
          post_no: ''
        }
      }
    },
    methods: {
      submit () {
        Vue.http.put('/admin/mall/orders/' + this.order.order_no, this.info).then(
          function (data) {
            window.alert('发货成功')
            window.location.reload()
          },
          function (error) {
            console.error(error)
          }
        )
      }
    }
  }
</script>
