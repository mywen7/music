<template>
  <div class="song">
    <div class="img-wrap" @click="$emit('img-click')">
      <img class="img" :src="imgUrl"/>
      <div class="icon-wrap">
        <Icon :size="24" :type="playControlIcon" color="white"/>
      </div>
    </div>
    <div class="song-detail">
      <div>
        {{name}}
        -
        {{artist}}
      </div>
      <div class="detail-time">
        {{currentTime}}
        /
        {{duration}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, PropType } from 'vue';
import { SongInfo } from '../interface';
import { formatTime } from '../../libs/common';

export default defineComponent ({
  props: {
    currentSong: Object,
    isPlayerShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const playControlIcon = computed(() => props.isPlayerShow ? 'shrink' : 'open');
    const currentSong = computed(() => props.currentSong as SongInfo);
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
      opacity: 0.5;
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
  .song-detail {
    margin-left: 10px;
    font-size: $font-size-sm;
    @include text-ellipsis;
    .detail-time {
      color: #5c5c5c;
    }
  }
}
</style>