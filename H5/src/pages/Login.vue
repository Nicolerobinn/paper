<!--
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:34:07
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-04 17:34:50
-->

<template>
  <NavBar 
  left-text="返回"
  right-text="没有账号？注册一个"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
  />
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <CellGroup>
      <Field
        v-model="value1"
        required
        type="tel" 
        label="手机号"
        placeholder="请输入手机号"
      />
      <Field
        v-model="value2"
        required
        label="密码"
        placeholder="请输入手机号"
      />
    </CellGroup>
    <Button type="primary" round  hairline @click="submit" size='large'>点击登录</Button>
  </div>
</template>
<script lang="ts" >
import { NavBar,Button,Field,CellGroup,Toast } from 'vant';
import { reactive,defineComponent,toRefs } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({
  name: "login",
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
    const onClickRight = ()=>{
      router.push('/reguster')
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
      ...toRefs(state),
      onClickLeft,
      onClickRight,
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