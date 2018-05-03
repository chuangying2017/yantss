<template>
  <div id="editor" style="height:600px;"></div>
</template>
<script>
  export default {
    name: 'Editor',
    props: ['content', 'auto'],
    data () {
      return {
        editor: {}
      }
    },
    ready: function () {
      if (this.auto === undefined) {
        this.init()
      }
    },
    events: {
      'init' () {
        this.init()
      }
    },
    methods: {
      init () {
        var self = this
        this.editor = window.UE.getEditor('editor', {})
        this.editor.ready(function () {
          // 绑定图库事件
          window.UE.commands['gallery'] = {
            execCommand: function () {
              self.$parent.openGallery(function (images) {
                for (var i = 0; i < images.length; i++) {
                  self.editor.execCommand('insertimage', {
                    src: images[i]['src'],
                    width: '100%'
                  })
                }
              })
            }
          }
          // 设定默认内容
          self.editor.setContent(self.$get('content'))
          // 添加事件绑定
          self.editor.addListener('contentchange', function () {
            console.log('content changed')
            self.$set('content', self.editor.getContent())
          })
        })
      }
    }
  }
</script>
