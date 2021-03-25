export default class Song {
  constructor({
    songid,
    songmid,
    songname,
    albummid,
    albumname,
    interval,
    singer,
  }) {
    this.songid = songid;
    this.songmid = songmid;
    this.songname = songname;
    this.imgSrc = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
    this.albumname = albumname;
    this.interval = interval;
    this.singer = this.handleSinger(singer);
  }
  handleSinger(singer) {
    let str = "";
    singer.forEach((item) => {
      str += "/" + item.name;
    });
    return str.substr(1);
  }
}

export const createSong = (musicData) => {
  return new Song(musicData);
};
