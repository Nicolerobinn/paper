/*
 * @Author: your name
 * @Date: 2021-06-05 10:46:23
 * @LastEditTime: 2021-06-05 11:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paper\H5\src\utils\api.ts
 */
import { post, get } from './request'

interface User {
  password: string,
  userName: string
}

export const login = (parmes: User) => post("/user/login", parmes);

export const register = (parmes: User) => post("/user/register", parmes);
export const getAllSubject = () => get("/paper/getAllSubject");