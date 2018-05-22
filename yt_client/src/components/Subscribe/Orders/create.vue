<template>
  <loader v-show="$loadingRouteData"></loader>
  <div v-show="!$loadingRouteData">
    <section v-show="step === 1">
      <div class="m-head m-head-info f-border-bottom f-mg-bottom">
        <div class="pure-g">
          <div class="pure-u-1-5 tl">
            <a v-link="{ path: '/mall/home' }"><i class="iconfont">&#xe661;</i></a>
          </div>
          <div class="pure-u-3-5">
            <h1 class="title" style="color: #000;font-size: 1.4rem;">
              第1步: 选择产品
            </h1>
          </div>
          <div class="pure-u-1-5 tr">
          </div>
        </div>
      </div>
      <div class="m-nav mb10">
        <div class="pure-g">
          <div class="pure-u-1-2">
            <a href="#" :class="{'s-active': showProduct}" @click.prevent="showProduct = true">
              商品选择
            </a>
          </div>
          <div class="pure-u-1-2">
            <a href="#" :class="{'s-active': !showProduct}" @click.prevent="showProduct = false">
              用户评价
            </a>
          </div>
        </div>
      </div>
      <section v-show="showProduct" class="section-product clearfix">
        <ul class="cats">
          <li @click.prevent="selectedCat = ''" :class="{ 'active': selectedCat === '' }"><span>全部</span></li>
          <li v-for="cat in cats" :class="{ 'active': selectedCat === cat.id }" @click.prevent="selectedCat = cat.id">
            <span>{{cat.name}}</span></li>
        </ul>
        <div class="pros">
          <ul class="m-list-links f-shadow">
            <li v-for="product in products | orderBy 'priority' | productFilter selectedCat">
              <a @click.prevent="addProduct(product)">
                <div class="m-pd-item">
                  <div class="pd-item-left">
                    <img :src="product.cover_image" height="350" width="350" alt="" class="thumbnail">
                  </div>
                  <div class="pd-item-right">
                    <h2 class="title">{{ product.name }}</h2>
                    <span class="price">￥{{ product.price }}</span>
                    <span class="addCart">+ 添加</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <product-box :product="boxData" :class="[ boxData.id ? 'boxShow' : '' ]"></product-box>
      <section v-show="!showProduct">
        <empty>当前没有用户评价</empty>
      </section>
      <div style="padding-bottom: 6rem;"></div>
      <div class="m-cart-mask" v-show="cartView"></div>
      <div class="m-foot m-foot-act">
        <div class="m-foot-wrap m-foot-cart" v-show="cartView">
          <div class="foot-cart">
            <h2 class="title"><i class="iconfont">&#xe62f;</i> 购物车 <span @click.prevent="cartView = false">关闭</span>
            </h2>
            <ul>
              <li class="cart-list" v-for="sku in cart">
                <div class="pure-g">
                  <div class="pure-u-3-4">
                    {{sku.name}}（{{sku.quantity}}{{sku.unit}}/每日{{sku.per_day}}{{sku.unit}}）
                  </div>
                  <div class="pure-u-1-4">
                    <span @click.prevent="delSku(sku)"><i class="iconfont">&#xe634;</i> 删除</span>
                  </div>
                </div>
              </li>
              <li class="cart-list" v-if="!cart.length">
                <div class="pure-g">
                  <div class="pure-u-3-4" style="color: #c5c5c5;">
                    购物车暂时没有物品
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="m-foot-wrap m-foot-status">
          <div :class="['foot-cart-icon', cart.length ? '' : 'foot-cart-disable']"
               @click.prevent="cartView = !cartView">
            <i class="iconfont">&#xe60f;</i>
          </div>
          <div class="pure-g">
            <div class="pure-u-1-6">
            </div>
            <div class="pure-u-1-3">
              <p class="price" @click.prevent="cartView = true">选中{{cart.length}}件</p>
              <p class="tips" @click.prevent="cartView = true">查看选中产品</p>
            </div>
            <div class="pure-u-1-2">
              <a href="#" class="u-nav-btn u-btn-primary"
                 v-show="cart.length" @click.prevent="nextStep">下一步</a>
              <a class="u-nav-btn u-btn-primary u-btn-disable" v-show="!cart.length">请选择商品</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="step === 2">
      <div class="m-head m-head-info f-border-bottom f-mg-bottom">
        <div class="pure-g">
          <div class="pure-u-1-5 tl">
            <a href="#" @click.prevent="step = 1"><i class="iconfont">&#xe628;</i></a>
          </div>
          <div class="pure-u-3-5">
            <h1 class="title" style="color: #000;font-size: 1.4rem;">
              第2步: 送奶配置
            </h1>
          </div>
          <div class="pure-u-1-5 tr">
          </div>
        </div>
      </div>
      <h3 class="subTitle">选择配送周期</h3>
      <div class="radio-wrap">
        <div class="pure-g">
          <div class="pure-u-1-2">
            <div class="radio-content">
              <input type="radio" name="weekday_type" v-model="orderData.weekday_type" value="all" id="wholeweek"
                     class="checkbox-lg normal">
              <label for="wholeweek">周一到周日</label>
            </div>
          </div>
          <div class="pure-u-1-2">
            <div class="radio-content">
              <input type="radio" name="weekday_type" v-model="orderData.weekday_type" value="workday" id="workday"
                     class="checkbox-lg normal">
              <label for="workday">周一到周五</label>
            </div>
          </div>
        </div>
      </div>
      <h3 class="subTitle">选择配送时间段</h3>
      <div class="radio-wrap">
        <div class="pure-g">
          <div class="pure-u-1-2">
            <div class="radio-content">
              <input type="radio" name="daytime" v-model="orderData.daytime" value="1" id="morning"
                     class="checkbox-lg normal">
              <label for="morning">上午(6-8点)</label>
            </div>
          </div>
          <div class="pure-u-1-2">
            <div class="radio-content">
              <input type="radio" name="daytime" v-model="orderData.daytime" value="0" id="afternoon"
                     class="checkbox-lg normal">
              <label for="afternoon">下午(4-6点)</label>
            </div>
          </div>
        </div>
      </div>
      <h3 class="subTitle">选择起送时间</h3>
      <div class="radio-wrap">
        <!--<input type="date" name="start_time" v-model="orderData.start_time" :min="minDay" style="height: 45px;">-->
        <date-picker :min="3" :max="5" :date.sync="orderData.start_time"></date-picker>
        <p class="item-info">* 请选择3天后5天内的日期</p>
      </div>
      <div class="m-fixed-nav">
        <div class="pure-g">
          <div class="pure-u-1-1">
            <a href="#" class="u-nav-btn u-btn-primary"
               v-show="orderData.start_time" @click.prevent="nextStep">下一步</a>
            <a class="u-nav-btn u-btn-primary u-btn-disable" v-show="!orderData.start_time">下一步</a>
          </div>
        </div>
      </div>
    </section>
    <section v-show="step === 3">
      <div class="m-head m-head-info f-border-bottom f-mg-bottom">
        <div class="pure-g">
          <div class="pure-u-1-5 tl">
            <a href="#" @click.prevent="step = 2"><i class="iconfont">&#xe628;</i></a>
          </div>
          <div class="pure-u-3-5">
            <h1 class="title" style="color: #000;font-size: 1.4rem;">
              第3步: 填写地址
            </h1>
          </div>
          <div class="pure-u-1-5 tr">
          </div>
        </div>
      </div>
      <h3 class="subTitle" v-if="addresses.length && !addAdrView">选择配送地址</h3>
      <!--<a href="#" class="list-link" @click.prevent="adrView = true"
         v-show="addresses.length && !selectedAdr.name && !addAdrView">选择已保存地址 <i
        class="iconfont">&#xe603;</i></a>-->
      <!--<a href="#" class="list-link" @click.prevent="adrView = true"
         v-show="addresses.length && selectedAdr.name && !addAdrView">
        {{selectedAdr.city}}{{selectedAdr.district}}{{selectedAdr.street}}{{selectedAdr.detail}}<br>
        {{selectedAdr.name}}{{selectedAdr.phone}}
        <i class="iconfont">&#xe603;</i>
      </a>-->
    
      <div href="#" class="list-link" :class="{defalutaddre:selectedAdrId==addre.id}" v-for="(index,addre) in addresses|filterBy '1' in 'default_status'" v-show="!addAdrView" @click="resetposition(addre.id),chooseAdr()">
        {{addre.province}}{{addre.city}}{{addre.district}}{{addre.street}}{{addre.detail}}<br>
        {{addre.name}}{{addre.phone}}
      </div>
      <div :class="{defalutaddre:selectedAdrId==addre.id}" v-show="addresses.length>1&&alladre&& !addAdrView" href="#" class="list-link" v-for="(index,addre) in addresses|filterBy '0' in 'default_status'" @click="resetposition(addre.id),chooseAdr()">     
        {{addre.province}}{{addre.city}}{{addre.district}}{{addre.street}}{{addre.detail}}<br>
        {{addre.name}}{{addre.phone}}
      </div>
      <a href="#" class="add-link" @click.prevent="addAdrView = true" v-show="(addresses.length && !addAdrView&&alladre)||(addresses.length==1 && !addAdrView)">+
        创建新地址 </a>
      <a href="#" class="add-link" @click.prevent="alladre = !alladre" v-show="addresses.length>1&& !addAdrView">
        显示全部地址</a>
        <!--map start-->
     <!--	<div><baidu-map></baidu-map></div>-->
     <div id="allmap" v-show="!addAdrView" style="width:100%;height:20rem;position:relative"></div>
      <!--map end-->
       <!--<div class="address-box" v-show="adrView">
        <div class="box-wrap">
         <div class="box-content">
            <h3 class="title">请选择地址<span class="close" @click.prevent="adrView = false"><i class="iconfont closeBox"
                                                                                           @click.prevent="closeBox">&#xe634;</i></span>
            </h3>
            <ul>
              <li v-for="adr in addresses" class="adr">
                <input type="radio" name="selectedAdr" :id="'adr' + adr.id" :value="adr.id" v-model="selectedAdrId"
                       class="adr">
                <label :for="'adr' + adr.id">
                  <div class="pure-g">
                    <div class="pure-u-1-5">
                      <div class="check">
                        <div class="check-wrap">
                          <i class="iconfont uncheck">&#xe61a;</i>
                          <i class="iconfont checked">&#xe648;</i>
                        </div>
                      </div>
                    </div>
                    <div class="pure-u-4-5">
                      <div class="detail">
                        {{adr.district}}{{adr.street}}{{adr.detail}}<br>
                        {{adr.name}}{{adr.phone}}
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
            <button @click.prevent="chooseAdr" class="u-nav-btn u-btn-primary" :disabled="!selectedAdrId">确认选择</button>
          </div>
        </div>
      </div>-->
      
      <!--create new addr start-->
      <form v-form name="adrForm" @submit.prevent="onSubmit" v-if="!addresses.length || addAdrView">
        <h3 class="subTitle">选择配送区域 
        	<!--<a href="#" @click.prevent="addAdrView = false" v-show="addresses.length"
                                       style="font-weight: normal;font-size: 1.4rem; float: right; color: #C71A40;">返回选择</a>-->
        </h3>
        <div class="radio-wrap">
          <select v-form-ctrl name="district" v-model="selectDist" required>
            <option value="" disabled selected>-- 请选择区域 --</option>
            <option :value="district" v-for="district in districts">{{district.name}}</option>
          </select>
        </div>
        <h3 class="subTitle">填写配送地址</h3>
        <div class="radio-wrap">
          <textarea v-form-ctrl name="adderss" v-model="formData.detail" required></textarea>
        </div>
        <h3 class="subTitle">填写客户信息</h3>
        <div class="radio-wrap">
          <input v-form-ctrl name="name" type="text" v-model="formData.name" placeholder="称呼" required>
        </div>
        <div class="radio-wrap">
          <input v-form-ctrl name="phone" type="num" v-model="formData.phone" placeholder="电话" required
                 custom-validator="phoneVerified">
        </div>
        <div class="m-fixed-nav">
          <div class="pure-g">
            <div class="pure-u-1-1">
              <button type="submit" class="u-nav-btn u-btn-primary" :disabled="adrForm.$invalid || adrProcess">
                <span v-show="!adrProcess">确定</span>
                <span v-show="adrProcess">地址处理中...</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!--create new addr end-->
      
      <div class="m-fixed-nav" v-show="!addAdrView">
        <div class="pure-g">
          <div class="pure-u-1-1">
            <button class="u-nav-btn u-btn-primary" @click.prevent="createOrder" :disabled='confirmProcess'>
              <span v-show='!confirmProcess'>下一步</span>
              <span v-show='confirmProcess'>订单生成中...</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-show="step === 4">
      <div class="center-box" v-show="testApiProcess">
        <div class="center-content">
          <loader></loader>
        </div>
      </div>
      <div class="m-head m-head-info f-border-bottom f-mg-bottom">
        <div class="pure-g">
          <div class="pure-u-1-5 tl">
            <a href="#" @click.prevent="step = 3"><i class="iconfont">&#xe628;</i></a>
          </div>
          <div class="pure-u-3-5">
            <h1 class="title" style="color: #000;font-size: 1.4rem;">
              第4步: 提交订单
            </h1>
          </div>
          <div class="pure-u-1-5 tr">
          </div>
        </div>
      </div>
      <div class="m-order-list">
        <div class="pure-g" v-for="sku in tempOrder.skus">
          <div class="pure-u-1-2">
            <span class="title">{{sku.name}}</span>
          </div>
          <div class="pure-u-1-2">
            <a @click.prevent="step = 1"><span class="content">{{sku.quantity}}{{sku.unit}}/每日{{sku.per_day}}{{sku.unit}}</span></a>
          </div>
        </div>
      </div>
      <div class="m-order-list">
        <div class="pure-g">
          <div class="pure-u-1-3">
            <span class="title">配送时间</span>
          </div>
          <div class="pure-u-2-3">
            <div class="content">
              <a @click.prevent="step = 2">
                <span v-if="orderData.weekday_type === 'all'">周一到周日</span>
                <span v-else>周一到周五</span> /
                <span v-if="orderData.daytime === '1'">上午</span>
                <span v-else>下午</span>
              </a>
            </div>
          </div>
        </div>
        <div class="pure-g">
          <div class="pure-u-1-3">
            <span class="title">配送日期</span>
          </div>
          <div class="pure-u-2-3">
            <div class="content">
              <a @click.prevent="step = 2">
                <span>{{orderData.start_time}}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="pure-g">
          <div class="pure-u-1-3">
            <span class="title">配送区域</span>
          </div>
          <div class="pure-u-2-3">
            <div class="content">
              <a @click.prevent="step = 3">
                <span>{{selectedAdr.district}}{{selectedAdr.detail}}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="pure-g">
          <div class="pure-u-2-5">
            <span class="title">配送客户</span>
          </div>
          <div class="pure-u-3-5">
            <div class="content">
              <a @click.prevent="step = 3">
                <span>{{selectedAdr.name}} / {{selectedAdr.phone}}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p class="m-order-title">优惠选项</p>
      <div class="m-order-list" @click.prevent='couponsView = true'>
        <div class="pure-g">
          <div class="pure-u-1-3">
            <span class="title">优惠</span>
          </div>
          <div class="pure-u-2-3">
            <div class="content">
              <a v-show="tempOrder.discount_amount === '0.00'">点此选择优惠</a>
              <a v-show="tempOrder.discount_amount !== '0.00'">优惠{{tempOrder.discount_amount | currency '￥'}}</a>
            </div>
          </div>
        </div>
      </div>
      <div :class="['coupons-list', couponsView ? 'couponShow' : '']">
        <div class="coupons-inner">
          <div class="m-head m-head-info f-border-bottom f-mg-bottom">
            <div class="pure-g">
              <div class="pure-u-1-5 tl">
              </div>
              <div class="pure-u-3-5">
                <h1 class="title" style="color: #000;font-size: 1.4rem;">
                  选择优惠
                </h1>
              </div>
              <div class="pure-u-1-5 tr">
                <a href="#" @click.prevent='couponsView = false'><i class="iconfont">&#xe634;</i></a>
              </div>
            </div>
          </div>
          <div class=wrap>
            <coupons :coupons='tempOrder.coupons' :tempid='tempOrder.temp_order_id' :currentindex="currentIndex"></coupons>
            <giftcards :giftcards='tempOrder.giftcards' :tempid='tempOrder.temp_order_id' :currentindex="currentIndex"></giftcards>
          </div>
          <button class="u-nav-btn u-btn-primary" @click.prevent='couponsView = false'>
            <span>确认</span>
          </button>
        </div>
      </div>

      <div class="address-box pay-box" style="z-index: 100000" v-show="payView">
        <div class="box-wrap">
          <div class="box-content">
            <h2 class="head"><i class="iconfont">&#xe63f;</i>微信支付 <span class="close"
                                                                        @click.prevent="payView = false"
                                                                        v-show="!payProcess"><i
              class="iconfont">&#xe634;</i></span></h2>
            <!--<h3 class="price">燕塘公司<br><span>￥{{tempOrder.total_amount}}</span></h3>-->
            <div class="agreement">
              <agreement></agreement>
            </div>
            <p class="agreement-check">
              <input type="checkbox" v-model="agreement" id="agreement" checked>
              <label for="agreement">
                <i class="iconfont uncheck" v-show="!agreement">&#xe61a;</i>
                <i class="iconfont checked" v-show="agreement">&#xe648;</i>
                <span>我已同意协议</span>
              </label>
            </p>
            <button class="u-nav-btn u-btn-primary" @click.prevent="payOrder" :disabled="payProcess || !agreement">
              <span v-show="!payProcess">支付总额:{{tempOrder.pay_amount | currency '￥'}}</span>
              <span v-show="payProcess">正在处理中...</span>
            </button>
          </div>
        </div>
      </div>
      <div class="m-fixed-nav">
        <div class="pure-g">
          <div class="pure-u-1-1">
            <button @click.prevent="payView = true" class="u-nav-btn u-btn-primary">
              <span v-show="!confirmProcess">马上支付 {{tempOrder.pay_amount | currency '￥'}}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import _ from 'underscore'
  import Empty from './../../Share/empty.vue'
  import ProductBox from './modules/productBox.vue'
  import DatePicker from './modules/datepicker.vue'
  import {areas} from './../../../assets/js/areas.js'
// import {BaiduMap} from 'vue-baidu-map'
  import Loader from './../../Share/loader.vue'
  import Agreement from './modules/agreement.vue'
  import {newCart, addCart, delCart, cleCart} from './../../../vuex/actions'
  import Coupons from './modules/coupons.vue'
  import Giftcards from './modules/giftcards.vue'
 
  export default {
    name: 'OrderCreate',
    data: function () {
      return {
        currentIndex: null,
				alladre:false,
        showProduct: true,
        products: [],
        districts: [],
        selectDist: {},
        cats: [],
        selectedCat: '',
        couponsView: false,
        giftcardsView: false,
        coupons: [],
        step: 1,
        boxData: {
          attr: null,
          cover_image: '',
          detail: '',
          digest: '',
          id: null,
          name: '',
          price: ''
        },
        orderData: {
          skus: [],
          weekday_type: 'all',
          daytime: '1',
          start_time: null,
          address_id: null
        },
        formData: {
          name: '',
          district_id: null,
          detail: '',
          phone: '',
          longitude: null,
          latitude: null
        },
        adrForm: {},
        addresses: [],
        adrView: false,
        selectedAdr: {
          name: '',
          phone: '',
          detail: '',
          district: '',
          city: ''
        },
        selectedAdrId: null,
        cartView: false,
        addAdrView: false,
        payView: false,
        tempOrder: {
          coupons: []
        },
        areas: areas,
        theDist: null,
        theStreet: null,
        streets: [],
        confirmProcess: false,
        payProcess: false,
        agreement: true,
        adrProcess: false,
        testApiProcess: false,
        stepName: [
          '1-选择产品',
          '2-送奶配置',
          '3-选择地址',
          '4-订单确认'
        ],
        camMember: null,
//      当前定位
				nowlatitude:"",
				nowlongitude:""
      }
    },
    vuex: {
      actions: {
        newCart: newCart,
        addCart: addCart,
        delCart: delCart,
        cleCart: cleCart
      },
      getters: {
        user: function (state) {
          return state.user.info
        },
        cart: function (state) {
          return state.cart.skus
        }
      }
    },
    components: {
      ProductBox,
      Empty,
      DatePicker,
      Loader,
      Agreement,
      Coupons,
      Giftcards
    },
    computed: {
    	
      minDay: function () {
        var someDate = new Date()
        var numberOfDaysToAdd = 3
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var dd = someDate.getDate()
        var mm = someDate.getMonth() + 1
        var yyyy = someDate.getFullYear()
        return yyyy + '-' + (('0' + mm).slice(-2)) + '-' + (('0' + dd).slice(-2))
      }
   },
    route: {
      activate: function () {
        var skus = window.localStorage.getItem('cart')
        if (!skus) {
          window.localStorage.setItem('cart', JSON.stringify([]))
          skus = '[]'
        }
        this.newCart(JSON.parse(skus))
        if (this.$route.query.cart === 'show') {
          this.cartView = true
        }
        if (this.$route.query.step) {
          var step = this.$route.query.step
          this.step = parseInt(step)
        }
      },
      data: function () {
      	var self=this
        return Promise.all([
          this.$http.get('/subscribe/products'),
          this.$http.get('/subscribe/districts'),
          this.$http.get('/mall/cats'),
          this.$http.get('/subscribe/address'),
          this.$http.get('/promotions/tickets')
        ]).then(function ([
          {data: {data: products}},
          {data: {data: districts}},
          {data: {data: cats}},
          {data: {data: addresses}},
          {data: {data: coupons}}
        ]) {
        	addresses.map(function(val){
        		 if(val.default_status==1){
        		 		self.selectedAdrId=val.id
        		 }
        	})
          return {
            products: products,
            districts: districts,
            cats: cats,
            addresses: addresses,
            coupons: coupons
          }
        })
      }
    },
    watch:{
		 step:function(val,oldval){ 
		 	var that=this
		 	if(val==3){
		 		if(that.addresses.length==0||that.addresses==undefined){
		 			that.addAdrView = true
		 			return false;
		 		}else if(that.addresses.length>0&&that.hasdefaultaddr()!=1){
		 			if(that.hasdefaultaddr()==2){
		 				alert("默认地址不能为多个，请取消一个！")
		 				that.$route.router.go('/subscribe/myaddress/addrlist')
		 				return false;
		 			}
		 			if(that.hasdefaultaddr()==0){
		 				alert("请到个人中心设置默认地址！")
		 				that.$route.router.go('/subscribe/myaddress/addrlist')
		 				return false;
		 			}
		 			return false;
		 		}else{
		 			that.addAdrView = false
		 			
		 			var point
		 			var map = new BMap.Map("allmap");
		 			that.addresses.map(function(val){
		 				if(val.default_status==1){
		 					that.orderData.address_id = val.id
		 				  point = new BMap.Point(val.latitude,val.longitude);
						
		 				}
		 			})
		 				map.centerAndZoom(point, 13);
//							map.panBy(150,165)
							map.addOverlay(new BMap.Marker(point));
		 		}
		 	}


	} 
		
	
		 

	},
  

    methods: { 
    	//地址是否有默认地址
    	hasdefaultaddr:function(){
    		var self=this
    		var temNumAddr=[]
    		self.addresses.map(function(val){
    			 if(val.default_status==1){
    			 	temNumAddr.push(1)
    			 }
    		})
    		if(temNumAddr.length==1){
    			return 1
    		}
    		if(temNumAddr.length==0){
    			return 0
    		}
    		if(temNumAddr.length>=2){
    			return 2
    		}
    	},
    	//是否开启定位
//  	getLocation:function() {
//  		var self=this
//				if(navigator.geolocation) {
//					navigator.geolocation.getCurrentPosition(self.showPosition, self.showError);
//				} else {
//					alert("此浏览器不支持地理定位!")
//				}
//			},
//
//			showPosition:function(position) {
//				this.nowlatitude=position.coords.latitude
//				this.nowlongitud= position.coords.longitude
//			},
//			showError:function(error) {
//				switch(error.code) {
//					case error.PERMISSION_DENIED:
//						alert("用户拒绝地理定位请求。")
//						break;
//					case error.POSITION_UNAVAILABLE:
//						alert("位置信息不可用。")
//						break;
//					case error.TIMEOUT:
//						alert("获取用户位置的请求超时。")
//						break;
//					case error.UNKNOWN_ERROR:
//						alert("出现未知错误。")
//						break;
//				}
//			},
			  //
			  //重新定位
			resetposition:function(addresid){
				var that=this
				that.selectedAdrId=addresid
					var map = new BMap.Map("allmap");
					var point
				that.addresses.map(function(val){
					if(val.id==addresid){
						 point = new BMap.Point(val.latitude,val.longitude);
					}
				})
				map.centerAndZoom(point, 13);
//				map.panBy(150,165)
				map.addOverlay(new BMap.Marker(point));
			},
      addProduct: function (product) {
        // 修改单位
        this.$broadcast('checkUnit', product.unit)
        this.boxData = product
      },
      delSku: function (sku) {
        this.delCart(sku)
      },
      chooseAdr: function () {
      	var self = this
        this.selectedAdr = _.find(this.addresses, function (item) {
          return item.id === self.selectedAdrId
        })
      
     		this.orderData.address_id = this.selectedAdrId
        console.log(this.selectedAdrId)
       	this.adrView = false
      },
      onSubmit: function () {
        var self = this
        if (self.adrForm.$invalid) {
          window.alert('请正确提交表单')
          self.working = false
          return false
        }
        self.adrProcess = true
        var geocoder = new window.AMap.Geocoder({
//          city: '020',
          radius: 200
        })
        var searchCity = '佛山市'
        if (self.selectDist.name !== '佛山市') {
          searchCity = '广州市' + self.selectDist.name
        }
        geocoder.getLocation(searchCity + self.formData.detail, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            self.formData.longitude = result.geocodes[0].location.lat
            self.formData.latitude = result.geocodes[0].location.lng
            self.checkAddress()
          } else {
            console.log('error')
          }
        })
      },
      checkAddress: function () {
        var self = this
        self.formData.district_id = self.selectDist.id
        self.formData.street = ''
        
      if(self.addresses.length==0){
		        self.formData.default_status=1
		    }
     
        self.$http.post('/subscribe/address', self.formData).then(
          function (data) {
            // 成功，提交订单
            self.orderData.address_id = data.data.data.id
            self.selectedAdr = data.data.data
            self.addresses.push(data.data.data)
            self.createOrder()
          },
          function (data) {
            // 失败，该地址不支持
            window.alert('对不起，该地址暂未开通线上订奶服务')
            self.adrProcess = false
            self.working = false
            return false
          }
        )
      },
      generateIndex(tempOrder){
        let index = 0
        tempOrder.coupons.forEach(item => {
          item.uniIndex = index
          index++
        })
        tempOrder.giftcards.forEach(item => {
          item.uniIndex = index
          index++
        })
        return tempOrder
      },
      createOrder: function () {
        var self = this
        self.confirmProcess = true
        self.orderData.skus = self.cart
        self.$http.post('/subscribe/orders', self.orderData).then(
          function (data) {
            // 成功，进入充值
//            console.log('success')
            self.tempOrder = self.generateIndex(data.data.data)
//            self.payView = true
            self.confirmProcess = false
            self.nextStep()
            self.addAdrView = false
            self.adrProcess = false
          },
          function () {
            // 失败，网络出错
            window.alert('网络出错，请重新下单')
//            self.working = false
          }
        )
      },
      payOrder: function () {
        var self = this
        self.payProcess = true
        this.$http.put('/subscribe/orders/' + this.tempOrder.temp_order_id + '/confirm', {
          channel: 'wx_pub'
        }).then(
          function (data) {
            var charge = data.data.meta.charge
//            var orderInfo = data.data.data
            self.payProcess = false
            if (charge === 'paid') {
              self.cleCart()
              self.storeOrder(data.data.data)
              self.checkStatus(data.data.data, self.staffBonus)
            } else {
              window.pingpp.createPayment(charge, function (result, error) {
                if (result === 'success') {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                  self.cleCart()
                  self.storeOrder(data.data.data)
                  self.checkStatus(data.data.data, self.staffBonus)
                } else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  self.$route.router.go('/subscribe/orders/create')
                } else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                  self.$route.router.go('/subscribe/orders/list')
                }
              })
            }
          },
          function (data) {
            console.log(data)
          }
        )
      },
      phoneVerified: function (value) {
        return /^1[3|4|5|7|8]\d{9}$/.test(value)
      },
      storeOrder: function (order) {
        window.localStorage.setItem('trackOrder', JSON.stringify(order))
      },
      closeBox: function () {
        this.boxData = {
          attr: null,
          cover_image: '',
          detail: '',
          digest: '',
          id: null,
          name: '',
          price: ''
        }
      },
      changeDist: function () {
        var self = this
        this.theStreet = null
        this.streets = _.filter(this.areas.street, function (item) {
          return (item.id.indexOf(self.selectDist.id) > -1)
        })
      },
      nextStep: function () {
        this.step += 1
      },
      staffBonus: function (order) {
        var self = this
        self.$route.router.go('/subscribe/orders/' + order.order_no + '?trackr=false')
      },
      checkStatus: function (order, fn) {
        var self = this
        self.payView = false
        self.testApiProcess = true
        var testApi = setInterval(function () {
          self.$http.get('/subscribe/preorders/' + order.order_no).then(
            function (data) {
              if (data.data.data.order.status === 'paid') {
                clearInterval(testApi)
                fn(order)
              }
            }
          )
        }, 1000)
        setTimeout(function () {
          clearInterval(testApi)
          fn(order)
        }, 5000)
      }
    },
    events: {
      'changeCurIndex': function(index){
        if(typeof index === 'number'){
          this.currentIndex = index
        } else {
          this.currentIndex = null
        }
      },
      'addSku': function (sku) {
        this.addCart(sku)
        this.closeBox()
      },
      'closeBox': function () {
        this.closeBox()
      },
      'useCoupon': function (tempOrder) {
        this.tempOrder = tempOrder
      },
      'useGiftcard': function (tempOrder) {
        this.tempOrder = tempOrder
      }
    }
  }
</script>

<style scoped>
  .section-product {
    background: #fff;
  }

  .section-product .cats {
    width: 25%;
    float: left;
    background: #ddd;
    color: #949494;
    text-align: center;
    font-size: 1.2rem;
  }

  .section-product .cats li {
    padding: 1.5rem .5rem;
    border-bottom: 1px dashed #d0d0d0;
  }

  section.section-product {
    padding-bottom: 0 !important;
  }

  .section-product .cats li.active {
    color: #000;
    background: #fff;
  }

  .section-product .pros {
    width: 75%;
    float: left;
  }

  #yt-mall .m-list-links {
    margin: 0;
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.2);
  }

  #yt-mall .m-pd-item .thumbnail {
    width: 5rem;
    height: 5rem;
  }

  #yt-mall .m-pd-item .price {
    display: inline-block;
    margin-top: 1rem;
    color: #C71A40;
    font-size: 1.4rem;
    font-weight: bold;
  }

  #yt-mall .m-pd-item .pd-item-right {
    width: 100%;
  }

  #yt-mall .m-pd-item .addCart {
    display: inline-block;
    margin-top: 1rem;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    float: right;
    padding: .1rem .4rem;
    background: #C71A40;
    border-radius: 2px;
  }

  #yt-mall .m-foot .price {
    font-size: 1.4rem;
    font-weight: normal;
  }

  .subTitle {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 1rem;
  }

  input[type=radio] {
    display: none;
  }

  .radio-wrap {
    padding: 1rem;
  }

  input[type=radio].normal + label {
    display: inline-block;
    width: 100%;
    float: left;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    font-size: 1.4rem;
    background: #fff;
  }

  input[type=radio].adr + label {
    display: inline-block;
    width: 100%;
    float: left;
  }

  input[type=radio].adr + label .check {
    display: table;
    width: 100%;
    height: 6rem;
    text-align: center;
  }

  input[type=radio].adr + label .check-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  input[type=radio].adr + label .detail {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    font-size: 1.2rem;
    color: #717171;
    background: #fff;
  }

  .radio-content {
    padding: 0 .5rem;
  }

  input[type=radio].normal:checked + label {
    background: #C71A40;
    border: 1px solid #ddd;
    color: #fff;
  }

  input[type=radio].adr:checked + label .detail {
    border: 1px solid #C71A40;
    color: #C71A40;
  }

  input[type=radio]:checked.adr + label .check {
    color: #C71A40;
  }

  input[type=radio].adr + label .check {
    color: #717171;
  }

  input[type=radio].adr + label .check .uncheck,
  input[type=radio]:checked.adr + label .check .checked {
    display: inline-block;
  }

  input[type=radio].adr + label .check .checked,
  input[type=radio]:checked.adr + label .check .uncheck {
    display: none;
  }

  input[type=date] {
    -webkit-appearance: none;
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    font-size: 1.6rem;
    height: 45px;
    border-radius: 3px;
  }

  select, textarea, input[type=text], input[type=num] {
    -webkit-appearance: none;
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    font-size: 1.6rem;
    height: auto;
    border-radius: 3px;
    background: #fff;
    outline: none;
    color: #000;
    text-align-last: left;
  }

  .m-order-list {
    margin: 1rem;
    padding: .5rem 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 1.4rem;
  }

  .m-order-title {
    margin: 2rem 1rem 1rem 2rem;
    font-size: 1.4rem;
    color: #afafaf;
  }

  .m-order-list .title {
    display: inline-block;
    width: 100%;
    font-weight: bold;
  }

  .m-order-list a {
    color: #C71A40;
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

  .u-btn.u-btn-default.u-btn-disable {
    opacity: .3;
  }

  .u-nav-btn.u-btn-disable {
    background: #a2a2a2;
  }

  button.u-nav-btn.u-btn-primary {
    border: 0 none;
  }

  button.u-nav-btn.u-btn-primary:disabled {
    background: #a2a2a2;
  }

  #yt-mall .m-foot.m-foot-act {
    padding: 0;
  }

  #yt-mall .m-foot.m-foot-act .m-foot-wrap {
    padding: .5rem 1rem;
  }

  .m-foot-cart {
    background: #f1f1f1;
  }

  .m-foot-cart .title {
    font-size: 1.4rem;
    padding: .5rem 0;
    border-bottom: 1px solid #c5c5c5;
  }

  #yt-mall .m-foot-cart .title span {
    font-size: 1.2rem;
    float: right;
  }

  #yt-mall .m-foot-cart .title .iconfont {
    font-size: 1.4rem;
  }

  .m-cart-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  #yt-mall .m-foot-cart .cart-list {
    font-size: 1.4rem;
    padding: 1rem;
    border-bottom: 1px solid #c5c5c5;
  }

  #yt-mall .m-foot-cart .cart-list:last-child {
    border-bottom: 0 none;
  }

  #yt-mall .m-foot-cart .cart-list span {
    float: right;
    color: #C71A40;
  }

  #yt-mall .m-foot-cart .cart-list .iconfont {
    font-size: 1.4rem;
  }

  #yt-mall section {
    padding-bottom: 6rem;
  }

  .address-box {
    width: 100%;
    height: 100%;
    display: table;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .address-box .box-content {
    overflow: hidden;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    border-radius: .3rem;
  }

  .address-box .box-content .title {
    padding: 1rem;
    background: #fff;
    font-size: 1.4rem;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  .address-box .box-content .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .box-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  .box-content {
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .box-content ul {
    background: #fff;
    padding: 1rem;
    max-height: 30rem;
    min-height: 25rem;
    overflow-y: scroll;
  }

  .box-content .adr label {
    float: none;
    margin-bottom: .5rem;
  }

  .pay-box .box-content {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
  }

  .pay-box .box-content .price {
    font-size: 1.4rem;
    /*font-weight: bold;*/
    text-align: center;
    margin: 2rem 0;
  }

  .pay-box .box-content .agreement {
    margin: 2rem 2rem 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: .3rem;
    height: 20rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .pay-box .box-content .head {
    font-size: 1.6rem;
    /*text-align: center;*/
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .pay-box .box-content .head .iconfont {
    font-size: 2rem;
    padding: 0 1rem;
    color: #09A909;
  }

  .pay-box .box-content .head .close .iconfont {
    color: #000;
    float: right;
  }

  .pay-box .box-content .price span {
    font-size: 3.6rem;
  }

  .list-link {
    display: block;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #d8c5c9;
    color: #d8c5c9;
    font-size: 1.4rem;
    border-radius: 3px;
    background: #fff;
  }
  .defalutaddre{
  	border: 1px solid #C71A40;
    color: #C71A40;
  }
  .add-link {
    display: block;
    /*margin: 3rem 1rem;*/
    padding: 1rem;
    border: 0 none;
    color: #C71A40;
    text-align: center;
    font-size: 1.6rem;
  }

  .foot-cart-icon {
    padding: 1rem;
    background: #C71A40;
    position: absolute;
    width: 5rem;
    height: 5rem;
    left: 10px;
    top: -5px;
    border-radius: 6rem;
    text-align: center;
    color: #fff;
  }

  .foot-cart-icon.foot-cart-disable {
    background: #505050;
  }

  .u-nav-btn.u-btn-disable {
    background: #505050;
  }

  .m-foot-status {
    position: relative;
  }

  .item-info {
    color: #bbb;
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  .agreement-check input {
    display: none;
  }

  .agreement-check {
    margin: 0 2rem;
  }

  .agreement-check label {
    display: block;
    padding: 1rem 0;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  .agreement-check input[type=checkbox] + label {
    color: #8C8C8C;
  }

  .agreement-check input[type=checkbox]:checked + label {
    color: #C71A40;
  }

  .coupons-list {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10000;
    background: #f0f0f0;
    transform: translateY(100%);
    -webkit-transition: .3s all ease;
    -moz-transition: .3s all ease;
    -ms-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
  }

  .coupons-list.couponShow {
    transform: translateY(0);
  }

  .coupons-list .wrap {
    margin: 0 1rem;
    padding-bottom: 6rem;
  }

  .coupons-inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
  }

  .coupons-inner .u-nav-btn {
    position: fixed;
    bottom: 0px;
  }



  .giftcards-list {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10000;
    background: #f0f0f0;
    transform: translateY(100%);
    -webkit-transition: .3s all ease;
    -moz-transition: .3s all ease;
    -ms-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease;
  }

  .giftcards-list.giftcardShow {
    transform: translateY(0);
  }

  .giftcards-list .wrap {
    margin: 0 1rem;
    padding-bottom: 6rem;
  }

  .giftcards-inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: scroll;
  }

  .giftcards-inner .u-nav-btn {
    position: fixed;
    bottom: 0px;
  }



  button {
    outline: none;
  }

  .center-box {
    display: table;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .center-content {
    display: table-cell;
    vertical-align: middle;
  }
  #allmap{height:25rem;}
</style>
