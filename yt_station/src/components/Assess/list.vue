<template>
	<div class="m-user m-user-alert" v-show="!$loadingRouteData">
		<ul>
			<li class="user-list">
				<a>
					<div class="select-wrap">
				      <div class="pure-g contentC">
				        <div class="selectC">
				     		<span>天平架服务部</span>
				        </div>
				        <!--<div class="white20"></div>-->
				        <div class="dateC"><input @change="changeDate" style="padding-left:0.2rem" type="date" v-model="stime" @change="changeDate" value="2017-03-10"/><span class="to">至</span><input @change="changeDate" type="date" v-model="etime" @change="changeDate" value="2017-03-10"/><i class="iconfont iconC">&#xe658;</i></div>
				      </div>
		    		</div>
				</a>
			</li>
			<li class="user-list">
				<a>
					<p class="clearfix">
						<span class="fl">当月综合排名</span>
						<span class="fr">第四名</span>
					</p>
				</a>
			</li>
			<li class="user-list">
				<a>
					<p class="clearfix">
						<span class="fl">当月均分/评价次数</span>
						<span class="fr">2.5/3333</span>
					</p>
				</a>
			</li>
		</ul>
		
			<div class="tab1">
				<table width="100%" class="pure-table pure-table-bordered">
			        <thead>
			        <tr>
			          <th>配送员</th>
			          <th>均分/评价次数/订单数</th>
			          <th>排行</th>
			          <th>操作</th>
			        </tr>
			        </thead>
			        <tbody>
				        <tr>
				          <td>独孤送奶</td>
				          <td>3.4/223232332/23232232</td>
				          <td>1111</td>
				          <td>
				          	<a v-link="{ path: '/station/assess/allAssess/'+$route.params.staff_id }">查看</a>
				          </td>
				        </tr>
				        <tr>
			          <td>独孤送奶</td>
			          <td>3.4/223232332/23232232</td>
			          <td>1111</td>
			          <td>
			          	<a v-link="">查看</a>
			          </td>
			        </tr>
			        <tr>
			          <td>独孤送奶</td>
			          <td>3.4/223232332/23232232</td>
			          <td>1111</td>
			          <td>
			          	<a v-link="">查看</a>
			          </td>
			        </tr>
			        </tbody>
			      </table>
			</div>
		
	</div>
	
	<loader v-show="$loadingRouteData || renew"></loader>
	
	<empty v-show="!$loadingRouteData && !subscribes.length" icon="&#xe651;">
		当前没有任何订单
	</empty>
	
</template>

<script>
	import Loader from './../Share/loader.vue'
	export default{
		name:'assesslist',
		data(){
			return{
				
			}
		},
		methods: {
		    changeDate: function () {
		        var self = this
		        this.$http.get('/stations/distributormilk', {
		            staff: this.selected,
		            stime: this.stime,
		            etime: this.etime
		        }).then(
		          function (data) {
		            self.onestaffs = data.data.data
		          },
		          function (data) {
		            console.log(data)
		        })
		    }
	    }
	}
	
</script>

<style scoped>
	.pure-u-1-2 {
		width: 33.3%;
		border-right: 1px solid #25AD25;
	}
	.pure-u-1-2:last-child{
		border:none
	}
	#importData {
		margin-left: 1rem
	}
	
	.u-table {
		margin: 1rem;
		font-size: 1.4rem;
	}
	
	.u-table table {
		background: #fff;
		text-align: center;
	}
	
	.u-table thead th {
		text-align: center;
	}
	
	.ios-btn {
		display: block;
		-webkit-appearance: none;
		border-right: 0 none;
		border-left: 0 none;
		outline: none;
		width: 100%;
		padding: 1rem;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		background: #fff;
		font-size: 1.4rem;
		color: #25AD25;
		text-align: center;
	}
	
	.ios-btn:disabled {
		color: #bbb;
	}
	
	.status {
		margin: 0 .5rem 1rem;
	}
	
	.status a {
		color: #25AD25;
	}
	
	.u-tab {
		margin: 1rem 0;
		text-align: center;
		border: 1px solid #25AD25;
		border-radius: 3px;
	}
	
	.u-tab a {
		display: block;
		padding: .5rem;
		font-size: 1.4rem;
		color: #25AD25;
		background: #fff;
	}
	
	.u-tab a.active {
		background: #25AD25;
		color: #fff;
	}
	
	.m-user.m-user-alert {
		padding: 1rem;
		background: transparent;
	}
	
	.m-user.m-user-alert .user-list a {
		color: #ff9f29;
		/*background: #ff9f29; !* For browsers that do not support gradients *!*/
		/*background: -webkit-linear-gradient(#ffd757, #ff9f29); !* For Safari 5.1 to 6.0 *!*/
		/*background: -o-linear-gradient(#ffd757, #ff9f29); !* For Opera 11.1 to 12.0 *!*/
		/*background: -moz-linear-gradient(#ffd757, #ff9f29); !* For Firefox 3.6 to 15 *!*/
		/*background: linear-gradient(#ffd757, #ff9f29); !* Standard syntax *!*/
		background: #fff;
		text-align: center;
		border-radius: .3rem;
		border: 1px dashed #ff9f29;
	}
	
	.m-user.m-user-alert .user-list a .iconfont {
		float: none;
		color: #ff9f29;
		-webkit-font-smoothing: antialiased;
	}
	/**/
	.tab1{margin-top:1rem}

  .u-table table {
    background: #fff !important;
    text-align: center;
  }

  .u-table thead th {
    text-align: center;
  }
  .select-wrap {
    font-size: 1.4rem;
  
  }

  .select-wrap span {
    display: block;
    padding: .5rem 0;
    text-align: left;
  }

  .select-wrap select {
    border: 1px solid #bbb;
    width: 100%;
    padding: .6rem;
    font-size: 1.4rem;
    background: #fff;
    outline: none;
    -webkit-appearance: none;
  }

  .select-ui {
    position: relative;
  }

  .select-ui:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #bbb;
    position: absolute;
    right: 1rem;
    top: 1.2rem;
  }
  .selectC{
    width: 56.6667%;
  }
  input[type="date"] {
    width: 36%;
     height: 2.4rem;
     border-radius: 0;
     border: 0;
     outline: none;
    padding:0;
    margin: 0 0.35rem;
    font-size: 0.6rem;
  }
  .iconC{
    color: #929296;
    padding-top: 0.5rem;
  }
  .to{
    font-size: 0.6rem;
    margin-right: 0.3rem;
  }
  .contentC{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .dateC{
    display: flex;
    flex-direction: row;
    padding: 0.3rem 0;
    background: white;
    width:70%;
  }
  .white20{
    width: 2.5rem;
    height: 1.5rem;
  }
	
</style>