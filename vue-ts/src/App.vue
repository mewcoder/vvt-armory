<template>
  <div class="header">
    <router-link to="/">/</router-link>
    <router-link to="/add">add</router-link>
  </div>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.header {
  a {
    margin-right: 10px;
  }
  border-bottom: #2c3e50 solid 2px;
  padding: 10px;
}
</style>
