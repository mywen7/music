<template>
  <div class="playlist">
    <div class="img-wrap">
      <img class="img" :src="cardInfo.img"/>
      <div class="desc">
        {{ cardInfo.desc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Playlist } from '../interface';

export default defineComponent ({
  setup() {
    const cardInfo: Playlist = reactive(
      {
        id: 11111,
        img: 'https://p2.music.126.net/_0_PAKqG6-5ms0PyCJwXJA==/109951165586360298.jpg',
        desc: '入耳即醉，带你领略不一样的西语魅力',
        title: '编辑推荐：来听听极具魅力的西语',
      }
    )
    return {
      cardInfo,
    }
  },
});
</script>

<style lang="scss" scoped>
.playlist {
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  .img-wrap {
    width: 300px;
    height: 300px;
    position: relative;
    overflow: hidden;
    .desc {
      max-height: 100%;
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
    .img {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    &:hover {
      .desc {
        transform: translateY(0);
      }
    }
  }
}

</style>