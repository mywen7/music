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
    <Wrap title="最新歌单">
      <playlist-card />
    </Wrap>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Banner from './banner.vue';
import PlaylistCard from './components/playlist-card.vue';

export default defineComponent ({
  components: {
    Banner,
    PlaylistCard,
  },
});
</script>

<style lang="scss" scoped>
.discovery {
  margin: 0px 150px;
}
</style>