<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a href="javascript:window.history.go(-1)"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          订单确认
        </h1>
      </div>
    </div>
  </div>
  <ul class="m-list-links m-list-section">
    <li>
      <h2 class="title"><i class="iconfont">&#xe649;</i> 收货信息</h2>
    </li>
    <li v-if="addresses.length" @click.prevent="toggleSelectMode">
      <!--<a href="#" @click.prevent="selectMode = true">-->
      <!--选择收货地址-->
      <!--<i class="iconfont fr">&#xe60e;</i>-->
      <!--</a>-->
      <a href="#" v-if="selectedAdr.id">
        <div class="m-address m-address-order m-address-confirm">
          <div class="f-table">
            <div class="f-table-cell">
              <h2 class="name">{{selectedAdr.name}} <span class="phone fr">{{selectedAdr.phone}}</span></h2>
              <p class="address">
                {{selectedAdr.province}}{{selectedAdr.city}}{{selectedAdr.district}}{{selectedAdr.detail}}</p>
            </div>
          </div>
        </div>
      </a>
      <a href="#" v-if="!addresses.length" @click.prevent="toggleAddMode">
        <span class="tips">还未创建地址，请先添加地址</span>
      </a>
    </li>
    <li>
      <a href="#" @click.prevent="addMode = true">
        新增收货地址
        <i class="iconfont fr">&#xe60e;</i>
      </a>
    </li>
  </ul>
  <ul class="m-list-links m-list-section">
    <li>
      <h2 class="title"><i class="iconfont">&#xe631;</i> 订单详情</h2>
    </li>
    <li>
      <div class="m-order-pd" v-for="sku in cart.data.skus">
        <div class="pure-g">
          <div class="pure-u-5-6">
            <div class="wrap">
              <div class="f-table-cell">
                <img :src="sku.cover_image" class="thumbnail">
              </div>
              <div class="f-table-cell">
                <p class="text">{{sku.name}}</p>
                <!--<span class="tips" v-for="attr in sku.sku.attributes">-->
                <!--{{attr.attr_value_name}}-->
                <!--</span>-->
              </div>
            </div>
          </div>
          <div class="pure-u-1-6">
            <p class="price">￥{{sku.price}}</p>
            <p class="num">x {{sku.quantity}}</p>
          </div>
        </div>
      </div>
    </li>
    <!--<li v-if="skus.data.marketing.coupons.length">-->
    <!--<a>-->
    <!--<select class="u-select u-select-coupon" @change="useCoupon();" v-model="selectedCoupon">-->
    <!--<option selected disabled="disabled">选择优惠券</option>-->
    <!--<option v-for="coupon in skus.data.marketing.coupons" :value="{ discount: coupon.id }">-->
    <!--{{ coupon.name }}-->
    <!--</option>-->
    <!--</select>-->
    <!--<i class="iconfont fr">&#xe619;</i>-->
    <!--</a>-->
    <!--</li>-->
  </ul>
  <ul class="m-list m-list-section">
    <li class="title">
      <i class="iconfont">&#xe627;</i> 备注信息
    </li>
    <li>
      <textarea cols="30" rows="10" class="u-textarea" placeholder="请输入备注信息" v-model="memo"></textarea>
    </li>
  </ul>
  <div class="m-foot m-foot-act">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <p class="price">¥{{cart.data.pay_amount}}</p>
        <p class="tips">共有{{cart.data.skus.length}}件产品</p>
      </div>
      <div class="pure-u-1-2">
        <a href="#" class="u-btn u-btn-default" @click.prevent="submitOrder();">立即结算</a>
      </div>
    </div>
  </div>
  <div class="m-adrMask" v-if="addMode">
    <div class="f-table">
      <div class="f-table-cell">
        <div class='m-form'>
          <form v-form name="addressForm" @submit.prevent="saveAddress();">
            <div class="m-form-title">
              <h2 class="title">
                <i class="iconfont">&#xe649;</i>
                新增收货信息
                <i class="iconfont fr cancle" @click.prevent="addMode = false">&#xe634;</i>
              </h2>
            </div>
            <div class="m-form-item">
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <label>
                    收件人
                  </label>
                </div>
                <div class="pure-u-4-5">
                  <input type="text" name="username" class="u-input u-input-full" placeholder="请在此输入姓名"
                         v-model="address.name" v-form-ctrl required>
                </div>
              </div>
            </div>
            <div class="m-form-item">
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <label>
                    收货地址
                  </label>
                </div>
                <div class="pure-u-4-5">
                  <city-select></city-select>
                </div>
              </div>
            </div>
            <div class="m-form-item">
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <label>
                    详细地址
                  </label>
                </div>
                <div class="pure-u-4-5">
                  <input type="text" name="detail" class="u-input u-input-full" placeholder="在此输入详细地址"
                         v-model="address.detail" v-form-ctrl required>
                </div>
              </div>
            </div>
            <div class="m-form-item">
              <div class="pure-g">
                <div class="pure-u-1-5">
                  <label>
                    手机
                  </label>
                </div>
                <div class="pure-u-4-5">
                  <input type="tel" name="phone" class="u-input u-input-full" placeholder="请填写手机号码"
                         v-model="address.phone" v-form-ctrl required>
                </div>
              </div>
            </div>
            <div class="container">
              <button type="submit" class="u-btn u-btn-info u-btn-fullwidth"
                      v-if="!saveProgress">保存地址
              </button>
              <button type="submit" class="u-btn u-btn-info u-btn-fullwidth" v-if="saveProgress">正在保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="m-adrMask" v-if="selectMode">
    <div class="f-table">
      <div class="f-table-cell">
        <ul class="m-list m-list-select m-list-address">
          <li class="f-tap-transparent" v-for="address in addresses">
            <input type="radio" name="address" :value="address.id" :id="'adr' + address.id" v-model="selectedAdrID">
            <label :for="'adr' + address.id">
              <div class="item-select item-select-right">
                <i class="iconfont uncheck">&#xe61a;</i>
                <i class="iconfont checked">&#xe616;</i>
              </div>
              <div class="m-address f-table-cell" style="width: 100%">
                <h2 class="name">{{address.name}} <span class="phone fr">{{address.phone}}</span></h2>
                <p class="address">{{address.province}}{{address.city}}{{address.district}}{{address.detail}}</p>
              </div>
            </label>
          </li>
        </ul>
        <div class="btn-wrap">
          <a href="#" class="u-btn u-btn-info u-btn-fullwidth address-select-btn" @click.prevent="chooseAdr();">选择地址</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CitySelect from './cityselect.vue'
  import _ from 'underscore'

  export default{
    name: 'Confirm',

    data: function () {
      return {
        addresses: [],
        cart: {
          data: {
            skus: []
          }
        },
        addMode: false,
        selectMode: false,
        address: {
          name: '',
          province: '',
          city: '',
          district: '',
          detail: '',
          phone: '',
          tel: '',
          dispaly_name: ''
        },
        addressForm: {
          name: '',
          province: '',
          city: '',
          district: '',
          detail: '',
          phone: '',
          tel: '',
          dispaly_name: ''
        },
        selectedAdr: {},
        selectedAdrID: null
      }
    },

    components: {
      CitySelect
    },

    methods: {
      toggleAddMode: function () {
        this.addMode = !this.addMode
      },
      toggleSelectMode: function () {
        this.selectMode = !this.selectMode
      },
      saveAddress: function () {
        if (this.addressForm.$invalid) {
          window.alert('请正确填写表单再提交')
          return false
        }
        var self = this
        this.$http.post('/users/address', this.address).then(
          function (data) {
            // 保存成功
            self.updateAddress()
            self.selectedAdr = data.data.data
            self.updateTempOrder(self.$route.params.order_temp_id, self.selectedAdr.id).then(
              function (data) {
                self.cart = data.data
              },
              function (data) {
                console.log(data)
              }
            )
            // 弹框消失
            this.addMode = false
          },
          function (data) {
            // 保存失败
          }
        )
      },
      updateAddress: function () {
        var self = this
        this.$http.get('/users/address').then(
          function (data) {
            self.addresses = data.data.data
          },
          function (data) {
            window.alert('获取地址失败')
          }
        )
      },
      updateTempOrder: function (tempId, adrId) {
        var self = this
        return new Promise(function (resolve, reject) {
          self.$http.put('/mall/orders/cart/' + tempId, {
            address: adrId
          }).then(
            function (data) {
              resolve(data)
            },
            function (data) {
              reject(data)
            }
          )
        })
      },
      chooseAdr: function () {
        var self = this
        if (self.selectedAdrID === null) {
          window.alert('请选择一个地址')
          return false
        }
        self.selectedAdr = _.find(self.addresses, function (obj) {
          return obj.id === self.selectedAdrID
        })
        self.selectMode = false
        self.updateTempOrder(self.$route.params.order_temp_id, self.selectedAdrID).then(
          function (data) {
            self.cart = data.data
          },
          function (data) {
            console.log(data)
          }
        )
      },
      submitOrder: function () {
        var self = this
        this.$http.post('/mall/orders', {
          temp_order_id: this.$route.params.order_temp_id
        }).then(
          function (data) {
            // 成功生成订单,准备跳转支付
            console.log(data.data)
            var orderID = data.data.data.id
            self.$route.router.go('/mall/pay/' + orderID)
          },
          function (data) {
            // 失败,请重新处理
            window.alert('网络出错,请重新处理')
          }
        )
      }
    },

    route: {
      data (transition) {
        var self = this
        return Promise.all([
          this.$http.get('/users/address'),
          this.$http.get('/mall/orders/cart/' + transition.to.params.order_temp_id)
        ]).then(function ([addresses, cart]) {
          if (addresses.data.data.length > 0) {
            self.selectedAdr = addresses.data.data[addresses.data.data.length - 1]
            self.selectedAdrID = addresses.data.data[addresses.data.data.length - 1].id
            // 执行更新缓存订单的地址
            self.updateTempOrder(transition.to.params.order_temp_id, self.selectedAdrID).then(
              function (data) {
                self.cart = data.data
              }
            )
            return {
              addresses: addresses.data.data,
              cart: cart.data
            }
          } else {
            return {
              addresses: addresses.data.data,
              cart: cart.data
            }
          }
        })
      }
    },

    events: {
      'city-change': function (address) {
        this.address.province = address.province
        this.address.city = address.city
        this.address.district = address.district
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }

  #yt-mall .m-form {
    background: #fff;
  }

  #yt-mall .m-form .title {
    padding: 1rem;
    font-size: 1.6rem;
  }

  #yt-mall .m-form label {
    font-size: 1.2rem;
  }

  #yt-mall .m-address.m-address-order {
    margin: 0;
    padding: 0;
  }

  #yt-mall .m-address.m-address-order .f-table {
    width: 100%;
  }

  #yt-mall .address-select-btn {
    display: block;
  }

  #yt-mall textarea {
    border: 1px solid #ddd;
    -webkit-border-radius: .5rem;
    -moz-border-radius: .5rem;
    border-radius: .5rem;
    height: 10rem;
  }
</style>
