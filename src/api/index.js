import request from '@/utils/request'

// 汇总统计接口
export function allStatistics(data) {
  return request({
    url: 'admin_auth/select_census_v1',
    method: 'post',
    data
  })
}

// 分时统计接口
export function timeSharingStatistics(data) {
  return request({
    url: 'admin_auth/select_time_census_v1',
    method: 'post',
    data
  })
}

// 查询今日热门排行
export function todayPopular(data) {
  return request({
    url: '/community_auth/select_forum_top10_v1',
    method: 'post',
    data
  })
}

// 获取热门话题
export function hotTopic(data) {
  return request({
    url: 'admin_auth/select_hot_topic_v1',
    method: 'post',
    data
  })
}
