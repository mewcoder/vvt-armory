<template>
  <CompSetup :title-info="{ value: 'setup', color: 'red' }"></CompSetup>
  <!-- <Comp :title-info="{ value: 'TODO', color: 'green' }"></Comp> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>

<script lang="ts" setup>
import Comp from "../components/Comp.vue";
import CompSetup from "../components/CompSetup.vue";
</script>

<style></style>
