import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/paper/getPaperListt',
    method: 'get',
    params,
  })
}
export function doEdit() {
  return request({
    url: '/paper/updatePaper',
    method: 'PUT',
  })
}

export function doDelete(data) {
  return request({
    url: `/paper/delete/${data}`,
    method: 'DELETE',
  })
}
export function uploadWord(data) {
  return request({
    url: '/paper/uploadWord',
    method: 'POST',
    data,
  })
}
export function getAllSubject() {
  return request({
    url: '/paper/getAllSubject',
    method: 'GET',
  })
}
