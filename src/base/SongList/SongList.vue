<template>
  <ul>
    <li v-for="(item, idx) in song" :key="idx">
      <h2>{{ item.songname }}</h2>
      <p>{{ item.singer }}.{{ item.albumname }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    song: {
      type: Array,
      default: [],
    },
  },
};
</script>
