<template>
	<div>
		 <!--create new addr start-->
      <form v-form name="adrForm" @submit.prevent="onSubmit">
        <h3 class="subTitle">选择配送区域 <a v-link="'/subscribe/myaddress/addrlist'"
                                       style="font-weight: normal;font-size: 1.4rem; float: right; color: #C71A40;">返回</a>
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
        <div class="radio-wrap" id="telephone">
          <input v-form-ctrl name="phone" type="num" v-model="formData.phone" placeholder="电话" required
                 custom-validator="phoneVerified">
        </div>
        <div class="m-fixed-nav">
          <div class="pure-g">
            <div class="pure-u-1-1">
              <button type="submit" class="u-nav-btn u-btn-primary" :disabled="adrForm.$invalid || adrProcess">
                <span>保存地址</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!--create new addr end-->
	</div>
</template>

<script>
	export default{
		
		data:function(){
			return{
				adrProcess:false,
				districts: [],
				adrForm: {},
				formData: {
		          name: '',
		          district_id: null,
		          detail: '',
		          phone: '',
		          longitude: null,
		          latitude: null
		        },
		        selectDist: {},
			}
		},
		route: {
	     	data: function () {	     	
		        return Promise.all([
		          this.$http.get('/subscribe/districts'),
		       
		        ]).then(function ([
		         
		          {data: {data: districts}},
		         
		        ]) {
		          return {
		            districts: districts,
		          }
		        })
	      	}
    	},
		methods:{
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
		        if(self.$route.params.defaultaddr==1){
		        	self.formData.default_status=1
		        }
		        console.log(self.formData)
		        self.$http.post('/subscribe/address', self.formData).then(
		          function (data) {
		          	
		          	
		            self.$route.router.go('/subscribe/myaddress/addrlist')
		           
//		            self.orderData.address_id = data.data.data.id
//		            self.selectedAdr = data.data.data
//		            self.addresses.push(data.data.data)
//		            self.createOrder()
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
      		 phoneVerified: function (value) {
        		return /^1[3|4|5|7|8|6]\d{9}$/.test(value)
      		},
		}
	}
</script>

<style scoped="scoped">
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
    border: 1px solid #C71A40;
    color: #C71A40;
    font-size: 1.4rem;
    border-radius: 3px;
    background: #fff;
  }

  .add-link {
    display: block;
    margin: 3rem 1rem;
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