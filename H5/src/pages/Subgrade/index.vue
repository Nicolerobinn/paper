
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
              placeholder="请输入搜索关键词"
              @search="onSearch"
            />
          </form>
        </Col>
        <Col span="6">
          <Login/>
        </Col>
      </Row>
    </div>
      <div style="flex: 1 1 0%; display: -webkit-flex;">
      <List/>
      <Content/>
    </div>
  </div>
</template>
<script lang="ts" >
import Login from './components/LoginButton.vue'
import List from './components/List.vue'
import Content from './components/Content.vue'
import { Col, Row ,Search,Toast} from 'vant';
import { reactive,defineComponent,ref } from "vue";
export default defineComponent({
  name: "subgrade",
  components: {
    Col: Col,
    Row: Row,
    Search:Search,
    Login,
    List,
    Content
  },  
  setup() {
    const value = ref('');
    const onSearch = (val:string) => Toast(val);
    return {
      value,
      onSearch,
    };
  },
});
</script>


<style lang="scss">
  .content{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    .header {
      background: rgb(64, 223, 183);
    }
  }
</style>