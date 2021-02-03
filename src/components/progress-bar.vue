<template>
  <div
    class="progress-bar"
    id="progress-bar"
    @mouseup="barMouseup"
    @click="progressClick"
  >
    <div class="progress-banner" >
      <div 
        class="progress" 
        :style="fullStyle"
      ></div>
      <div 
        class="progress-btn" 
        @mousedown="mousedown" 
        @mouseup="mouseup"
        :style="moveStyle"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

export const DEFAULT_VOLUME = 0.75;
export const DEFAULT_KEY = '_volume_';

export default defineComponent ({
  name: 'ProgressBar',
  props: {
    isSilence: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const moveX = ref(Number(localStorage.getItem(DEFAULT_KEY)) || DEFAULT_VOLUME);
    watch(moveX, () => {
      localStorage.setItem(DEFAULT_KEY, moveX.value.toString());
      emit('volume-change', moveX.value);
    })
    watch(() => props.isSilence, () => {
      if (props.isSilence) {
        moveX.value = 0;
      } else {
        moveX.value++;
      }
    })
    const barDom = computed(() => document.getElementById('progress-bar'));
    const offsetX = computed(() => barDom.value?.getBoundingClientRect().x || 0)
    const fullStyle = computed(() => {
      return {
        width: `${moveX.value}px`,
      }
    })

    const moveStyle = computed(() => {
      return {
        left: `${moveX.value}px`,
      }
    })
    const isMouseEvent = ref(false);

    const moveEvent = (elem: any) => {
      isMouseEvent.value = true;
      if (elem.buttons === 1) {
        progressClick(elem);
      }
    }
    const mousedown = () => {
      barDom.value?.addEventListener('mousemove', moveEvent)
    }
    const mouseup = () => {
      barDom.value?.removeEventListener('mousemove', moveEvent)
      isMouseEvent.value = false;
    }
    const progressClick = (ev: any) => {
      const percent = ev.clientX - offsetX.value - 6
      moveX.value = percent < 0 ? 0 : percent > 100 ? 100 : percent ;
    }
    const barMouseup = () => {
      if (isMouseEvent.value) {
        mouseup();
      }
    }
    return {
      mousedown,
      fullStyle,
      moveStyle,
      mouseup,
      barMouseup,
      progressClick,
    }
  }
});
</script>

<style lang="scss" scoped>
$height: 2px;
.progress-bar {
  display: inline-block;
  height: 100%;
  padding-bottom: 2px;
  .progress-banner {
    vertical-align: middle;
    display: inline-block;
    position: relative;
    height: $height;
    width: 106px;
    background-color: #ece6e6;
    .progress {
      height: $height;
      background-color: $theme-color;
      overflow: hidden;
    }
    .progress-btn {
      position: absolute;
      top: -5px;
      @include round(12px);
      background-color: $theme-color;
    }
  }
}
</style>