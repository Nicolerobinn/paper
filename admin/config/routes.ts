/*
 * @Desc:
 * @Autor: cxt
 * @Date: 2021-06-03 16:47:19
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-03 17:05:02
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/list',
  },
  {
    component: './404',
  },
];
