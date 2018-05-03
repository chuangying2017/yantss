<template>
  <div class="modal-content">
    <div class="modal-body" style="height: 300px;">
      <div v-if="!loadingData">
        <div class="col-xs-6 col-md-3" v-for="image in images">
          <div href="#" class="thumbnail-mask" @click="select($index, image)">
            <span class="wx-list-cover" v-show="isSelect(image)"></span>
            <img class="thumbnail" :src="image.url" style="width: 100%"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div>
        <button @click.prevent="confirm" type="button" class="btn btn-primary btn-sm"
                :disabled="selected.length <= 0">
          <i class="icon-check-circle"></i> 确定
        </button>
      </div>
    </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'Viewer',
    props: ['limit'],
    data: function () {
      return {
        loadingData: true,
        selected: [],
        images: [],
        token: '',
        pagination: {}
      }
    },
    ready () {
      var self = this
      api.images.getAll().then(function ({data: images, meta: {pagination}}) {
        self.images = images
        self.pagination = pagination
        self.loadingData = false
      })
    },
    methods: {
      isSelect: function (image) {
        return this.selected.indexOf(image) > -1
      },
      select: function (index, image) {
        // 没有选中
        if (this.selected.indexOf(image) > -1) {
          this.selected.$remove(image)
          this.images[index]['selected'] = false
        } else {
          // 已经选中
          if (this.selected.length >= this.limit) {
            window.alert('最多只能选' + this.limit + '张!')
            return false
          }
          this.selected.push(image)
          this.images[index]['selected'] = true
        }
      },
      confirm: function () {
        this.$dispatch('confirm', this.selected)
        this.reset()
      },
      reset: function () {
        this.selected = []
      }
    }
  }
</script>
