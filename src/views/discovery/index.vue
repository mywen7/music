<template>
  <div class="discovery">
    <Suspense>
      <template #default>
        <div>
          <banner/>
          <suggest-playlist/>
        </div>
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
import PlaylistCard from './components/playlist-card.vue';
import SuggestPlaylist from './suggest-playlist.vue';

export default defineComponent ({
  components: {
    Banner,
    PlaylistCard,
    SuggestPlaylist,
  },
});
</script>

<style lang="scss" scoped>
.discovery {
  margin: 0px 150px;
}
</style>