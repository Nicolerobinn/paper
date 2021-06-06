/*
 * @Author: your name
 * @Date: 2021-06-05 10:46:23
 * @LastEditTime: 2021-06-06 09:59:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paper\H5\src\utils\api.ts
 */
import { post, get } from './request'

interface User {
    password: string,
    userName: string
}

interface Searchlist {
    subjectid?: string | number;
    gradeld?: string | number;
    searchinput?: string;
    pageSize?: number;
    pageNum?: number;
}

export const login = (parmes: User) => post("/user/login", parmes);

export const register = (parmes: User) => post("/user/register", parmes);
export const getAllSubject = () => get("/paper/getAllSubject");
export const getPaperList = (parmes: Searchlist) => get('/paper/getPaperList', parmes);
export const preview = (parmes: { fileName: string }) => get(`/paper/preview/${parmes}`);
export const download = (parmes: { fileName: string }) => get(`/paper/download/${parmes}`);
export const upgradeUser = () => get('/user/upgradeUser');
