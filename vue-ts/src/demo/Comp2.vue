<template>
  <div>{{ counter }}</div>
  <div>{{ doubleCounter }}</div>
  <button type="button" @click="$store.commit('add')">add</button>
  <hr />
  <h3 :style="{ backgroundColor: titleInfo.color }">{{ titleInfo.value }}</h3>
  <input
    type="text"
    v-model="todoName"
    @keydown.enter="addTodo(newTodo(todoName))"
  />
  <div v-for="item in items" :key="item.id">
    {{ item.title }}
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { PropType } from "vue";
//导入类型声明
import type { TitleInfo, Todo } from "../types";

import { useStore } from "vuex";
import { key } from "../store";
import { getItem } from "../api";

//属性声明
defineProps({
  titleInfo: {
    type: Object as PropType<TitleInfo>,
    required: true,
  },
});

const store = useStore(key);

const counter = computed(() => store.state.counter);
const doubleCounter = computed(() => counter.value * 2);

const items = ref([] as Todo[]);
const todoName = ref("");

// 新加一个
getItem(1).then((res: any) => {
  items.value.push(res.data);
});

const newTodo = (name: string): Todo => {
  return {
    id: items.value.length + 1,
    title: name,
    completed: false,
  };
};
const addTodo = (todo: Todo): void => {
  items.value.push(todo);
};
</script>
