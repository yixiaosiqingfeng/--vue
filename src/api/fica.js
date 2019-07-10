import request from '@/utils/request'

// 新增话题分类接口
export function addCategory(data) {
  return request({
    url: 'admin_public/add_topic_category_v1',
    method: 'post',
    data
  })
}

// 删除话题分类接口
export function delCategory(data) {
  return request({
    url: 'admin_auth/delete_topic_category_by_id_v1',
    method: 'post',
    data
  })
}
// 修改话题分类接口
export function updateCategory(data) {
  return request({
    url: 'admin_auth/update_topic_category_by_id_v1',
    method: 'post',
    data
  })
}
// 查询话题分类
export function categoryList(data) {
  return request({
    url: '/admin_auth/select_topic_category_v1',
    method: 'post',
    data
  })
}

