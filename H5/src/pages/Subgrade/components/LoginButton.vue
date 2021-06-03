<template>
 <div class="login">
  登录
 </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';

import { Button} from 'vant';

export default defineComponent({
  name: 'login',
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | ''>,
      default: 'vue3.x'
    },
    list: {
      type: Array as PropType<object[]>,
      default: () => []
    }
  },
  components: {
    Button
  },
  emits: ["emits-name"], // 为了提示作用
  setup (props, context) {
    

    onMounted(() => {

    })

    function login () {
    }
  
    return {
      login
    }
  }
});
</script>
<style >
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;  
   font-size: .4rem;
}
</style>