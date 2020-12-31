<template>
  <div class="song-card">
    <div class="img-wrap">
      <img class="card-img" :src="cardInfo.img"/>
      <PlayIcon class="play-icon"/>
    </div>
    <div class="card-detail">
      <div>{{ cardInfo.name }}</div>
      <div>{{ cardInfo.artist }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Song } from '../interface';

export default defineComponent ({
  props: {
    cardInfo: Object as  PropType<Song>,
  },
});
</script>

<style lang="scss" scoped>
.song-card {
  border-radius: 12px;
  display: grid;
  grid-template-columns: 20% 80%;
  .img-wrap {
    position: relative;
    padding-top: 100%;
    .card-img {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .play-icon {
      opacity: 0;
      @include abs-center();
    }
    &:hover {
      .play-icon {
        opacity: 1;
      }
    }
  }
  .card-detail {
    display: grid;
    grid-template-rows: 50%;
    align-items: center;
    
  }
  &:hover {
    background-color: #e9e9e9;
  }
}
</style>