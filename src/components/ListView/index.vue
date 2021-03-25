<template>
  <Scroll
    class="list-view"
    :data="data"
    ref="listView"
    :listenScroll="true"
    @scroll="handleScroll"
    :click="true"
  >
    <div>
      <div ref="singerGroup" v-for="item in data" :key="item.title">
        <h2 class="singer-title">
          {{ item.title }}
        </h2>
        <ul>
          <li
            class="singer-item"
            v-for="(i, idx) in item.singerList"
            :key="idx"
            @click="$emit('select', i)"
          >
            <img v-lazy="i.avatar" alt="" />
            <p>{{ i.Fsinger_name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <ul
      class="achor-container"
      @touchstart="achorTouchStart"
      @touchmove.stop.prevent="achorTouchMove"
    >
      <li
        class="achor-point"
        v-for="(item, idx) in data"
        :class="{ active: activeIndex === idx }"
        :data-index="idx"
        :key="item.title"
      >
        {{ item.title }}
      </li>
    </ul>
    <div class="list-fiexd" v-show="scrollY < 0" ref="listFiexd">
      {{ fiexdTitle }}
    </div>
  </Scroll>
</template>

<script>
import Scroll from "@/base/Scroll";

const ACHOR_HEIGHT = 18;
const TITLE_HEIGHT = 16;

export default {
  components: {
    Scroll,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.touch = {};
    this.listenScroll = true;
    this.singerGroupHeight = [];
  },

  data() {
    return {
      activeIndex: 0,
      scrollY: -1,
    };
  },

  computed: {
    fiexdTitle() {
      return this.data[this.activeIndex]?.title;
    },
  },

  methods: {
    // 右侧导航 touchstart 事件
    achorTouchStart(e) {
      let achorIndex = e.target.attributes["data-index"].value;
      this.touch.startY = e.touches[0].pageY;
      this.touch.statrIndex = achorIndex;
      this._scrollToElement(achorIndex);
    },
    // 右侧导航 touchmove 事件
    achorTouchMove(e) {
      const activeIndex =
        Math.floor((e.touches[0].pageY - this.touch.startY) / ACHOR_HEIGHT) +
        parseInt(this.touch.statrIndex);
      if (activeIndex < 0 || activeIndex > this.singerGroupHeight.length - 2)
        return;
      this._scrollToElement(activeIndex);
    },
    // scroll 事件函数
    handleScroll(pos) {
      this.scrollY = pos.y;
      const Y = Math.abs(this.scrollY);
      // 当前区域的下限 - 滚动的高度 - title高度的一个差值
      const diff =
        this.singerGroupHeight[this.activeIndex + 1] - TITLE_HEIGHT - Y;
      const el = this.$refs.listFiexd;
      if (diff <= 0) {
        el.style.top = diff + "px";
      } else {
        el.style.top = "0px";
      }
      this.singerGroupHeight.forEach((_, index) => {
        const height1 = this.singerGroupHeight[index];
        const height2 = this.singerGroupHeight[index + 1];
        if (Y >= height1 && Y < height2) {
          this.activeIndex = index;
          return;
        }
      });
    },
    //
    _scrollToElement(achorIndex) {
      this.$refs.listView.scrollToElement(
        this.$refs.singerGroup[achorIndex],
        0
      );
    },
    _calculateHeight() {
      let height = 0;
      this.singerGroupHeight.push(height);
      this.$refs.singerGroup.forEach((item) => {
        height += item.clientHeight;
        this.singerGroupHeight.push(height);
      });
    },
  },

  watch: {
    data() {
      // 计算高度
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
  },
};
</script>

<style lang="stylus" scoped>
.singer-title
  text-align left
  background-color #666
.singer-item
  display flex
  img
    width 60px
.list-view
  height 100%
  overflow hidden
.achor-container
  position absolute
  top 50%
  transform translateY(-50%)
  right 10px
  .achor-point
    line-height 18px
.active
  color #ffcd32
.list-fiexd
  position absolute
  top 0
  width 100%
  text-align left
  background-color #666
</style>
