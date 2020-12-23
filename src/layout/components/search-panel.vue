<template>
  <div class="search-panel">
    <div 
      v-for="(panel,index) in panelInfo"
      :key="index"
    >
      <div class="section">
        {{ panel.title }}
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
  font-size: $font-size-sm;
  color: $black;
  
}
::v-deep .el-tag {
  cursor: pointer;
  margin: 6px 5px;
  background-color: $theme-color;
  color: $white;
}
</style>