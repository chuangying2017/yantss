<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-5 tl">
      </div>
      <div class="pure-u-3-5">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          我的收货地址
        </h1>
      </div>
      <div class="pure-u-1-5 tr">
      </div>
    </div>
  </div>
  
  <loader v-show="$loadingRouteData"></loader>
  <ul>
  	<li class="m-milkcard" v-for="addre in address">
      <div class="addresscont">
      	<p class="addinfo"><i class="addname">{{addre.name}}</i>{{addre.phone}}</p>
      	<div class="">
      		<p class="address">
      			{{addre.province}}{{addre.city}}{{addre.district}}{{addre.street}}{{addre.detail}}
                        
      		</p>
      		<div class="tools">
		      	<i class="change" @click="chageshowdata(addre)">修改</i>
		      	<i class="del" @click="deladdr(addre)">删除</i>
	      	</div>
      	</div>
      </div>
      <p class="setaddren" v-show="addre.default_status==0" @click="setfault(addre)">设为默认</p>
      <p class="setaddren defaulad" v-show="addre.default_status==1">默认地址</p>
   </li>
  </ul>
  	<empty v-show="!address.length&&!$loadingRouteData">没有地址</empty>
  <a v-link="{path: '/subscribe/myaddress/creataddr/'+defaultaddre}" class="add-link" v-show="!$loadingRouteData">+
        创建新地址 </a>
  <!--<ul v-show="!$loadingRouteData && orders.length">
    <li v-for="order in orders" class="m-milkcard">
      
    </li>
  </ul>-->
 
  <!--<div style="margin: 1rem">
    <button class="add-link" @click.prevent="loadMore" :disabled="loadProcess"
            v-show="currentPage !== totalPages && orders.length">
      <span v-show="!loadProcess">加载更多</span>
      <span v-show="loadProcess">正在加载中...</span>
    </button>
  </div>-->

 <div class="addchange" v-show="chageshow">
		 <!--create new addr start-->
      <form v-form name="adrForm" @submit.prevent="onSubmit" style="padding-bottom: 6rem;">
        <h3 class="subTitle">选择配送区域 <a href="#" @click.prevent="chageshow=false"
                                       style="font-weight: normal;font-size: 1.4rem; float: right; color: #C71A40;">返回</a>
        </h3>
        <div class="radio-wrap">
          <select v-form-ctrl name="district" v-model="selectDist.id" required>
            <option value="" disabled>-- 请选择区域 --</option>
            <option :value="district.id" v-for="district in districts">{{district.name}}</option>
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
              <button type="submit" class="u-nav-btn u-btn-primary" :disabled="adrForm.$invalid||adrProcess">
                <span>保存地址</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!--create new addr end-->
	</div>
  <div style="padding-bottom: 6rem;"></div>
  <nav-foot></nav-foot>
</template>

<script>
  import NavFoot from './../../Mall/Shared/navfoot.vue'
  import Empty from './../../Share/empty.vue'
  import Loader from './../../Share/loader.vue'
  //  import Trackr from './modules/trackr.vue'

  export default {
    name: 'List',

    data: function () {
      return {
      	adrProcess:false,
      	defaultaddre:2,//判断是否有地址，1是没有
      	tempaddre:null,//暂存地址，
      	chageshow:false,
        address:[],
//      loadProcess: false,
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
        selectDist: {
        	id:null,
        },
		    settargetid:null,//原有默认的id  
		     
		  }
    },

//    vuex: {
//      getters: {
//        getUser: function (state) {
//          return state.user.info
//        }
//      }
//    },

    components: {
      NavFoot,
      Empty,
      Loader
//      Trackr
    },
    route: {
      data: function () {
      	var self =this
        return Promise.all([
          this.$http.get('/subscribe/address'),
          this.$http.get('/subscribe/districts')
        ]).then(function ([
          {data: {data: address}},
          {data: {data: districts}},
		]){
					if(address.length==0){
						self.defaultaddre=1
					}else{
						self.defaultaddre=2
					}
				
          return {
          	address:address,
          	districts:districts,
          }
        })
      }
    },

    ready: function () {
    	
//      if (this.$route.query.trackr === 'true') {
//        if (window.localStorage.getItem('trackOrder')) {
//          this.trackrOrder = JSON.parse(window.localStorage.getItem('trackOrder'))
//          this.trackrShow = true
//        }
//      }
   },
    methods: {
    	 phoneVerified: function (value) {
        return /^1[3|4|5|7|8|6]\d{9}$/.test(value)
      },
    	setfault:function(addobj){
    		var self=this
    		self.address.map(function(val){
    			if(val.default_status==1){
    				self.settargetid=val.id
    			}
    		})
    		//判断是否有默认地址
    		var setadr=null
    		if(self.settargetid==null){
    			setadr='/subscribe/address/' +addobj.id+'/edit/1'
    		}else{
    			setadr='/subscribe/address/' +self.settargetid+'/edit/1/'+addobj.id
    		}
    	
    		this.$http.get(setadr).then(
	      	function (data) {
	      		if(data.data.status==1){
	      			self.address.map(function(val){
	      				val.default_status=0
	      			})
	      			addobj.default_status=1
	      		}else{
	      			alert(data.data.msg)
	      		}
//	        	self.address=data.data.addresses;
	      	},
	      	function (data) {
	      		alert(data.data.msg)
	      	}
	      )
    	},
      chageshowdata:function(chageadd){
      	var self=this;
      	self.chageshow=true;
      	self.formData.name=chageadd.name
      	self.formData.detail=chageadd.detail
  	    self.formData.phone=chageadd.phone
  	    self.formData.id=chageadd.id
      	self.selectDist.id=chageadd.district_id;
        },
      
      deladdr:function(addr){
      	var self = this
      	
				if (window.confirm('是否确认删除?')) {   
								var setfaultid=null;
							  if(addr.default_status==1&&self.address.length>=2){
							  	 self.address.map(function(val){
							  	 		if(val.default_status!=1){
							  	 			setfaultid=val.id
							  	 		}
							  	 })
							  	 this.$http.put('/subscribe/addressDelete/' + (addr.id)+'/'+setfaultid).then(
				          	function (data) {
					           	self.address.$remove(addr)
					           	self.address.map(function(val,index){
								  	 		if(val.id==setfaultid){
								  	 		

								  	 			self.address[index].default_status=1
								  	 			self.address.$set(index,self.address[index])
								  	 		
								  	 		}
							  	 		})
					           	if(self.address.length==0){
												self.defaultaddre=1
											}else{
												self.defaultaddre=2
											}
				          	},
				          	function (data) {
				          		alert(data.data.message)
				          	})
							  }else{
							  	this.$http.delete('/subscribe/address/' + (addr.id)).then(
			          	function (data) {
				           	self.address.$remove(addr)
				           	if(self.address.length==0){
											self.defaultaddre=1
										}else{
											self.defaultaddre=2
										}
			          	},
			          	function (data) {
			          		alert(data.data.message)
			          	})
							  }
		          	
		        }
		     },
	     onSubmit: function () {
			        var self = this
			        self.formData.user=""
			      
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
			       
			          self.$http.put('/subscribe/addressUpdate/'+self.formData.id, self.formData).then(
			          function (data) {
			          		self.address.map(function(val,index){
						    			if(val.id==data.data.data.id){    				
						    				self.address.$set(index,data.data.data)
						    			}
						    		})
			           // self.$route.router.go('/subscribe/myaddress/addrlist')
			           self.chageshow=false;
			              self.adrProcess = false
			            self.working = false
	//		            self.orderData.address_id = data.data.data.id
	//		            self.selectedAdr = data.data.data
	//		            self.addresses.push(data.data.data)
	//		            self.createOrder()
			          },
			          function (data) {
			            // 失败，该地址不支持
			             
  	    				
			            window.alert('对不起，该地址暂未开通线上订奶服务')
			           
			             self.chageshow=false;
			            self.adrProcess = false
			            self.working = false
			            return false
			          }
			        )
	      		},
	    },
		    

    events: {
//      'tracked': function () {
//        this.trackrShow = false
//        window.localStorage.removeItem('trackOrder')
//      }
    }
  }
</script>

<style scoped>
  .m-milkcard {
    margin: 2rem 1rem;
   
    background: #ececec;
    overflow: hidden;
    position:relative;
    padding: 0.5rem;
  }

  .m-milkcard .title {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: .5rem 1rem;
  }

  .m-milkcard .title span {
    color: #000;
    float: right;
    font-size: 1.4rem;
  }

  .m-milkcard .body {
    padding: 1rem;
  }

  .milk-list {
    display: table;
    width: 100%;
  }

  .milk-list .img-wrap {
    display: table-cell;
    vertical-align: middle;
    width: 20%;
  }

  .milk-list .img-wrap img {
    width: 30px;
    height: auto;
    border-radius: 3px;
    vertical-align: middle;
  }

  .milk-list .pure-g {
    padding: .5rem 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .milk-list p {
    font-size: 1.4rem;
  }

  .milk-status {
    padding: 1rem 0 .5rem 0;
    font-size: 1.4rem;
    color: #3bab5e;
  }

  .milk-status a {
    color: #3bab5e;
    text-decoration: underline;
  }

  .milk-list .highlight {
    color: #3bab5e;
  }

  .item-info {
    color: #bbb;
    font-size: 1.2rem;
    text-align: center;
  }

  .add-link {
    -webkit-appearance: none;
    display: block;
    padding: 1rem;
    border: 0 none;
    color: #C71A40;
    text-align: center;
    font-size: 1.6rem;
    background: transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    outline: none;
  }

  .add-link:disabled {
    color: #ddd;
  }

  .notice {
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem;
    color: #fff;
    background: #bfbfbf;
  }

  .notice ul {
    list-style-type: circle;
    padding-left: 2rem;
  }
  .wc{
    color: white!important;
  }
  .defaultadd{
  	border:1px dashed;
  }
  
  
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
  /*修改*/
 .addchange{
 	position:fixed;
 	top:0;
 	width:100%;
 	background:#fff;
 	z-index: 1000;
 	    min-height: 100%;
 }
 .m-fixed-nav{
 	position:fixed;
 }
 /**/
.addresscont .addinfo{width:80%;}
  	.addresscont p{padding: 0.5rem 0;}
  	.m-milkcard i{font-style: normal;}
  	.addinfo{border-bottom: 1px solid #dbc3c3;}
  	.setaddren{position:absolute;right:0;top:0;}
  	.defaulad{color: #C71A40;}
  	.tools{right:0;bottom: 0;}
  	.address{width:80%}
  	.tools{width:20%;padding: 0.5rem 0 0 0.2rem;    color: #000;}
  	.tools i{position:absolute;right:0}
  	.tools .change{right: 3.5rem !important;}
  	.address,.tools{float:left}
  	.addname{margin-right:1.5rem}
  	.m-milkcard{font-size:1.4rem;background: #f2f2f2;}
  	
</style>
