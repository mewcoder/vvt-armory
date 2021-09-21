<template>
  <div>counter：{{ $store.state.counter }}</div>
  <div>doubleCounter：{{ doubleCounter }}</div>
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
  <hr />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//导入类型声明
import { TitleInfo, Todo } from "../types";
export default defineComponent({
  props: {
    titleInfo: {
      type: Object as PropType<TitleInfo>,
      required: true,
    },
  },
  data() {
    return {
      counter: 1,
      items: [] as Todo[],
      todoName: "",
    };
  },
  computed: {
    doubleCounter(): number {
      return this.$store.state.counter * 2;
    },
  },
  created() {
    this.items.push({
      id: 0,
      title: "Learn Vue",
      completed: false,
    });
  },
  methods: {
    newTodo(name: string): Todo {
      return {
        id: this.items.length + 1,
        title: name,
        completed: false,
      };
    },
    addTodo(todo: Todo): void {
      this.items.push(todo);
    },
  },
});
</script>

<style lang="scss"></style>
