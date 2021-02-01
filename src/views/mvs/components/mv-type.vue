<template>
  <div>
    <div 
      class="mv-type"
      v-for="(type,i) in typeList"
      :key="i"
    >
      <span>{{type.type}}：</span>
      <span 
        v-for="(item,index) in type.content"
        :key="index"
      >
        <div
          class="type-btn"
          @click="typeClick(i, item)"
          :class="active[i] === item? 'active': ''"
        >
          {{item}}
        </div>
        <span 
          class="separate"
          v-if="index!==type.content.length-1"
        >
          |
        </span>
      </span>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent ({
  props: {
    typeList: Array,
    active: Array,
  },
  setup(props, { emit }) {
    const typeClick = (index: number, tag: string) => {
      emit('active-change', {
        index,
        tag,
      });
    }
    return {
      typeClick,
    }
  }
});
</script>

<style lang="scss" scoped>
.mv-type {
  margin: 10px 0;
  color: #4a4a4a;
  .type-btn {
    font-size: $font-size-sm;
    color: #7F7F81;
    cursor: pointer;
    display: inline-block;
    padding: 4px 15px;
    border-radius: 20px;
    margin: 0 10px;
    &:hover {
      color: $theme-color;
      background-color: #ecf5ff;
    }
  }
  .active {
    color: $theme-color;
    background-color: #ecf5ff;
  }
  .separate {
    opacity: 0.1;
  }
}
</style>