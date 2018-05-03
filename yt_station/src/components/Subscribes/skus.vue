<template>
  <div class="pd10">
    <div class="m-list">
      <div class="clearfix time">
        <span class="fl name">配送时间</span>
        <div class="fr btn-groups">
          <button type="button" :class="['btn','btn-small','fl',current.daytime == 0 ? 'btn-success' : '']"
                  @click.prevent="current.daytime = !current.daytime">上午
          </button>
          <button type="button" :class="['btn','btn-small','fl',current.daytime == 1 ? 'btn-success' : '']"
                  @click.prevent="current.daytime = !current.daytime">下午
          </button>
        </div>
      </div>
      <ul class="clearfix">
        <li class="item" v-for="product in current.skus">
          <div class="cover">
            <img :src="product.cover_image" alt="">
          </div>
          <div class="content content1">
            {{product.name}}
          </div>
          <sku-counter :qty.sync="product.quantity"></sku-counter>
          <!-- <div class="add">
            <span class="left" @click.prevent="product.count--">-</span>
            <span class="middle">{{ product.count }}</span>
            <span class="right" @click.prevent="product.count++">+</span>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SkuCounter from './skuCounter.vue'

  export default {
    name: 'Skus',

    props: ['current'],

    components: {
      SkuCounter
    }
  }
</script>

<style>
  .btn-groups .btn:first-child {
    margin-right: 1rem;
  }
</style>
