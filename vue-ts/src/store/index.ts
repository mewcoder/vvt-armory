import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

export type State = {
  counter: number;
};

export default createStore({
  state: {
    counter: 1,
  },
  mutations: {
    add(state) {
      state.counter++;
    },
  },
});

// 1. 创建一个injectKey
export const key: InjectionKey<Store<State>> = Symbol();
