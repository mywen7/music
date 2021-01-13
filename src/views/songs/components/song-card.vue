<template>
  <div class="song-name">
    <div class="img-wrap">
      <el-image :fit="cover" lazy :src="imgUrl"/>
      <PlayIcon class="play-icon"/>
    </div>
    <div class="name-text">
      {{name}}
      <Icon
        v-if="mvId"
        class="mv-icon"
        @icon-click="$emit('go-mv', mvId)"
        type="mv"
        :size="20"
      />
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
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  column-gap: 12px;
  .img-wrap {
    position: relative;
    height: 90px;
    width: 90px;
    :deep(.el-image__inner) {
      border-radius: 12px;
    }
    .play-icon {
      @include abs-center;
    }
  }
  .name-text {
    display: flex;
    align-items: center;
    .mv-icon {
      margin-left: 5px;
      color: $theme-color;
    }
  }
}
</style>