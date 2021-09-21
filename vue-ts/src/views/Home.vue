<template>
  <Hello msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>

<script lang="ts" setup>
import Hello from "../components/Hello.vue";
</script>

<style></style>
