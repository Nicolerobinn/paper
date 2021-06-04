/*
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:32:56
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 11:46:39
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Subgrade",
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: () => import("../pages/Subgrade.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true
    },
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/examlist",
    name: "Examlist",
    meta: {
      title: "列表",
      keepAlive: true
    },
    component: () => import("../pages/Examlist.vue"),
  },
  {
    path: "/reguster",
    name: "Reguster",
    meta: {
      title: "注册",
      keepAlive: true
    },
    component: () => import("../pages/Reguster.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;