<template>
  <MusicList :title="title" :img="img" :song="song"></MusicList>
</template>
<script>
import { getMusicList } from "@/api/singer";
import { createSong } from "@/utils/song";
import MusicList from "../MusicList/MusicList";
export default {
  data() {
    return {
      song: [],
    };
  },

  computed: {
    title() {
      return this.singer.Fsinger_name;
    },
    img() {
      return this.singer.avatar;
    },
  },

  created() {
    this.singer = this.$store.state.singer;
    Object.keys(this.singer).length > 0
      ? this._getMusicList()
      : this.$router.push("/singer");
  },

  methods: {
    async _getMusicList() {
      const data = await getMusicList();
      if (data.status === 200 && data.data.code === 0) {
        this.song = this._normalizeSongs(data.data.data.list);
      }
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        const { musicData } = item;
        ret.push(createSong(musicData));
      });
      return ret;
    },
  },

  components: {
    MusicList,
  },
};
</script>
