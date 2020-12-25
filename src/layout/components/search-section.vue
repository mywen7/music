<template>
  <div>
    <div class="title">
      <Icon type="music" :size="16"/>
      单曲
    </div>
    <div 
      class="content"
      v-for="(content, index) in contentList"
    >
      {{ content.name }} - {{ content.artists}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import icon from '@/components/icon.vue';
import { SongSection } from '../interface';

export default defineComponent ({
  components: { icon },
  props: {
    contentList: Array as PropType<SongSection[]>,
  }
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  i {
    margin-right: 3px;
  }
}
.content {
  padding: 5px 20px;
}
</style>