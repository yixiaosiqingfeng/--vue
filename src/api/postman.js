import request from '@/utils/request'

// 获取帖子列表
export function getList(data) {
  return request({
    url: '/admin_auth/select_forum_v1',
    method: 'post',
    data
  })
}

// 新增帖子
export function addPost(data) {
  return request({
    url: '/admin_auth/create_forum_v1',
    method: 'post',
    data
  })
}

// 删除帖子
export function rmPost(data) {
  return request({
    url: '/admin_auth/remove_forum_v1',
    method: 'post',
    data
  })
}

// 修改帖子
export function changePost(data) {
  return request({
    url: '/admin_auth/update_forum_v1',
    method: 'post',
    data
  })
}

// 获取话题列表
export function addTopic(data) {
  return request({
    url: 'admin_auth/select_topic_v1',
    method: 'post',
    data
  })
}
