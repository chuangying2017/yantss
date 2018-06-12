<template>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">星级标签</h3>
        </div>
        <div class="p20 starCon">
          <p><span class="fs20">1星：</span>
            <input type="text" v-model="starobj.star_one.one_one"/>
            <input type="text" v-model="starobj.star_one.one_two"/>
            <input type="text" v-model="starobj.star_one.one_three"/>
            <input type="text" v-model="starobj.star_one.one_four"/>
            <input type="text" v-model="starobj.star_one.one_five"/>
            <input type="text" v-model="starobj.star_one.one_six"/>
          </p>
          <p><span class="fs20">2星：</span>
            <input type="text" v-model="starobj.star_two.two_one"/>
            <input type="text" v-model="starobj.star_two.two_two"/>
            <input type="text" v-model="starobj.star_two.two_three"/>
            <input type="text" v-model="starobj.star_two.two_four"/>
            <input type="text" v-model="starobj.star_two.two_five"/>
            <input type="text" v-model="starobj.star_two.two_six"/>
          </p>
          <p><span class="fs20">3星：</span>
            <input type="text" v-model="starobj.star_three.three_one"/>
            <input type="text" v-model="starobj.star_three.three_two"/>
            <input type="text" v-model="starobj.star_three.three_three"/>
            <input type="text" v-model="starobj.star_three.three_four"/>
            <input type="text" v-model="starobj.star_three.three_five"/>
            <input type="text" v-model="starobj.star_three.three_six"/>
          </p>
          <p><span class="fs20">4星：</span>
            <input type="text" v-model="starobj.star_four.four_one"/>
            <input type="text" v-model="starobj.star_four.four_two"/>
            <input type="text" v-model="starobj.star_four.four_three"/>
            <input type="text" v-model="starobj.star_four.four_four"/>
            <input type="text" v-model="starobj.star_four.four_five"/>
            <input type="text" v-model="starobj.star_four.four_six"/>
          </p>
          <p><span class="fs20">5星：</span>
            <input type="text" v-model="starobj.star_five.five_one"/>
            <input type="text" v-model="starobj.star_five.five_two"/>
            <input type="text" v-model="starobj.star_five.five_three"/>
            <input type="text" v-model="starobj.star_five.five_four"/>
            <input type="text" v-model="starobj.star_five.five_five"/>
            <input type="text" v-model="starobj.star_five.five_six"/>
          </p>
          <p>用户获得<input type="text" v-model="starobj.user_score" class="score"/>积分</p>
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right" @click.prevent="submit">保存
            </button>
          </div>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'startag',
    data () {
      return {
      	starobj:{
      		star_one:{
	      		one_one:'牛奶变质',
	        	one_two:'',
	        	one_three:'',
	        	one_four:'',
	        	one_five:'',
	        	one_six:'',
	      	},
	        star_two:{
	        	two_one:'',
	        	two_two:'',
	        	two_three:'',
	        	two_four:'',
	        	two_five:'',
	        	two_six:'',
	        },
	        star_three:{
	        	three_one:'',
	        	three_two:'',
	        	three_three:'',
	        	three_four:'',
	        	three_five:'',
	        	three_six:'',
	        },
	        star_four:{
	        	four_one:'',
	        	four_two:'',
	        	four_three:'',
	        	four_four:'',
	        	four_five:'',
	        	four_six:'',
	        },
	        star_five:{
	        	five_one:'',
	        	five_two:'',
	        	five_three:'',
	        	five_four:'',
	        	five_five:'',
	        	five_six:' ',
	        },
	        user_score:0
      	},
      	
				
      }
    },
//  computed:{
//  	star_one:function(){
//  		return this.one_one+','+this.one_two+','+this.one_three+','+this.one_four+','+this.one_five+','+this.one_six
//  	},
//  	star_two:function(){
//  		return this.two_one+','+this.two_two+','+this.two_three+','+this.two_four+','+this.two_five+','+this.two_six
//  	},
//  	star_three:function(){
//  		return this.three_one+','+this.three_two+','+this.three_three+','+this.three_four+','+this.three_five+','+this.three_six
//  	},
//  	star_four:function(){
//  		return this.four_one+','+this.four_two+','+this.four_three+','+this.four_four+','+this.four_five+','+this.four_six
//  	},
//  	star_five:function(){
//  		return this.five_one+','+this.five_two+','+this.five_three+','+this.five_four+','+this.five_five+','+this.five_six
//  	}
//  },
	  route: {
		  data () {
		  	var self=this;
		    return api.assess.get().then(function (data) {
		    	self.starobj=data
		    	
//		      return {
//		        products: products,
//		        pagination: pagination
//		      }
		    })
		  }
	  },
    methods: {
      submit () {
      	var self = this
      	
//    	var star_one=this.one_one+','+this.one_two+','+this.one_three+','+this.one_four+','+this.one_five+','+this.one_six
//      var star_two=this.two_one+','+this.two_two+','+this.two_three+','+this.two_four+','+this.two_five+','+this.two_six
//      var star_three=this.three_one+','+this.three_two+','+this.three_three+','+this.three_four+','+this.three_five+','+this.three_six
//      var star_four=this.four_one+','+this.four_two+','+this.four_three+','+this.four_four+','+this.four_five+','+this.four_six
//   	  var star_five=this.five_one+','+this.five_two+','+this.five_three+','+this.five_four+','+this.five_five+','+this.five_six
    
//    	var starobj={star_one:self.star_one,star_two:self.star_two,star_three:self.star_three,star_four:self.star_four,star_five:self.star_five,user_score:self.user_score}

//    console.log(starobj)
      	api.assess.set(self.starobj).then(function(data) {
          console.log(data)
        	
      	})
     }}
  }
</script>
<style scoped>
  .box-title{
    font-weight: bold;
  }
  .p20{
    padding: 20px;
  }
  .starCon p{
    padding: 6px;
  }
  .starCon p input{
    margin-right: 20px;
  }
  .fs20{
    font-size: 15px;
    font-weight: bold;
  }
  .score{
    margin-left: 20px;
  }
</style>
