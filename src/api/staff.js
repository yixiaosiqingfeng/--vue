import request from '@/utils/request'

// 创建员工
export function addStaff(data) {
  return request({
    url: '/admin_auth/create_emp_v1',
    method: 'post',
    data
  })
}

// 获取员工列表
export function getStaffList(data) {
  return request({
    url: '/admin_auth/select_emp_list_by_name_v1',
    method: 'post',
    data
  })
}

// 删除员工
export function removeStaff(data) {
  return request({
    url: '/admin_auth/delete_emp_v1',
    method: 'post',
    data
  })
}

// 修改员工信息
export function upStaff(data) {
  return request({
    url: '/admin_auth/update_emp_v1',
    method: 'post',
    data
  })
}

// 获取机构列表
export function addorg(data) {
  return request({
    url: '/admin_auth/select_org_list_v1',
    method: 'post',
    data
  })
}

// 获取角色列表
export function addrole(data) {
  return request({
    url: '/admin_auth/select_role_v1',
    method: 'post',
    data
  })
}

// 查询用户拥有角色
export function queryacc(data) {
  return request({
    url: '/admin_auth/select_role_by_account_v1',
    method: 'post',
    data
  })
}

// 重置密码
export function resPassword(data) {
  return request({
    url: '/admin_auth/reset_password_v1',
    method: 'post',
    data
  })
}

// 删除多个员工
export function rmStaffs(data) {
  return request({
    url: '/admin_auth/delete_more_emp_v1',
    method: 'post',
    data
  })
}

// 更改账号状态
export function changeStatus(data) {
  return request({
    url: '/admin_auth/change_status_v1',
    method: 'post',
    data
  })
}
