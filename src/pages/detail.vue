<style lang="less">
[v-cloak] {
  display: none;
}
/* 热门评论 */
@import "../components/css/hotComment.less";
@pagePadding: 0.35rem;
@footerHeight: 0.9rem;

.back-top a {
  color: #fff;
  position: fixed;
  bottom: 0.99rem;
  right: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 0.4rem;
  padding: 0.2rem;
}
html,
body {
  height: 100%;
}

#detail {
  padding: 0 @pagePadding;
  padding-bottom: @footerHeight;
  position: relative;
}
.title {
  font-size: 0.35rem;
  margin: 0.2rem 0;
  text-align: center;
}
.user-head {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 100%;
  overflow: hidden;
  float: left;
  margin-right: 0.2rem;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.user-name {
  font-size: 0.3rem;
}
.date-ready {
  font-size: 0.2rem;
  color: #bfbfbf;
}

/* main  */
.main {
  padding-top: 5px;
}
.article_cont_text {
  font-size: 0.28rem;
  line-height: 0.4rem;
}
.article_cont_img img {
  width: 100%;
  height: 100%;
  margin: 5px 0;
}

/* 页脚 */
.footer {
  height: @footerHeight;
  line-height: @footerHeight;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 @pagePadding;
  background-color: #fff;
  border-top: 1px solid #f9f9f9;
  overflow: hidden;
}
.footer .footer-left {
  float: left;
  width: 65%;
}
.footer .footer-right {
  float: right;
  font-size: 0.3rem;
}
.footer .footer-right a {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-left: 5px;
}
.footer .footer-right a span {
  margin-left: 5px;
  display: inline-block;
}
.footer .iconfont {
  font-size: 0.3rem;
}
.footer .is-like {
  color: red;
}

.more-comment p {
  font-size: 0.25rem;
  margin-bottom: 0.3rem;
  text-align: center;
  color: #0c60ee;
}
.is-thumbUp {
  color: #55c3ff;
}

// .slide-fade-enter-active {
//   transition: all 0.3s ease;
// }
// .slide-fade-leave-active {
//   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
// }
// .slide-fade-enter,
// .slide-fade-leave-to {
//   transform: translateY(100%);
//   opacity: 0;
// }
</style>

<template>
<keep-alive>
<div id="detail">
        <div class="aritcle">
            <h3 class="title">{{aritcle.title}}</h3>
            <div class="user clearfix">
                <div class="user-head">
                    <img :src=" apiUrl + aritcle.UserHeaderUrl " alt="">
                </div>
                <div>
                    <p class="user-name">{{aritcle.UserName}}</p>
                    <p class="date-ready">
                        <span class="date">{{aritcle.Time}}</span>
                        <span class="ready-count">阅读 {{aritcle.likeArticles}}</span>
                    </p>
                </div>
            </div>
            <div class="main" v-html=" aritcle.content "></div>
        </div>
        <!-- 热门评论 -->
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
                              {{val.userName}}
                              <span @click="thumbUp(val)" :class="val.isLike ? 'is-thumbUp' : ''" class="iconfont-box"><i class="iconfont icon-zan"></i>&nbsp;{{val.fabulous}}</span>
                            </p>
                            <p class="item-content">{{val.content}}</p>
                            <p class="item-footer">
                                <span> {{val.commentTime + ' ' + val.hoursTime}}</span>
                                <span> {{val.reply + val.hasComments}}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="more-comment">
              <p @click="goComment">{{moreComment}}></p>
            </div>
        </div>
        <!-- 页脚 -->
        <div class="footer">
            <div class="footer-left" @click="hideMask">
                <i class="iconfont icon-xiepinglun" style="float:left;"></i>
            </div>
            <div class="footer-right">
                <a href="javascript:;" @click="addLike" :class=" aritcle.isLike ? 'is-like' : '' ">
                    <i class="iconfont icon-like"></i>
                    <span>{{aritcle.likeArticles}}</span>
                </a>
                <a href="javascript:;">
                    <i class="iconfont icon-pinglun1"></i>
                    <span>{{aritcle.comment}}</span>
                </a>
            </div>
        </div>
        <transition name="slide-fade">
          <v-mask v-on:isMask="hideMask" v-show="showMask" :maskData="maskData" ></v-mask>
        </transition>
        
        <!-- 滚动到顶部 -->
        <div class="back-top" v-show="backTopShow">
            <a @click="backTop" href="javascript:;" class="iconfont icon-top"></a>
        </div>

        <!-- loading -->
        <v-loading v-show="isLoading"></v-loading>
    </div> 
</keep-alive>
</template>
<script>
import { convertData } from "../components/js/common";
import { Toast } from "mint-ui";
import Mask from "../components/package/mask";
import Loading from '../components/package/loading'
import {getArticleData, getComment} from '../components/js/api'

export default {
  data: function() {
    return {
      languageCode: "",
      selected: {},
      aritcle: {},
      comments: [],
      showMask: false,
      commentValue: "", // 评论内容
      hotTitle: "", // 热门评论的标题
      moreComment: "", //
      backTopShow: false,
      // apiUrl: "/myApp/dist/",
      apiUrl: "/static/",
      maskData: "", // 传向mask的按钮值
      isLoading: false,
    };
  },
  components: {
    "v-mask": Mask,
    'v-loading': Loading
  },
  watch: {
    isLoading(val) {
      var hello = document.getElementById('app');
      if (val) {
        hello.style.height = window.screen.height + "px";
        hello.style.overflow = "hidden";
      } else {
        hello.style.height = "auto";
        hello.style.overflow = "auto";
      }
    }
  },
  created() {
    this.isLoading = true;
  },
  mounted: function() {
    var _this = this;
    _this.backTop();
    var doc = document.documentElement;
    this.$nextTick(function() {

      window.onscroll = function() {
        _this.backTopShow = doc.scrollTop > doc.clientHeight ? true : false;
      };

      this.getData();
      this.getComment();
      this.getLanguage();
    });
  },
  methods: {
    // 获取语言类型
    getLanguage: function() {
      var query = this.$route.query;
      this.languageCode = query.languageCode;
    },
    // 获取文章详情
    getData: function() {
		var _this = this;
		var id = this.$route.query;
		getArticleData().then(res=>{
			var data = convertData(res.data, _this.languageCode);
				for (var i = 0; i < data.length; i++) {
					var element = data[i];
					if (element.upperId == _this.$route.query.ID) {
						_this.aritcle = element;
						break;
					}
				}
		})
    },
    // 获取评论
    getComment: function() {
	  	var _this = this;
		getComment().then(res=>{
			var data = convertData(res.data, _this.languageCode);
			_this.comments = data;
			var val = data[0];
			_this.hotTitle = val.topTitle;
			_this.moreComment = val.fotTitle;
			_this.maskData = val.buttonText;

			_this.isLoading = false;
		})
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
          setTimeout(() => {
            Toast({
              message: "评论成功",
              // iconClass: 'icon icon-success',
              duration: 1000
            });
          },200);
        }
      }
    },
    // 发表评论
    addLike: function() {
      if (this.aritcle.isLike) {
        this.aritcle.isLike = false;
        this.aritcle.likeArticles -= 1;
      } else {
        this.aritcle.isLike = true;
        this.aritcle.likeArticles += 1;
      }
    },
    // 滚动到顶部
    backTop: function() {
      document.documentElement.scrollTop = 0;
    },
    goComment: function() {
      this.$router.push({
        path: "/comment",
        query: { languageCode: this.languageCode }
      });
    },
    // 点赞
    thumbUp(val) {
      if (val.isLike) {
        val.isLike = false;
        val.fabulous -= 1;
      } else {
        val.isLike = true;
        val.fabulous += 1;
      }
    }
  }
};
</script>
