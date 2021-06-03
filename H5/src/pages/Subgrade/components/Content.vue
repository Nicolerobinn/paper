 <template>
  <div class="gradeContainer">
    
  </div>
 </template>

 <script lang="ts">
 import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';
 
 import { Button} from 'vant';
 
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
  .gradeContainer {
      display: -webkit-flex;
      -webkit-box-direction: normal;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 100%;
      -webkit-box-orient: horizontal;
      flex-flow: row wrap;
      -webkit-flex-flow: row wrap;
      -webkit-box-flex: 1;
      flex: 1;
      -webkit-flex: 1;
      background-position: 50%;
      background-image: url(http://tk.naxia100.com/wxpublic/bk1.png);
  }
 </style>