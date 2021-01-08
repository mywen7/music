<template>
  <div class="mv-card" @click="$emit('cardClick',cardInfo.id)">
    <div class="img-wrap">
      <img class="img" :src="cardInfo.img"/>
      <div class="play-count">播放量：{{cardInfo.playCount}}</div>
      <PlayIcon :size="50" class="play-icon"/>
    </div>
    <div class="desc">{{ cardInfo.name }}</div>
    <div class="desc">{{ cardInfo.artist }}</div>
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
    }
    .play-icon {
      @include abs-center;
    }
  }
  .desc {
    margin: 10px 0;
    @include text-ellipsis();
  }
  &:hover {
    .play-count {
      opacity: 1;
    }
  }
}
</style>