<template>
  <Wrap title="最新歌单">
    <div class="play-wrap">
      <playlist-card 
        v-for="(cardInfo, index) in cardInfoList"
        :key="index"
        :card-info="cardInfo" 
        @card-click="cardClick"
      />
    </div>
  </Wrap>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, nextTick } from 'vue';
import playlistCard from './components/playlist-card.vue';
import http from '@/libs/fetch';
import { Playlist } from './interface';
import { RouterPush } from '../router';

export default defineComponent ({
  components: { playlistCard },
  async setup() {
    const cardInfoList: Ref<Playlist[]> = ref([]);
    const { routerPush } = RouterPush();
    const cardClick = (id: number) => {
      routerPush('playlist', id);
    }
    const res = await http('/personalized', {
      method: 'GET',
      query: {
        limit: 10,
      },
    })
    cardInfoList.value = res.result.map((ele: any) => {
      return {
        id: ele.id,
        img: ele.picUrl,
        title: ele.name,
        desc: ele.copywriter,
      }
    });
    return {
      cardInfoList,
      cardClick,
    }
  }
});
</script>

<style lang="scss" scoped>
.play-wrap {
  display: grid;
  grid-template-columns: repeat(5, 20%);
}
</style>