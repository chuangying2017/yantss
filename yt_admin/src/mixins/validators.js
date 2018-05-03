/* eslint-disable*/
export default {
  validators: {
    numeric: function (val) {
      return /^[-+]?[0-9]+$/.test(val)
    },
    url: function (val) {
      return /^(http\:\/\/|https\:\/\/)(.{4,})$/.test(val)
    },
    phone: {
      message: '请输入正确的手机号码!',
      check: function (val) {
        return /^1[3|4|5|7|8]\d{9}$/.test(val)
      }
    }
  }
}
