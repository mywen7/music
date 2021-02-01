<template>
  <div class="my-player">
    <music-info/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import musicInfo from './components/song-info.vue';

export default defineComponent ({
  components: { musicInfo },

});
</script>

<style lang="scss" scoped>
.my-player {
  height: $header-height;
  display: grid;
  align-items: center;
}
</style>