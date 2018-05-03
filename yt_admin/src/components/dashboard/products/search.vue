<template>
  <div class="col-md-4" v-if="open">
    <div class="box box-danger" style="position: absolute">
      <div class="box-header with-border">
        <form action="#" method="post">
          <div class="input-group">
            <input type="text" name="message" placeholder="搜索燕塘产品" class="form-control">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-danger btn-flat">搜索</button>
            </span>
          </div>
        </form>
      </div>
      <div class="box-body" v-if="!loadingData">
        <ul class="list-group">
          <li v-for="product in products" class="list-group-item">{{product.name}}
            <a href="" @click.prevent="select(product)">添加</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'productSearch',
    props: ['product', 'type'],
    data () {
      return {
        open: false,
        products: [],
        loadingData: true
      }
    },
    ready: function () {
      var self = this
      console.log(this.type)
      var query = this.type === 'mix' ? api.products.getMix() : api.products.getEntity()
      query.then(function ({data: products}) {
        self.products = products
        self.loadingData = false
      })
    },
    methods: {
      select (product) {
        this.$dispatch('selectProduct', product)
      }
    },
    events: {
      toggle () {
        this.open = !this.open
      }
    }
  }
</script>
