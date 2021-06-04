<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:56
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 14:11:04
-->
<template>
  <div class="content">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';

import { Button} from 'vant';
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'searchList',
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | ''>,
      default: 'vue3.x'
    }
  },
  components: {
    Button
  },
  emits: ["emits-name"], // 为了提示作用
  setup (props, context) {
    const state = reactive({
      token:<string>'',
        noVip:<boolean>true
    });
    const router = useRouter()

    const  login = ()=> {
      router.push('/login')
    }
    const shoping = ()=>{
      context.emit('emits-name')
    }
    return {
      state,
      login,
      shoping
    }
  }
});
</script>
<style scoped lang="scss">
.content{
}
</style>