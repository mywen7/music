<template>
  <div class="my-player">
    <div>
      <song-info 
        v-if="playingSong.id"
        :current-song="playingSong" 
        :is-player-show="isPlayerShow"
        @img-click="songInfoImgClick"
      />
    </div>
    <playing :visible="autoplayError"/>
    <play-type @volume-change="volumeChange"/>
    <div class="song-progress">
      <ProgressBar
        id-name="song"
        default-key="1"
        :is-zero="false"
        @percent-change="percentChange"
        ref="progressDom"
      />
    </div>
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
import { defineComponent, Ref, ref, computed, watch, nextTick, onMounted } from 'vue';
import songInfo from './components/song-info.vue';
import Playing from './playing.vue';
import PlayType from './play-type.vue';
import { playingSong, isPlaying } from '../global/current-song';
import { DEFAULT_VOLUME, DEFAULT_KEY } from '../components/volume.vue';
import { PlayingSong } from './interface';
import ProgressBar from '../components/progress-bar.vue';

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
  const progressDom: Ref<typeof ProgressBar | null> = ref(null);
  const updateTime = (ev: any) => {
    console.log(ev.target.currentTime);
    playingSong.value.currentTime = ev.target.currentTime;
  }
  const percentChange = (percent: number) => {
    console.log(percent)
  }
  
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
  const audioPause = () => {
    audioDom.value?.pause();
  }
  const setAudioCurrentTime = (time: number) => {
    (audioDom.value as HTMLAudioElement).currentTime = time;
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
  watch(() => playingSong.value.id, (newId: number, oldId: number) => {
    isPlaying.value = false;
    setAudioCurrentTime(0)
    songReady.value = false;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      isPlaying.value = true;
    }, 1000);
  })
  return {
    audioDom,
    updateTime,
    percentChange,
    audioReady,
    songReady,
    audioPlay,
    audioPause,
    autoplayError,
    setAudioCurrentTime,
    end,
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
    const { audioDom, updateTime, percentChange, audioReady,
    autoplayError, end,
    } = useAudio();
    const { volumeChange } = useVolume(audioDom)
    return {
      playingSong,
      songInfoImgClick,
      isPlayerShow,
      percentChange,
      updateTime,
      audioDom,
      audioReady,
      autoplayError,
      volumeChange,
      end,
      isPlaying,
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
    left: -14px;
    right: 0;
  }
}
</style>