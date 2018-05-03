import * as types from './types'
export const loginSuccess = ({dispatch}, token) => {
  dispatch(types.LOGIN_SUCCESS, {token: token})
}
export const userinfoSuccess = ({dispatch}, user) => {
  window.mixpanel.identify(user.providers.weixin.openid)
  window.mixpanel.people.set({
    '$name': user.nickname,
    'avatar': user.avatar,
    'birthday': user.birthday,
    'sex': user.sex,
    '$created': user.created_at.date
  })
  dispatch(types.USERINFO_SUCCESS, {user: user})
}
export const logoutUser = ({dispatch}) => {
  dispatch(types.LOGOUT_USER)
}
export const newCart = ({dispatch}, skus) => {
  dispatch(types.NEW_CART, {skus: skus})
}
export const cleCart = ({dispatch}) => {
  dispatch(types.CLE_CART)
}
export const addCart = ({dispatch}, sku) => {
  dispatch(types.ADD_CART, {sku: sku})
}
export const delCart = ({dispatch}, sku) => {
  dispatch(types.DEL_CART, {sku: sku})
}
