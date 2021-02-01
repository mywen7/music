<template>
  <i
    class="iconfont icon-component"
    :class="iconClass"
    :style="iconStyle"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toRem } from '../libs/rem';
import { computed } from 'vue';

interface RefStyle {
  fontSize: string;
  transform?: string;
}

export default defineComponent ({
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 16,
    },
    type: String,
    color: String,
  },
  setup(props) {

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

    return {
      iconClass,
      iconStyle,
    }
  },
})
</script>
<style lang="scss" scoped>
.icon-color {
  &-theme {
    color: $theme-color;
  }
  &-white {
    color: $white;
  }
  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>