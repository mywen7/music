<template>
  <div class="routes">
    <el-button 
      circle 
      size="mini"
      plain
      @click="back"
    >
      <Icon
        :size="12"
        type="back"
      />
    </el-button>
    <el-button 
      circle 
      size="mini"
      plain
      @click="forward"
    >
      <Icon 
        :size="12"
        type="forward"
      />
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent ({
  setup() {
    const router = useRouter();
    const back = () => {
      router.back();
    }
    const forward = () => {
      router.forward();
    }
    return {
      back,
      forward,
    }
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-button) {
  background-color: $theme-color;
  color: $white;
  border: none;
}
:deep(.el-button.is-plain:focus),
:deep(.el-button.is-plain:hover) {
  background-color: $theme-color;
  border: 1px solid $white;
  color: $white;
}
</style>