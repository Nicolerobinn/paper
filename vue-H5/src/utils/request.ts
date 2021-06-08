/*
 * @Author: your name
 * @Date: 2021-06-05 10:46:23
 * @LastEditTime: 2021-06-06 11:11:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paper\H5\src\utils\request.ts
 */
import axios from "axios";
export const baseURL = "http://v6izk0zf0y.bjhttp.cn";
import store from '../store'
const service = axios.create({
    baseURL,
    timeout: 5000 // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
    config => {
        // 如果有token 就携带tokon
        const token = store.state.token
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;

        if (response.status !== 200) {
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res;
        }
    },
    error => {
        return Promise.reject(error);
    }
);
//get请求
export function get(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        service
            .get(url, {
                params: params,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
//post请求
export function post(url: string, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data).then(
            (response) => {
                resolve(response);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export default service;