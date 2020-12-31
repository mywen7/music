<template>
  <Wrap title="最新音乐">
    <div class="song-card">
      <song-card 
        v-for="(cardInfo, index) in cardInfoList"
        :key="index"
        :card-info="cardInfo"
      />
    </div>
  </Wrap>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import songCard from './components/song-card.vue';
import { useRouter } from 'vue-router';
import { Song } from './interface';
import http from '@/libs/fetch';


export default defineComponent ({
  components: { songCard },
  async setup() {
    const router = useRouter();
    const cardInfoList: Ref<Song[]> = ref([]);
    const res = await http('/personalized/newsong', {
      method: 'GET',
      query: {
        limit: 9,
      },
    })
    cardInfoList.value = res.result.map((ele: any) => {
      return {
        name: ele.name,
        id: ele.id,
        img: ele.picUrl,
        artist: ele.song.artists[0].name,
      }
    })
    return {
      cardInfoList,
    }
  }
});
</script>

<style lang="scss" scoped>
.song-card {
  display: grid;
  grid-template-columns: repeat(3, 31%);
  column-gap: 20px;
  row-gap: 30px;
}
</style>