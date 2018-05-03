<template>
  <div class="modal-content">
    <div class="modal-body" style="height: 300px;">
      <div class="col-xs-6 col-md-3" v-for="item in queues">
        <div href="#" class="thumbnail-mask">
          <img class="thumbnail" :src="item.src"/>
          <span class="wx-list-cover" v-show="status === 'success'"></span>
          <span v-if="status === 'uploading'" class="progress">{{item.percentage}}%</span>
              <span v-if="status === 'queue'" @click.prevent="removeQueue($index)" class="cover-delete"><span
                class="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div v-if="status === 'idle'">
        <label for="fileUpload" class="btn btn-default btn-sm">选择要上传的文件</label>
        <input type="file" multiple v-on:change="fileChange" style="opacity: 0; width:0.1px;height: 0.1px;"
               id="fileUpload">
      </div>
      <div v-if="status === 'queue'">
        <button @click.prevent="startUpload" type="button" class="btn btn-success btn-sm">
          <i class="icon-cloud-upload"></i> 开始上传
        </button>
      </div>
      <div v-if="status === 'success'">
        <button @click.prevent="confirm" type="button" class="btn btn-primary btn-sm">
          <i class="icon-check-circle"></i> 确定
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import {QINIU_URL} from 'src/config.js'
  var WebUploader = window.WebUploader
  export default {
    name: 'Uploader',
    props: ['data', 'limit', 'id'],
    data: function () {
      return {
        prefix: QINIU_URL,
        qiniu_token: null,
        status: 'idle',
        files: [],
        images: [],
        uploader: {},
        queues: [],
        selected: [],
        pagination: {},
        galleryOpen: false
      }
    },
    created: function () {
      var self = this
      api.images.getToken().then(function (token) {
        self.qiniu_token = token
        self.init()
      })
    },
    methods: {
      init: function () {
        var self = this
        this.uploader = WebUploader.create({
          formData: {
            token: self.qiniu_token
          },
          compress: false,
          // 文件接收服务端。
          server: 'http://upload.qiniu.com/',
          // 选择文件的按钮。可选。
          // 内部根据当前运行是创建，可能是input元素，也可能是flash.
//                pick: '#wx-picker',
          accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
          },
          resize: false
        })
        this.uploader.on('fileQueued', function (file) {
          self.uploader.makeThumb(file, function (error, src) {
            if (error) console.error(error)
            var item = {
              id: file.id,
              file: file,
              src: src,
              percentage: 0
            }
            self.files.push(item)
            self.queues.push(item)
            self.status = 'queue'
          }, 100, 100)
        })
        this.uploader.on('uploadProgress', function (file, percentage) {
          self.status = 'uploading'
          self.files.keys(function (val, key) {
            if (val.id === file.id) {
              self.files[key]['percentage'] = (percentage * 100).toFixed(0)
            }
          })
        })
        this.uploader.on('uploadError', function (file) {
        })
        this.uploader.on('uploadSuccess', function (file, res) {
          console.log(res, file)
          self.selected.push({
            media_id: res.name,
            url: self.prefix + res.name
          })
          if (self.selected.length === self.queues.length) {
            self.status = 'success'
            window.alert('上传完成!')
          }
        })
      },
      fileChange: function (e) {
        if (!this.limit) this.limit = 1
        var len = e.target.files.length
        if (len > this.limit) {
          window.alert('只能选择' + this.limit + '张图片')
          return
        } else {
          this.uploader.addFiles(e.target.files)
        }
      },
      reset: function () {
        this.uploader.stop()
        this.uploader.reset()
        this.selected = []
        this.files = []
        this.queues = []
        this.status = 'idle'
      },
      removeQueue: function (index) {
        this.queues.splice(index, 1)
        if (this.queues.length < 1) {
          this.$set('status', 'idle')
        }
      },
      startUpload: function () {
        this.status = 'uploading'
        this.uploader.upload()
      },
      stopUpload: function () {
        this.status = 'stop'
        this.uploader.stop(true)
      },
      resetUpload: function () {
        this.uploader.reset()
      },
      confirm: function () {
        this.$dispatch('confirm', this.selected)
        this.reset()
      }
    }
  }
</script>
