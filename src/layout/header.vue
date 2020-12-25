<template>
  <div class="header"> 
    <div class="left">
      <screen-btns @click-logo="onClickLogo"/>
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
import ScreenBtns from './components/screen-btns.vue';
import search from './components/search.vue';
import RoutesHistory from './components/routes-history.vue';

export default defineComponent({
  components: {
    ScreenBtns,
    search,
    RoutesHistory,
  },
  setup() {
    const onClickLogo = () => {
      useRouter().push({name: 'discovery'});
    }

    return {
      onClickLogo,
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
    }
    .right {
      @include flex-center();
      .search {
        margin-right: 30px;
      }
    }
  }
</style>