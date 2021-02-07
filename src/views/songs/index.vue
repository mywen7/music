<template>
  <div class="songs">
    <Tags :tags="tags" @tag-change="tagChange"/>
    <songs-table
      :song-list="songList"
      @go-mv="goMv"
      @row-click="rowClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, watch, toRaw } from 'vue';
import { Song, SongType } from './interface';
import http from '@/libs/fetch';
import { RouterPush} from '../router';
import SongsTable from './components/songs-table.vue';
import { currentSong } from '../../global/current-song';

function useFetchData() {
  const songList: Ref<Song[]> = ref([]);
  const songType = ref(0);
  const fetchData = async () => {
    try {
      const res = await http('/top/song', {
        method: 'GET',
        query: {
          type: songType.value,
        },
      });
      songList.value = res.data.map((ele: any) => {
        return {
          id: ele.id,
          name: ele.name,
          albumName: ele.album.name,
          duration: ele.duration,
          imgUrl: ele.album.picUrl,
          artists: ele.artists.map((item: any) => item.name)
                              .join('/'),
          mvId: ele.mvid,
        }
      })
    } catch (e) {
      console.log('error in TopSong');
    }
  }

  watch(songType, fetchData);
  onMounted(fetchData);
  return { songType, songList }
}

function useTagChange(songType: Ref<number>) {
  const tags = [
    '全部', '华语', '欧美',
    '日本', '韩国',
  ];
  const currentTag = (tag: string) => {
    switch (tag) {
      case '华语':
        return SongType.华语;
        break;
      case '欧美':
        return SongType.欧美;
        break;
      case '日本':
        return SongType.日本;
        break;
      case '韩国':
        return SongType.韩国;
        break;
      default:
        return SongType.全部;
    }
  }
  const tagChange = (tag: string) => {
    songType.value = currentTag(tag);
  };
  return { tags, tagChange }
}

function useTable() {
  const { routerPush } = RouterPush();
  const goMv = (id: number) => {
    routerPush('mv', id);
  }
  const rowClick = (row: any) => {
    currentSong.value = {
      ...row,
    }
  }
  return { goMv, rowClick }
}
export default defineComponent ({
  components: { SongsTable },

  setup() {
    const { songType, songList } = useFetchData();
    const { tags, tagChange } = useTagChange(songType);
    const { goMv, rowClick } = useTable();
    return {
      tags,
      tagChange,
      songList,
      goMv,
      rowClick,
    }
  }
});
</script>

<style lang="scss" scoped>
.songs {
  :deep(.tags) {
    margin: 0 0 30px 0;
    .el-button {
      font-size: $font-size-lg;
      margin: 0 20px;
    }
  }
  margin: 0 150px;
}
</style>