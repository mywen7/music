<template>
  <div>
    <div class="m-title">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'Wrap',
  props: {
    title: String,
  },
});
</script>

<style lang="scss" scoped>
.m-title {
  padding: 20px 0;
  font-size: 30px;
  margin-bottom: 20px;
  white-space:nowrap;
}
</style>