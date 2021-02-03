<template>
  <div>
    <el-table :data="songList" @row-click="rowClick">
      <el-table-column 
        :width="70" 
        align="center"
        type="index" 
        :index="indexMethod"
        v-if="showIndex"
      />
      <el-table-column :width="100" v-if="showImg">
        <template #default="scope">
          <div class="img-wrap">
            <el-image 
              fit="cover" 
              lazy 
              :src="scope.row.imgUrl"/>
            <PlayIcon class="play-icon"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌曲名">
        <template #default="scope">
          <song-card
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
        :width="100"
        />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Song } from '../interface';
import songCard from './song-card.vue';

export default defineComponent ({
  components: { songCard },
  props: {
    songList: Array as PropType<Song[]>,
    indexMethod: Function,
    showImg: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const goMv = (id: number) => {
      emit('go-mv', id);
    }
    const rowClick = (row: any) => {
      emit('row-click', row)
    }
    return {
      goMv,
      rowClick,
    }
  }
});
</script>

<style lang="scss" scoped>
:deep(.el-table td, .el-table th.is-leaf) {
  border-bottom: none;
}
:deep(.el-table td) {
  padding:5px 0;
  cursor: default;
}
:deep(.el-table th.is-leaf) {
  border-bottom: none;
}
.img-wrap {
  height: 80px;
  width: 80px;
  flex-shrink: 0;
  position: relative;
  :deep(.el-image) {
    position: static;
  };
  :deep(.el-image__inner) {
    border-radius: 4px;
    @include abs-stretch;
  };
  .play-icon {
    @include abs-center;
  }
}
</style>