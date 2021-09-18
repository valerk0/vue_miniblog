import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage';
import PostPageWithStore from '@/pages/PostPageWithStore';
import PostPageComposition from '@/pages/PostPageComposition';
import PostIdPage from '@/pages/PostIdPage';
import About from '@/pages/About';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/store',
    component: PostPageWithStore
  },
  {
    path: '/composition',
    component: PostPageComposition
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/about',
    component: About
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;
