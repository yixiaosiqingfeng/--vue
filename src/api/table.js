import request from '@/utils/request'

export function getTable(data, url) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
