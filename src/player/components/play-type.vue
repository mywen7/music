<template>
  <div class="play-type">
    <share/>
    <!-- 模式变化 -->
    <el-tooltip
      placement="top"
      effect="light"
      v-model="modeVisible"
    >
      <template #content>
        <div class="mode-tooltip">
          <div 
            class="tip"
            v-for="mode in playModeMap"
            :key="mode.icon"
            :class="playingMode.icon === mode.icon ? 'active': ''"
            @click="modeChange(mode)"
          >
            <Icon :size="14" :type="mode.icon"/>
            {{ mode.name }}
          </div>
        </div>
      </template>

      <span @click="modeClick">
        <Icon :size="18" :type="playingMode.icon"/>
      </span>

    </el-tooltip>
    <!-- 歌单 -->
    <el-popover
      v-model:visible="playlistVisible"
      placement="top"
      trigger="manual"
      :width="360"
      :show-arrow="false"
    >
      <play-queue/>
      <template #reference>
        <span @click="onPlaylistVisible">
          <Icon :size="18" type="playlist"/>
        </span>
      </template>
    </el-popover>
    <!-- 音量 -->
    <Volume @volume-change="volumeChange"/>
    <!-- github -->
    <Icon :size="18" type="github" @click="goGithub"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, Ref } from 'vue';
import { ModeMap } from '../interface';
import Share from './share.vue';
import PlayQueue from './play-queue.vue';

function useMode() {
  const playModeMap: ModeMap[] = [
    {
      icon: 'sequence',
      name: '顺序播放',
    },
    {
      icon: 'loop',
      name: '单曲循环',
    },
    {
      icon: 'random',
      name: '随机播放',
    },
  ];
  const modeVisible = ref(false);
  const playingMode: Ref<ModeMap> = ref(playModeMap[0]);
  const modeClick = () => {
    modeVisible.value = !modeVisible.value;
  }
  const modeChange = (mode: ModeMap) => {
    playingMode.value = {...mode};
  }
  return {
    playModeMap, modeVisible, playingMode, modeClick, modeChange,
  }
}
function usePlaylist() {
  const playlistVisible = ref(false);
  const onPlaylistVisible = () => {
    playlistVisible.value = !playlistVisible.value;
  }
  return {
    playlistVisible,
    onPlaylistVisible,
  }
}
function useVolume() {
  const volumeChange = (volume: number) => {
    console.log(volume);
  }
  return {
    volumeChange,
  }
}

export default defineComponent ({
  components: { Share, PlayQueue },
  setup() {
    const{ playModeMap, modeVisible, playingMode, modeClick, modeChange } = useMode();
    const { onPlaylistVisible, playlistVisible } = usePlaylist();
    const { volumeChange } = useVolume();
    const goGithub = () => {
      window.open('https://github.com/mywen7/music');
    }
    return {
      playingMode,
      playModeMap,
      modeVisible,
      modeClick,
      modeChange,
      volumeChange,
      onPlaylistVisible,
      playlistVisible,
      goGithub,
    }
  },
});
</script>

<style lang="scss" scoped>
.play-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-left: 270px;
  // padding-right: 80px;
}
.mode-tooltip {
  padding: 0 10px;
  .tip {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    i {
      margin-right: 5px;
    }
    &.active {
      color: $theme-color;
    }
  }
}
</style>