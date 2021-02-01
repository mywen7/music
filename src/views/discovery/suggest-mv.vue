<template>
  <Wrap title="最新MV">
    <div class="mv-wrap">
      <mv-card 
        v-for="(cardInfo, index) in cardInfoList"
        :key="index"
        :card-info="cardInfo"
        @card-click="cardClick"
      />
    </div>
  </Wrap>
</template>

<script lang="ts">
import http from '@/libs/fetch';
import { defineComponent, Ref, ref } from 'vue';
import mvCard from './components/mv-card.vue';
import { MV } from './interface';
import { RouterPush } from '../router';

export default defineComponent ({
  components: { mvCard },
  async setup() {
    const { routerPush } = RouterPush();
    const cardInfoList: Ref<MV[]> = ref([]);
    const res = await http('/personalized/mv', {
      method: 'GET',
    });
    cardInfoList.value = res.result.map((ele: any) => {
      return {
        id: ele.id,
        name: ele.name,
        playCount: ele.playCount,
        artist: ele.artistName,
        img: ele.picUrl,
      };
    });
    const cardClick = (id: number) => {
      routerPush('mv', id);
    }
    return {
      cardClick,
      cardInfoList,
    }
  }
})
</script>
<style lang="scss" scoped>
.mv-wrap {
  display:grid;
  grid-template-columns: repeat(4,24%);
  column-gap: 30px;
  justify-content: center;
}
</style>