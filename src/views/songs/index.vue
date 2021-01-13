<template>
  <div class="songs">
    <Tags :tags="tags" @tag-change="tagChange"/>
    <el-table :data="songList" @row-click="rowClick">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <song-card 
            :img-url="scope.row.imgUrl"
            :name="scope.row.name"
            :mv-id="scope.row.mvId"
            @go-mv="goMv"/>
        </template>
      </el-table-column>
      <el-table-column 
        label="歌手" 
        prop="artists"
        />
      <el-table-column 
        label="专辑" 
        prop="albumName"
        />
      <el-table-column 
        label="时长" 
        prop="duration"
        align="center"/>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, watch } from 'vue';
import usePage from '@/components/usePagination';
import { Song, SongType } from './interface';
import http from '@/libs/fetch';
import { formatTime } from '../../libs/common';
import SongCard from './components/song-card.vue';
import { RouterPush} from '../router';

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
          duration: formatTime(ele.duration / 1000),
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
  const indexMethod = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
  }
  const { routerPush } = RouterPush();
  const goMv = (id: number) => {
    routerPush('mv', id);
  }
  const rowClick = (row: any) => {
    routerPush('song', row.id);
  }
  return { indexMethod, goMv, rowClick }
}
export default defineComponent ({
  components: { SongCard },

  setup() {
    const { songType, songList } = useFetchData();
    const { tags, tagChange } = useTagChange(songType);
    const { indexMethod, goMv, rowClick } = useTable();
    return {
      tags,
      tagChange,
      songList,
      indexMethod,
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
  :deep(.el-table td, .el-table th.is-leaf) {
    border-bottom: none;
  }
  :deep(.el-table th.is-leaf) {
    border-bottom: none;
  }
}
</style>