<!--
 * @Desc:
 * @Autor: cxt
 * @Date: 2021-06-03 17:38:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-06 10:04:12
-->

<template>
  <div class="content">
    <div class="header">
      <Row>
        <Col span="18">
          <form action="/">
            <Search
              v-model="value"
              shape="round"
              background="rgb(64, 223, 183)"
              placeholder="请输入学校/年级/科目等"
              @search="onSearch"
            />
          </form>
        </Col>
        <Col span="6">
          <Login @emitsName="show = true" />
        </Col>
      </Row>
    </div>
    <div v-if="searchList.length === 0" class="body">
      <List :list="list" @callBack="change" />
      <Content :content="content" />
    </div>
    <SearchList :list="searchList" />
    <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script lang="ts" >
import Login from "../components/LoginButton.vue";
import List from "../components/List.vue";
import SearchList from "../components/SearchList.vue";
import Content from "../components/Content.vue";
import { Col, Row, Search, Toast, ActionSheet } from "vant";
import { reactive, defineComponent, toRefs, onBeforeMount } from "vue";
import { getAllSubject, getPaperList, upgradeUser } from "../utils/api";
import { useStore } from "vuex";
export default defineComponent({
  name: "subgrade",
  components: {
    Col,
    Row,
    Search,
    Login,
    List,
    ActionSheet,
    Content,
    SearchList,
  },
  setup() {
    const store = useStore();
    onBeforeMount(async () => {
      const res: any = await getAllSubject();
      const { data = [] } = res ?? {};
      state.list = data;
      change(0);
    });
    const state = reactive({
      show: <boolean>false,
      value: <string>"",
      searchList: [],
      list: <object>[],
      loading: <boolean>false,
      content: <object>[],
    });
    const actions: { name: string }[] = [
      { name: "一个月 19元" },
      { name: "三个月 29元" },
      { name: "一年  99元" },
    ];
    const onSearch = async (val: string) => {
      const res: any = await getPaperList({
        searchinput: val,
      });
      const { list = [] } = res?.data ?? {};
      state.searchList = list;
    };
    const onSelect = async (item: { name: string }) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      state.show = false;
      await upgradeUser();
      store.commit("SET_ROLE", 1);
      Toast("开通成功！");
    };
    const load = () => {
      state.loading = false;
    };
    const change = (num) => {
      state.content = state.list[num];
    };
    return {
      ...toRefs(state),
      onSearch,
      actions,
      onSelect,
      load,
      change,
    };
  },
});
</script>


<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  .header {
    background: rgb(64, 223, 183);
  }
  .body {
    display: flex;
    flex: 1 1 0%;
  }
}
</style>