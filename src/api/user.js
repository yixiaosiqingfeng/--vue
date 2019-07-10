import request from '@/utils/request'

export function login(data) {
  // const data=obj;
  return request({
    url: '/admin_public/login_v1',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin_auth/getAccountInfoV1',
    // url: '/comm/{domain}/create',
    method: 'post',
    data: { code: 2004 }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
