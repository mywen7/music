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
            sidebar: true,
          },
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: () => import(/* webpackChunkName: "playlists" */'../views/playlists/index.vue'),
          meta: {
            title: '推荐歌单',
            icon: 'playlist-menu',
            sidebar: true,
          },
        },
        {
          path: '/songs',
          name: 'songs',
          component: () => import(/* webpackChunkName: "songs" */'../views/songs/index.vue'),
          meta: {
            title: '最新音乐',
            icon: 'yinyue',
            sidebar: true,
          },
        },
        {
          path: '/mvs',
          name: 'mvs',
          component: () => import(/* webpackChunkName: "mvs" */'../views/mvs/index.vue'),
          meta: {
            title: '最新mv',
            icon: 'mv',
            sidebar: true,
          },
        },
        {
          path: '/search',
          name: 'search',
          component: () => import(/* webpackChunkName: "search" */'../views/search/index.vue'),
          meta: {
            title: '搜索',
          }
        },
      ],
    },
    {
      path: '/song',
      name: 'song',
      component: () => import(/* webpackChunkName: "song" */'../views/play/song.vue'),
      meta: {
        title: '单曲',
      },
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import(/* webpackChunkName: "song" */'../views/play/playlist.vue'),
      meta: {
        title: '歌单',
      },
    },
    {
      path: '/mv',
      name: 'mv',
      component: () => import(/* webpackChunkName: "song" */'../views/play/mv.vue'),
      meta: {
        title: 'MV',
      },
    },
    {
      path: '/artist',
      name: 'artist',
      component: () => import(/* webpackChunkName: "song" */'../views/play/artist.vue'),
      meta: {
        title: '歌手',
      },
    },
    {
      path: '/album',
      name: 'album',
      component: () => import(/* webpackChunkName: "song" */'../views/play/album.vue'),
      meta: {
        title: '专辑',
      },
    },
  ],
});

export default router;
