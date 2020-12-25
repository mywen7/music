<template>
  <div class="header"> 
    <div class="left">
      <div class="buttons">
        <div
          @click="onClickLogo"
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
      <!-- 缩起播放器 -->
      <!-- <div
        @click="onClickDown"
        class="shrink-player"
        v-if="isPlayerShow"
      >
        <Icon
          :backdrop="true"
          type="down"
        />
      </div> -->
      <!-- 路由记录器 -->
      <routes-history/>
    </div>
    <div class="right">
        <search class="search"/>
        <!-- <Theme /> -->
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { requestFullScreenFn, exitFullscreenFn, isFullscreenFn } from '../libs/common';
import search from './components/search.vue';
import RoutesHistory from './components/routes-history.vue';

export default defineComponent({
  components: {
    search,
    RoutesHistory,
  },
  setup() {
    const onClickLogo = () => {
      useRouter().push({name: 'discovery'});
    }
    const fullscreen = () => {
      requestFullScreenFn(document.documentElement);
    }
    const exitFullScreen = () => {
      if (isFullscreenFn()) {
        exitFullscreenFn();
      }
    }
    return {
      onClickLogo,
      fullscreen,
      exitFullScreen,
    };
  },
});
</script>
<style lang="scss" scoped>
  .header {
    background-color: $theme-color;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
      @include flex-center();
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
    }
    
    .right {
      @include flex-center();
      .search {
        margin-right: 30px;
      }
    }
  }
</style>