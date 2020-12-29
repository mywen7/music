import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: {
        name: 'discovery',
      },
    },
    {
      path: '',
      name: 'layout',
      component: () => import(/* webpackChunkName: "layout" */'../layout/index.vue'),
      children: [
        {
          path: '/discovery',
          name: 'discovery',
          component: () => import(/* webpackChunkName: "discovery" */'../views/discovery/index.vue'),
          meta: {
            title: '发现音乐',
            icon: 'music',
          },
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: () => import(/* webpackChunkName: "playlists" */'../views/playlists/index.vue'),
          meta: {
            title: '推荐歌单',
            icon: 'palylist-menu',
          },
        },
        {
          path: '/songs',
          name: 'songs',
          component: () => import(/* webpackChunkName: "songs" */'../views/songs/index.vue'),
          meta: {
            title: '最新音乐',
            icon: 'yinyue',
          },
        },
        {
          path: '/mvs',
          name: 'mvs',
          component: () => import(/* webpackChunkName: "mvs" */'../views/mvs/index.vue'),
          meta: {
            title: '最新mv',
            icon: 'mvs',
          },
        },
        {
          path: '/search/:name/:type',
          name: 'search',
          component: () => import(/* webpackChunkName: "search" */'../views/search/index.vue'),
          meta: {
            title: '搜索',
          }
        },
      ],
    },
  ],
});

export default router;
