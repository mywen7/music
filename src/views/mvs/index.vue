<template>
  <div class="my-mv">
    <mv-type
      :type-list="typeList"
      :active="active"
      @active-change="activeTypeChange"
    />
    <Pagination :page-props="pageProps">
      <div class="mv-wrap">
        <mv-card
          v-for="mvCardInfo in cardInfoList"
          :key="mvCardInfo.id"
          :cardInfo="mvCardInfo"
        />
      </div>
    </Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, reactive } from 'vue';
import mvType from './components/mv-type.vue';
import MvCard from '../discovery/components/mv-card.vue';
import { MV } from '../discovery/interface';
import http from '@/libs/fetch';
import usePage from '@/components/usePagination';

function transforMv(ele: any) {
  return {
    id: ele.id,
    name: ele.name,
    artist: ele.artists.map((a: any) => a.name).join('/'),
    img: ele.cover,
    playCount: ele.playCount,
  }
}

function useFetchData() {
  const total = ref(0);
  const pageProps = usePage<MV>(async ({page, size, tag}) => {
    const res = await http('/mv/all', {
      method: 'GET',
      query: {
        area: tag[0],
        type: tag[1],
        order: tag[2],
        limit: size,
        offset: (page - 1) * size,
      },
    })
    total.value = res.count || total.value;
    return {
      total: total.value,
      items: res.data.map(transforMv),
    };
  });
  return { pageProps }
}
function useTypeChange(tag: Ref<string[]>) {
  const typeList = reactive([
      {
        type: '地区',
        content: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      },
      {
        type: '类型',
        content: ['全部', '官方版', '原声', '现场版', '网易出品'],
      },
      {
        type: '排序',
        content: ['上升最快', '最热', '最新'],
      },
    ])
  const active = ref([
    '全部',
    '全部',
    '上升最快',
  ])
  const activeTypeChange = (event: {index: number, tag: string}) => {
    
    active.value[event.index] = event.tag;
    tag.value = active.value;
    console.log(tag)
  }
  return { typeList, active, activeTypeChange }
}
export default defineComponent ({
  components: { mvType, MvCard },
  setup() {
    const { pageProps } = useFetchData();
    const { typeList, active, activeTypeChange } = useTypeChange(pageProps.tag);
    return {
      cardInfoList: pageProps.items,
      typeList,
      active,
      activeTypeChange,
      pageProps,
    }
  }
});
</script>

<style lang="scss" scoped>
.my-mv {
  margin: 0 150px;
  .mv-wrap {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(5, 18%);
    column-gap: 30px;
    row-gap: 35px;
    :deep(.img-wrap .img) {
      border-radius: 5px;
    }
  }
}
</style>