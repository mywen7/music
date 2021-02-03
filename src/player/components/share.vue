<template>
  <span v-copy="copyTarget">
    <Icon
      :size="18"
      type="share"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { copy } from '../../libs/directives';
import { ElMessageBox } from 'element-plus';

export default defineComponent ({
  directives: { copy },
  props: {
    copyText: {
      type: String,
      default: '1111',
    },
  },
  setup(props) {
    const copyTarget = {
      text: props.copyText,
      success() {
        ElMessageBox.alert('分享链接已经复制到剪贴板，快去和小伙伴一起听歌吧！', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'sure-btn',
          lockScroll: true,
        });
      },
    };
    return {
      copyTarget,
    }
  }
});
</script>

<style lang="scss">
.el-button--primary {
  background-color: $theme-color;
  border-color: $theme-color;
}
.el-button--primary:focus {
  background-color: $theme-color;
  border-color: $theme-color;
}
.el-button--primary:hover {
  background-color: #56d9bc;
  border-color: #56d9bc;
}
</style>