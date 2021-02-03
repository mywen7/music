<template>
  <div class="my-player">
    <music-info 
      :current-song="currentSong" 
      :is-player-show="isPlayerShow"
      @img-click="imgClick"
    />
    <play/>
    <play-type/>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import musicInfo from './components/song-info.vue';
import { SongInfo } from './interface';
import Play from './components/play.vue';
import PlayType from './components/play-type.vue';
import { currentSong } from '../global/current-song';

export default defineComponent ({
  components: { musicInfo, Play, PlayType },
  setup() {
    const isPlayerShow = ref(false);
    const imgClick = () => {
      isPlayerShow.value = !isPlayerShow.value;
    }
    return {
      currentSong,
      imgClick,
      isPlayerShow,
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
  overflow: hidden;
}
</style>