<template>
  <div class="m-playlist">
    <card v-if="cardInfo.id" 
      :card-info="cardInfo"
      @card-click="cardClick"
    />
    <div class="tags">
      <el-button 
        v-for="(tag,index) in tags"
        :key="index"
        type="text"
        @click="tagChange(tag)"
      >
        {{tag}}
      </el-button>
    </div>
    <div class="playlist-wrap">
      <playlist-card
        v-for="playlist in playlists"
        :key="playlist.id"
        :card-info="playlist"
        @card-click="cardClick"
      />
    </div>
    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="onPageChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from 'vue';
import Card from './components/card.vue';
import { PlaylistUncertain, Playlist } from '../discovery/interface';
import http from '@/libs/fetch';
import PlaylistCard from '../discovery/components/playlist-card.vue';
import { useRouter } from 'vue-router';


function useFetchPlaylist() {
    const cardInfo: Ref<PlaylistUncertain> = ref({});
    const pageSize = ref(50);
    const currentPage = ref(1);
    const highquality = async (tag: string) => {
      const res = await http('/top/playlist/highquality', {
        method: 'GET',
        query: {
          cat: tag,
          limit: 1,
        },
      })
      const data = res.playlists[0];
      if (data) {
        cardInfo.value = {
          id: data.id,
          title: data.name,
          desc: data.description,
          img: data.coverImgUrl,
        }
      } else {
        cardInfo.value = {}
      }
    }
    const playlists: Ref<Playlist[]> = ref([]);
    const total = ref(null);
    const fetchPlaylist = async (offset: number, tag: string, limit: number) => {
      const res = await http('top/playlist', {
        method: 'GET',
        query: {
          limit,
          offset,
          cat: tag,
        },
      })
      if (res.playlists.length > 0) {
        total.value = res.total;
        playlists.value = res.playlists.map((ele: any) => {
          return {
            id: ele.id,
            img: ele.coverImgUrl,
            desc: ele.description,
            title: ele.name,
          }
        })
      }
    }
    return { pageSize, currentPage, cardInfo, highquality, fetchPlaylist, playlists, total};
}

function useChangeTag(
  highquality: (tag: string) => void,
  fetchPlaylist: (offset: number, tag: string, pageSize: number) => void,
  pageSize: Ref<number>,
  currentPage: Ref<number>,
  ) {
  const currentTag = ref('全部');
  const tags = reactive([
    '全部', '华语', '欧美', '民谣', '说唱',
    '爵士', '流行', '电子', '古风', '影视原声', '浪漫',
    '治愈', '孤独', '安静',
  ]);

  const tagChange = async (tag: string) => {
    await highquality(tag);
    await fetchPlaylist(0, tag, pageSize.value);
    currentPage.value = 1;
  }
  return {
    tagChange, tags, currentTag,
  }
}

function useChangePage(
  fetchPlaylist: (offset: number, tag: string, pageSize: number) => void,
  pageSize: Ref<number>,
  currentTag: Ref<string>,
  ) {

  const onPageChange = async (page: number) => {
    await fetchPlaylist(((page - 1) * pageSize.value), currentTag.value, pageSize.value);
  }
  return {
    onPageChange,
  }
}
export default defineComponent ({
  components: { Card, PlaylistCard },
  async setup() {
    const router = useRouter();
    const { currentPage, cardInfo, highquality, fetchPlaylist, playlists, total, pageSize } = useFetchPlaylist();
    const { tagChange, tags, currentTag } = useChangeTag(highquality, fetchPlaylist, pageSize, currentPage);
    const { onPageChange } = useChangePage(fetchPlaylist, pageSize, currentTag);
    await highquality(currentTag.value);
    await fetchPlaylist(0, currentTag.value, pageSize.value);
    const cardClick = (id: number) => {
      router.push({
        name: 'playlist',
        query: {
          id,
        },
      })
    }
    return {
      tags,
      cardInfo,
      tagChange,
      playlists,
      cardClick,
      total,
      pageSize,
      onPageChange,
    }
  },
});
</script>

<style lang="scss" scoped>
.m-playlist {
  margin: 0 150px;
  .tags {
    text-align: right;
    margin: 10px 0 20px 0;
    .el-button--text {
      color: $theme-color;
    }
  }
  .playlist-wrap {
    display: grid;
    grid-template-columns: repeat(5,20%);
    justify-content: center;
  }
}
</style>