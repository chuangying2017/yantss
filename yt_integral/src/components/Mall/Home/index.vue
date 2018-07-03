<template>
	<div class="mallhome">
		<swipe class="my-swipe">
		  	<swipe-item>
		      	<a class="swipe-link">
		        	<img src="http://o7tep4eu1.bkt.clouddn.com/Fhb61SHEQgw6B4BvlWypyrTRu85s-201805220936425856">
		      	</a>
		    </swipe-item>
		    <swipe-item>
		      	<a class="swipe-link">
		        	<img src="http://o7tep4eu1.bkt.clouddn.com/FufWGRnxVKlYRv0W5NyKs34mLU0Z-201805251703538953">
		      	</a>
		    </swipe-item>
  		</swipe>
	</div>
</template>
<script>
	import {Swipe,SwipeItem} from 'vue-swipe'
	export default{
		name:'home',
		components:{Swipe,SwipeItem},
	}
</script>

<style scoped="scoped">
	.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
 
.slide1 {
	position:absolute;
	width:100%;height:500px;
  background-color: #0089dc;
  color: #fff;
}
 
.slide2 {
		position:absolute;
	width:100%;height:500px;
  background-color: #ffd705;
  color: #000;
}
 
.slide3 {
		position:absolute;
	width:100%;height:500px;
  background-color: #ff2d4b;
  color: #fff;
}
</style>