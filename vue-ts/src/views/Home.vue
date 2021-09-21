<template>
  <Hello msg="Hello Vue 3 + TypeScript + Vite" />
  <Rate v-model="rateValue"></Rate>
  <hr />
  <Calendar></Calendar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>

<script lang="ts" setup>
import Hello from "../demo/Hello.vue";
import Rate from "../components/Rate.vue";
import Calendar from "../components/Calendar.vue";

import { ref } from "vue";

const rateValue = ref(0);
</script>

<style></style>
