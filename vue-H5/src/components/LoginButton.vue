<!--
 * @Desc:
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-06 10:11:40
-->
<template>
  <div class="content">
    <div v-if="!token" class="login" @click="login">点击登录</div>
    <div v-else-if="role === 2" class="login" @click="shoping">
      点击成为会员
    </div>
    <div v-else class="login">尊贵的会员</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";

import { Button } from "vant";
import { useRouter } from "vue-router";
import { mapState } from "vuex";

export default defineComponent({
  name: "login",
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | "">,
      default: "vue3.x",
    },
  },
  components: {
    Button,
  },
  computed: {
    ...mapState({
      token: (state: any) => state.token,
      role: (state: any) => state.role,
    }),
  },
  emits: ["emits-name"], // 为了提示作用
  setup(props, context) {
    const state = reactive({
      noVip: <boolean>true,
    });
    const router = useRouter();

    const login = () => {
      router.push("/login");
    };
    const shoping = () => {
      context.emit("emits-name");
    };
    return {
      ...toRefs(state),
      login,
      shoping,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    font-size: 0.4rem;
  }
}
</style>