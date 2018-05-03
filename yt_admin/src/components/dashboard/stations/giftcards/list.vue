<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/giftcards/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建礼品卡
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">礼品卡管理</h3>
          <!--<div class="box-tools">-->
          <!--<div class="input-group input-group-sm" style="width: 150px;">-->
          <!--<input type="text" name="table_search" class="form-control pull-right" placeholder="微信昵称">-->

          <!--<div class="input-group-btn">-->
          <!--<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>名称</th>
              <th>描述</th>
              <th>时间</th>
              <th>领取后有效期</th>
              <th>领取/使用</th>
              <th>已领</th>
              <th>操作</th>
            </tr>
            <tr v-for="giftcard in giftcards">
              <td>{{$index + 1}}</td>
              <td>{{giftcard.name}}</td>
              <td>{{giftcard.desc}}</td>
              <td>
                <p>开始：{{giftcard.start_time}}</p>
                <p>结束：{{giftcard.end_time}}</p>
              </td>
              <td>{{giftcard.counter.effect_days}}天</td>
              <td>{{giftcard.counter.dispatch}}/{{giftcard.counter.used}}</td>
              <td>{{giftcard.active ? '是' : '否'}}</td>
              <td>
                <a v-link="{path: '/dashboard/stations/giftcards/detail/' + giftcard.id}">编辑</a>
                <!--<a href="" v-if="giftcard.active" @click.prevent="update(giftcard, 0)">隐藏</a>-->
                <a href="" v-else @click.prevent="update(giftcard, 1)">显示</a>
                <!--<a href="" @click.prevent="delete(giftcard, $index)">删除</a>-->
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <select name="" id="" v-model="goTo" v-on:change="changePage">
            <option value="{{n + 1}}" v-for="n in pagination.total_pages">{{n + 1}}</option>
          </select>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListGiftcards',
    data () {
      return {
        goTo: 1,
        giftcards: [],
        pagination: {}
      }
    },
    route: {
      data () {
        return this.getGiftcards()
      }
    },
    methods: {
      getGiftcards (query) {
        var self = this
        api.giftcards.getAll(query).then(function ({giftcards, pagination}) {
          self.giftcards = giftcards
          self.pagination = pagination
        })
      },
      delete (giftcard) {
        var self = this
        if (window.confirm('确定删除此礼品卡?')) {
          api.giftcards.delete(giftcard.id).then(function (data) {
            self.giftcards.$remove(giftcard)
          })
        }
      },
      update (giftcard, status) {
        api.giftcards.update(giftcard.id, status).then(function (data) {
          window.alert('更新成功')
          window.location.reload()
        })
      },
      changePage () {
        this.getGiftcards({
          page: this.goTo
        })
      }
    }
  }
</script>
