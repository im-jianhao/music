import Vue from "vue";
import VueRouter from "vue-router";
import Recommend from "@/views/Recommend/";
import Singer from "@/views/Singer/";
import Rank from "@/views/Rank/";
import Search from "@/views/Search/";
import SingerDetail from "@/components/SingerDetail/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/singer",
    component: Singer,
    children: [{ path: ":id", component: SingerDetail }],
  },
  {
    path: "/rank",
    component: Rank,
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
