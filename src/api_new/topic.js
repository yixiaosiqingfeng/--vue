import request from '@/utils/requ_new'

export function initiatorApi(data) {
  // const data=obj;
  return request({
    url: '/community_auth/select_user_info_by_account_v1',
    method: 'post',
    data
  })
}
