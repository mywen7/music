<template>
  <div class="playlist" @click="$emit('cardClick', cardInfo.id)">
    <div class="img-wrap" >
      <img class="img" :src="cardInfo.img"/>
      <div class="desc">
        {{ cardInfo.desc }}
      </div>
      <PlayIcon class="play-icon"/>
    </div>
    <div class="title">{{ cardInfo.title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Playlist } from '../interface';

export default defineComponent ({
  props: {
    cardInfo: Object as PropType<Playlist>,
  },
});
</script>

<style lang="scss" scoped>
.playlist {
  margin: 0 20px;
  margin-bottom: 16px;
  .img-wrap {
    width: 100%;
    position: relative;
    padding-top: 100%;
    overflow: hidden;
    .img {
      @include abs-stretch;
      height: 100%;
      width: 100%;
    }
    .desc {
      cursor: default;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 6px 6px 4px 6px;
      background-color:  rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: $transition;
      color: $white;
      font-size: $font-size-lg;
      @include text-ellipsis-multi(3);
    }
    .play-icon {
      opacity: 0;
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-size: 24px;
      transition: $transition;
      color: $white;
    }
    &:hover {
      .desc {
        transform: translateY(0);
      }
      .play-icon {
        opacity: 1;
      }
    }
  }
  .title {
    padding: 6px 0;
    color: $black;
    @include text-ellipsis();
  }
}

</style>