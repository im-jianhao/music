<template>
  <div class="header">
    <div class="icon"></div>
    <h1 class="text">🎵音乐播放器🎵</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable'
@import '~@/assets/stylus/mixin'
.header
  height 44px
  display flex
  justify-content center
  align-items center
  .icon
    width 30px
    height 32px
    bg-image('./logo')
    background-size cover
    margin-right 9px
  .text
    color $color-theme
    font-size $font-size-large
</style>
