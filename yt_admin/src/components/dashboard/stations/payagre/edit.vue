<template>
  <gallery :limit="5" :images.sync="images"></gallery>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
        	<li role="presentation"  class="active">
          	<a href="#zf" @click="type=1" data-toggle="tab" aria-controls="zf" role="tab" data-toggle="tab">{{payagre.title}}</a>
          </li>
          <li role="presentation">
          	<a href="#basic" @click="type=2" data-toggle="tab" aria-controls="basic" role="tab" data-toggle="tab">{{useragre.title}}</a>
          </li>
          
        </ul>
        <div class="tab-content">
        	<!--支付协议-->
      		<div role="tabpanel" class="tab-pane in active" id="zf">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                  	
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">{{payagre.title}}</label>
                      <div class="col-sm-10">
                        <editor :model.sync="payagre.protocol_content"></editor>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label"></label>
												
                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        	<!--用户协议-->
          <div role="tabpanel" class="tab-pane fade" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">{{useragre.title}}</label>
                      <div class="col-sm-10">
                        <editor :model.sync="useragre.protocol_content"></editor>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label"></label>
												
                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      		
        </div>
      </div>

      
    </div>
  </div>
</template>
<script>
import Gallery from '../../../gallery/index.vue'
import Editor from '../../../editor.vue'
import api from 'api/index.js'
export default {
    name: 'EditProduct',
    components: [Gallery, Editor],
    data: function () {
      return {
        limitTimeSales: false,
      	useragre:null,
        payagre:null,
        agre:{},
        type:1,
      
      }
    },
    
    route: {
      data () {
        var self = this
        return Promise.all([api.payagre.getall()]).then(function ([paygredetail]) {
        
        self.$broadcast('init')
          return {
         		 payagre:paygredetail[0],
         		 useragre:paygredetail[1]
          }
        })
      }
    },
  
    methods: {
     
      submit () {
      
        var self = this;
        self.agre={};
        if(self.type==1&&(self.payagre.protocol_content==""||self.payagre.protocol_content==null)){
        	alert("支付协议不能为空");
        	return
        }
        if(self.type==2&&(self.useragre.protocol_content==""||self.useragre.protocol_content==null)){
        	alert("使用方法不能为空");
        	return
        }
				if(self.type==1){
					self.agre={user_id:0,type:self.type,protocol_content:self.payagre["protocol_content"],title:self.payagre.title};
				}
				if(self.type==2){
					self.agre={user_id:0,type:self.type,protocol_content:self.useragre["protocol_content"],title:self.useragre.title};
				}
 				
        api.payagre.update(self.agre).then(function (da) {
        	console.log(da)
          window.alert('更新成功!')
//        self.$route.router.go('/dashboard/stations/payagre/edit')
        })
      }
    }
}
</script>
<style>
  .mb20 {
    margin-bottom: 20px;
  }

  .cover-mask {
    position: absolute;
    top: 0;
    left: 15px;
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .thumbnail-mask .cover-mask {
    display: none;
  }

  .thumbnail-mask:hover .cover-mask {
    display: block;
  }

  .cover-label {
    position: absolute;
    top: 0;
    left: 15px;
    background: #00cc3d;
    color: #fff;
    padding: 2px 5px;
    font-size: 12px;
  }
</style>
