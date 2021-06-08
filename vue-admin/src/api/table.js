import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/paper/getPaperList',
    method: 'get',
    params,
  })
}
export function doEdit(data) {
  return request({
    url: '/paper/updatePaper',
    method: 'put',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: `/paper/delete/${data}`,
    method: 'delete',
  })
}
export function uploadWord(data) {
  return request({
    url: '/paper/uploadWord',
    method: 'post',
    data,
  })
}
export function getAllSubject() {
  return request({
    url: '/paper/getAllSubject',
    method: 'get',
  })
}
