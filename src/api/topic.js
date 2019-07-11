import request from '@/utils/request'

// 查询话题
export function topic_select(data) {
  return request({
    url: 'admin_auth/select_topic_v1',
    method: 'post',
    data
  })
}

// 新建话题
export function topic_add(data) {
  return request({
    url: 'admin_auth/add_topic_v1',
    method: 'post',
    data
  })
}

// 删除话题
export function topic_delete(data) {
  return request({
    url: 'admin_auth/delete_topic_v1',
    method: 'post',
    data
  })
}

// 修改话题
export function topic_update(data) {
  return request({
    url: 'admin_auth/update_topic_v1',
    method: 'post',
    data
  })
}

// 查询分类
export function classify_select(data) {
  return request({
    url: '/admin_auth/select_topic_category_v1',
    method: 'post',
    data
  })
}
