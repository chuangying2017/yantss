<template>
  <div class="row">
    <div class="col-md-6">
      <h4 class="fw">优鲜卡</h4>
      <!--<a v-link="{path: '/dashboard/stations/orders/newEditCard/'+card.id}" class="btn btn-social btn-google btn-sm mb20">-->
        <!--<i class="fa fa-plus"></i> 编辑-->
      <!--</a>-->
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">优鲜卡列表</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th>卡面图片</th>
              <th>名称</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="card in allcards">
              <td>
                <img :src="card.pic_url" alt="" class="thumbnail" width="32">
              </td>
              <td>{{card.name}}</td>
              <td>{{card.created_at}}</td>
              <td>
                <div class="btn-group">
                  <a v-link="{path: '/dashboard/stations/orders/newEditCard/'+card.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                  <!--<a href="#" type="button" class="btn btn-default btn-sm" @click.prevent="remove(card)">删除</a>-->
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'new-card',
    data () {
      return {
        allcards: []
      }
    },
    route: {
      data () {
        return {
          allcards: api.allcards.getAll()
        }
      }
    }
    // created () {
    //   this.$http.get('/admin/card/categories/2').then((response) => {
    //     this.carts = response.data
    //     console.log(this.carts)
    //   })
    // }
    // methods: {
    //   remove (card) {
    //     var self = this
    //     if (window.confirm('确定要删除此分组?')) {
    //       api.allcards.delete(card.id).then(function () {
    //         self.allcards.$remove(card)
    //       })
    //     }
    //   }
    // }
  }
</script>
