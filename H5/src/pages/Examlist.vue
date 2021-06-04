<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:39:15
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 11:03:10
-->

<template>
  <div class="content">
    <List
    class="list"
      style='overflow: hidden;flex: 1 1 0%; background-image: url("http://tk.naxia100.com/wxpublic/bk1.png"); background-size: 100% 100%;'
      :finished="state.finished"
      finished-text="没有更多了"
    >
        <div v-for="item in state.list" :key="item" class="item" @click="go(item.title)">
          <Cell 
           :title="item.title" :value="`试卷份数：39份`" label="浏览：286次"
           style="background-color:transparent">
          </Cell>
        </div>
    </List>
    <ActionSheet  v-model:show="state.show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script lang="ts" >
import { List,Cell,ActionSheet,Toast } from 'vant';
import { reactive,defineComponent } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({
  name: "examlist",
  components: {
    List,
    Cell,
    ActionSheet,
    Toast
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      list: <any>[{title:'新初一分班考试语文'}],
      finished: false,
      show:<boolean>false
    });
    const actions: {name:string}[] = [
      { name: '预览' },
      { name: '下载' },
    ];
    const go = (text:string)=>{
      state.show = true
    }
    const onSelect = (item:{name:string}) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      state.show = false;
      Toast(item.name);
    };

    return {
      state,
      actions,
      go,
      onSelect
    };
  },
});
</script>


<style lang="scss" scoped>
  .content{
    .item{
        width: 95% !important; 
        margin: 10px auto; 
        background-color: rgba(0, 0, 0, 0.1); 
        background-image: url("../assets/半透明.png"); 
        background-size: 100% 100%;
        
    }
  }
</style>