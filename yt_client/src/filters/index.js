import _ from 'underscore'

export function strictFilter (arr, keyword) {
  if (keyword === '') return arr
  return _.filter(arr, function (obj) {
    return obj.pay_status === keyword
  })
}

export function productFilter (arr, keyword) {
  if (keyword === '') return arr
  return _.filter(arr, function (obj) {
    return obj.cat.id === keyword
  })
}
