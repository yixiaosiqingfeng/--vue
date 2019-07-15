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
// 置顶话题
export function placementApi(data) {
  return request({
    url: '/admin_auth/update_topic_to_top_v1',
    method: 'post',
    data
  })
}
// 标记热门话题
export function popularApi(data) {
  return request({
    url: '/admin_auth/update_topic_to_hot_v1',
    method: 'post',
    data
  })
}
// 查询我的帖子、收藏、评论、点赞
export function mine_select(data) {
  return request({
    url: '/admin_auth/select_my_operate_log_v1',
    method: 'post',
    data
  })
}

// 汇总统计查询
export function total_census_select(data) {
  return request({
    url: '/admin_auth/select_census_v1',
    method: 'post',
    data
  })
}

