<template>
  <div class="play">
    <Icon :size="24" @click="$emit('prev')" type="prev" color="theme"/>
    <el-popover
      v-model:visible="visible"
      placement="top"
      trigger="manual"
      :width="160"
    >
      <p>请点击开始播放。</p>
      <template #reference>
        <div class="popover-ref">
          <PlayIcon :size="45"/>
        </div>
      </template>
    </el-popover>
    <Icon :size="24" @click="$emit('next')" type="next" color="theme"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  }
});
</script>

<style lang="scss" scoped>
.play {
  display: flex;
  justify-content: center;
  align-items: center;
  .popover-ref {
    margin: 0 15px;
    :deep(.play-icon-wrap) {
      background-color: $theme-color;
      .play-icon {
        color: $white;
      }
    }
  }
}
</style>