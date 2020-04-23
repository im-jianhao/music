<template>
  <ul class="tab-container">
    <li class="tab-item">
      <router-link to="/recommend">推荐</router-link>
    </li>
    <li class="tab-item">
      <router-link to="/singer">歌手</router-link>
    </li>
    <li class="tab-item">
      <router-link to="/rank">排行</router-link>
    </li>
    <li class="tab-item">
      <router-link to="/search">搜索</router-link>
    </li>
  </ul>
</template>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';
.tab-container
  height 44px
  display flex
  .tab-item
    flex 1
    line-height 44px
    a
      // display inline-block
      padding-bottom 5px
      // height 100%
      border-bottom 2px solid transparent
      font-size $font-size-medium
      &.router-link-active
        color $color-theme
        border-bottom-color  $color-theme
</style>
