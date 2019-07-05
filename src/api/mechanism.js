import request from '@/utils/request'

// 创建机构接口
export function addMechan(data) {
  return request({
    url: '/admin_auth/create_org_v1',
    method: 'post',
    data
  })
}

// 删除机构信息接口
export function removeMechan(data) {
  return request({
    url: '/admin_auth/delete_org_v1',
    method: 'post',
    data
  })
}

// 修改机构信息接口
export function upMechan(data) {
  return request({
    url: '/admin_auth/update_org_v1',
    method: 'post',
    data
  })
}

// 批量删除机构接口
export function deleteAllmechan(data) {
  return request({
    url: '/comm/org/removes',
    method: 'post',
    data
  })
}

// 获取机构列表接口用于搜索和列表展示
export function getMechanlist(data) {
  return request({
    url: '/admin_auth/select_org_list_v1',
    method: 'post',
    data
  })
}

