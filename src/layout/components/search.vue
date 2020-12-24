<template>
  <div>
    <el-popover
      width="400px"
    >
      <search-panel 
        v-if="false"
        :panelInfo="panelInfo" 
        @check-tag="checkTag"
      />
      <search-section
        v-if="true"
        :content-list="searchContent"
      />
      <template #reference>
        <el-input
          size="mini"
          v-model="searchKey"
          prefix-icon="el-icon-search"
          placeholder="搜索"
          @input="searchInput"
        ></el-input>
      </template>
    </el-popover>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import SearchPanel from './search-panel.vue';
import SearchSection from './search-section.vue';
import { PanelInfo, SongSection } from '../interface';
import { http } from '../../libs/fetch';

function useSearchFn() {
  const searchKey = ref('');
  const searchInput = async (keyword: string) => {
    const res = await http('/search', {
      method: 'GET',
      query: {
        keywords: keyword,
      },
    })
  }
  return { searchKey, searchInput }
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

function useSearchContent() {
  const searchContent: Ref<SongSection[]> = ref([]);
}
export default defineComponent ({
  name: 'search',
  components: {
    SearchPanel,
    SearchSection,
  },
  setup() {
    const { searchKey, searchInput } = useSearchFn();
    const { panelInfo, checkTag } = useSearchPanel( searchKey);

    return {
      searchKey,
      panelInfo,
      checkTag,
      searchInput,
    }
  },
});
</script>

<style lang="scss" scoped>

</style>