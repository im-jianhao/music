import instance from "@/utils/http";

const getSinger = () => {
  return instance.get("/api/singer");
};

const getMusicList = () => {
  return instance.get("/api/musicList");
};

export { getSinger, getMusicList };
