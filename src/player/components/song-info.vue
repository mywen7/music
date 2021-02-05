<template>
  <div class="song">
    <div class="img-wrap" @click="$emit('img-click')">
      <img class="img" :src="currentSong.imgUrl"/>
      <div class="icon-wrap">
        <Icon :size="24" :type="playControlIcon" color="white"/>
      </div>
    </div>
    <div class="song-detail">
      <div>
        {{currentSong.name}}
        -
        {{currentSong.artists}}
      </div>
      <div class="detail-time">
        {{formatTime(currentSong.currentTime / 1000)}}
        /
        {{formatTime(currentSong.duration / 1000)}}
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
    currentSong: Object as PropType<SongInfo>,
    isPlayerShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const playControlIcon = computed(() => props.isPlayerShow ? 'shrink' : 'open');
    const currentSong: Ref<SongInfo> = computed(() => {
      return {
        ...(props.currentSong as SongInfo),
      }
    });
    return {
      currentSong,
      playControlIcon,
      formatTime,
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