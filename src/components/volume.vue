<template>
  <div class="volume">
    <span class="type-icon" @click="toggleSilence">
      <Icon
        :type="iconType"
      />
    </span>
    <div class="volume-progress">
      <ProgressBar 
        id-name="volume"
        :is-zero="isSilence" 
        :default-key="DEFAULT_KEY"
        @percent-change="volumeChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

export const DEFAULT_VOLUME = 0.75;
export const DEFAULT_KEY = '_volume_';

export default defineComponent ({
  name: 'Volume',
  setup(props, {emit}) {
    const volume = ref(Number(localStorage.getItem(DEFAULT_KEY)) || DEFAULT_VOLUME);
    watch(volume, () => {
      emit('volume-change', volume.value);
    })
    const isSilence = computed(() => volume.value === 0);
    const iconType = computed(() =>  isSilence.value ? 'silence' : 'horn');
    const toggleSilence = () => {
      volume.value === 0 ? volume.value++ : volume.value = 0;
    }
    const volumeChange = (event: number) => {
      volume.value = event;
      localStorage.setItem(DEFAULT_KEY, event.toString());
    }
    return {
      volume,
      toggleSilence,
      iconType,
      volumeChange,
      isSilence,
      DEFAULT_KEY,
    }
  }
});
</script>

<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  .type-icon {
    margin-right: 10px;
  }
  .volume-progress {
    width: 120px;
  }
}
</style>