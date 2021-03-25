<template>
  <div class="recomment">
    <Scroll ref="scroll" class="wrapper" :data="discList">
      <div>
        <!-- 轮播图-开始 -->
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, idx) in slideList" :key="idx">
            <img @load="loadImg" :src="item" alt="" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 轮播图-结束 -->
        <h2 class="recommend-title">热门歌单推荐</h2>
        <!-- 歌单列表-开始 -->
        <ul class="recommend-list">
          <li class="item" v-for="item in discList" :key="item.listennum">
            <div class="icon">
              <img v-lazy="item.imgurl" alt="" />
            </div>
            <div class="text">
              <h2>{{ item.creator.name }}</h2>
              <p>{{ item.dissname }}</p>
            </div>
          </li>
        </ul>
        <!-- 歌单列表-结束 -->
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/base/Scroll/";
import { getSwiper, getDiscList } from "@/api/recommend";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    Scroll,
  },

  data() {
    return {
      discList: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      slideList: [],
    };
  },

  created() {
    this._getSwiper();
    this._getDiscList();
  },

  methods: {
    async _getSwiper() {
      const { status, data } = await getSwiper();
      if (status === 200 && data.code === 0) {
        this.slideList = data.imgList;
      }
    },

    async _getDiscList() {
      const { status, data } = await getDiscList();
      if (status === 200 && data && data.code === 0) {
        this.discList = data.data.list;
      }
    },

    loadImg() {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh();
        this.checkLoad = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';
img
  width 100%
.recomment
  flex 1
  overflow hidden
.recommend-title
  color $color-theme
  font-size $font-size-large
  padding 10px 0
.recommend-list
  padding-left 15px
.item
  display flex
  align-items center
  .icon
    width 60px
    img
      width 100%
  .text
    height 100%
</style>
