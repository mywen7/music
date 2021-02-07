<template>
  <div>
    <div class="title">
      <Icon :type="type" :size="16"/>
      {{ titleTip }}
    </div>
    <div 
      class="content"
      v-for="content in contentList"
      :key="content.id"
      @click="search(content)"
    >
      {{ content.name }}
      <span v-if="content.artists">-</span>
      {{ content.artists}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Song, TypeEnum, NomalType } from '../interface';

function transForType(type: string) {
  switch (type) {
    case 'playlist':
      return TypeEnum.playlist;
    case 'mv':
      return TypeEnum.mv;
    case 'artist':
      return TypeEnum.artist;
    case 'album':
      return TypeEnum.album;
    default:
      return TypeEnum.song;
  }
}
export default defineComponent ({
  props: {
    title: {
      type: String,
      default: 'song',
    },
    type: {
      type: String,
      default: 'music',
    },
    contentList: Array as PropType<Song[]>,
  },
  setup(props, { emit }) {
    const titleTip = transForType(props.title);
    const search = (content: Song) => {
      const data: NomalType = {
          type: props.title,
          id: content.id,
        }
      emit('search', data )
    }
    return {
      search,
      titleTip,
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  color: $theme-color;
  i {
    margin-right: 3px;
  }
}
.content {
  cursor: pointer;
  padding: 5px 20px;
  font-size: $font-size-xs;
  &:hover {
    background-color: #ebebeb;
    color: $theme-color;
  }
}
</style>