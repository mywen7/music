<template>
  <div class="playlist" @click="$emit('cardClick', cardInfo.id)">
    <div class="img-wrap" >
      <img class="img" :src="cardInfo.img"/>
      <div class="desc">
        {{ cardInfo.desc }}
      </div>
      <div class="play-icon">
        <Icon 
          :size="22"
          type="play"
        />
      </div>
    </div>
    <div class="title">{{ cardInfo.title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { Playlist } from '../interface';

export default defineComponent ({
  props: {
    cardInfo: Object as PropType<Playlist>,
  },
});
</script>

<style lang="scss" scoped>
.playlist {
  margin: 20px;
  margin-bottom: 16px;
  .img-wrap {
    width: 100%;
    position: relative;
    padding-top: 100%;
    overflow: hidden;
    .img {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .desc {
      cursor: default;
      padding: 6px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color:  rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: $transition;
      color: $white;
      font-size: $font-size-lg;
    }
    .play-icon {
      display: inline-block;
      @include round(36px);
      opacity: 0;
      background-color: #e9e9e9;
      position: absolute;
      bottom: 8px;
      right: 8px;
      transition: $transition;
      color: $red;
      line-height: 36px;
      text-align: center;
    }
    &:hover {
      .desc {
        transform: translateY(0);
      }
      .play-icon {
        opacity: 0.7;
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