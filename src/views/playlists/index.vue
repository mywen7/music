<template>
  <Suspense>
    <template #default>
      <playlist/>
    </template>
    <template #fallback>
      <div></div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import playlist from './playlist.vue';

export default defineComponent ({
  components: { playlist },

});
</script>

<style lang="scss" scoped>

</style>