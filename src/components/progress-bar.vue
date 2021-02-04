<template>
  <div
    class="progress-bar"
    :id="`progress-bar-${idName}`"
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
import { defineComponent, computed, ref, watch, onMounted } from 'vue';

export default defineComponent ({
  name: 'ProgressBar',
  props: {
    idName: {
      type: String,
      default: '',
    },
    isZero: {
      type: Boolean,
      default: false,
    },
    defaultKey: String,
  },
  setup(props, { emit }) {
    const moveX = ref(0);
    onMounted(() => {
      moveX.value = Number(localStorage.getItem(props.defaultKey || '')) * progressWidth();
    })
    watch(moveX, () => {
      const width = progressWidth();
      const percent = moveX.value / width;
      emit('percent-change', isNaN(percent) ? 0 : percent);
    })
    watch(() => props.isZero, () => {
      if (props.isZero) {
        moveX.value = 0;
      } else {
        moveX.value++;
      }
    })
    const barDom = computed(() => document.getElementById(`progress-bar-${props.idName}`));
    const beginleft = () => {
       return barDom.value?.getClientRects()[0].x || 0;
    };
    const progressWidth = () => {
      return barDom.value?.clientWidth || 0;
    }
    const fullStyle = computed(() => {
      return {
        width: `${moveX.value}px`,
      }
    })

    const moveStyle = computed(() => {
      return {
        left: `${moveX.value - 6}px`,
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
      const width = progressWidth();
      const begin = beginleft();
      const percent = ev.clientX - begin;
      moveX.value = percent < 0 ? 0 : percent > width ? width : percent;
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
  },
});
</script>

<style lang="scss" scoped>
$height: 2px;
.progress-bar {
  display: inline-block;
  height: 100%;
  width: 100%;
  padding-bottom: 2px;
  .progress-banner {
    vertical-align: middle;
    display: inline-block;
    position: relative;
    height: $height;
    width: 100%;
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