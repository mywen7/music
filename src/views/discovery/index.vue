<template>
  <div class="discovery">
    <Suspense>
      <template #default>
        <banner/>
      </template>
      <template #fallback>
        <div></div>
      </template>
    </Suspense>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Banner from './banner.vue';

export default defineComponent ({
  components: {
    Banner,
  },
});
</script>

<style lang="scss" scoped>
.discovery {
  margin: 0px 150px;
}
</style>