import request from '@/utils/request'

// 汇总统计接口
export function allStatistics(data) {
  return request({
    url: 'admin_auth/select_census_v1',
    method: 'post',
    data
  })
}

// 今日热门接口
export function todayPopular(data) {
  return request({
    url: '/community_auth/select_forum_top10_v1',
    method: 'post',
    data
  })
}
