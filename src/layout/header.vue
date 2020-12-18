<template>
  <div class="header"> 
    <div class="left">
      <div class="buttons">
        <div
          @click="onClickLogo"
          class="mac-button red"
        >
          <Icon
            :size="9"
            type="home"
          />
        </div>
        <div
          @click="exitFullscreen"
          class="mac-button yellow"
        >
          <Icon
            :size="9"
            type="minus"
          />
        </div>
        <div
          @click="fullscreen"
          class="mac-button green"
        >
          <Icon
            :size="9"
            type="fullscreen"
          />
        </div>
      </div>
      <!-- 缩起播放器 -->
      <div
        @click="onClickDown"
        class="shrink-player"
        v-if="isPlayerShow"
      >
        <Icon
          :backdrop="true"
          type="down"
        />
      </div>
      <!-- 路由记录器 -->
      <!-- <div
        class="history"
        v-show="!isPlayerShow"
      >
        <RoutesHistory />
      </div>

      <div class="right">
        <div class="search-wrap">
          <Search />
        </div>
        <Theme />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {

    };
  },
});
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>