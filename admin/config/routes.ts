export default [
  {
    path: '/login',
    layout: false,
    name: '登录', component: './Login'
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/list' },
  { component: './404' },
];
