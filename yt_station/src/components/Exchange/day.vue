<template>
  <div>
    <!--<div class="m-head" style="top: 40px">-->
    <!--<div class="ui-select">-->
    <div class="select-wrap">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span>请选择日期: </span>
        </div>
        <div class="pure-u-2-3">
          <div class="select-ui">
            <input type="date" @blur="changeDate" v-model="date">
          </div>
        </div>
      </div>
    </div>
    <!--<span>{{ selected }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <loader v-show="dateLoading"></loader>
    <empty v-show="!dateLoading && !delivers.length" icon="&#xe64d;">当前日期没有数据</empty>
    <div class="u-table" v-show="!dateLoading && delivers.length">
      <table width="100%" class="pure-table pure-table-bordered">
        <thead>
        <tr>
          <th>用户</th>
          <th>手机</th>
          <th>产品</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="deliver in delivers">
          <td>{{deliver.name}}</td>
          <td>{{deliver.phone}}</td>
          <td>
            <p v-for="sku in deliver.skus">{{sku.name}} *{{sku.quantity}}</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Day',

    data: function () {
      return {
        date: null,
        dateLoading: false,
        delivers: []
      }
    },

    components: {
      Empty,
      Loader
    },

    methods: {
      changeDate: function () {
        var self = this
        self.dateLoading = true
        this.$http.get('/stations/preorders/deliver', {
          date: this.date
        }).then(
          function (data) {
            self.dateLoading = false
            self.delivers = data.data.data
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .select-wrap {
    font-size: 1.4rem;
    padding: 1rem 1rem;
  }

  .select-wrap span {
    display: block;
    padding: .5rem 0;
    text-align: center;
  }

  .select-wrap input[type=date] {
    border: 1px solid #bbb;
    width: 100%;
    padding: .6rem;
    font-size: 1.4rem;
    background: #fff;
    outline: none;
    -webkit-appearance: none;
    border-radius: 5px;
  }

  .select-ui {
    position: relative;
  }

  .act-link {
    display: block;
    text-align: center;
    background: #fff;
    padding: .5rem;
    color: #25AD25;
    border-radius: 3px;
  }

  .act-link .iconfont {
    color: #25AD25;
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
</style>
