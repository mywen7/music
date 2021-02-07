<template>
  <div>
    <slot name="banner"/>
    <slot name="action"/>
    <slot/>
    <el-pagination
      :page-size="size"
      :current-page="page"
      @current-change="onPageChange"
      :total="total"
      layout="prev, pager, next"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'Pagination',
  props: {
    pageProps: Object,
    // page: Number,
    // size: Number,
    // total: Number,
    // onPageChange: Function,
  },
  setup(props) {
    const pageProps = props.pageProps;
    return {
      ...pageProps,
    }
  },
});
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
  :deep(.el-pager li.active) {
    color: $theme-color;
  }
  :deep(.el-pager li:hover){
    color: $theme-color;
  }
}
</style>