<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-05 11:46:09
-->
<template>
  <div class="list">
    <div
      v-for="(item, i) in list"
      class="item"
      :class="[active === i ? 'active' : '']"
      :key="i"
      @click="handleClick(i)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

 <script lang="ts">
interface IState {
  active: number;
}

import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  reactive,
  toRefs,
} from "vue";

import { List } from "vant";

export default defineComponent({
  name: "Content",
  // 父组件传子组件参数
  props: {
    list: {
      type: Array as PropType<object[]>,
      default: () => [1, 2, 3],
    },
  },
  components: {
    List,
  },
  emits: ["call-back"], // 为了提示作用
  setup(props, context) {
    onMounted(() => {});
    let active: number = 0;
    const state = reactive<IState>({
      active: 0,
    });
    const handleClick = (num: number) => {
      state.active = num;
      context.emit("call-back", num);
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

 <style lang="scss" scoped>
.list {
  height: 100%;
  width: 1.5rem;
  background-color: rgb(205, 218, 245);
  .item {
    font-size: 0.5rem;
    height: 1rem;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    background-color: #fff;
  }
}
</style>