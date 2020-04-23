import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "" : "http://jhmgz.top:3389",
  timeout: 3000,
});

export const getSwiper = () => {
  return instance.get("/api/banner");
};

export const getDiscList = () => {
  return instance.get("/api/getDiscList");
};
