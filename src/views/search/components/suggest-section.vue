<template>
  <div>
    <div class="title">
      <Icon :type="type" :size="16"/>
      {{ title }}
    </div>
    <div 
      class="content"
      v-for="(content, index) in contentList"
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
import { Song, TypeEnum } from '../interface';

export default defineComponent ({
  props: {
    title: {
      type: String as PropType<TypeEnum>,
      default: '单曲',
    },
    type: {
      type: String,
      default: 'music',
    },
    contentList: Array as PropType<Song[]>,
  },
  setup(props, { emit }) {
    const search = (content: Song) => {
      emit('search',
        {
          title: props.title,
          content,
        }
      )
    }
    return {
      search,
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