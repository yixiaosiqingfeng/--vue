// 更换最新接口
import request from '@/utils/request'
// 获取所有菜单接口
export function getAllPrivilege(data) {
  return request({
    url: '/admin_auth/select_menu_v1',
    method: 'post',
    data
  })
}
// 获取新增菜单接口
export function createMenu(data) {
  return request({
    url: '/admin_auth/create_menu_v1',
    method: 'post',
    data
  })
}
// 获取编辑菜单接口
export function updateMenu(data) {
  return request({
    url: '/admin_auth/update_menu_v1',
    method: 'post',
    data
  })
}
// 删除菜单
export function deleteMenu(data) {
  return request({
    url: '/admin_auth/remove_menu_v1',
    method: 'post',
    data
  })
}

