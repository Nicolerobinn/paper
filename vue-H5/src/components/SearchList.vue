<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 18:01:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-06 11:14:27
-->
<template>
  <List v-model:loading="loading" :finished="finished" @load="onLoad">
    <div v-for="item in list" :key="item" class="item" @click="go(item)">
      <Cell :title="item.name" :value="`试卷份数：39份`" label="浏览：286次">
      </Cell>
    </div>
  </List>
  <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";

import { List, Cell, ActionSheet, Toast } from "vant";
import { useRouter } from "vue-router";
import { preview } from "../utils/api";
import { useStore } from "vuex";
import { baseURL } from "../utils/request";

export default defineComponent({
  name: "searchList",
  // 父组件传子组件参数
  props: {
    list: {
      type: Array as PropType<object[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    List,
    Cell,
    ActionSheet,
    Toast,
  },
  emits: ["load"], // 为了提示作用
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      finished: <boolean>true,
      show: <boolean>false,
      obj: <any>{},
    });
    const go = (item: any) => {
      state.obj = item;
      state.show = true;
    };
    const actions: { name: string }[] = [{ name: "预览" }, { name: "下载" }];
    const onSelect = async (item: { name: string }) => {
      if (item.name === "预览") {
        const res: any = await preview(state.obj.fileName);
        if (res.msg === "文件不存在") {
          Toast(res.msg);
          return;
        }
        router.push({
          name: "Paper",
          query: {
            text: res.data,
          },
        });
      } else {
        if (!store.state.token) {
          Toast("请登录");
          return;
        }
        if (store.state.role === 3) {
          window.open(
            `${baseURL}/paper/download/${state.obj.fileName}?token=${store.state.token}`
          );
        } else {
          Toast("请升级为会员");
        }
      }
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      state.show = false;
    };
    const router = useRouter();

    const login = () => {
      router.push("/login");
    };
    const onLoad = () => {
      // context.emit('load')
    };
    return {
      ...toRefs(state),
      login,
      actions,
      go,
      onSelect,
    };
  },
});
</script>
<style scoped lang="scss">
.content {
}
</style>