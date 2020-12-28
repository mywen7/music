<template>
  <div>
    <el-popover
      width="400px"
    >
      <div 
        v-if="isSearch"
        class="suggest"
      >
        <suggest-section
          v-for="(suggest, index) in suggestList"
          :type="suggest.type"
          :title="suggest.title"
          :content-list="suggest.content"
        />
      </div>
      <tag-section  
        v-else
        :panelInfo="panelInfo" 
        @check-tag="checkTag"
      />
      <template #reference>
        <el-input
          size="mini"
          v-model="searchKey"
          prefix-icon="el-icon-search"
          placeholder="搜索"
          @input="suggestInput"
        ></el-input>
      </template>
    </el-popover>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import TagSection from './components/tag-section.vue';
import SuggestSection from './components/suggest-section.vue';
import { PanelInfo, SongSection, Song, TypeEnum } from './interface';
import { http } from '../../libs/fetch';

const transforSong = (data: any) => {
  return data.map((ele: any) => {
    return {
      id: ele.id,
      name: ele.name,
      artists: ele.artists.map((art: any) => art.name).join('/') || '',
      album: {
        id: ele.album.id,
        name: ele.album.name,
      } || '',
    }
  })
}
function useSearchFn() {
  const searchKey = ref('');
  const isSearch = computed(() => searchKey.value.length > 0);
  const suggestList: Ref<SongSection[]> = ref([]);
  const suggestInput = async () => {
    if (searchKey.value.trim()) {
      const res = await http('/search/suggest', {
        method: 'GET',
        query: {
          keywords: searchKey.value,
        },
      })
    }
  }
  return { searchKey, isSearch, suggestInput, suggestList }
}

function useSearchPanel(searchKey: Ref<string>) {
  const panelInfo: Ref<PanelInfo[]> = ref([
      {
        title: '热门搜索',
        content: ['aaaaaaaaa', 'bbbbbbbb', 'ccccccccc'],
      },
      {
        title: '最近搜索',
        content: ['ssssssss', '传传传传传传v', '啊啊啊'],
      },
    ]);
  const checkTag = (content: string) => {
    searchKey.value = content;
  }
  return { panelInfo, checkTag };
}

export default defineComponent ({
  name: 'search',
  components: {
    TagSection,
    SuggestSection,
  },
  setup() {
    const { searchKey, isSearch, suggestInput, suggestList } = useSearchFn();
    const { panelInfo, checkTag } = useSearchPanel( searchKey);

    return {
      searchKey,
      isSearch,
      panelInfo,
      checkTag,
      suggestInput,
      suggestList,
    }
  },
});
</script>

<style lang="scss" scoped>

</style>