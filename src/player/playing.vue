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
        <div class="popover-icon" @click="playingChange">
          <Icon :size="20" :type="playIcon"/>
        </div>
      </template>
    </el-popover>
    <Icon :size="24" @click="$emit('next')" type="next" color="theme"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { isPlaying, currentSong } from '../global/current-song';

export default defineComponent ({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const playIcon = computed(() => isPlaying.value ? 'pause' : 'play');
    const playingChange = () => {
      if (!currentSong.value.id) {
        return;
      }
      isPlaying.value = !isPlaying.value;
    }
    return {
      playIcon,
      playingChange,
    }
  }
});
</script>

<style lang="scss" scoped>
.play {
  display: flex;
  justify-content: center;
  align-items: center;
  .popover-icon {
    margin: 0 15px;
    background-color: $theme-color;
    display: flex;
    @include flex-center;
    @include round(45px);
    i {
      color: $white;
    }
  }
}
</style>