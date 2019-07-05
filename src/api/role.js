import request from '@/utils/request'
// 获取角色列表接口
export function getRole(data) {
  return request({
    url: '/admin_auth/select_role_v1',
    method: 'post',
    data
  })
}
// 新增角色列表接口
export function addRole(data) {
  return request({
    url: '/admin_auth/create_role_v1',
    method: 'post',
    data
  })
}
// 修改角色信息接口
export function updateRole(data) {
  return request({
    url: '/admin_auth/update_role_v1',
    method: 'post',
    data
  })
}
// 删除角色接口
export function deleteRole(data) {
  return request({
    url: '/admin_auth/delete_role_v1',
    method: 'post',
    data
  })
}
// 菜单授权接口
export function rolePrivilege(data) {
  return request({
    url: '/comm/role_privilege/create',
    method: 'post',
    data
  })
}

// 用户授权接口
export function userRole(data) {
  return request({
    url: '/comm/user_role/create',
    method: 'post',
    data
  })
}

// 查询角色已有菜单
export function getPrivilege(data) {
  return request({
    url: '/admin_auth/select_menu_by_role_v1',
    method: 'post',
    data
  })
}

// 查询角色未拥有菜单
export function getnotPrivilege(data) {
  return request({
    url: '/admin_auth/select_menu_by_role_not_v1',
    method: 'post',
    data
  })
}

// 为角色配置菜单
export function roleMenu(data) {
  return request({
    url: '/admin_auth/create_role_menu_privilege_v1',
    method: 'post',
    data
  })
}

// 查询角色功能关联
export function selectMenu(data) {
  return request({
    url: '/admin_auth/select_func_by_role_v1',
    method: 'post',
    data
  })
}
// 为角色配功能
export function menuFunc(data) {
  return request({
    url: '/admin_auth/create_role_menu_func_privilege_v1',
    method: 'post',
    data
  })
}
