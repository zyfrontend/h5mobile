import { createRouter, createWebHashHistory } from 'vue-router';
import { getPageTitle } from '~/utils';
import { router as routerData } from '~/config/routerConfig';
const routes = [
  {
    path: '/',
    redirect: '/home'
  }
];
routerData.map((item) => {
  routes.push({
    path: item.path,
    component: () => import(item.url),
    meta: {
      title: item.name
    }
  });
});

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = getPageTitle(to.meta.title);
  }
  next();
});

router.afterEach(() => {
  setTimeout(() => {}, 0);
});

export default router;
