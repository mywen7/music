<template>
  <div class="discovery">
    <AsyncComponent>
      <div>
        <banner/>
        <suggest-playlist/>
        <suggest-song/>
        <suggest-mv/>
      </div>
    </AsyncComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Banner from './banner.vue';
import PlaylistCard from './components/playlist-card.vue';
import SuggestMv from './suggest-mv.vue';
import SuggestPlaylist from './suggest-playlist.vue';
import SuggestSong from './suggest-song.vue';

export default defineComponent ({
  components: {
    Banner,
    PlaylistCard,
    SuggestPlaylist,
    SuggestSong,
    SuggestMv,
  },
});
</script>

<style lang="scss" scoped>
.discovery {
  margin: 0px 150px;
}
</style>