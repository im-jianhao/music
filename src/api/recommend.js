import instance from "@/utils/http";

const getSwiper = () => {
  return instance.get("/api/banner");
};

const getDiscList = () => {
  return instance.get("/api/getDiscList");
};

export { getSwiper, getDiscList };
