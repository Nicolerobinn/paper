<!--
 * @Author: your name
 * @Date: 2021-06-06 09:28:15
 * @LastEditTime: 2021-06-06 09:41:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paper\H5\src\pages\Paper.vue
-->

<template>
  <NavBar left-text="返回" left-arrow @click-left="back" />
  <div class="content" v-html="text"></div>
</template>
<script lang="ts" >
import { reactive, defineComponent, toRefs, ref, onBeforeMount } from "vue";
import { NavBar } from "vant";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "paper",
  components: { NavBar },
  setup() {
    const router = useRouter();
    onBeforeMount(async () => {
      state.text = router.currentRoute.value.query.text as string;
    });
    const state = reactive({
      text: <string>"",
    });
    const back = () => router.back();
    return {
      ...toRefs(state),
      back,
    };
  },
});
</script>


<style lang="scss" scoped>
.content {
  font-size: 0.2rem;
  white-space: pre-wrap;
}
</style>