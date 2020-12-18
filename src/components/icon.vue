<template>
  <i
    class="iconfont icon-component"
    :class="iconClass"
    :style="iconStyle"
  />
</template>
<script lang="ts">
import { toRem } from '../libs/rem';
import { computed } from 'vue';

interface RefStyle {
  fontSize: string;
  transform?: string;
}

export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 16,
    },
    type: String,
    color: String,
    backdrop: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {

    const iconClass = computed(() => {
      let className = `icon-${props.type}`;
      if (props.color) {
        className += ` icon-color-${props.color}`
      }
      return className;
    });

    const iconStyle = computed(() => {
      const chromeMinSize = 12;
      // 支持小于12px
      const refStyle: RefStyle = { fontSize: toRem(props.size) };
      if (props.size < chromeMinSize ) {
        const ratio = props.size / chromeMinSize;
        refStyle.transform = `scale(${ratio})`
      }
      return refStyle;
    });

    const onClick = () => {
      emit('click')
    };

    const backDropSize = computed(() => {
      const backDropSizeRatio = 1.56;
      return toRem(backDropSizeRatio * props.size)
    });
    return {
      iconClass,
      onClick,
      iconStyle,
      backDropSize,
    }
  },
}
</script>