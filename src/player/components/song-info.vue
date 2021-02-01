<template>
  <div class="song">
    <div class="img-wrap">
      <img class="img" :src="imgUrl"/>
      <div class="icon-wrap">
        <Icon :size="24" :type="playControlIcon" color="white"/>
      </div>
    </div>
    <div>
      <div>{{name}}-{{artist}}</div>
      <div>{{currentTime}}/{{duration}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';
import { SongInfo } from '../interface';
import { formatTime } from '../../libs/common';

export default defineComponent ({
  props: {
    isPlayerShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const playControlIcon = computed(() => props.isPlayerShow ? 'shrink' : 'open');
    const currentSong: Ref<SongInfo> = ref({
      name: '余额',
      imgUrl: 'https://p3.music.126.net/oro9WEGcXWgFamaoe1EtuQ==/19242552997932998.jpg',
      artist: '孙燕姿',
      currentTime: 1191513600000,
      duration: 1612155430797,
    })
    return {
      ...currentSong.value,
      currentTime: formatTime(currentSong.value.currentTime),
      duration: formatTime(currentSong.value.duration / 1000),
      playControlIcon,
    }
  },
});
</script>

<style lang="scss" scoped>
.song {
  display: flex;
  align-items: center;
  .img-wrap {
    position: relative;
     .icon-wrap {
      @include abs-center;
      opacity: 0;
    }
    .img {
      height: 50px;
      vertical-align: middle;
      border-radius: 5px;
    }
    &:hover {
      .img {
        transition: $transition;
        filter: blur(2px);
      }
      .icon-wrap {
        transition: $transition;
        opacity: 1;
      }
    }
  }
}
</style>