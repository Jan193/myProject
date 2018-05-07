import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/index";
// import Detail from '@/pages/detail.vue'
// import Comment from '@/pages/comment.vue'
const Detail = () => import("@/pages/detail.vue");
const Comment = () => import("@/pages/comment.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
      // meta: { keepAlive: true }
    },
    {
      path: "/detail",
      name: "文章详情",
      component: Detail
      // meta: { keepAlive: false }
    },
    {
      path: "/comment",
      name: "all comment",
      component: Comment
    }
  ]
});
