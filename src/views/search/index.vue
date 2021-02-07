<template>
  <div class="m-search">
    <div class="search-keyword">
      {{keyWord}}
      <span class="search-total">共找到{{total}}个结果</span>
    </div>
    <el-tabs v-model="activeTab" @tab-click="activeTabClick">
       <el-tab-pane 
        v-for="tab in tabs"
        :key="tab.type"
        :label="tab.name"
        :name="tab.type"
       />
    </el-tabs>
    <Pagination :page-props="pageProps">
      <div v-if="activeTab === SearchType.song">
        <songs-table 
          :song-list="showList" 
          :show-img="false"
          :stripe="true"
          @row-click="rowClick"
        />
      </div>
      <div v-if="activeTab === SearchType.playlist" class="search-playlist">
        <playlist-card 
          v-for="playlist in showList"
          :key="playlist.id"
          :card-info="playlist"
        />
      </div>
      <div v-if="activeTab === SearchType.mv" class="search-mvs">
        <mv-card
          v-for="mv in showList"
          :key="mv.id"
          :card-info="mv"
        />
      </div>
    </Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, ComputedRef, watch, nextTick } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import songsTable from '../songs/components/songs-table.vue';
import usePage from '../../components/usePagination';
import { Song } from '../songs/interface';
import { Playlist, MV } from '../discovery/interface';
import PlaylistCard from '../discovery/components/playlist-card.vue';
import MvCard from '../discovery/components/mv-card.vue';
import http from '@/libs/fetch';
import { SearchType } from './interface';
import { currentSong } from '../../global/current-song';
import { formatNumber } from '../../libs/common';

function useTabs(route: RouteLocationNormalizedLoaded) {
  const tabs = [
    {
      type: SearchType.song,
      name: '单曲',
    },
    // {
    //   type: SearchType.album,
    //   name: '专辑',
    // },
    // {
    //   type: SearchType.artist,
    //   name: '歌手',
    // },
    {
      type: SearchType.playlist,
      name: '歌单',
    },
    {
      type: SearchType.mv,
      name: 'mv',
    },
  ];
  const activeTab = ref(route.query.type?.toString() || SearchType.song);
  return { tabs, activeTab }
}

const transforSong = (ele: any): Song => {
  return {
    id: ele.id,
    name: ele.name,
    albumName: ele.album.name,
    duration: ele.duration,
    imgUrl: '',
    artists: ele.artists.map((a: any) => a.name).join('/'),
    mvId: ele.mvid,
  }
}
const transforPlaylist = (ele: any): Playlist => {
  return {
    id: ele.id,
    img: ele.coverImgUrl,
    desc: `播放量: ${formatNumber(ele.playCount)}次`,
    title: ele.name,
  }
}
const transforMv = (ele: any): MV => {
  return {
    id: ele.id,
    name: ele.name,
    artist: ele.artists.map((a: any) => a.name).join('/'),
    img: ele.cover,
    playCount: ele.playCount,
  }
}
function useFetchData(activeTab: Ref<string>, keyWord: ComputedRef) {
  const pageProps = usePage<MV | Song | Playlist>(async ({page, size}) => {
    const res = await http('/search', {
      method: 'GET',
      query: {
        keywords: keyWord.value,
        limit: size,
        offset: (page - 1) * size,
        type: activeTab.value,
      },
    })
    const total = res.result.songCount || res.result.playlistCount || res.result.mvCount
    const items = activeTab.value === SearchType.song ?
                  res.result.songs.map(transforSong) :
                  activeTab.value === SearchType.playlist ?
                  res.result.playlists.map(transforPlaylist) :
                  activeTab.value === SearchType.mv ?
                  res.result.mvs.map(transforMv) : '';
    return {
      total,
      items,
    }
  })

  return { pageProps }
}
export default defineComponent ({
  components: { songsTable, PlaylistCard, MvCard },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const keyWord = computed(() => route.query.s);
    const { tabs, activeTab } = useTabs(route);
    const { pageProps } = useFetchData(activeTab, keyWord);
    watch(keyWord, () => pageProps.fetchdata())

    const rowClick = (row: any) => {
      currentSong.value = {...row}
    }
    const activeTabClick = () => {
      nextTick(() => {
        router.push({
          ...route,
          query: {
            ...route.query,
            type: activeTab.value,
            page: 1,
          },
        })
      })
      pageProps.page.value = 1;
      if (Number(route.query.page) === pageProps.page.value) {
        pageProps.fetchdata();
      }
    }
    return {
      keyWord,
      tabs,
      activeTab,
      SearchType,
      showList: pageProps.items,
      pageProps,
      rowClick,
      total: pageProps.total,
      activeTabClick,
    }
  },
});
</script>

<style lang="scss" scoped>
.m-search {
  margin: 0 50px;
  
  :deep(.el-tabs__item:hover){
    color: $theme-color;
  }
  :deep(.el-tabs__item.is-active) {
    color: $theme-color;
  }
  :deep(.el-tabs__active-bar) {
    background-color: $theme-color;
  }
  :deep(.el-table__row) {
    font-size: $font-size-sm;
  }
  .search-keyword {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 30px;
    .search-total {
      font-size: $font-size-sm;
      font-weight: 400;
      opacity: 0.4;
    }
  }
  .search-playlist {
    display: grid;
    grid-template-columns: repeat(6, 15%);
    justify-content: center;
    grid-column-gap: 20px;
    padding: 15px 0;
    :deep(.playlist) {
      font-size: 12px;
      .desc {
        font-size: 12px;
        padding-bottom: 2px;
      }
    }
  }
  .search-mvs {
    padding: 15px 150px;
    display: grid;
    grid-template-columns: repeat(4, 22%);
    justify-content: space-between;
    grid-row-gap: 20px;
    :deep(.img-wrap) {
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
</style>