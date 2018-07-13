<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">优惠券派发</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label">选择用户</label>
                <div class="col-sm-5">
                  <li v-for="user in selectedUsers" class="list-group-item">
                    <img :src="user.avatar" width="20" alt=""> <span>{{user.nickname}}</span>
                    <a href="" @click.prevent="removeFromSelected(user)">移除</a>
                  </li>
                </div>
                <div class="col-sm-4">
                  <input type="text" v-model="userKeyword" class="form-control" placeholder="输入手机号/微信昵称"
                         @keyup.enter.click="searchUser">
                  <ul class="list-group" v-if="users.data && users.data.length > 0">
                    <li v-for="user in users.data" class="list-group-item">
                      <img :src="user.avatar" width="20" alt=""> <span>{{user.nickname}}</span>
                      <a href="" @click.prevent="addToSelected(user)">添加</a>
                    </li>
                  </ul>
                  <input type="text" v-model="orderNos" class="form-control" placeholder="输入订单号"
                         @keyup.enter.click="searchUserByOrderNo">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label">退款扣除积分</label>
                <div class="col-sm-5">
                  <input type="number" min="1"/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label">积分派送</label>
                <div class="col-sm-5">
                  <input type="number" min="1"/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label">优惠券</label>

                <div class="col-sm-5">
                  <select v-model="query.coupon_id" class="form-control">
                    <option value="{{coupon.id}}" v-for="coupon in coupons">{{coupon.name}} - {{coupon.desc}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label">数量</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="query.quantity" number>
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-3 control-label"></label>

                <div class="col-sm-8">
                  <button class="btn btn-success" @click.prevent="dispatch" :disabled="submitable">确认</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'DispatchCoupon',
    data () {
      return {
        userKeyword: '',
        orderNo: '',
        users: [],
        selectedUsers: [],
        coupons: [],
        query: {
          user_ids: [],
          coupon_id: null,
          quantity: 0
        }
      }
    },
    computed: {
      submitable () {
        return this.query.user_ids <= 0 || this.query.quantity <= 0 || !this.query.coupon_id
      }
    },
    route: {
      data () {
        return {
          coupons: api.coupons.getAll({all: 1})
        }
      }
    },
    methods: {
      searchUser () {
        if (this.userKeyword === '') {
          this.users = []
          return
        }
        var self = this
        api.users.getAll(this.userKeyword).then(function (users) {
          self.users = users
        })
      },
      searchUserByOrderNo () {
        if (this.orderNos === '') {
          this.users = []
          return
        }
        var self = this
        api.users.getUserByOrderNos(this.orderNos).then(function (users) {
          for (var k in users.data) {
            self.addToSelected(users.data[k])
          }
        })
      },
      removeFromSelected (user) {
        this.selectedUsers.$remove(user)
        this.query.user_ids.$remove(user.user_id)
      },
      addToSelected (user) {
        if (this.query.user_ids.indexOf(user.user_id) === -1) {
          this.query.user_ids.push(user.user_id)
          this.selectedUsers.push(user)
        }
      },
      dispatch () {
        api.coupons.dispatch(this.query).then(function (result) {
          if (result) {
            window.alert('优惠券派发成功')
            window.location.reload()
          }
        })
      }
    }
  }
</script>
