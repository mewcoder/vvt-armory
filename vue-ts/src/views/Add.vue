<template>
  <Comp :title-info="{ value: 'TODO', color: 'green' }"></Comp>
  <Comp2 :title-info="{ value: 'setup', color: 'red' }"></Comp2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>

<script lang="ts" setup>
import Comp from "../demo/Comp.vue";
import Comp2 from "../demo/Comp2.vue";
</script>

<style></style>
