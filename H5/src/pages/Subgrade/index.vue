
<template>
  <Row>
    <Col span="18"></Col>
    <Col span="6">
      <div>
        登录
      </div>
      </Col>
  </Row>
</template>
<script lang="ts" setup="props">
import { Col, Row } from 'vant';
import { reactive,defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

defineComponent({
  name: "examlist",
  components: {
    Col: Col,
    Row: Row,
  },
});
const router = useRouter();
const store = useStore();
const goLogin = () => {
  router.push("/login");
};
const add = () => {
};
const state = reactive({
});
</script>


<style >
.text {
}
</style>