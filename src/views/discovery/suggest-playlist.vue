<template>
  <Wrap title="最新歌单" v-if="cardInfoList.length > 0">
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
import { useRouter } from 'vue-router';

export default defineComponent ({
  components: { playlistCard },
  async setup() {
    const cardInfoList: Ref<Playlist[]> = ref([]);
    const router = useRouter();
    const cardClick = (id: number) => {
      router.push({
        name: 'playlist',
        query: {
          id,
        },
      });
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
  column-gap: 20px;
}
</style>