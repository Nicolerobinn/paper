<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:56
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 14:11:04
-->
<template>
  <List
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
  <Cell v-for="(item,i) in list" :key="i" :title="i" />
</List>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue';

import { List,Cell} from 'vant';
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'searchList',
  // 父组件传子组件参数
  props: {
     list: {
       type: Array as PropType<object[]>,
       default: () => [1,2,3]
     },
     loading: {
       type: Boolean,
       default: false
     }
  },
  components: {
    Cell,
    List
  },
  emits: ["load"], // 为了提示作用
  setup (props, context) {
    const state = reactive({
      finished:<boolean>true
    });
    const router = useRouter()

    const  login = ()=> {
      router.push('/login')
    }
    const onLoad = ()=>{
      context.emit('load')
    }
    return {
      ...toRefs(state),
      login,
      onLoad
    }
  }
});
</script>
<style scoped lang="scss">
.content{
}
</style>