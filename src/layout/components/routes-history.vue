<template>
  <div class="routes">
    <el-button 
      circle 
      size="mini"
      plain
    >
      <Icon
        :size="12"
        type="back"
        @click="back"
      />
    </el-button>
    <el-button 
      circle 
      size="mini"
      plain
    >
      <Icon 
        :size="12"
        type="forward"
        @click="forward"
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
::v-deep .el-button {
  background-color: $theme-color;
  color: $white;
  border: none;
}
::v-deep .el-button.is-plain:focus,
::v-deep .el-button.is-plain:hover {
  background-color: $theme-color;
  border: 1px solid $white;
  color: $white;
}
</style>