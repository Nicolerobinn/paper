<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:34:07
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 11:46:59
-->

<template>
  <NavBar 
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
  />
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <CellGroup>
      <Field
        v-model="state.value1"
        required
        type="tel" 
        label="手机号"
        placeholder="请输入手机号"
      />
      <Field
        v-model="state.value2"
        required
        label="密码"
        placeholder="请输入手机号"
      />
    </CellGroup>
    <Button type="primary" round  hairline @click="submit" size='large'>点击注册</Button>
  </div>
</template>
<script lang="ts" >
import { NavBar,Button,Field,CellGroup,Toast } from 'vant';
import { reactive,defineComponent } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({
  name: "Reguster",
  components: {
    NavBar,
    Field,
    CellGroup,
    Button
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      value1: <string>'',
      value2:<string>'',
    });
    const onClickLeft = ()=>{
      router.back()
    }
    const submit = ()=>{
      if(state.value1.trim() === ''){
        Toast('手机号不得为空')
        return
      }
      if(state.value2.trim() === ''){
        Toast('密码不得为空')
        return
      }

    }
    return {
      state,
      onClickLeft,
      submit
    };
  },
});
</script>


<style scoped lang="scss">
.login {
  .logo{
    text-align: center;
    padding: 20px 0;
    img{
      border-radius: 10px;
    }
  }
}
</style>