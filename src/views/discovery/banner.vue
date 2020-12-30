<template>
  <el-carousel
    type="card"
    height="250px"
  >
     <el-carousel-item
        v-for="(banner, index) in banners"
        :key="index + 1"
     >
      <img class="banner-img" :src="banner.imageUrl"/>
     </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import http from '../../libs/fetch';
import { Banner } from './interface';

export default defineComponent ({
  async setup() {
    const banners: Ref<Banner[]> = ref([]);
    const onClick = (url: string) => {
      window.open(url);
    }

    const res = await http('/banner', {
      method: 'GET',
    })
    banners.value = res.banners.map((ele: any) => ele);
    return {
      banners,
      onClick,
    }
  },
});
</script>

<style lang="scss" scoped>
.banner-img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

</style>