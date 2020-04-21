<template>
  <div id="app">
    <Header />
    <Tab />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header/";
import Tab from "@/components/Tab/";
export default {
  components: { Header, Tab },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
</style>
