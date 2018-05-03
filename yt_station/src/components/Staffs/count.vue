<template>
  <div>
    <div class="select-wrap">
      <div class="pure-g contentC">
        <div class="selectC">
          <div class="select-ui">
            <select v-model="selected" @change="changeDate">
              <option selected value="">全部配送员</option>
              <option :value="staff.id" v-for="staff in staffs">{{staff.name}}</option>
            </select>
          </div>
        </div>
        <div class="white20"></div>
        <div class="dateC"><input style="padding-left:0.2rem" type="date" v-model="stime" @change="changeDate" value="2017-03-10"/><span class="to">至</span><input type="date" v-model="etime" @change="changeDate" value="2017-03-10"/><i class="iconfont iconC">&#xe658;</i></div>
      </div>
    </div>
    <!--<div class="u-table">-->
    <div class="u-table" v-show="!$loadingRouteData && onestaffs.length && !loading">
      <table width="100%" class="pure-table pure-table-bordered">
        <thead>
        <tr>
          <th>产品</th>
          <th>数量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="staff in onestaffs">
          <td>{{staff.name}}</td>
          <td>{{staff.quantity}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <loader v-show="$loadingRouteData || loading"></loader>
    <empty v-show="!onestaffs.length" icon="&#xe651;">没有数据</empty>
  </div>
</template>
<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'
  export default {
    name: 'count',
    data: function () {
      return {
        // orders: [],
        // loading: false
        selected: '',
        stime: '',
        etime: '',
        onestaffs: [],
        staffs: []
      }
    },
    created () {
      var self = this
      self.$loadingRouteData = true
      // self.onestaffs.length = true
      this.$http.get('/stations/distributormilk', {
        staff: this.selected,
        stime: '2017-03-10',
        etime: '2017-03-10'
      }).then(
        function (data) {
          self.$loadingRouteData = false
          self.onestaffs = data.data.data
          // console.log(self.onestaffs)
        },
        function (data) {
          console.log(data)
        }
      )
    },
    components: {
      Empty,
      Loader
    },
    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/stations/staffs')
        ]).then(
          function ([
            {data: {data: staffs}}
          ]) {
            return {
              staffs: staffs
            }
          }
        )
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
            // console.log(self.onestaffs)
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
      // getCurrentProducts: function () {
      //   var self = this
      //   self.loading = true
      //   self.$http.get('/stations/preorders/daily', {
      //     date: self.activeDay
      //   }).then(
      //     function (data) {
      //       self.orders = data.data.data
      //       self.loading = false
      //     },
      //     function (data) {
      //       window.alert('获取数据失败，请重试')
      //     }
      //   )
      // },
  }
</script>

<style scoped>
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
  .select-wrap {
    font-size: 1.4rem;
    padding: 1rem 1rem;
  }

  .select-wrap span {
    display: block;
    padding: .5rem 0;
    text-align: center;
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
