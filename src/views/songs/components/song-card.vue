<template>
  <div class="song-name">
    <div class="img-wrap">
      <el-image fit="cover" lazy :src="imgUrl"/>
      <PlayIcon class="play-icon"/>
    </div>
    <div class="name-text">
      {{name}}
      <span class="mv-icon" @click.stop="$emit('go-mv', mvId)">
        <Icon
          v-if="mvId"
          type="mv"
          :size="20"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    mvId: Number,
  }
});
</script>

<style lang="scss" scoped>
.song-name {
  display: flex;
  align-items: center;
  .img-wrap {
    height: 60px;
    width: 60px;
    flex-shrink: 0;
    position: relative;
    :deep(.el-image) {
      position: static;
    }
    :deep(.el-image__inner) {
      border-radius: 12px;
      @include abs-stretch;
    }
    .play-icon {
      @include abs-center;
    }
  }
  .name-text {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 5px;
    .mv-icon {
      margin-left: 5px;
      color: $theme-color;
      i {
        vertical-align: middle;
      }
    }
  }
}
</style>