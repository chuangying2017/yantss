<template>
  <gallery :limit="5" :images.sync="images"></gallery>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab"
                                                    data-toggle="tab">用户协议编辑</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="basic">
            <form class="form-horizontal">
              <div class="row">
                <div class="col-md-8">
                  <div class="box-body">
                   
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-2 control-label">商品详情</label>

                      <div class="col-sm-10">
                        <editor :model.sync="product.detail"></editor>
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
        product: {
          info: {},
          group_ids: []
        },
        sku: {},
        editor: {},
        images: [],
        categories: [],
        groups: []
      }
    },
    route: {
      data ({to: {params: {product_id}}}) {
        var self = this
        return Promise.all([api.categories.getAll()]).then(function ([product]) {
          self.$broadcast('init')
          return {
            product: {
              detail: product.info.detail,   
            }
           
          }
        })
      }
    },
  
    methods: {
     
      submit () {
        var self = this
        this.getSku()
        api.products.update(this.product.id, this.product).then(function (da) {
          window.alert('更新成功!')
          self.$route.router.go('/dashboard/stations/payagre/edit')
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
