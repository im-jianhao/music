<template>
  <div class="singer-detail">
    <!-- 回退按钮 -->
    <div class="back">
      <i></i>
    </div>
    <!-- 标题 -->
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      ref="bgImage"
      :style="{ backgroundImage: `url(${img})` }"
    >
      <!-- 随机播放 -->
      <!-- <div>
        <div>
          <i></i>
          <span>随机播放全部</span>
        </div>
      </div> -->
      <!-- 遮罩层 -->
      <div class="mask"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <Scroll
      :data="song"
      :listenScroll="listenScroll"
      @scroll="scroll"
      ref="wrapper"
      class="list"
    >
      <div class="song-wrap">
        <SongList :song="song"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/base/Scroll/";
import SongList from "@/base/SongList/SongList";
// 标题的高度
const TITLE_HEIGHT = 40;

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    song: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      data: [],
    };
  },

  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.elOffsetTop = 0;
  },

  mounted() {
    this.elBgLayer = this.$refs.bgLayer;
    this.elBgImage = this.$refs.bgImage;
    this.imgHeight = this.elBgImage.clientHeight;
    this.maxScrollY = this.imgHeight - 40;
    this.$refs.wrapper.$el.style.top = this.imgHeight + "px";
  },

  methods: {
    scroll(pos) {
      const { y } = pos;
      const Y = Math.min(this.maxScrollY, -y);
      if (y > 0) {
        const scale = 1 + y / this.imgHeight;
        this.elBgImage.style.transform = `scale(${scale})`;
        this.elBgImage.style.zIndex = 2;
      } else if (-y <= this.maxScrollY) {
        this.elBgImage.style.paddingBottom = "70%";
        this.elBgImage.style.height = 0;
        this.elBgImage.style.zIndex = 0;
        // 滚动中的时候
        this.elBgLayer.style = `transform:translate3d(0,${-Y}px,0)`;
      } else {
        // 到达顶端
        this.elBgImage.style.padding = 0;
        this.elBgImage.style.height = "40px";
        this.elBgImage.style.zIndex = 2;
      }
    },
  },

  components: {
    Scroll,
    SongList,
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.singer-detail
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background $color-background
  z-index 10
  .bg-image
    position relative
    width 100%
    height 0
    padding-bottom 70%
    background-size 100%
    transform-origin top
  .title
    position absolute
    top 0
    left 10%
    width 80%
    height 40px
    line-height 40px
    font-size 18px
    font-weight 900
    z-index 10
  .mask
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(7, 17, 27, 0.4)
  .bg-layer
    position relative
    width 100%
    height 100%
    background $color-background
  .list
    position fixed
    height auto
    width 100%
    top 0
    bottom 0
    overflow visible
</style>
