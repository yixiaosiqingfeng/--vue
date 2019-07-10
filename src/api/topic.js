import request from '@/utils/request'

// 查询
export function topic_select(data) {
  return request({
    url: 'admin_auth/select_topic_v1',
    method: 'post',
    data
  })
}

// 新建
export function topic_add(data) {
  return request({
    url: 'admin_auth/add_topic_v1',
    method: 'post',
    data
  })
}

// 删除
export function topic_delete(data) {
  return request({
    url: 'admin_auth/delete_topic_v1',
    method: 'post',
    data
  })
}

// 修改
export function topic_updata(data) {
  return request({
    url: 'admin_auth/update_topic_v1',
    method: 'post',
    data
  })
}
