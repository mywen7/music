<template>
  <div class="my-footer">
    <player/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Player from '../player/index.vue';

export default defineComponent ({
  components: { Player },
});
</script>

<style lang="scss" scoped>
.my-footer {
  height: $header-height;
}
</style>