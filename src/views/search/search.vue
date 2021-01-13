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
          :key="index"
          :type="suggest.type"
          :title="suggest.title"
          :content-list="suggest.content"
          @search="suggestSearch"
        />
      </div>
      <tag-section  
        v-else
        :panelInfo="panelInfo" 
        @check-tag="checkTag"
        @clear="recentSearchClear"
      />
      <template #reference>
        <el-input
          size="mini"
          v-model.trim="searchKey"
          prefix-icon="el-icon-search"
          placeholder="搜索"
          @input="suggestInput"
          @change="searchChange"
        ></el-input>
      </template>
    </el-popover>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted, watch, reactive } from 'vue';
import TagSection from './components/tag-section.vue';
import SuggestSection from './components/suggest-section.vue';
import { PanelInfo, SongSection, Song, NomalType } from './interface';
import http from '../../libs/fetch';
import { useRouter } from 'vue-router';
import { RouterPush } from '../router';
import { recentSearch, recentSearchFn } from './helper';

const transforSong = (data: any) => {
  return data?.map((ele: any) => {
    return {
      id: ele.id || -1,
      name: ele.name || '',
      artists: ele?.artists?.map((art: any) => art.name).join('/') || ele?.artist?.name || '',
      album: {
        id: ele?.album?.id || -1,
        name: ele?.album?.name || '',
      } || '',
    }
  });
}

function useSuggestSection() {
  const searchKey = ref('');
  const isSearch = computed(() => suggestList.value.length > 0 && searchKey.value.length > 0);
  const suggestList: Ref<SongSection[]> = ref([]);
  const suggestInput = async () => {
    if (searchKey.value.trim()) {
      const res = await http('/search/suggest', {
        method: 'GET',
        query: {
          keywords: searchKey.value,
        },
      })
      const suggest = res.result;
      suggestList.value = [
        {
          title: 'song',
          type: 'music',
          content: transforSong(suggest.songs),
        },
        {
          title: 'playlist',
          type: 'playlist',
          content: transforSong(suggest.playlists),
        },
        {
          title: 'mv',
          type: 'mv',
          content: transforSong(suggest.mvs),
        },
        {
          title: 'artist',
          type: 'yonghu',
          content: transforSong(suggest.artists),
        },
        {
          title: 'album',
          type: 'playlist-menu',
          content: transforSong(suggest.albums),
        },
      ].filter((item) => item.content)
    }
  }
  const router = useRouter();
  const { routerPush } = RouterPush();
  const suggestSearch = (event: NomalType) => {
    routerPush(event.type, event.id)
  }
  const searchChange = () => {
    recentSearchFn.add(searchKey.value);
    router.push({
      name: 'search',
      query: {
        s: searchKey.value,
        type: 'songs',
      },
    })
  }
  return { searchKey, isSearch, suggestInput, suggestList, suggestSearch,
    searchChange,
  }
}

function useTagSection() {
  const panelInfo: PanelInfo[] = reactive([
    {
      title: '热门搜索',
      content: [],
    },
    {
      title: '搜索历史',
      content: [],
    },
  ]);
  const router = useRouter();
  const checkTag = (content: string) => {
    recentSearchFn.add(content);
    router.push({
      name: 'search',
      query: {
        s: content,
        type: 'songs',
      },
    })
  }
  const recentSearchClear = () => {
    recentSearchFn.clear();
  }
  onMounted(async () => {
    const res = await http('search/hot', {
      method: 'POST',
    })
    const data = res.result.hots.map((hot: any) => hot.first);
    panelInfo[0].content = data;
    panelInfo[1].content = recentSearch;
  })
  return { panelInfo, checkTag, recentSearchClear };
}

export default defineComponent ({
  name: 'search',
  components: {
    TagSection,
    SuggestSection,
  },
  setup() {
    const {
      searchKey, isSearch, suggestInput, suggestList,
      suggestSearch, searchChange,
    } = useSuggestSection();
    const { panelInfo, checkTag, recentSearchClear } = useTagSection();

    return {
      searchKey,
      isSearch,
      panelInfo,
      checkTag,
      suggestInput,
      suggestList,
      recentSearchClear,
      suggestSearch,
      searchChange,
    }
  },
});
</script>

<style lang="scss" scoped>

</style>