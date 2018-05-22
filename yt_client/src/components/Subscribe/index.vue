<template>
  <div id="yt-mall">
    <router-view></router-view>
  </div>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'
  export default {
    name: 'Subscribe',
    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    },
    route: {
      activate: function (transition) {
        var self = this
        this.loginSuccess(Auth.token())
        this.$http.get('/users/info').then(
          function (data) {
            self.userinfoSuccess(data.data.data)
            transition.next()
          },
          function (data) {
            console.log(data)
            transition.next()
          }
        )
      }
    }
  }
</script>

<style scoped>
  /*css reset*/
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
    font-family: Helvetica, Tahoma, 'Hiragino Sans GB', Arial, STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", Heiti, "黑体", sans-serif;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset, img {
    border: 0;
  }

  address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  caption, th {
    text-align: left;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }

  q:before, q:after {
    content: '';
  }

  abbr, acronym {
    border: 0;
  }

  a {
    text-decoration: none;
  }

  /*fonts*/
  .f12 {
    font-size: 12px;
  }

  .f13 {
    font-size: 13px;
  }

  .f14 {
    font-size: 14px;
  }

  .f16 {
    font-size: 16px;
  }

  .f20 {
    font-size: 20px;
  }

  .fb {
    font-weight: bold;
  }

  .fn {
    font-weight: normal;
  }

  .lh150 {
    line-height: 150%;
  }

  .lh180 {
    line-height: 180%;
  }

  .lh200 {
    line-height: 200%;
  }

  .unl {
    text-decoration: underline;
  }

  .no_unl {
    text-decoration: none;
  }

  .upper {
    text-transform: uppercase;
  }

  .ls1 {
    letter-spacing: 1px;
  }

  .ls2 {
    letter-spacing: 2px;
  }

  /*postitions*/
  .tl {
    text-align: left;
  }

  .tc {
    text-align: center;
  }

  .tr {
    text-align: right;
  }

  .bc {
    margin-left: auto;
    margin-right: auto;
  }

  .fl {
    float: left;
    display: inline;
  }

  .fr {
    float: right;
    display: inline;
  }

  .cb {
    clear: both;
  }

  .cl {
    clear: left;
  }

  .cr {
    clear: right;
  }

  .vt {
    vertical-align: top;
  }

  .vm {
    vertical-align: middle;
  }

  .vb {
    vertical-align: bottom;
  }

  .pr {
    position: relative;
  }

  .pa {
    position: absolute;
  }

  .zomm {
    zoom: 1;
  }

  .hidden {
    overflow: hidden;
  }

  .none {
    display: none;
  }

  .clearfix:before, .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  /*postion*/
  .mt10 {
    margin-top: 10px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mt30 {
    margin-top: 30px;
  }

  .mt40 {
    margin-top: 40px;
  }

  .mt50 {
    margin-top: 50px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .mb40 {
    margin-bottom: 40px;
  }

  .mb50 {
    margin-bottom: 50px;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pt20 {
    padding-top: 20px;
  }

  .pt30 {
    padding-top: 30px;
  }

  .pt40 {
    padding-top: 40px;
  }

  .pt50 {
    padding-top: 50px;
  }

  .pb10 {
    padding-bottom: 10px;
  }

  .pb20 {
    padding-bottom: 20px;
  }

  .pb30 {
    padding-bottom: 30px;
  }

  .pb40 {
    padding-bottom: 40px;
  }

  .pb50 {
    padding-bottom: 50px;
  }

  .mg10 {
    margin: 10px;
  }

  .mg20 {
    margin: 20px;
  }

  .mg30 {
    margin: 30px;
  }

  .mg40 {
    margin: 40px;
  }

  .mg50 {
    margin: 50px;
  }

  .pd10 {
    padding: 10px;
  }

  .pd20 {
    padding: 20px;
  }

  .pd30 {
    padding: 30px;
  }

  .pd40 {
    padding: 40px;
  }

  .pd50 {
    padding: 50px;
  }

  .iconfont {
    font-family: "iconfont";
    font-size: 1.6rem;
    font-style: normal;
    /*     -webkit-font-smoothing: antialiased; */
  }

  .u-btn {
    -webkit-appearance: none;
    font-size: 1.4rem;
    padding: 1rem;
    text-align: center;
    border: none;
    outline: none;
  }

  .u-btn.u-btn-default {
    border: 1px solid #EAEAEA;
    color: #fff;
  }

  .u-btn.u-btn-primary {
    background: #fff;
    color: #C71A40;
  }

  .u-btn.u-btn-info {
    background: #C71A40;
    color: #fff;
  }

  .u-btn.u-btn-sm {
    font-size: 1.2rem;
    padding: .5rem 1rem;
  }

  .u-btn.u-btn-fullwidth {
    width: 100%;
  }

  .u-input {
    -webkit-appearance: none;
    padding: .5rem;
    border: 1px solid #EAEAEA;
    font-size: 1.4rem;
    outline: none;
  }

  .u-input.u-input-full {
    width: 100%;
  }

  .u-nav-btn {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: center;
    background: #131213;
    color: #fff;
    font-size: 1.4rem;
    height: 4rem;
  }

  .u-nav-btn .iconfont {
    font-size: 1.8rem;
  }

  .u-nav-btn.u-btn-primary {
    background: #C71A40;
  }

  .u-nav-btn.u-btn-primary:disabled {
    background: #da778d;
  }

  .u-nav-btn.u-btn-fullwidth {
    width: 100%;
  }

  #yt-mall {
    /***
  功能类CSS
  ***/
    /***
  模块类CSS
  ***/
    /*m-foot*/
    /* 个人中心模块*/
    /*优惠劵模块*/
    /*个人订单模块*/
    /*登录注册*/
  }

  #yt-mall * {
    box-sizing: border-box;
  }

  #yt-mall html, #yt-mall body {
    width: 100%;
    height: 100%;
    font-size: 10px;
    color: #421F2E;
  }

  #yt-mall body {
    background: #ECECEC;
  }

  #yt-mall .f-table {
    display: table;
  }

  #yt-mall .f-table-cell {
    display: table-cell;
    vertical-align: top;
  }

  #yt-mall .f-shadow {
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.2);
  }

  #yt-mall .f-shadow-top {
    box-shadow: 0 -3px 10px rgba(128, 128, 128, 0.2);
  }

  #yt-mall .f-shadow-bottom {
    box-shadow: 0 3px 10px rgba(128, 128, 128, 0.2);
  }

  #yt-mall .f-tap-transparent {
    -webkit-tap-highlight-color: transparent;
  }

  #yt-mall .f-mg {
    margin: 1.5rem 0;
  }

  #yt-mall .f-mg-top {
    margin-top: 1.5rem;
  }

  #yt-mall .f-mg-bottom {
    /*margin-bottom: 1.5rem;*/
  }

  #yt-mall .f-border-bottom {
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-list, #yt-mall .m-list-links {
    background: #fff;
  }

  #yt-mall .m-list li, #yt-mall .m-list-links li {
    width: 100%;
    font-size: 1.6rem;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-list {
    background: #fff;
    /*
		m-list扩展类
	 */
  }

  #yt-mall .m-list li {
    padding: 1rem;
  }

  #yt-mall .m-list.m-list-select .item-select {
    display: table-cell;
    vertical-align: middle;
  }

  #yt-mall .m-list.m-list-select .item-select.item-select-right {
    padding-right: 1rem;
  }

  #yt-mall .m-list.m-list-select .item-select.item-select-left {
    padding-left: 1rem;
  }

  #yt-mall .m-list.m-list-select .iconfont {
    font-size: 2rem;
    color: #C71A40;
  }

  #yt-mall .m-list.m-list-select input[type="checkbox"], #yt-mall .m-list.m-list-select input[type="radio"] {
    display: none;
  }

  #yt-mall .m-list.m-list-select label {
    display: block;
  }

  #yt-mall .m-list.m-list-select input[type="checkbox"] + label .checked,
  #yt-mall .m-list.m-list-select input[type="radio"] + label .checked,
  #yt-mall .m-list.m-list-select input[type="checkbox"]:checked + label .uncheck,
  #yt-mall .m-list.m-list-select input[type="radio"]:checked + label .uncheck {
    display: none;
  }

  #yt-mall .m-list.m-list-select input[type="checkbox"]:checked + label .checked,
  #yt-mall .m-list.m-list-select input[type="radio"]:checked + label .checked,
  #yt-mall .m-list.m-list-select input[type="checkbox"] + label .uncheck,
  #yt-mall .m-list.m-list-select input[type="radio"] + label .uncheck {
    display: block;
  }

  #yt-mall .m-list.m-list-section {
    font-size: 1.4rem;
  }

  #yt-mall .m-list.m-list-section .title {
    padding: 1rem;
    font-size: 1.6rem;
  }

  #yt-mall .m-list.m-list-section .iconfont {
    font-size: 2rem;
    color: #C71A40;
  }

  #yt-mall .m-list.m-list-sm li {
    font-size: 1.4rem;
    padding: .5rem 1rem;
  }

  #yt-mall .m-list-links {
    margin: 1.5rem 0;
    /*
		.m-list-links扩展类
	 */
  }

  #yt-mall .m-list-links a {
    display: block;
    color: #421F2E;
    padding: 1rem;
  }

  #yt-mall .m-list-links.m-list-section {
    font-size: 1.4rem;
  }

  #yt-mall .m-list-links.m-list-section .title {
    padding: 1rem;
    font-size: 1.6rem;
  }

  #yt-mall .m-list-links.m-list-section .iconfont {
    font-size: 2rem;
    color: #C71A40;
  }

  #yt-mall .m-pd-item {
    font-size: 1.4rem;
  }

  #yt-mall .m-pd-item .pd-item-left, #yt-mall .m-pd-item .pd-item-right {
    display: table-cell;
    vertical-align: top;
  }

  #yt-mall .m-pd-item .pd-item-right {
    padding: .5rem 0 0 1rem;
  }

  #yt-mall .m-pd-item .thumbnail {
    width: 10rem;
    height: 10rem;
    border: 1px solid #EAEAEA;
  }

  #yt-mall .m-pd-item .title {
    height: 4rem;
  }

  #yt-mall .m-pd-item .price {
    display: inline-block;
    margin-top: 1rem;
    color: #C71A40;
    font-size: 1.6rem;
    font-weight: bold;
  }

  #yt-mall .m-pd-item .info {
    color: #BEBEBE;
  }

  #yt-mall .m-address {
    background: #fff;
  }

  #yt-mall .m-address .name {
    font-size: 1.6rem;
  }

  #yt-mall .m-address .address, #yt-mall .m-address .phone {
    font-size: 1.4rem;
    color: #BEBEBE;
  }

  #yt-mall .m-address.m-address-order {
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;
  }

  #yt-mall .m-address.m-address-order .icon {
    padding-right: 1rem;
    vertical-align: middle;
  }

  #yt-mall .m-adrMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }

  #yt-mall .m-adrMask .f-table {
    width: 100%;
    height: 100%;
  }

  #yt-mall .m-adrMask .f-table-cell {
    vertical-align: bottom;
  }

  #yt-mall .m-adrMask .m-form-item:last-child {
    border-bottom: 0 none;
  }

  #yt-mall .m-adrMask .m-form .container {
    padding: 0;
  }

  #yt-mall .m-adrMask .m-form .container .u-btn {
    height: 100%;
    font-size: 1.4rem;
  }

  #yt-mall .m-order-pd {
    padding: 1rem;
    background: #fff;
  }

  #yt-mall .m-order-pd .thumbnail {
    width: 60px;
    height: 60px;
    border: 1px solid #EAEAEA;
  }

  #yt-mall .m-order-pd .text {
    margin-left: .5rem;
    font-size: 1.4rem;
    height: 4rem;
  }

  #yt-mall .m-order-pd .tips {
    font-size: 1.4rem;
    color: #BEBEBE;
    margin-left: .5rem;
  }

  #yt-mall .m-order-pd .price {
    font-size: 1.4rem;
    font-weight: bold;
    color: #C71A40;
    height: 4rem;
    text-align: right;
  }

  #yt-mall .m-order-pd .num {
    font-size: 1.4rem;
    color: #BEBEBE;
    text-align: right;
  }

  #yt-mall .m-pd {
    margin-bottom: 2rem;
    background: #fff;
  }

  #yt-mall .m-pd .m-slide {
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-pd .m-slide .swiper-container {
    height: 190px;
  }

  #yt-mall .m-pd .m-slide img.thumbnail {
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }

  #yt-mall .m-pd .wrap {
    padding: 1rem 2rem;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-pd .title {
    margin-bottom: .5rem;
    font-size: 1.6rem;
    font-weight: bold;
  }

  #yt-mall .m-pd .price {
    font-size: 1.6rem;
    font-weight: bold;
    color: #C71A40;
  }

  #yt-mall .m-pd .origin, #yt-mall .m-pd .sales {
    font-size: 1.4rem;
    color: #BEBEBE;
  }

  #yt-mall .m-pd .origin {
    text-decoration: line-through;
  }

  #yt-mall .m-pd .spec, #yt-mall .m-pd .qty {
    padding-right: 1rem;
    vertical-align: middle;
    font-size: 1.4rem;
  }

  #yt-mall .m-slide .swiper-container {
    width: 100%;
  }

  #yt-mall .m-slide .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #C71A40;
  }

  #yt-mall .m-slide a {
    display: block;
  }

  #yt-mall .m-slide img {
    width: 100%;
    height: auto;
  }

  #yt-mall .m-check {
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
  }

  #yt-mall .m-check input[type="checkbox"], #yt-mall .m-check input[type="radio"] {
    display: none;
  }

  #yt-mall .m-check label {
    display: inline-block;
    font-size: 1.2rem;
    padding: .5rem 1rem;
    border: 1px solid #EAEAEA;
    color: #BEBEBE;
    margin: .2rem .5rem .2rem 0;
  }

  #yt-mall .m-check input[type="checkbox"]:checked + label,
  #yt-mall .m-check input[type="radio"]:checked + label {
    background: #C71A40;
    color: #fff;
    border: 1px solid #C71A40;
  }

  #yt-mall .m-count {
    display: inline-block;
    margin-right: 2px;
    width: 150px;
  }

  #yt-mall .m-count input {
 
    -webkit-appearance: none;
    padding: .5rem 1rem;
    border: 0 none;
    width: 100%;
    border: 1px solid #EAEAEA;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 0;
    margin-left: -1px;
  }

  #yt-mall .m-count .btn {
    display: inline-block;
    padding: .5rem 1rem;
    width: 100%;
    font-size: 1.2rem;
    border: 1px solid #EAEAEA;
    color: #BEBEBE;
    text-align: center;
  }

  #yt-mall .m-count .btn.plus {
    margin-left: -2px;
  }

  #yt-mall .m-count .btn:active {
    background: #EAEAEA;
  }

  #yt-mall .m-article {
    border-top: 1px solid #EAEAEA;
    margin: 1.5rem 0;
    background: #fff;
  }

  #yt-mall .m-article .title {
    padding: .5rem 0;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-article .content {
    padding: 1rem;
  }

  #yt-mall .m-article .content img {
    display: block;
    width: 100%;
    height: auto;
  }

  #yt-mall .m-comments {
    background: #fff;
    margin-top: 1.5rem;
  }

  #yt-mall .m-comments .heading {
    padding: 1rem 2rem;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-comments .heading .num {
    font-size: 3rem;
    font-weight: bold;
    color: #C71A40;
    vertical-align: middle;
  }

  #yt-mall .m-comments .heading .info, #yt-mall .m-comments .heading .tips {
    font-size: 1.2rem;
  }

  #yt-mall .m-comments .heading .tips {
    color: #BEBEBE;
  }

  #yt-mall .m-comments .heading .stars {
    height: 4rem;
  }

  #yt-mall .m-comments .stars {
    font-size: 1.4rem;
    vertical-align: middle;
    color: #F8CA1C;
  }

  #yt-mall .m-comments .comment-item {
    padding: 1rem 2rem;
  }

  #yt-mall .m-comments .comment-item .title {
    font-size: 1.4rem;
  }

  #yt-mall .m-comments .comment-item .content {
    font-size: 1.2rem;
  }

  #yt-mall .m-comments .comment-item .more {
    color: #C71A40;
  }

  #yt-mall .m-order-item {
    background: #fff;
    margin: 1rem 0;
  }

  #yt-mall .m-order-item .heading {
    font-size: 1.2rem;
    padding: 1rem;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-order-item .heading .info {
    color: #C71A40;
  }

  #yt-mall .m-order-item a {
    color: #C71A40;
  }

  #yt-mall .m-order-item .m-order-pd {
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-order-item .footer {
    padding: 1rem;
    font-size: 1.2rem;
  }

  #yt-mall .m-panel {
    padding: 2rem;
    background: #C71A40;
    color: #fff;
  }

  #yt-mall .m-panel .title {
    font-size: 2.4rem;
  }

  #yt-mall .m-panel .iconfont {
    font-size: 3.8rem;
    float: right;
  }

  #yt-mall .m-delivery {
    font-size: 1.4rem;
  }

  #yt-mall .m-delivery .tips {
    color: #BEBEBE;
  }

  #yt-mall .m-delivery .icon {
    vertical-align: middle;
    padding: 0 1rem;
  }

  #yt-mall .m-fixed-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  #yt-mall .m-home-grid {
    padding: 1rem 2rem;
    background: #fff;
  }

  #yt-mall .m-home-grid a {
    display: block;
  }

  #yt-mall .m-home-grid.m-home-grid-icon {
    padding: .5rem 2rem;
  }

  #yt-mall .m-home-grid.m-home-grid-icon a {
    padding: .5rem;
    color: #421F2E;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon {
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
    background: #C71A40;
    border-radius: .8rem;
    text-align: center;
    line-height: 5rem;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon.green {
    background: #69EEB5;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon.blue {
    background: #8CD9FF;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon.pink {
    background: #FD8BDD;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .icon.orange {
    background: #FF8585;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .iconfont {
    font-size: 3rem;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  #yt-mall .m-home-grid.m-home-grid-icon .info {
    font-size: 1.2rem;
    margin-top: .5rem;
    text-align: center;
  }

  #yt-mall .f-shadow {
    box-shadow: 0 0 10px #EAEAEA;
  }

  #yt-mall .m-head {
    position: relative;
    height: 4rem;
    line-height: 4rem;
    background: #C71A40;
  }

  #yt-mall .m-head .iconfont {
    padding: 1rem;
  }

  #yt-mall .m-head .title {
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
  }

  #yt-mall .m-head a {
    display: block;
    color: #fff;
  }

  #yt-mall .m-head.m-head-info {
    background: #fff;
  }

  #yt-mall .m-head.m-head-info a {
    color: #C71A40;
  }

  #yt-mall .m-head.m-head-info a.s-active {
    color: #421F2E;
  }

  #yt-mall .m-head.m-head-info .title {
    color: #000;
    font-size: 1.4rem;
  }

  #yt-mall .m-head.m-head-info .title li {
    width: 50%;
    float: left;
    text-align: center;
  }

  #yt-mall .m-nav {
    font-size: 1.4rem;
    background: #fff;
  }

  #yt-mall .m-nav a {
    display: block;
    padding: 0 1rem 1rem 1rem;
    text-align: center;
    color: #421F2E;
  }

  #yt-mall .m-nav a.s-active {
    border-bottom: 2px solid #C71A40;
  }

  #yt-mall .m-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #131213;
  }

  #yt-mall .m-foot .iconfont {
    font-size: 2.8rem;
    -webkit-font-smoothing: antialiased;
  }

  #yt-mall .m-foot.m-foot-nav a {
    height: 4rem;
    line-height: 4rem;
  }

  #yt-mall .m-foot.m-foot-act {
    padding: .5rem 1rem;
    height: auto;
  }

  #yt-mall .m-foot .m-btn-groups a.u-btn-default {
    margin-right: -1px;
  }

  #yt-mall .m-foot a {
    display: block;
    text-align: center;
    color: #fff;
  }

  #yt-mall .m-foot a .icon {
    font-size: 3rem;
  }

  #yt-mall .m-foot .price {
    color: #C71A40;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
  }

  #yt-mall .m-foot .info {
    color: #fff;
    text-align: center;
    font-size: 1.6rem;
    line-height: 3.4rem;
  }

  #yt-mall .m-foot .num {
    color: #C71A40;
  }

  #yt-mall .m-foot .tips {
    color: #BEBEBE;
    font-size: 1.2rem;
    text-align: center;
  }

  #yt-mall .m-form label {
    display: inline-block;
    line-height: 2.4rem;
  }

  #yt-mall .m-form .m-form-item {
    display: block;
    margin-bottom: 2px;
    padding: .5rem 1rem;
    background: #fff;
  }

  #yt-mall .m-form .m-form-item .thumbnail {
    display: inline-block;
    vertical-align: middle;
  }

  #yt-mall .m-form .m-form-item .thumbnail .icon {
    vertical-align: middle;
  }

  #yt-mall .m-form .container {
    width: 100%;
    height: 4rem;
    background: #fff;
    padding: .5rem;
  }

  #yt-mall .m-form .container .u-btn {
    display: inline-block;
    font-size: 1rem;
  }

  #yt-mall .m-user {
    background: #C71A40;
    color: #fff;
    padding-bottom: .5rem;
  }

  #yt-mall .m-user .heading a {
    padding: .5rem;
  }

  #yt-mall .m-user .heading a .iconfont {
    color: #fff;
    font-size: 2rem;
  }

  #yt-mall .m-user .avatar {
    margin: 0 auto;
    padding: .5rem;
    width: 7rem;
    height: 7rem;
    display: block;
    border-radius: 3.5rem;
    border: 1px solid #fff;
  }

  #yt-mall .m-user .name {
    text-align: center;
    font-size: 2rem;
    padding: .2rem;
  }

  #yt-mall .m-user .member {
    text-align: center;
  }

  #yt-mall .m-user .member span {
    padding: .2rem 1rem;
    background: #fff;
    color: #C71A40;
  }

  #yt-mall .m-user .body .btn {
    margin: .5rem 0;
    border-top: 1px solid #EAEAEA;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-user .body .btn .pure-u-1-2:first-child a {
    border-right: 1px solid #EAEAEA;
  }

  #yt-mall .m-user .body .btn a {
    display: block;
    padding: 1rem;
    text-align: center;
    font-size: 1.6rem;
    color: #fff;
    border-left: none;
  }

  #yt-mall .m-user .body .set, #yt-mall .m-user .body .collection {
    padding: 1rem;
    text-align: center;
    font-size: 1.6rem;
    color: #fff;
    border: 1px solid #fff;
    border-left: none;
    margin: .5rem 0;
  }

  #yt-mall .m-user .body .set .iconfont, #yt-mall .m-user .body .collection .iconfont {
    padding-right: .5rem;
  }

  #yt-mall .m-user .body .collection {
    border-right: none;
  }

  #yt-mall .m-coupon {
    background: #C71A40;
    color: #fff;
    border-radius: .5rem;
  }

  #yt-mall .m-coupon .name {
    font-size: 1.6rem;
  }

  #yt-mall .m-coupon .price span {
    font-size: 3rem;
  }

  #yt-mall .m-coupon .time {
    font-size: 1rem;
  }

  #yt-mall .m-coupon .content {
    padding: 1rem 0;
    text-align: center;
  }

  #yt-mall .m-coupon .wrap {
    width: 100%;
  }

  #yt-mall .m-coupon .btn {
    text-align: center;
  }

  #yt-mall .m-coupon .avatar {
    vertical-align: top;
  }

  #yt-mall .m-coupon .avatar img {
    width: 100%;
  }

  #yt-mall .m-user-section .title {
    font-size: 1.4rem;
    padding: .5rem 1rem;
    background: #fff;
    border-bottom: 1px solid #EAEAEA;
  }

  #yt-mall .m-user-section .title a .iconfont {
    font-size: 1.4rem;
  }

  #yt-mall .m-user-section .content {
    text-align: center;
    padding: 1rem;
    background: #fff;
  }

  #yt-mall .m-user-section .content a {
    display: block;
    color: #421F2E;
  }

  #yt-mall .m-user-section .content .iconfont {
    font-size: 3rem;
  }

  #yt-mall .m-loginform {
    width: 100%;
    min-height: 100%;
    background-size: 100% 100%;
  }

  #yt-mall .m-loginform .heading a {
    padding: 1rem 1.5rem;
    color: #fff;
  }

  #yt-mall .m-loginform .heading a .iconfont {
    font-size: 2rem;
  }

  #yt-mall .m-loginform .title {
    text-align: center;
    margin-bottom: 5rem;
  }

  #yt-mall .m-loginform .title a {
    color: #fff;
    font-size: 1.6rem;
    padding: .5rem;
  }

  #yt-mall .m-loginform .title a.s-active {
    color: #BEBEBE;
  }

  #yt-mall .m-loginform .form {
    padding: 0 1.5rem;
  }

  #yt-mall .m-loginform .form .input-group {
    position: relative;
    padding: 0 0 0 27px;
    border: 1px solid #fff;
    margin-bottom: 1rem;
  }

  #yt-mall .m-loginform .form .input-group .u-input {
    background: transparent;
    border: none;
    padding: .8rem .5rem;
    color: #fff;
  }

  #yt-mall .m-loginform .form .input-group ::-moz-input-placeholder {
    color: #fff;
    font-size: 1.2rem;
  }

  #yt-mall .m-loginform .form .input-group ::-webkit-input-placeholder {
    color: #fff;
    font-size: 1.2rem;
  }

  #yt-mall .m-loginform .form .input-group :-ms-input-placeholder {
    color: #fff;
    font-size: 1.2rem;
  }

  #yt-mall .m-loginform .form .input-group .icon {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
  }

  #yt-mall .m-loginform .form .input-group .icon .iconfont {
    display: block;
    color: #fff;
    font-size: 1.4rem;
    padding: 0 .5rem;
    margin: .8rem 0;
    border-right: 1px solid #fff;
  }

  #yt-mall .m-loginform .form .btn .u-btn {
    width: 90%;
    margin-left: 10%;
    padding: .8rem .5rem;
  }

  #yt-mall .m-loginform .form .code {
    width: 90%;
    margin-left: 10%;
  }

  #yt-mall .m-loginform .form .u-btn-fullwidth {
    margin-top: 3rem;
  }

  #yt-mall .m-loginform .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 1rem;
  }

  #yt-mall .m-loginform .footer a {
    color: #fff;
  }

  #yt-mall .m-loginform .footer a .iconfont {
    font-size: 3rem;
    padding: .5rem;
  }

</style>
