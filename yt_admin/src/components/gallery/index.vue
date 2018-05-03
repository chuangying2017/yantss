<template>
  <div class="upload-modal" v-if="open">
    <div class="modal-dialog">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#tab_1" data-toggle="tab">图库</a></li>
          <li><a href="#tab_2" data-toggle="tab">上传新图片</a></li>
          <li class="pull-right"><a href="#" class="text-muted" @click.prevent="close"><i class="fa fa-close"></i></a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <viewer :limit="2"></viewer>
          </div>
          <!-- /.tab-pane -->
          <div class="tab-pane" id="tab_2">
            <uploader :limit="2"></uploader>
          </div>
        </div>
        <!-- /.tab-content -->
      </div>
    </div>
  </div>
</template>
<script>
  import Viewer from './viewer.vue'
  import Uploader from './uploader.vue'
  export default {
    name: 'Gallery',
    props: ['limit', 'images', 'url'],
    components: [Viewer, Uploader],
    data: function () {
      return {
        open: false,
        cb: false
      }
    },
    methods: {
      toggle: function () {
        this.open = true
        if (!this.cb) {
          this.images = []
        }
      },
      close: function () {
        this.open = false
      }
    },
    events: {
      'confirm': function (images) {
        if (typeof this.url === 'string') {
          console.log('a')
          this.url = images[0]['url']
        } else if (this.cb) {
          console.log('b')
          this.cb(images)
        } else {
          console.log('c')
          this.images = images
        }
        this.close()
      },
      'openGallery': function (cb) {
        this.cb = typeof cb === 'function' ? cb : false
        this.toggle()
      }
    }
  }
</script>
<style>
  .modal-content {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .upload-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal-body {
    overflow-y: scroll;
  }

  .thumbnail-mask {
    cursor: pointer;
    position: relative;
  }

  .wx-list-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    background-image: url(http://weazm-cdn.qiniudn.com/selected30.png);
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
</style>
