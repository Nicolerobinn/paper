
<template>
  <button @click="add">++</button>
</template>
<script lang="ts" setup="props">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
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