import "./App.scss";
import img from "./assets/logo.png";
import { defineComponent, onMounted, reactive, ref } from "vue";
import Test from "./components/Test";
// import StickSlider from "./components/stick-slider";
import { DatePicker } from "./components/date-picker";
// import TimePicker from "./components/date-picker/components/timepicker";

import Date from "./components/date/date";

import VirtualList from "./components/virtual-list";

export default defineComponent({
  setup() {
    const list = reactive([]);
    const virtualList = ref();
    onMounted(() => {
      // console.log(virtualList.value);
      // virtualList.value.addData(list);
    });
    return () => {
      for (let i = 0; i < 100; i++) {
        list.push({
          id: i,
          date: i.toString().padStart(3, "0"),
        });
      }
      return (
        <div id="app">
          {/* <img alt="Vue logo" src={img} /> */}
          <Test msg="small" />
          <DatePicker></DatePicker>
         
          {/* <div class="container">
            <VirtualList
              itemSize={34}
              ref={virtualList}
              dataList={list}
              start={10}
            >
              {{
                default: (item: any) => <div class="item">{item.date}</div>,
              }}
            </VirtualList>
          </div> */}

          <Date class="date"></Date>
        </div>
      );
    };
  },
});
