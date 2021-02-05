<template>
  <div class="play-queue">
    <el-tabs v-model="activeList">
      <el-tab-pane label="播放队列" name="current"></el-tab-pane>
      <el-tab-pane label="历史记录" name="history"></el-tab-pane>
    </el-tabs>
    <div v-if="playListsongs.length <= 0" class="empty">
      <span class="empty-tip">暂无单曲</span>
      <img class="empty-img" src="../assets/empty.jpg"/>
    </div>
    <songs-table
      v-else
      :song-list="playListsongs"
      :show-img="false"
      :show-index="false"
      @row-click="rowClick"
      @go-mv="goMv"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import SongsTable from '../views/songs/components/songs-table.vue';
import { Song } from '../views/songs/interface';
import { songList } from '../global/playlist-queue';

export default defineComponent ({
  components: { SongsTable },
  setup() {
    const activeList = ref('current');
    const playListsongs: Ref<Song[]> = songList;
    const rowClick = () => {
      console.log(1)
    }
    const goMv = () => {
      console.log(1)
    }
    return {
      activeList,
      playListsongs,
      rowClick,
      goMv,
    }
  }
});
</script>

<style lang="scss" scoped>
.play-queue {
  height: calc(100vh - #{$header-height} * 2 - 18px);
  overflow: hidden;
  :deep(.el-tabs__active-bar) {
    width: 56px;
    background-color: $theme-color;
  }
  :deep(.el-tabs__item) {
    &.is-active {
      color: $theme-color;
    }
  }
  :deep(.el-tabs__item:hover) {
    color: $theme-color;
  }
  .empty {
    position: relative;
    .empty-tip {
      @include abs-center;
    }
    .empty-img {
      height: 100%;
      opacity: 0.7;
    }
  }
}
</style>