<template>
  <div class="name-text">
    {{name}}
    <span class="mv-icon" @click.stop="$emit('go-mv', mvId)">
      <Icon
        v-if="mvId"
        type="mv"
        :size="20"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  props: {
    name: {
      type: String,
      default: '',
    },
    mvId: Number,
  }
});
</script>

<style lang="scss" scoped>
.name-text {
  display: flex;
  align-items: center;
  margin-left: 5px;
  .mv-icon {
    margin-left: 5px;
    color: $theme-color;
    i {
      vertical-align: middle;
    }
  }
}
</style>