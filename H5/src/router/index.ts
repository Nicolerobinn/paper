import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Subgrade",
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: () => import("../pages/Subgrade/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true
    },
    component: () => import("../pages/Login/index.vue"),
  },
  {
    path: "/doclist",
    name: "Doclist",
    meta: {
      title: "文档列表",
      keepAlive: true
    },
    component: () => import("../pages/Doclist/index.vue"),
  },
  {
    path: "/examlist",
    name: "Examlist",
    meta: {
      title: "列表",
      keepAlive: true
    },
    component: () => import("../pages/Examlist/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册",
      keepAlive: true
    },
    component: () => import("../pages/Register/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;