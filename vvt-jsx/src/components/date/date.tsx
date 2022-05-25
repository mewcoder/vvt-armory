import { Input } from "../input";
import "./date.scss";
import { defineComponent, ref, onMounted, onUnmounted, reactive } from "vue";
import { getMonthDayList } from "./utils";
import virtualScroll from "./components/virtual-scroll";

export default defineComponent({
  name: "DatePicker",
  directives: {
    clickout: {
      mounted(el, bindling) {
        document.addEventListener("click", (e: MouseEvent) => {
          !el.contains(e.target) && bindling.value();
        });
      },
      unmounted() {
        document.removeEventListener("click", () => {});
      },
    },
  },
  setup(props, ctx) {
    const show = ref(false);

    const onClick = () => {
      show.value = false;
    };

    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const headList = ["日", "一", "二", "三", "四", "五", "六"];

    const currentYear = ref(new Date().getFullYear());
    const currentMonth = ref(new Date().getMonth() + 1);

    const getRows = (date: Date = new Date()) => {
      let rows = [];
      const list = getMonthDayList(date.getFullYear(), date.getMonth());
      while (list.length) {
        rows.push(list.splice(0, 7));
      }
      return rows;
    };

    const getRowsList = () => {
      const date = new Date(1970, 0, 1);
      // date.setDate(1);
      // date.setMonth(date.getMonth() - length / 2);
      let rowsList = [];
      for (let i = 0; i < 12 * 130; i++) {
        rowsList.push({
          rows: getRows(date),
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        });
        date.setMonth(date.getMonth() + 1);
      }
      return rowsList;
    };

    const monthlist: any = [];
    for (let y = 1970; y < 2100; y++) {
      monthlist.push({
        year: true,
        data: y + "",
      });
      monthList.forEach((m) => {
        monthlist.push({
          year: false,
          data: m + "月",
        });
      });
    }

    const pannelList: any = [];

    return () => (
      <div class="devui-datepicker-pro-container" v-clickout={onClick}>
        <div class="devui-datepicker-pro-single-input">
          <Input placeholder="请选择日期" onFocus={() => (show.value = true)} />
        </div>
        <div class="devui-datepicker-pro-panel" v-show={show.value}>
          <div class="pannel-left">
            <virtualScroll
              ref={virtualScroll}
              dataList={monthlist}
              itemHeight={30}
              clientHeight={305}
              start={0}
            >
              {{
                default: (item: any) => (
                  <div
                    class={`pannel-left-item ${
                      item.year ? "pannel-left-year" : ""
                    }`}
                  >
                    {item.data}
                  </div>
                ),
              }}
            </virtualScroll>
          </div>
          <div class="pannel-day">
            <div class="pannel-header">
              {headList.map((i) => (
                <span class="pannel-header-item">{i}</span>
              ))}
            </div>
            <div class="pannel-body">
              <virtualScroll
                ref={virtualScroll}
                dataList={getRowsList()}
                itemHeight={186}
                clientHeight={272}
                start={0}
              >
                {{
                  default: (table: any) => (
                    <div class="month-box">
                      <p class="month-title">
                        {table.year}年{table.month}月
                      </p>{" "}
                      <table class="month-body">
                        {table.rows.map((row) => (
                          <tr class="month-line">
                            {row.map((item: any) => (
                              <td class="month-item">
                                <span
                                  style={{
                                    display: item.current ? "block" : "none",
                                  }}
                                >
                                  {item.date.getDate()}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    </div>
                  ),
                }}
              </virtualScroll>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
