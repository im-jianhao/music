<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import _ from "lodash";
export default {
  props: {
    probeType: {
      // better-scroll scroll事件派发周期
      type: Number,
      default: 1,
    },
    data: {
      requier: true,
    },
    click: {
      type: Boolean,
      default: false,
    },
    listenScroll: {
      // 是否监听scroll事件
      type: Boolean,
      default: false,
    },
  },

  computed: {
    // 如果需要监听scroll事件需要把probeType设置为3
    _probeType() {
      return this.listenScroll ? 3 : this.probeType;
    },
  },

  mounted() {
    // 确保DOM已经渲染
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },

  methods: {
    // 初始化better-scroll
    _initScroll() {
      const _this = this;
      const el = _this.$refs.wrapper;
      if (!el) return;
      _this.scroll = new BScroll(el, {
        probeType: _this._probeType,
        click: this.click,
      });
      if (_this.listenScroll) {
        _this.scroll.on("scroll", (pos) => {
          _this.$emit("scroll", pos);
        });
      }
    },

    refresh() {
      this.scroll?.refresh();
    },

    scrollToElement() {
      this?.scroll?.scrollToElement.apply(this.scroll, arguments);
    },
  },

  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    },
  },
};
</script>

<style lang="stylus">
.wrapper
  height 100%
  overflow hidden
</style>
