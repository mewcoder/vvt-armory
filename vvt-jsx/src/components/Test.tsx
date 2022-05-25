import { defineComponent, ref, PropType } from "vue";

export type SizeType = "small" | "middle" | "large";

export default defineComponent({
  props: {
    msg: String as PropType<SizeType>,
  },
  setup(props) {
    const count = ref(2);
    const handleClick = () => {
      count.value++;
    };
    const { msg } = props;
    return () => (
      <div>
        <h1>{msg}</h1>
        <button onClick={handleClick}>count is: {count.value}</button>
      </div>
    );
  },
});
