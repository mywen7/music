<template>
  <div class="mv-card" @click="$emit('cardClick',cardInfo.id)">
    <div class="img-wrap">
      <img class="img" :src="cardInfo.img"/>
      <div class="play-count">播放量：{{cardInfo.playCount}}</div>
      <PlayIcon :size="50" class="play-icon"/>
    </div>
    <div class="desc name">{{ cardInfo.name }}</div>
    <div class="desc artist">{{ cardInfo.artist }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { MV } from '../interface';

export default defineComponent ({
  props: {
    cardInfo: Object as PropType<MV>,
  },
})
</script>
<style lang="scss" scoped>
.mv-card {
  .img-wrap {
    position: relative;
    padding-top: 55%;
    .img {
      @include abs-stretch;
      width: 100%;
      height: 100%;
    }
    .play-count {
      opacity: 0;
      position: absolute;
      top: 10px;
      right: 10px;
      color: $white;
      font-size: $font-size-sm;
    }
    .play-icon {
      @include abs-center;
      opacity: 0;
    }
  }
  .desc {
    @include text-ellipsis();
    &.name {
      margin-top: 5px;
      font-size: $font-size-sm;
    }
    &.artist {
      font-size: $font-size-sm;
      color: #BEBEBE;
    }
  }
  &:hover {
    .play-count {
      opacity: 1;
    }
    .play-icon {
      opacity: 1;
    }
  }
}
</style>