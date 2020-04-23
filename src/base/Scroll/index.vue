<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
  props: {
    data: {
      requier: true,
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
      const el = this.$refs.wrapper;
      if (el) {
        console.log(el);

        this.scroll = new BScroll(el);
      }
    },

    refresh() {
      setTimeout(() => {
        this.scroll?.refresh();
      }, 20);
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
