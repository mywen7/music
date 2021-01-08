<template>
  <div class="card" @click="$emit('cardClick',cardInfo.id)">
    <div class="background" :style="bckImgStyle"></div>
    <div class="background-mask"></div>
    <div class="card-wrap" >
      <img class="img" :src="cardInfo.img"/>
      <div class="wrap-detail">
        <div class="tag">精品歌单</div>
        <div class="title">{{cardInfo.title}}</div>
        <div class="desc">{{cardInfo.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed, PropType } from 'vue';
import { Playlist } from '@/views/discovery/interface';

export default defineComponent ({
  props: {
    cardInfo: {
      type: Object as PropType<Playlist>,
      default: '',
    },
  },
  setup(props) {
    const bckImgStyle = computed(() => {
      return {
        backgroundImage: `url(${props.cardInfo.img})`,
      }
    })
    return {
      bckImgStyle,
    }
  },
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: default;
  .card-wrap {
    padding: 20px;
    display: flex;
    min-height: 140px;
    .img {
      width: 140px;
    }
    .wrap-detail {
      margin-left: 20px;
      font-size: $font-size-sm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .tag {
        align-self: start;
        padding: 4px 16px;
        margin-bottom: 16px;
        color: $gold;
        border: 1px solid currentColor;
        border-radius: 4px;
      }
      .title {
        margin-bottom: 8px;
        font-size: $font-size-lg;
        color: $white;
        @include text-ellipsis;
      }
      .desc {
        color: $font-color-transparent;
        @include text-ellipsis-multi(5);
      }
    }
  }
  .background {
    @include abs-stretch;
    filter: blur(16px);
    z-index: -1;
  }
  .background-mask {
    @include abs-stretch;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
</style>