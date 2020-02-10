import Dashboard from '@features/articles/containers/dashboard';
import Article from '@features/articles/containers/article';

export const DASHBOARD_PATH = '/';
export const ARTICLE_PATH = '/articles/';

export default [
  {
    path: DASHBOARD_PATH,
    exact: true,
    component: Dashboard,
  },
  {
    path: ARTICLE_PATH,
    component: Article,
  },
  {
    path: '*',
    component: Dashboard,
  },
];
