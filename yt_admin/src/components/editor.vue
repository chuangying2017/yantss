<script>
  module.exports = {
    name: 'Editor',
    replace: true,
    inherit: false,
    template: '<textarea class="form-control" :name="name"></textarea>',
    props: {
      model: {
        required: true,
        twoWay: true
      },
      language: {
        type: String,
        required: false,
        default: 'en-US'
      },
      height: {
        type: Number,
        required: false,
        default: 160
      },
      minHeight: {
        type: Number,
        required: false,
        default: 160
      },
      maxHeight: {
        type: Number,
        required: false,
        default: 800
      },
      name: {
        type: String,
        required: false,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default: function () {
          return [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['color', ['color']],
            ['insert', ['link', 'gallery', 'hr']]
          ]
        }
      }
    },
    beforeCompile: function () {
      this.isChanging = false
      this.control = null
    },
    ready: function () {
      //  initialize the summernote
      if (this.minHeight > this.height) {
        this.minHeight = this.height
      }
      if (this.maxHeight < this.height) {
        this.maxHeight = this.height
      }
      var me = this
      this.control = window.jQuery(this.$el)
      this.control.summernote({
        lang: this.language,
        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        toolbar: this.toolbar,
        buttons: {
          gallery: function (context) {
            var ui = window.jQuery.summernote.ui
            // create button
            var button = ui.button({
              contents: '<i class="fa fa-image"/>',
              tooltip: 'hello',
              click: function () {
                // invoke insertText method with 'hello' on editor module.
                me.$parent.openGallery(function (images) {
                  console.log(images)
                  for (var i = 0; i < images.length; i++) {
                    context.invoke('editor.insertImage', images[i]['url'])
                  }
                })
              }
            })
            return button.render()   // return button as jquery object
          }
        },
        callbacks: {
          onInit: function () {
            me.control.summernote('code', me.model)
          }
        }
      }).on('summernote.change', function () {
        // Note that we do not use the 'onChange' options of the summernote
        // constructor. Instead, we use a event handler of 'summernote.change'
        // event because that I don't know how to trigger the 'onChange' event
        // handler after changing the code of summernote via '.summernote('code')' function.
        if (!me.isChanging) {
          me.isChanging = true
          var code = me.control.summernote('code')
          me.model = (code === null || code.length === 0 ? null : code)
          me.$nextTick(function () {
            me.isChanging = false
          })
        }
      })
    },
    watch: {
      'model': function (val, oldVal) {
        if (!this.isChanging) {
          this.isChanging = true
          var code = (val === null ? '' : val)
          this.control.summernote('code', code)
          this.isChanging = false
        }
      }
    }
  }
</script>
