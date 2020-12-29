<template>
  <div class="search-panel">
    <div 
      v-for="(panel,index) in panelInfo"
      :key="index"
    >
      <div 
        class="section" 
        v-if="panel.content.length"
      >
        <span>{{ panel.title }}</span>
        <span 
          class="delete"
          v-if="panel.title === '搜索历史'"
          @click="$emit('clear')"
        >
          清空
          <Icon 
            :size="12"
            type="remove"
          />
        </span>
      </div>
      <div>
        <el-tag 
          size="small"
          v-for="(content, index) in panel.content"
          :key="index"
          @click="$emit('check-tag', content)"
        >
          {{ content }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PanelInfo } from '../interface';

export default defineComponent ({
  props: {
    panelInfo: Array as PropType<PanelInfo[]>,
  },
});
</script>

<style lang="scss" scoped>
.section {
  cursor: default;
  font-size: $font-size-sm;
  color: $black;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  .delete {
    color: #686464;
  }
}
:deep(.el-tag) {
  cursor: pointer;
  margin: 6px 5px;
  background-color: $theme-color;
  color: $white;
}
</style>