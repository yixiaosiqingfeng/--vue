import request from '@/utils/request'

// 功能列表相关接口模块
// 新增功能
export function createFunc(data) {
  return request({
    url: '/admin_auth/create_menu_func_v1',
    method: 'post',
    data
  })
}
// 修改功能
export function updateFunc(data) {
  return request({
    url: '/admin_auth/update_menu_func_v1',
    method: 'post',
    data
  })
}
// 删除功能
export function removeFunc(data) {
  return request({
    url: '/admin_auth/remove_menu_func_v1',
    method: 'post',
    data
  })
}
// 查询功能
export function selectFunc(data) {
  return request({
    url: '/admin_auth/select_menu_func_v1',
    method: 'post',
    data
  })
}
// 批量删除功能
export function deleteAllFun(data) {
  return request({
    url: '/admin_auth/removes_menu_func_v1',
    method: 'post',
    data
  })
}
