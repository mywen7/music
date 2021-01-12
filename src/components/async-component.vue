<template>
  <Suspense>
    <template #default>
      <slot/>
    </template>
    <template #fallback>
      <div class="loading">
        <i class="el-icon-loading"/>
        <div>载入中</div>
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'AsyncComponent',
});
</script>

<style lang="scss" scoped>
.loading {
  font-size: 22px;
  color: $theme-color;
  height: 80vh;
  @include flex-center;
}
</style>