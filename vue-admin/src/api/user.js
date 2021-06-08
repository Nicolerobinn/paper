import request from '@/utils/request'

export async function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: `/user/getUser/${accessToken}`,
    method: 'get',
  })
}
