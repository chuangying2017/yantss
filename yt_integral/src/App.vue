<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0px;padding:0px}
i{font-style: normal;}
html{background:#ecf3ff}
a:link{
text-decoration:none;
}
a:visited{
text-decoration:none;
}
a:hover{
text-decoration:none;
}
a:active{
text-decoration:none;
}
li{list-style: none;}
.foothr{width:100%;height:1.68rem;}
.pop{width:100%;min-height: 100%;background:red;position:fixed;top:0;z-index: 10;background:rgba(0,0,0,0.7)}
/*动画*/
	.fade-enter-active {
	  animation: fade-in .3s;
	  -webkit-animation: fade-in .3s;
	  -ms-animation: fade-in .3s;
	  -o-animation: fade-in .3s;
	  -moz-animation: fade-in .3s;
	}
	.fade-leave-active {
	  animation: fade-in .3s reverse;
	  -webkit-animation: fade-in .3s reverse;
	  -ms-animation: fade-in .3s reverse;
	  -o-animation: fade-in .3s reverse;
	  -moz-animation: fade-in .3s reverse;
	}
	@keyframes fade-in {
	  0% {
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    -ms-transform: scale(0);
	    -o-transform: scale(0);
	    -moz-transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	    -webkit-transform: scale(1.5);
	    -ms-transform: scale(1.5);
	    -o-transform: scale(1.5);
	    -moz-transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	    -ms-transform: scale(1);
	    -o-transform: scale(1);
	    -moz-transform: scale(1);
	  }
	}
	@-webkit-keyframes fade-in {
	  0% {
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    -ms-transform: scale(0);
	    -o-transform: scale(0);
	    -moz-transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	    -webkit-transform: scale(1.5);
	    -ms-transform: scale(1.5);
	    -o-transform: scale(1.5);
	    -moz-transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	    -ms-transform: scale(1);
	    -o-transform: scale(1);
	    -moz-transform: scale(1);
	  }
	}
	@-o-keyframes fade-in {
	  0% {
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    -ms-transform: scale(0);
	    -o-transform: scale(0);
	    -moz-transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	    -webkit-transform: scale(1.5);
	    -ms-transform: scale(1.5);
	    -o-transform: scale(1.5);
	    -moz-transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	    -ms-transform: scale(1);
	    -o-transform: scale(1);
	    -moz-transform: scale(1);
	  }
	}
	@-ms-keyframes fade-in {
	  0% {
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    -ms-transform: scale(0);
	    -o-transform: scale(0);
	    -moz-transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	    -webkit-transform: scale(1.5);
	    -ms-transform: scale(1.5);
	    -o-transform: scale(1.5);
	    -moz-transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	    -ms-transform: scale(1);
	    -o-transform: scale(1);
	    -moz-transform: scale(1);
	  }
	}
	@-moz-keyframes fade-in {
	  0% {
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    -ms-transform: scale(0);
	    -o-transform: scale(0);
	    -moz-transform: scale(0);
	  }
	  50% {
	    transform: scale(1.5);
	    -webkit-transform: scale(1.5);
	    -ms-transform: scale(1.5);
	    -o-transform: scale(1.5);
	    -moz-transform: scale(1.5);
	  }
	  100% {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	    -ms-transform: scale(1);
	    -o-transform: scale(1);
	    -moz-transform: scale(1);
	  }
	}
	
	/*上下*/
	.downup-enter-active {
	  animation: downup-in .3s;
	  -webkit-animation: downup-in .3s;
	  -ms-animation: downup-in .3s;
	  -o-animation: downup-in .3s;
	  -moz-animation: downup-in .3s;
	}
	.downup-leave-active {
	  animation: downup-in .3s reverse;
	  -webkit-animation: downup-in .3s reverse;
	  -ms-animation: downup-in .3s reverse;
	  -o-animation: downup-in .3s reverse;
	  -moz-animation: downup-in .3s reverse;
	}
	@keyframes downup-in {
	  0% {
	    transform: translateY(100%);
	    -webkit-transform: translateY(100%);
	    -ms-transform: translateY(100%);
	    -o-transform: translateY(100%);
	    -moz-transform: translateY(100%);
	  } 
	  100% {
	    transform: translateY(0);
	    -webkit-transform: translateY(0);
	    -ms-transform: translateY(0);
	    -o-transform: translateY(0);
	    -moz-transform: translateY(0);
	  }
	}
	@-webkit-keyframes downup-in {
	  0% {
	    transform: translateY(100%);
	    -webkit-transform: translateY(100%);
	    -ms-transform: translateY(100%);
	    -o-transform: translateY(100%);
	    -moz-transform: translateY(100%);
	  } 
	  100% {
	    transform: translateY(0);
	    -webkit-transform: translateY(0);
	    -ms-transform: translateY(0);
	    -o-transform: translateY(0);
	    -moz-transform: translateY(0);
	  }
	}
	@-ms-keyframes downup-in {
	  0% {
	    transform: translateY(100%);
	    -webkit-transform: translateY(100%);
	    -ms-transform: translateY(100%);
	    -o-transform: translateY(100%);
	    -moz-transform: translateY(100%);
	  } 
	  100% {
	    transform: translateY(0);
	    -webkit-transform: translateY(0);
	    -ms-transform: translateY(0);
	    -o-transform: translateY(0);
	    -moz-transform: translateY(0);
	  }
	}
	@-o-keyframes downup-in {
	  0% {
	    transform: translateY(100%);
	    -webkit-transform: translateY(100%);
	    -ms-transform: translateY(100%);
	    -o-transform: translateY(100%);
	    -moz-transform: translateY(100%);
	  } 
	  100% {
	    transform: translateY(0);
	    -webkit-transform: translateY(0);
	    -ms-transform: translateY(0);
	    -o-transform: translateY(0);
	    -moz-transform: translateY(0);
	  }
	}
	@-moz-keyframes downup-in {
	  0% {
	    transform: translateY(100%);
	    -webkit-transform: translateY(100%);
	    -ms-transform: translateY(100%);
	    -o-transform: translateY(100%);
	    -moz-transform: translateY(100%);
	  } 
	  100% {
	    transform: translateY(0);
	    -webkit-transform: translateY(0);
	    -ms-transform: translateY(0);
	    -o-transform: translateY(0);
	    -moz-transform: translateY(0);
	  }
	}
	/*轮播*/
	.my-swipe {height: 200px;color: #fff;font-size: 30px;text-align: center;}	 
	.swipeitme{width: 100%;position:absolute;}
	.swipeitme img{width:100%;height:200px}
	.is-active{z-index:1;}
	
	
@font-face {
  font-family: 'iconfont';  /* project id 734444 */
  src: url('//at.alicdn.com/t/font_734444_wzr050a707h.eot');
  src: url('//at.alicdn.com/t/font_734444_wzr050a707h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_734444_wzr050a707h.woff') format('woff'),
  url('//at.alicdn.com/t/font_734444_wzr050a707h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_734444_wzr050a707h.svg#iconfont') format('svg');
}
.iconfont {
   font-family: "iconfont";
   color:#fff;
   font-style: normal;
}
</style>
