<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">创建红包</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">名称</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="packet.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">类型</label>

                  <div class="col-sm-8">
                    <select class="form-control" v-model="packet.type">
                      <option value="{{type.name}}" v-for="type in types">{{type.desc}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">描述</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="packet.desc">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">显示内容</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="packet.content">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">开始时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="packet.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">结束时间</label>

                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="packet.end_time">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">有效时间(天)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="packet.effect_days">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">红包数量(张)</label>

                  <div class="col-sm-8">
                    <input type="text" number class="form-control" v-model="packet.quantity">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-4 control-label">关联优惠券</label>

                  <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-12" class="checkbox" v-for="coupon in coupons">
                        <label for=""><input type="checkbox" :checked="packet.coupons.indexOf(coupon.id) > -1"
                                             v-model="packet.coupons"
                                             value="{{coupon.id}}">
                          {{coupon.name}}
                          - {{coupon.desc}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" :disabled="packet.coupons.length <= 0" class="btn btn-danger left"
                    @click.prevent="submit">更新
            </button>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'CreatePacket',
    data () {
      return {
        types: [{
          name: 'preorder',
          desc: '	订单红包'
        }],
        selectedCoupons: [],
        packet: {
          name: '',
          type: 'preorder',
          desc: '',
          content: '',
          start_time: '2016-10-12',
          end_time: '2016-10-22',
          effect_days: 10,
          quantity: 10,
          coupons: []
        }
      }
    },
    route: {
      data ({to: {params: {packet_id: packet_id}}}) {
        return api.packets.get(packet_id).then(function (packet) {
          var couponIds = []
          packet.coupons.forEach(function (val) {
            couponIds.push(val.id.toString())
          })
          packet.coupons = couponIds
          return {
            packet: packet,
            coupons: api.coupons.getAll({all: 1})
          }
        })
      }
    },
    methods: {
      submit () {
        var self = this
        api.packets.update(this.packet.id, {
          name: this.packet.name,
          type: this.packet.type,
          desc: this.packet.desc,
          content: '',
          start_time: this.packet.start_time,
          end_time: this.packet.end_time,
          effect_days: this.packet.effect_days,
          quantity: this.packet.quantity,
          coupons: this.packet.coupons
        }).then(function (data) {
          window.alert('更新成功!')
          self.$route.router.go('/dashboard/stations/packets/list')
        }, function () {
          window.alert('更新失败, 请重试!')
          window.location.reload()
        })
      }
    }
  }
</script>
