<template>
  <div>
    <div class="title">
      <Icon :type="type" :size="16"/>
      {{ title }}
    </div>
    <div 
      class="content"
      v-for="(content, index) in contentList"
    >
      {{ content.name }}
      <span v-if="content.artists">-</span>
      {{ content.artists}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Song} from '../interface';

export default defineComponent ({
  props: {
    title: {
      type: String,
      default: '单曲',
    },
    type: {
      type: String,
      default: 'music',
    },
    contentList: Array as PropType<Song[]>,
  },
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