import "./index.scss";

/**
 * scrollTop: 计算距离顶部的距离
 * clientHeight: 表示可视区域的高度
 * 
 */

import {
  computed,
  defineComponent,
  reactive,
  ref,
  onMounted,
  toRef,
} from "vue";

export default defineComponent({
  name: "VirtualList",

  props: {
    dataList: {
      type: Array,
      required: true,
    },
    // 每一项高度
    itemSize: {
      type: Number,
      required: true,
    },

    // 触发到顶事件的偏移量
    startOffset: {
      type: Number,
      default: 0,
    },

    // 触发到底事件的偏移量
    endOffset: {
      type: Number,
      default: 0,
    },

    // 手动滚动步长
    step: {
      type: Number,
    },

    start: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const scrollOffset = ref(0); // 滚动偏移
    const clientHeight = ref(0); // 可视区域高度
    const scrolling = ref(false); //是否在滚动
    let list = reactive(props.dataList);

    const virtualListContainer = ref();

    // 总高度
    const listHeight = computed(() => list.length * props.itemSize);

    // 可视区域可显示的数量
    // +1是解决当缓慢滚动时最后可能会出现空白，随之出现最后一项闪现的问题
    const visibleCount = computed(() => {
      return Math.ceil(clientHeight.value / props.itemSize) * 2;
    });

    // 实际展示数据的起始索引
    // 必须是floor，不能是ceil，否则一滚动可视的第一项就会发生变化
    const startIndex = computed(() => {
      return Math.floor(scrollOffset.value / props.itemSize);
    });

    const endIndex = computed(() => startIndex.value + visibleCount.value);

    // 实际展示的数据
    const visibleData = computed(() =>
      list.slice(startIndex.value, endIndex.value)
    );

    const getTransform = computed(
      () =>
        `translateY(${
          scrollOffset.value - (scrollOffset.value % props.itemSize)
        }px)`
    );

    // 初始化
    const init = () => {
      // 可视区域高度
      clientHeight.value = virtualListContainer.value?.offsetHeight;
      console.log("clientHeight:" + clientHeight.value);
      virtualListContainer.value.scrollTop = props.itemSize * props.start;
    };

    // 滚动监听
    const onScroll = () => {
      scrollOffset.value = virtualListContainer.value.scrollTop;
      console.log("scrollOffset:" + scrollOffset.value);
      // scrollTop();
      // scrollBottom();
    };

    // // 添加数据
    // const addData = (data: any) => {
    //   list = list.concat(data);
    // };

    // // 滚动到顶部事件 useless
    // const scrollTop = () => {
    //   let isScrollTop = scrollOffset.value - props.startOffset <= 0;
    //   if (isScrollTop) {
    //     ctx.emit("scrollTop");
    //   }
    // };

    // // 滚动到底事件 useless
    // const scrollBottom = () => {
    //   let isScrollEnd =
    //     clientHeight.value + scrollOffset.value >=
    //     listHeight.value - props.endOffset;
    //   if (isScrollEnd) {
    //     ctx.emit("scrollBottom");
    //   }
    // };

    // // 获取滚动步长
    // const getStep = () => {
    //   return props.step || props.itemSize;
    // };

    // // 向上滚
    // const scrollUp = () => {
    //   if (scrollOffset.value <= 0) {
    //     return false;
    //   }
    //   let to = 0;
    //   let step = getStep();
    //   if (scrollOffset.value - step > 0) {
    //     to = scrollOffset.value - step;
    //   }
    //   scrollTo(to);
    // };

    // // 向下滚
    // const scrollDown = () => {
    //   if (listHeight.value <= clientHeight.value) {
    //     return false;
    //   }
    //   let canScroll = listHeight.value - clientHeight.value;
    //   if (scrollOffset.value >= canScroll) {
    //     return false;
    //   }
    //   let to = 0;
    //   let step = getStep();
    //   if (scrollOffset.value + step < canScroll) {
    //     to = scrollOffset.value + step;
    //   } else {
    //     to = canScroll;
    //   }
    //   scrollTo(to);
    // };

    // // 滚动到顶部
    // // 会存在白屏现象
    // const scrollToTop = () => {
    //   scrollTo(0);
    // };

    // // 滚动到底部
    // // 会存在白屏现象
    // const scrollToBottom = () => {
    //   let bottom = listHeight.value - clientHeight.value;
    //   if (bottom > 0) {
    //     scrollTo(bottom);
    //   }
    // };

    // // 滚动
    // const scrollTo = (to: number) => {
    //   if (scrolling.value) {
    //     return false;
    //   }
    //   scrolling.value = true;
    //   let from = scrollOffset.value;
    //   let offset = to - from;
    //   let dur = 300;
    //   let startTime = Date.now();
    //   let run = () => {
    //     let curTime = Date.now();
    //     let spaceTime = curTime - startTime;
    //     let ratio = ease(spaceTime, 0, 1, dur);
    //     let curNum = offset * ratio;
    //     if (ratio >= 1) {
    //       virtualListContainer.value.scrollTop = to;
    //       scrolling.value = false;
    //     } else {
    //       virtualListContainer.value.scrollTop = from + curNum;
    //       requestAnimationFrame(run);
    //     }
    //   };
    //   run();
    // };

    // // 缓动函数，慢进慢出
    // const ease = (t: number, b: number, c: number, d: number) => {
    //   return (t /= d / 2) < 1
    //     ? (c / 2) * t * t * t + b
    //     : (c / 2) * ((t -= 2) * t * t + 2) + b;
    // };

    // 初始化
    onMounted(() => {
      init();
      // console.log(props);
    });

    return () => {
      return (
        <div class="virtualListContainerWrap">
          <div
            class="virtualListContainer"
            ref={virtualListContainer}
            onScroll={onScroll}
          >
            <div
              class="phantom"
              style={{ height: `${listHeight.value}px` }}
            ></div>
            <div class="list" style={{ transform: getTransform.value }}>
              {visibleData.value.map((item) => (
                <div class="item" style={{ height: `${props.itemSize}px` }}>
                  {ctx.slots.default?.(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
  },
});
