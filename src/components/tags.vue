<template>
  <div class="tags">
    <el-button 
      v-for="(tag,index) in tags"
      :key="index"
      type="text"
      @click="$emit('tag-change', tag)"
    >
      {{tag}}
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent ({
  name: 'Tags',
  props: {
    tags: {
      type: Array,
      default: [],
    },
  },
});
</script>

<style lang="scss" scoped>
.tags {
  text-align: right;
  margin: 10px 0 20px 0;
  .el-button--text {
    color: $theme-color;
  }
}
</style>