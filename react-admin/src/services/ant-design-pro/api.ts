                                                                                                                                                                                                                                                                                                                  /*
 * @Author: your name
 * @Date: 2021-06-05 12:50:02
 * @LastEditTime: 2021-06-06 11:28:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \paper\admin\src\services\ant-design-pro\api.ts
 */
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /api/login/account */
export async function login(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/paper/getPaperList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/paper/updatePaper', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 删除试卷 GET /api/delete */
export async function deletePaper(options?: string) {
  return request<API.CurrentUser>(`/paper/delete/${options}`, {
    method: 'DELETE',
  });
}



/** 新建试卷 POST /api/notices */
export async function addPaper(body:any,options?: { [key: string]: any }) {
  return request<any>('/paper/uploadWord', {
    method: 'POST',
    data:body,
    headers: {
      // 'Content-Type': 'application/json;charset=UTF-8',
    },
    ...(options || {}),
  });
}

/** 获取所有科目 GET /api/notices */
export async function getAllSubject() {
  return request<API.NoticeIconList>('/paper/getAllSubject', {
    method: 'GET'
  });
}

/** 修改试卷 PUT /api/rule */
export async function updateRule(body:any,options?: { [key: string]: any }) {

  return request<any>('/paper/updatePaper', {
    method: 'PUT',
    data:body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}


