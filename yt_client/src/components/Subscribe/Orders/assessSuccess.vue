<template>
  <div class="assessSuccess">
    <p class="imgC"><img src="../../../assets/success.jpg"/></p>
    <p class="successTitle">评价成功</p>
    <!--<p class="succcessScore">获得{{user_score}}积分</p>-->
    <p class="gc">{{timer}}秒后自动跳转到个人中心</p>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          timer: 2,
          user_score:null
        }
      },
      route:{
      	data(){
      		var self =this	
					return Promise.all([this.$http.get('/comments/commentFetchIntegral')]).then(function([stars]){
						return {
							user_score:stars.data.user_score
						}
					})
      	}
      },
      created () {
        var self = this
        setInterval(function () {
          self.timer--
          if (self.timer <= 0) {
            self.timer = 0
          }
        }, 1000)
        setTimeout(function () {
	      	window.location.href = 'http://yt2.l43.cn/yt-client/?#!/mall/user'
        }, 2000)
      }
    }
</script>

<style scoped>
  .assessSuccess p{
    text-align: center;
  }
  .successTitle{
    margin-top: 3rem;
    font-size: 2.5rem;
  }
  .succcessScore{
    margin-top: 1.5rem;
    font-size: 1.55rem;
    color: #A7A7A7;
  }
  .gc{
    margin-top: 6rem;
    color: #A7A7A7;
    font-size: 1.55rem;
  }
</style>
