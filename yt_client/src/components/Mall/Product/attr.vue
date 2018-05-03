<template>
  <div class="wrap">
    <span class="spec f-table-cell">{{ attr.name }}</span>
    <div class="f-table-cell">
      <span class="m-check" v-for="value in attr.values">
        <input type="radio" value="1" name="check" :id="'a' + attr.id + 'v' + value.id">
        <label :for="'a' + attr.id + 'v' + value.id" @click="selectAttr(value.id, index)">
          {{ value.name }}
        </label>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {}
    },

    props: ['attr', 'index'],

    methods: {
      selectAttr: function (valueID, attrIndex) {
        this.$dispatch('selectedValue', valueID, attrIndex)
      }
    }
  }
</script>
