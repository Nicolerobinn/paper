<template>
  <div class="list">
    <div v-for="(item,i) in list" class="item" :class="[active===i?'active':'']" :key="i" @click="handleClick(i)">
      {{item}}
    </div>
  </div>
 </template>

 <script lang="ts">

interface IState {
  active: number
}

 import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, toRefs } from 'vue';
 
 import { List} from 'vant';
 
 export default defineComponent({
   name: 'Content',
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
    List
   },
   emits: ["emits-name"], // 为了提示作用
   setup (props, context) {
     
 
     onMounted(() => {
 
     })
 
     const list = reactive([1,2,3,4])
     let active:number = 0
     const state = reactive<IState>({
      active: 0,
    })
     const handleClick = (num:number)=>{
      state.active  = num
     }
     return {
      ...toRefs(state),
      list,
      handleClick
     }
   }
 });
 </script>

 <style lang="scss">
  .list {
    height: 100%;
    width: 1.5rem;
    background-color: rgb(205, 218, 245);
    .item{
      font-size: .5rem;
      height: 1rem;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active{
        background-color: #fff;
    }
  }
 </style>