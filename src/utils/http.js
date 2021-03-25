import axios from "axios";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "" : "http://jhmgz.top:3389",
  timeout: 3000,
});

instance.interceptors.response.use(function(response) {
  const { status, data } = response;
  // 对歌手的数据进行排序
  if (
    status === 200 &&
    response.config.url === "/api/singer" &&
    data.code === 0
  ) {
    const { list } = data.data;
    const mapList = handleSingerList(list);
    return mapList;
  }
  return response;
});
function hasKey(ary, key) {
  return ary.filter((item) => {
    return item.title === key;
  });
}
// 处理歌手数据
function handleSingerList(list) {
  // 热门
  // map是一个二维数组，key为字母，value为歌手信息的一个对象
  let map = [];
  // 按照 Findex 进行排序
  list.forEach((item) => {
    // 对图片进行处理
    item.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`;
    const key = item.Findex;
    if (/\d/.test(key)) return;
    let arr = hasKey(map, key);
    if (arr.length !== 0) {
      arr[0].singerList.push(item);
    } else {
      map.push({
        title: key,
        singerList: [item],
      });
    }
  });
  // a-z 排序
  map.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt());
  map.unshift({
    title: "热门",
    singerList: list.slice(0, 10),
  });
  return map;
}

export default instance;
