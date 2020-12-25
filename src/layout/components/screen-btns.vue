<template>
  <div class="buttons">
    <div
      @click="$emit('clickLogo')"
      class="mac-button red"
    >
      <Icon
        :size="11"
        type="home"
      />
    </div>
    <div
      @click="exitFullScreen"
      class="mac-button yellow"
    >
      <Icon
        :size="11"
        type="minus"
      />
    </div>
    <div
      @click="fullscreen"
      class="mac-button green"
    >
      <Icon
        :size="11"
        type="fullscreen"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { requestFullScreenFn, exitFullscreenFn, isFullscreenFn } from '../../libs/common';

export default defineComponent ({
  setup() {
    const fullscreen = () => {
      requestFullScreenFn(document.documentElement);
    }
    const exitFullScreen = () => {
      if (isFullscreenFn()) {
        exitFullscreenFn();
      }
    }
    return {
      fullscreen,
      exitFullScreen,
    }
  }
});
</script>

<style lang="scss" scoped>
.buttons {
  width: 150px;
  height: $header-height;
  display: flex;
  align-items: center;
  &:hover {
    .mac-button > i {
      opacity: 1;
    }
  }
  .mac-button {
    @include round(15px);
    @include flex-center();
    margin-right: 10px;
    &.red {
      background-color:  #ed655a;
    }
    &.green {
      background-color: #72be47;
    }
    &.yellow {
      background-color: #e0c04c;
    }
    
    i {
      opacity: 0;
      color: $black;
      transition: $transition;
    }
  }
}
</style>