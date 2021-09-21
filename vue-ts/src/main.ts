import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";

import "./assets/theme-chalk/index.css"; // 引入el样式

createApp(App).use(router).use(store, key).mount("#app");
