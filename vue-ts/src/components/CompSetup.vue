<template>
  <div>{{ counter }}</div>
  <div>{{ doubleCounter }}</div>

  <h3 :style="{ backgroundColor: titleInfo.color }">{{ titleInfo.value }}</h3>
  <input
    type="text"
    v-model="todoName"
    @keydown.enter="addTodo(newTodo(todoName))"
  />
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from "vue";
import type { PropType } from "vue";
//导入类型声明
import type { TitleInfo, Todo } from "../types";

//属性声明
defineProps({
  titleInfo: {
    type: Object as PropType<TitleInfo>,
    required: true,
  },
});

const counter = ref(1);
const doubleCounter = computed(() => counter.value.value * 2);

const items = ref([] as Todo[]);
const todoName = ref("");

items.value.push({
  id: 0,
  name: "test",
  completed: false,
});

const newTodo = (name: string): Todo => {
  return {
    id: items.value.length + 1,
    name: name,
    completed: false,
  };
};
const addTodo = (todo: Todo): void => {
  items.value.push(todo);
};
</script>

<style lang="scss"></style>
