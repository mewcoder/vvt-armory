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
  nextTick,
} from "vue";

export default defineComponent({
  name: "VirtualScroll",
  props: {
    //数据
    dataList: {
      type: Array,
      required: true,
    },
    // 每一项高度
    itemHeight: {
      type: Number,
      required: true,
    },
    // 可视域高度
    clientHeight: {
      type: Number,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const scrollOffset = ref(0); // 滚动偏移

    // let list = reactive(props.dataList);

    // $ref
    const virtualListContainer = ref();

    // 总高度
    const listHeight = props.dataList.length * props.itemHeight;

    // 可视区域可显示的数量
    // +1是解决当缓慢滚动时最后可能会出现空白，随之出现最后一项闪现的问题
    const visibleCount = Math.ceil(props.clientHeight / props.itemHeight) * 2;

    // 实际展示数据的起始索引
    // 必须是floor，不能是ceil，否则一滚动可视的第一项就会发生变化
    const startIndex = computed(() => {
      return Math.floor(scrollOffset.value / props.itemHeight);
    });

    const endIndex = computed(() => startIndex.value + visibleCount);

    // 实际展示的数据
    const visibleData = computed(() =>
      props.dataList.slice(startIndex.value, endIndex.value)
    );

    const getTransform = computed(
      () => scrollOffset.value - (scrollOffset.value % props.itemHeight)
    );

    // 初始化
    const init = () => {
      // 可视区域高度
      // clientHeight.value = virtualListContainer.value?.offsetHeight;
      // virtualListContainer.value.scrollTop = props.itemHeight * props.start;
    };

    // 滚动监听
    const onScroll = () => {
      scrollOffset.value = virtualListContainer.value.scrollTop;
      console.log(scrollOffset.value);
    };

    // 初始化
    onMounted(() => {
      init();
    });

    return () => {
      return (
        <div
          class="virtual-scroll-viewport"
          ref={virtualListContainer}
          onScroll={onScroll}
        >
          <div
            class="virtual-scroll-phantom"
            style={{ height: `${listHeight}px` }}
          ></div>
          <div
            class="virtual-scroll-content"
            style={{ transform: `translateY(${getTransform.value}px)` }}
          >
            {visibleData.value.map((item) => (
             
                ctx.slots.default?.(item)

            ))}
          </div>
        </div>
      );
    };
  },
});
