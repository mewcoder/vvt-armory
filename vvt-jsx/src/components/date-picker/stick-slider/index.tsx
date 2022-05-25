import { defineComponent, reactive } from "vue";

import "./index.scss";

const StickSlider = defineComponent({
  name: "DStickSlider",
  props: {},
  setup(props) {
    const state = reactive({
      showButtons: false,
      selectedIndex: 0,
    });

    const handleMainButtonMouseDown = (e: MouseEvent) => {
      console.log("mouse-down");
      e.stopPropagation();
      state.showButtons = true;
    };
    const handleMainButtonMouseUp = (e: MouseEvent) => {
      console.log("mouse-up");
      e.stopPropagation();
      state.showButtons = false;
    };

    const buttonClass = (i) => {
      return `button ${i === state.selectedIndex ? "selected" : ""}`;
    };

    return () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      return (
        <div
          class="devui-stick-slider"
          onMousedown={handleMainButtonMouseDown}
          onMouseup={handleMainButtonMouseUp}
          onMouseleave={handleMainButtonMouseUp}
        >
          <div
            class="sub-buttons"
            style={{ display: state.showButtons ? "" : "none" }}
          >
            {arr.map((i) => {
              console.log(i);
              return (
                <div
                  class={buttonClass(i)}
                  onMouseenter={() => (state.selectedIndex = i)}
                >
                  {i}
                </div>
              );
            })}
          </div>
          <div class="main-button">{state.selectedIndex}</div>
        </div>
      );
    };
  },
});

export default StickSlider;
