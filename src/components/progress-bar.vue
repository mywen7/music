<template>
  <div
    class="progress-bar"
    :id="`progress-bar-${idName}`"
    @mouseup="barMouseup"
    @mousedown="progressClick"
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
    percent: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const moveX = ref(0);
    // 给滑块初始位置
    onMounted(() => {
      moveX.value = Number(localStorage.getItem(props.defaultKey || '')) * progressWidth();
    })
    // 监听滑块位置汇报进度
    watch(moveX, () => {
      const width = progressWidth();
      const percent = moveX.value / width;
      emit('percent-change', isNaN(percent) ? 0 : percent);
    })
    // 滑块位置置为0或取消
    watch(() => props.isZero, () => {
      if (props.isZero) {
        moveX.value = 0;
      } else {
        moveX.value++;
      }
    })
    const disable = ref(false);
    // 有传入进度的时候使用传入的进度更改滑块位置
    watch(() => props.percent, () => {
      if (!disable.value) {
        const width = progressWidth();
        moveX.value = width * props.percent;
      }
    })
    // 进度条Dom
    const barDom = computed(() => document.getElementById(`progress-bar-${props.idName}`));
    // 进度条左侧起始位置位于浏览器的哪里
    const beginleft = () => {
       return barDom.value?.getClientRects()[0].x || 0;
    };
    // 整个进度条的长度
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
    // 是否处于移动事件中
    const isMouseEvent = ref(false);

    // 进度条上鼠标移动
    const moveEvent = (elem: any) => {
      isMouseEvent.value = true;
      if (elem.buttons === 1) {
        progressClick(elem);
      }
    }
    // 滑块按下
    const mousedown = () => {
      barDom.value?.addEventListener('mousemove', moveEvent)
    }
    // 滑块抬起
    const mouseup = () => {
      barDom.value?.removeEventListener('mousemove', moveEvent)
      isMouseEvent.value = false;
    }
    // 进度条按下
    const progressClick = (ev: any) => {
      disable.value = true;
      const width = progressWidth();
      const begin = beginleft();
      const percent = ev.clientX - begin;
      moveX.value = percent < 0 ? 0 : percent > width ? width : percent;

    }
    // 进度条抬起
    const barMouseup = () => {
      if (isMouseEvent.value) {
        mouseup();
      }
      const width = progressWidth();
      const percent = moveX.value / width;
      emit('mouse-up-end', isNaN(percent) ? 0 : percent);
      disable.value = false;
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