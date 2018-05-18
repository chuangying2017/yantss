<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box clearfix">
        <div class="box-header">
          <h3 class="box-title">定义新用户1</h3>
        </div>
        <!-- /.box-header -->
        <form class="form-horizontal">
			  <div class="form-group">
			    <label for="inputEmail3" class="col-sm-2 control-label">新用户：</label>
			    <div class="col-sm-1">
			      <input type="number" class="form-control" id="inputEmail3" placeholder="" v-model="intertime">
			    </div>
			     <div class="control-label pull-left">
			      个月未消费的客户为新用户
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="col-sm-offset-2 col-sm-10">
			      <button type="button" class="btn btn-success" @click="setnewuser">保存</button>
			    </div>
			  </div>
		</form>
       
       

        <!-- /.box-body -->
        
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListUsers',
    data () {
      return {
       intertime:null,
      }
    },
    route: {
      data () {
        return api.users.getnewuser().then(function (intertime) {
          return {
           intertime
          }
        })
      }
    },
    methods: {
    	setnewuser:function(){
    		var self=this
    		api.users.setnewuser(self.intertime).then(function(data){
    			if(data.data.status==1){
    				alert("修改成功")
    			}
    		},function(){
    			
    		})
    	}
    }
  }
</script>
