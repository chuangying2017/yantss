import * as types from './types'
export const loginSuccess = ({dispatch}, token) => {
  dispatch(types.LOGIN_SUCCESS, {token: token})
}
export const userinfoSuccess = ({dispatch}, user) => {
  dispatch(types.USERINFO_SUCCESS, {user: user})
}
export const logoutUser = ({dispatch}) => {
  dispatch(types.LOGOUT_USER)
}
export const loadCategories = ({dispatch}, categories) => {
  dispatch(types.LOAD_CATEGORIES, {data: categories})
}
