<template>
  <div class="address-box">
    <div class="box-wrap">
      <div class="box-content">
        <h3 class="title">您的订奶区域是<span class="close"><i class="iconfont closeBox"
                                                        @click.prevent="cancel">&#xe634;</i></span>
        </h3>
        <ul>
          <li class="adr">
            <input type="radio" name="selectedAdr" id="a" value="a" v-model="from"
                   class="adr">
            <label for="a">
              <div class="pure-g">
                <!--<div class="pure-u-1-5">-->
                <!--<div class="check">-->
                <!--<div class="check-wrap">-->
                <!--<i class="iconfont uncheck">&#xe61a;</i>-->
                <!--<i class="iconfont checked">&#xe648;</i>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="pure-u-1-1">
                  <div class="detail">
                    A区
                  </div>
                </div>
              </div>
            </label>
          </li>
          <li class="adr">
            <input type="radio" name="selectedAdr" id="b" value="b" v-model="from"
                   class="adr">
            <label for="b">
              <div class="pure-g">
                <!--<div class="pure-u-1-5">-->
                <!--<div class="check">-->
                <!--<div class="check-wrap">-->
                <!--<i class="iconfont uncheck">&#xe61a;</i>-->
                <!--<i class="iconfont checked">&#xe648;</i>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="pure-u-1-1">
                  <div class="detail">
                    B区
                  </div>
                </div>
              </div>
            </label>
          </li>
          <li class="adr">
            <input type="radio" name="selectedAdr" id="c" value="c" v-model="from"
                   class="adr">
            <label for="c">
              <div class="pure-g">
                <!--<div class="pure-u-1-5">-->
                <!--<div class="check">-->
                <!--<div class="check-wrap">-->
                <!--<i class="iconfont uncheck">&#xe61a;</i>-->
                <!--<i class="iconfont checked">&#xe648;</i>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="pure-u-1-1">
                  <div class="detail">
                    C区
                  </div>
                </div>
              </div>
            </label>
          </li>
        </ul>
        <button @click.prevent="submit" class="u-nav-btn u-btn-primary" :disabled="!from">确认选择</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Trackr',
    props: ['order', 'openid'],
    data: function () {
      return {
        from: undefined
      }
    },
    methods: {
      submit: function () {
        var self = this
        if (!this.from) {
          window.alert('请选择')
          return
        }
        this.order.from = this.from
        this.order.action = 'submit'
        window.mixpanel.track('渠道跟踪', this.order)
        self.$dispatch('tracked')
      },
      cancel: function () {
        var self = this
        this.order.from = '不选择'
        this.order.action = 'cancel'
        window.mixpanel.track('渠道跟踪', this.order)
        self.$dispatch('tracked')
      }
    }
  }
</script>

<style scoped>
  .adr {
    width: 33.333%;
    float: left;
    margin-top: 2rem;
    padding: 0 .5rem;
  }

  .address-box {
    width: 100%;
    height: 100%;
    display: table;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .address-box .box-content {
    overflow: hidden;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    border-radius: .3rem;
  }

  .address-box .box-content .title {
    padding: 1rem;
    background: #fff;
    font-size: 1.4rem;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  .address-box .box-content .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .box-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  .box-content {
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .box-content ul {
    background: #fff;
    padding: 1rem;
    max-height: 30rem;
    min-height: 16rem;
    overflow-y: scroll;
  }

  .box-content .adr label {
    float: none;
    margin-bottom: .5rem;
  }

  input[type=radio] {
    display: none;
  }

  input[type=radio].adr + label {
    display: inline-block;
    width: 100%;
    float: left;
  }

  input[type=radio].adr + label .check {
    display: table;
    width: 100%;
    height: 4.5rem;
    text-align: center;
  }

  input[type=radio].adr + label .check-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  input[type=radio].adr + label .detail {
    padding: 3rem 1rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    font-size: 1.8rem;
    color: #717171;
    background: #fff;
  }

  .radio-content {
    padding: 0 .5rem;
  }

  input[type=radio].normal:checked + label {
    background: #C71A40;
    border: 1px solid #ddd;
    color: #fff;
  }

  input[type=radio].adr:checked + label .detail {
    border: 1px solid #C71A40;
    color: #C71A40;
  }

  input[type=radio]:checked.adr + label .check {
    color: #C71A40;
  }

  input[type=radio].adr + label .check {
    color: #717171;
  }

  input[type=radio].adr + label .check .uncheck,
  input[type=radio]:checked.adr + label .check .checked {
    display: inline-block;
  }

  input[type=radio].adr + label .check .checked,
  input[type=radio]:checked.adr + label .check .uncheck {
    display: none;
  }

  .u-nav-btn.u-btn-primary {
    border: 0 none;
  }

  .u-nav-btn.u-btn-primary:disabled {
    background: #8c8c8c;
  }
</style>
