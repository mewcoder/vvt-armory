<template>
  <Hello msg="Hello Vue 3 + TypeScript + Vite" />
  <Comp :title-info="{ value: 'TODO', color: 'green' }"></Comp>
  <CompSetup :title-info="{ value: 'Setup', color: 'green' }"></CompSetup>
</template>

<script lang="ts">
export default defineComponent({
  name: "App",
});
</script>

<script lang="ts" setup>
import Hello from "./components/Hello.vue";
import Comp from "./components/Comp.vue";
import CompSetup from "./components/CompSetup.vue";
import { defineComponent } from "vue";
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
