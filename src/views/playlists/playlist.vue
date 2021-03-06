<template>
  <div class="m-playlist">
    <Pagination :page-props="pageProps">
      <template #banner v-if="cardInfo.id">
        <card  
          :card-info="cardInfo"
          @card-click="cardClick"
        />
      </template>
      <template #action>
        <Tags :tags="tags" @tag-change="tagChange"/>
      </template>
      <div class="playlist-wrap">
        <playlist-card
          v-for="playlist in playlists"
          :key="playlist.id"
          :card-info="playlist"
          @card-click="cardClick"
        />
      </div>
    </Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, onMounted } from 'vue';
import Card from './components/card.vue';
import { PlaylistUncertain, Playlist } from '../discovery/interface';
import http from '@/libs/fetch';
import PlaylistCard from '../discovery/components/playlist-card.vue';
import usePage from '../../components/usePagination';
import { RouterPush } from '../router';

function transforPlaylist(data: any) {
  return {
    id: data.id,
    title: data.name,
    desc: data.description,
    img: data.coverImgUrl,
  };
};

async function useFetchPlaylist() {
  const pageProps = usePage<Playlist>(async ({page, size, tag}) => {
    const res = await http('top/playlist', {
        method: 'GET',
        query: {
          limit: size,
          offset: (page - 1) * size,
          cat: tag[0],
        },
      })
    return {
      items: res.playlists.map(transforPlaylist),
      total: res.total,
    };
  });

  const cardInfo: Ref<PlaylistUncertain> = ref({});
  const highquality = async () => {
    try {
      const res = await http('/top/playlist/highquality', {
        method: 'GET',
        query: {
          cat: pageProps.tag.value[0],
          limit: 1,
        },
      })
      const data = res.playlists[0];
      cardInfo.value = transforPlaylist(data);
    } catch (e) {
      cardInfo.value = {};
      console.log('error in highquality')
    }
  }
  await highquality();
  return { pageProps, highquality, cardInfo };
}

function useChangeTag( highquality: () => void, tag: Ref<string[]> ) {
  const tags = reactive([
    '全部', '华语', '欧美', '民谣', '说唱',
    '爵士', '流行', '电子', '古风', '影视原声', '浪漫',
    '治愈', '孤独', '安静',
  ]);

  const tagChange = async (currentTag: string) => {
    if (tag.value[0] === currentTag) {
      return ;
    }
    tag.value[0] = currentTag;
    await highquality();
  }
  return { tagChange, tags }
}


export default defineComponent ({
  components: { Card, PlaylistCard },
  async setup() {
    const { routerPush } = RouterPush();
    const { pageProps, highquality, cardInfo } = await useFetchPlaylist();
    const { tagChange, tags } = useChangeTag(highquality, pageProps.tag);
    const cardClick = (id: number) => {
      routerPush('playlist', id)
    }
    return {
      tags,
      cardInfo,
      tagChange,
      playlists: pageProps.items,
      cardClick,
      pageProps,
    }
  },
});
</script>

<style lang="scss" scoped>
.m-playlist {
  margin: 0 150px;
  .playlist-wrap {
    display: grid;
    grid-template-columns: repeat(5,20%);
    justify-content: center;
    row-gap: 40px;
    :deep(.img-wrap) {
      border-radius: 5px;
    }
  }
}
</style>