<template>
  <div class="el-rate">
    <span
      v-for="(item, key) in 5"
      :key="key"
      class="el-rate__item"
      style="cursor: pointer"
      @mousemove="setCurrentValue(item)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
    >
      <i
        class="el-rate__icon"
        :class="'el-icon-star-' + (currentValue >= item ? 'on' : 'off')"
        style="color: #f7ba2a"
      ></i>
    </span>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "Rate",
});
</script>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);

let currentValue = ref(props.modelValue);

const setCurrentValue = (val: number) => {
  currentValue.value = val;
};

const resetCurrentValue = () => {
  currentValue.value = props.modelValue;
};

const selectValue = (val: number) => {
  console.log(val);
  emit("update:modelValue", val);
};
</script>
