<template>
  <div class="discovery">
    <Suspense>
      <template #default>
        <div>
          <banner/>
          <suggest-playlist/>
          <suggest-song/>
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
import SuggestSong from './suggest-song.vue';

export default defineComponent ({
  components: {
    Banner,
    PlaylistCard,
    SuggestPlaylist,
    SuggestSong,
  },
});
</script>

<style lang="scss" scoped>
.discovery {
  margin: 0px 150px;
}
</style>