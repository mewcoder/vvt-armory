<template>
  <div>{{ msg }}</div>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>
<script lang="ts" setup>
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style scoped></style>
