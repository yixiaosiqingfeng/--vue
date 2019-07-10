import request from '@/utils/request'

export function topic(data) {
  return request({
    url: '/admin_auth/select_topic_category_v1',
    method: 'post',
    data
  })
}
