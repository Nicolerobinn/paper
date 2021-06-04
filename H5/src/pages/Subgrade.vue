<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:38:56
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 17:43:25
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
          <Login @emitsName="show= true"/>
        </Col>
      </Row>
    </div>
    <div v-if="searchList.length===0" class="body" >
      <List/>
      <Content/>
    </div>
    <SearchList :loading="loading" @load="load"  :list="searchList" />
    <ActionSheet  v-model:show="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script lang="ts" >
import Login from '../components/LoginButton.vue'
import List from '../components/List.vue'
import SearchList from '../components/SearchList.vue'
import Content from '../components/Content.vue'
import { Col, Row ,Search,Toast,ActionSheet} from 'vant';
import { reactive,defineComponent,toRefs,ref } from "vue";
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
    SearchList
  },  
  setup() {
    const sonRef = ref(null)
    const state = reactive({
      show:<boolean>false,
      value:<string>'',
      searchList:[],
      loading:<boolean>false
    });
    const actions: {name:string}[] = [
      { name: '一个月 19元' },
      { name: '三个月 29元' },
      { name: '一年  99元' },
    ];
    const onSearch = (val:string) => Toast(val);
    const onSelect = (item:{name:string}) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      state.show = false;
      Toast(item.name);
    };
    const load = ()=>{
      state.loading=false
    }
    return {
      ...toRefs(state),
      onSearch,
      actions,
      onSelect,
      load
    };
  },
});
</script>


<style lang="scss" scoped>
  .content{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    .header {
      background: rgb(64, 223, 183);
    }
    .body{
      display: flex;
      flex: 1 1 0%; 
    }
  }
</style>