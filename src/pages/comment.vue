<style scoped lang="less">
.comment {
  margin: 0 0.3rem;
}
/* 热门评论 */
@import "../components/css/hotComment.less";
@nameColor: #0c60ee;
.name-color {
  color: @nameColor;
}
.child-comment {
  padding-left: 0.3rem;
  font-size: 0.25rem;
}
.child-comment > p {
  line-height: 0.4rem;
  margin: 0.05rem 0;
}
.comment .item {
  margin-bottom: 0.3rem;
}
.is-thumbUp{
  color: #55C3FF
}
</style>
<template>
  <!-- 更多评论 -->
  <div class="comment">
    <h4 class="title"><span>{{hotTitle}}</span></h4>
    <ul>
        <li class="item clearfix" v-for="(val,index) in comments" :key="index">
            <div class="item-left">
                <img :src=" apiUrl + val.userHeader " alt="">
            </div>
            <div class="item-right clearfix">
                <div style="float:left;width:100%;">
                    <p class="item-name"> 
                      <span class="name-color">{{val.userName}}</span> 
                      <span @click="thumbUp(val)" class="iconfont-box" :class="val.isLike?'is-thumbUp':''"><i class="iconfont icon-zan"></i>&nbsp;{{val.fabulous}}</span>
                    </p>
                    <p class="item-content">{{val.content}}</p>
                    <div class="child-comment">
                        <p v-for="(child, i) in val.replyContent" :key="i"><span class="name-color">{{child.replyUserName}}: </span>{{child.replyContent}}</p>
                    </div>
                    <p class="item-footer">
                        <span> {{val.commentTime + ' ' + val.hoursTime}}</span>
                        <span @click="hideMask" style="float:right;">{{val.replyTitle}}</span>
                    </p>
                </div>
            </div>
        </li>
    </ul>
    <v-mask v-show="showMask" :maskData="replase" v-on:isMask="hideMask"></v-mask>
</div>
</template>
<script>
import { convertData } from "../components/js/common.js";
import Mask from "../components/package/mask";
import { Toast } from "mint-ui"
import {getComment} from '../components/js/api'

export default {
  data() {
    return {
      hotTitle: "",
      languageCode: "",
      comments: "",
      apiUrl: "/static/",
      // apiUrl: '/myApp/dist/',
      replase: "",
      showMask: false
    };
  },
  components: {
    "v-mask": Mask
  },
  mounted: function() {
    this.$nextTick(function() {
      this.languageCode = this.$route.query.languageCode;
      this.getComment();
    });
  },
  methods: {
    // 获取评论
    getComment: function() {
		var _this = this;
		getComment().then(res=>{
			var data = convertData(res.data, _this.languageCode);
			console.log(data);
			_this.comments = data;
			var val = data[0];
			_this.hotTitle = val.allTitle;
			_this.replase = val.buttonText;
		})
    },
    replay: function() {
      alert("hui fu");
    },
    hideMask: function(val) {
      this.showMask = !this.showMask;
      if (!this.showMask) {
        if (
          val.commentValue === undefined ||
          val.commentValue === "" ||
          val.commentValue === null
        ) {
          // console.log("no comment");
        } else {
          console.log("Ping lun success");
          // val.commentValue
          Toast({
            message: "评论成功",
            // iconClass: 'icon icon-success',
            duration: 1000
          });
        }
      }
    },
    // 点赞
    thumbUp (val) {
      if (val.isLike) {
        val.isLike = false
        val.fabulous -= 1;
      } else {
        val.isLike = true;
        val.fabulous += 1;
      }
    },
  }
};
</script>

