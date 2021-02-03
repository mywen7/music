<template>
  <div class="my-player">
    <song-info 
      :current-song="currentSong" 
      :is-player-show="isPlayerShow"
      @img-click="imgClick"
    />
    <play/>
    <play-type/>
    <div class="song-progress">
      <ProgressBar
        id-name="song"
        default-key="1"
        :is-zero="false"
        @percent-change="percentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import songInfo from './components/song-info.vue';
import { SongInfo } from './interface';
import Play from './components/play.vue';
import PlayType from './components/play-type.vue';
import { currentSong } from '../global/current-song';

export default defineComponent ({
  components: { songInfo, Play, PlayType },
  setup() {
    const isPlayerShow = ref(false);
    const imgClick = () => {
      isPlayerShow.value = !isPlayerShow.value;
    }
    const percentChange = (percent: number) => {
      console.log(percent)
    }
    return {
      currentSong,
      imgClick,
      isPlayerShow,
      percentChange,
    }
  },
});
</script>

<style lang="scss" scoped>
.my-player {
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
  }
}
</style>