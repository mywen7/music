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
import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
import TagSection from './components/tag-section.vue';
import SuggestSection from './components/suggest-section.vue';
import { PanelInfo, SongSection, Song, TypeEnum } from './interface';
import { http } from '../../libs/fetch';
import { useRouter } from 'vue-router';

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
      const suggest = res.result;
      suggestList.value = [
        {
          title: '单曲',
          type: 'music',
          content: transforSong(suggest.songs),
        },
        {
          title: '歌单',
          type: 'playlist',
          content: transforSong(suggest.playlists),
        },
        {
          title: 'mv',
          type: 'mv',
          content: transforSong(suggest.mvs),
        },
        {
          title: '歌手',
          type: 'yonghu',
          content: transforSong(suggest.artists),
        },
        {
          title: '专辑',
          type: 'playlist-menu',
          content: transforSong(suggest.albums),
        },
      ].filter((item) => item.content)
    }
  }
  return { searchKey, isSearch, suggestInput, suggestList }
}

function useSearchPanel(searchKey: Ref<string>) {
  const panelInfo: Ref<PanelInfo[]> = ref([]);
  const checkTag = (content: string) => {
    const router = useRouter();
    router.replace({name: 'search', params: {song: content}})
  }
  onMounted(async () => {
    const res = await http('search/hot', {
      method: 'POST',
    })
    const data = res.result.hots.map((hot: any) => hot.first);
    const hotContent: PanelInfo = {
      title: '热门搜索',
      content: [...data],
    }
    panelInfo.value.push(hotContent);
  })

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