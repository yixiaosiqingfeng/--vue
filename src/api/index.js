import request from '@/utils/request'

// 汇总统计接口
export function allStatistics(data) {
  return request({
    url: 'amdin_auth/select_census_v1',
    method: 'post',
    data
  })
}
