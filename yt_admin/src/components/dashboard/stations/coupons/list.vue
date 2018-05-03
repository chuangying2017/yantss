<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/coupons/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 创建优惠券
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">优惠券管理</h3>
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
            <tr v-for="coupon in coupons">
              <td>{{$index + 1}}</td>
              <td>{{coupon.name}}</td>
              <td>{{coupon.desc}}</td>
              <td>
                <p>开始：{{coupon.start_time}}</p>
                <p>结束：{{coupon.end_time}}</p>
              </td>
              <td>{{coupon.counter.effect_days}}小时</td>
              <td>{{coupon.counter.dispatch}}/{{coupon.counter.used}}</td>
              <td>{{coupon.active ? '是' : '否'}}</td>
              <td>
                <a v-link="{path: '/dashboard/stations/coupons/detail/' + coupon.id}">编辑</a>
                <!--<a href="" v-if="coupon.active" @click.prevent="update(coupon, 0)">隐藏</a>-->
                <a href="" v-else @click.prevent="update(coupon, 1)">显示</a>
                <!--<a href="" @click.prevent="delete(coupon, $index)">删除</a>-->
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
    name: 'ListCoupons',
    data () {
      return {
        goTo: 1,
        coupons: [],
        pagination: {}
      }
    },
    route: {
      data () {
        return this.getCoupons()
      }
    },
    methods: {
      getCoupons (query) {
        var self = this
        api.coupons.getAll(query).then(function ({coupons, pagination}) {
          self.coupons = coupons
          self.pagination = pagination
        })
      },
      delete (coupon) {
        var self = this
        if (window.confirm('确定删除此优惠券?')) {
          api.coupons.delete(coupon.id).then(function (data) {
            self.coupons.$remove(coupon)
          })
        }
      },
      update (coupon, status) {
        api.coupons.update(coupon.id, status).then(function (data) {
          window.alert('更新成功')
          window.location.reload()
        })
      },
      changePage () {
        this.getCoupons({
          page: this.goTo
        })
      }
    }
  }
</script>
