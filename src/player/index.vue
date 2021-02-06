<template>
  <div class="my-player">
    <!-- 歌曲信息 -->
    <div>
      <song-info 
        v-if="playingSong.id"
        :current-song="playingSong" 
        :is-player-show="isPlayerShow"
        @img-click="songInfoImgClick"
      />
    </div>
    <!-- 上一曲 播放 下一曲 -->
    <playing :visible="autoplayError"/>
    <!-- 模式选择 -->
    <play-type :copy-text="playingSong.url" @volume-change="volumeChange"/>
    <!-- 播放进度条 -->
    <div class="song-progress">
      <ProgressBar
        v-if="playingSong.id"
        id-name="song"
        :percent="songPercent"
        @mouse-up-end="mouseUpEnd"
      />
    </div>
    <!-- 音频 -->
    <audio
      :src="playingSong.url"
      ref="audioDom"
      @canplay="audioReady"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch, nextTick, onMounted, provide, readonly, ComputedRef } from 'vue';
import songInfo from './components/song-info.vue';
import Playing from './playing.vue';
import PlayType from './play-type.vue';
import { playingSong, isPlaying } from '../global/current-song';
import { DEFAULT_VOLUME, DEFAULT_KEY } from '../components/volume.vue';

function useSongInfo() {
  const isPlayerShow = ref(false);
  const songInfoImgClick = () => {
    isPlayerShow.value = !isPlayerShow.value;
  }
  return { isPlayerShow, songInfoImgClick };
}

function useAudio() {
  const audioDom: Ref<HTMLAudioElement | null> = ref(null);
  const songReady = ref(false);
  const autoplayError = ref(false);

  const audioReady = () => {
    songReady.value = true;
  }
  const audioPlay = async () => {
    if (songReady.value) {
      try {
        await audioDom.value?.play();
        autoplayError.value = false;
      } catch (e) {
        // 提示用户手动播放
        isPlaying.value = false;
        autoplayError.value = true;
      }
    };
  }

  const currentTime = ref(0);
  provide('currentTime', readonly(currentTime));
  const songPercent = ref(0);
  const updateTime = (ev: any) => {
    currentTime.value = ev.target.currentTime;
    songPercent.value = currentTime.value * 1000 / playingSong.value.duration;
  }

  const setAudioCurrentTime = (time: number) => {
    (audioDom.value as HTMLAudioElement).currentTime = time;
  }

  const audioPause = () => {
    audioDom.value?.pause();
  }
  const end = () => {
    isPlaying.value = false;
  }
  watch(isPlaying, (newPlaying) => {
    nextTick(() => {
      newPlaying ? audioPlay() : audioPause();
    })
  })

  let timer: any = null;
  watch(() => playingSong.value.id, () => {
    songReady.value = false;
    isPlaying.value = false;
    setAudioCurrentTime(0)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      isPlaying.value = true;
    }, 1000);
  })
  return { audioDom, updateTime, audioReady, audioPlay, audioPause, autoplayError,
    setAudioCurrentTime, end, songPercent };
}

function useProgress(setAudioCurrentTime: (time: number) => void) {
  const mouseUpEnd = (percent: number) => {
    const per = playingSong.value.duration * percent / 1000;
    setAudioCurrentTime(per);
  }
  return {
    mouseUpEnd,
  }
}
function useVolume(audioDom: Ref<HTMLAudioElement | null>) {
  const volumeChange = (volumePerson: number) => {
    (audioDom.value as HTMLAudioElement).volume = volumePerson;
  }
  onMounted(() => {
    (audioDom.value as HTMLAudioElement).volume = Number(localStorage.getItem(DEFAULT_KEY)) || DEFAULT_VOLUME;
  })
  return { volumeChange };
}


export default defineComponent ({
  components: { songInfo, Playing, PlayType },
  setup() {
    const { isPlayerShow, songInfoImgClick } = useSongInfo();
    const {
      audioDom, updateTime, audioReady, autoplayError, end,
      songPercent, setAudioCurrentTime,
    } = useAudio();
    const { mouseUpEnd } = useProgress(setAudioCurrentTime);
    const { volumeChange } = useVolume(audioDom)
    return {
      playingSong,
      songInfoImgClick,
      isPlayerShow,
      updateTime,
      audioDom,
      audioReady,
      autoplayError,
      volumeChange,
      end,
      isPlaying,
      songPercent,
      mouseUpEnd,
    }
  },
});
</script>

<style lang="scss" scoped>
.my-player {
  user-select: none;
  height: $header-height;
  display: grid;
  grid-template-columns: repeat(3,33%);
  align-items: center;
  position: relative;
  .song-progress {
    position: absolute;
    top: -12px;
    left: -20px;
    right: 0;
    :deep(.progress-bar) {
      .progress-btn {
        opacity: 0;
      }
      &:hover {
        .progress-btn {
          opacity: 1;
        }
      }
    }
  }
}
</style>