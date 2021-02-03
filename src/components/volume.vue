<template>
  <div class="volume">
    <span class="type-icon" @click="toggleSilence">
      <Icon
        :type="iconType"
      />
    </span>
    <ProgressBar 
      :is-silence="isSilence" 
      @volume-change="volumeChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { DEFAULT_KEY, DEFAULT_VOLUME } from '../components/progress-bar.vue';


export default defineComponent ({
  name: 'Volume',
  setup(props, {emit}) {
    const volume = ref(Number(localStorage.getItem(DEFAULT_KEY)) || DEFAULT_VOLUME);
    watch(volume, () => {
      emit('volume-change', volume);
    })
    const isSilence = computed(() => volume.value === 0);
    const iconType = computed(() =>  isSilence.value ? 'silence' : 'horn');
    const toggleSilence = () => {
      volume.value === 0 ? volume.value++ : volume.value = 0;
    }
    const volumeChange = (event: number) => {
      volume.value = event;
    }
    return {
      volume,
      toggleSilence,
      iconType,
      volumeChange,
      isSilence,
    }
  }
});
</script>

<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  .type-icon {
    margin-right: 5px;
  }
}
</style>