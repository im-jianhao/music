<template>
  <div class="singer">
    <ListView :data="singerList" @select="selectSinger"></ListView>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListView from "@/components/ListView/";
import { getSinger } from "@/api/singer";
export default {
  components: {
    ListView,
  },

  data() {
    return {
      singerList: [],
    };
  },

  created() {
    // 获取数据
    this._getSinger();
  },

  methods: {
    selectSinger(item) {
      this.$store.commit("changeSinger", item);
      this.$router.push(`/singer/${item.Fsinger_mid}`);
    },
    async _getSinger() {
      this.singerList = await getSinger();
    },
  },
};
</script>

<style lang="stylus" scoped>
.singer
  flex 1
  position relative
  overflow hidden
// 动画
.slide-enter-active,.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>
