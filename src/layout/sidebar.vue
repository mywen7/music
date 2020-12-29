<template>
  <el-menu
    active-text-color=" #11B892"
    :default-active="active"
    background-color="#304256"
    text-color="#F9F9F9"
    router
  >
    <el-menu-item
      v-for="(route,index) in routes"
      :key="route.name"
      :index="route.index"
      :route="route.route"
    >
      <Icon
        :type="route.icon"
      />
      <span class="side-title">{{ route.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSidebarRoutes } from './helper';

export default defineComponent ({
  setup() {
    const currentRoute = useRoute();
    const routes = getSidebarRoutes().map((route, i) => {
      return {
        title: route.meta.title,
        icon: route.meta.icon,
        active: route.name === currentRoute.name,
        name: route.name,
        path: route.path,
        index: `${i + 1}`,
        route,
      }
    })
    const index = routes.findIndex((r) => r.name === currentRoute.name);
    return {
      active: `${index + 1}`,
      routes,
    }
  }
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - #{$header-height} * 2);
}
.side-title {
  margin-left: 10px;
}
</style>