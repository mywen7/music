<template>
  <el-container class="m-container">
    <el-header style="padding: 0;">
      <yi-header />
    </el-header>
    <el-container>
      <el-aside width="240px">
        <sidebar />
      </el-aside>
      <el-main class="m-main">
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="m-footer">
      <yi-footer></yi-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YiHeader from './header.vue';
import Sidebar from './sidebar.vue';
import YiFooter from './footer.vue';

export default defineComponent ({
  components: {
    YiHeader,
    Sidebar,
    YiFooter,
  },
});
</script>
<style lang="scss" scoped>
.m-container {
  overflow-x: hidden;
}
.m-main {
  user-select: none;
  height: calc(100vh - #{$header-height} * 2);
  min-width: $layout-content-min-width;
}
</style>