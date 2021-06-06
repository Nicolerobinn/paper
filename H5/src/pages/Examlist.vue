<!--
 * @Desc:
 * @Autor: cxt
 * @Date: 2021-06-03 17:39:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-06 09:42:04
-->

<template>
  <div class="content">
    <List
      class="list"
      style="
        overflow: hidden;
        flex: 1 1 0%;
        background-image: url('http://tk.naxia100.com/wxpublic/bk1.png');
        background-size: 100% 100%;
      "
      :finished="finished"
      finished-text="没有更多了"
    >
      <div v-for="item in list" :key="item" class="item" @click="go(item)">
        <Cell :title="item.name" :value="`试卷份数：39份`" label="浏览：286次">
        </Cell>
      </div>
    </List>
    <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script lang="ts" >
import { List, Cell, ActionSheet, Toast } from "vant";
import { reactive, defineComponent, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPaperList, preview, download } from "../utils/api";

import { useStore } from "vuex";
export default defineComponent({
  name: "examlist",
  components: {
    List,
    Cell,
    ActionSheet,
    Toast,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      list: <any>[{ title: "新初一分班考试语文" }],
      finished: false,
      show: <boolean>false,
      obj: <any>{},
    });
    onMounted(async () => {
      const res: any = await getPaperList({
        gradeld: router.currentRoute.value.query.id as string,
      });
      const { list = [], pageNum } = res?.data ?? {};
      state.list = list;
    });
    const actions: { name: string }[] = [{ name: "预览" }, { name: "下载" }];
    const go = (item: any) => {
      state.obj = item;
      state.show = true;
    };
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
        if (store.state.role === 1) {
          const res = await download(state.obj.fileName);
        } else {
          Toast("请升级为会员");
        }
      }
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      state.show = false;
    };

    return {
      ...toRefs(state),
      actions,
      go,
      onSelect,
    };
  },
});
</script>


<style lang="scss" scoped>
.content {
  .item {
    width: 95% !important;
    margin: 10px auto;
    background-color: #fff;
  }
}
</style>