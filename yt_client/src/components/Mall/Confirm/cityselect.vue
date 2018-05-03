<template>
  <div class="pure-g">
    <div class="pure-u-1-3">
      <select class="u-select pvSelect" v-model="address.province" v-on:change="selectChange">
        <option selected="true" disabled="true">省</option>
        <option :value="pv.p" v-for="pv in citylist">
          {{pv.p}}
        </option>
      </select>
    </div>
    <div class="pure-u-1-3">
      <select class="u-select ctSelect" v-model="address.city" v-on:change="selectChange">
        <option selected="true" disabled="true">市</option>
        <option :value="ct.n" v-for="ct in provinceData.c">
          {{ct.n}}
        </option>
      </select>
    </div>
    <div class="pure-u-1-3">
      <select class="u-select dtSelect" v-model="address.district" v-on:change="selectChange">
        <option selected="true" disabled="true">区</option>
        <option :value="dt.s" v-for="dt in cityData.a">
          {{dt.s}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  import {data} from './../../../assets/js/city.js'
  import _ from 'underscore'

  export default {

    name: 'CitySelect',

    data: function () {
      return {
        citylist: data.citylist,
        address: {
          province: '',
          city: '',
          district: ''
        }
      }
    },

    computed: {
      provinceData: function () {
        var _self = this
        var data = _.filter(_self.citylist, function (obj) {
          return obj.p === _self.address.province
        })
        return data[0]
      },
      cityData: function () {
        var _self = this
        var data = _.filter(_self.provinceData.c, function (obj) {
          return obj.n === _self.address.city
        })
        return data[0]
      }
    },

    methods: {
      selectChange: function (e) {
        switch (e.target.className) {
          case 'form-control pvSelect':
            this.address.city = ''
            this.address.district = ''
            break
          case 'form-control ctSelect':
            this.address.district = ''
        }
        this.$dispatch('city-change', this.address)
        console.log(this.address)
      }
    }
  }
</script>

<style scoped>
  #yt-mall select {
    color: #000;
    background: #fff;
    border: 1px solid #ddd;
    height: 30px;
  }
</style>
