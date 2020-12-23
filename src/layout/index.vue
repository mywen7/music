<template>
  <el-container>
    <el-header style="padding: 0;">
      <yi-header />
    </el-header>
    <el-container>
      <el-aside>
        <sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>
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