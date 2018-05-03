export default {

  checkLocator(){
    let result = window.location.href.replace(location.search, '').match(/(http:\/\/yt\.l43\.cn\/)(\??#!\/)(.*)/)
    if(result === null) return true

    result.shift()

    if(result[1].indexOf('?') < 0){
      result[1] = '?' + result[1]
      let location = ''
      result.map(item => location += item)
      return location
    } else {
      return true
    }
  },

  after(fn, afterFn){
    return function(){
      let res = fn.apply(this, arguments)
      if(res === 'next'){
        return afterFn.apply(this, arguments)
      }
    }
  },

  getPreviousTime(currentTimeStr){
    let previousTime = new Date(new Date(currentTimeStr).getTime() - 8.64e7),
        preYear = previousTime.getFullYear(),
        preMonth = previousTime.getMonth() + 1,
        preDate = previousTime.getDate()

    return `${preYear}-${preMonth}-${preDate}`
  },

  ObjectAssignPolyfill(){
    if (typeof Object.assign != 'function') {
      Object.assign = function(target) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }
  }

}
