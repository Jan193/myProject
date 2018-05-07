<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mint-swipe-indicator.is-active {
  background: #000 !important;
  opacity: 0.6;
}
</style>

<style scoped>
.index {
  background-color: #f7f7f7;
}
.mint-swipe {
    width: 100%;
    height: 3.5rem;
  }
  .mint-swipe img {
    width: 120%;
    margin-left: -10%;
    height: 100%;
  }
  .mint-swipe-item {
    background-color: #eee;
  }

/* main */
.list {
  padding-top: 0.2rem;
}
.item {
  background-color: #fff;
  margin-bottom: 0.2rem;
}
.item .imgs {
  width: 100%;
  max-height: 120px;
  overflow: hidden;
}
.item .imgs img {
  width: 100%;
}

.item-detail {
  padding: 0.13rem 0.2rem;
}
.item-name {
  font-size: 0.3rem;
  font-weight: bold;
}
.item-intro {
  font-size: 0.25rem;
  line-height: 0.4rem;
}
.item-footer {
  font-size: 0.25rem;
  color: #6f6f6f;
  margin-top: 0.1rem;
}
.item-footer .left {
  float: left;
}
.item-footer .right {
  float: right;
  font-size: 0.13rem;
}
.item-footer .iconfont {
  font-size: 0.25rem;
  margin-left: 10px;
}
span.iconfont > i {
  margin-left: 5px;
}
/* 已点赞*/
.is-like {
  color: #55c3ff;
}
</style>

 
<template>
  <div class="index">
    <!-- <v-carousel :imgList="bannerImgs" :indexNumber="indexNumber"></v-carousel> -->
    <mt-swipe :auto="bannerTimes">
      <mt-swipe-item v-for="(val,index) in bannerImgs" :key="index"><img :src=" apiUrl + val.imgUrl " alt=""></mt-swipe-item>
    </mt-swipe>
    <div class="main">
        <ul class="list">
            <li class="item" v-for="(val, index) in itemList" :key="index">
                <div class="imgs" v-on:click="goDetail(val, index)">
                    <img :src=" apiUrl+val.imgUrl " alt="">
                </div>
                <div class="item-detail">
                    <p class="item-name">{{val.title}}</p>
                    <p class="item-intro">{{val.short}}</p>
                    <div class="item-footer clearfix">
                        <p class="left">
                            <span>{{val.publisher}}</span>
                            <span>{{val.createTime}}</span>
                        </p>
                        <p class="right">
                            <span class="iconfont icon-yanjing"><i>{{val.visitCount}}</i></span>
                            <span @click="addLike(val, index)" :class="val.isLike ? 'is-like' : ''" class="iconfont icon-zan"><i>{{val.likeCount}}</i></span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- loading -->
    <v-loading v-show="isLoading"></v-loading>
  </div>
</template> 

<script>
import Vue from "vue";
import "../components/js/init.js";

import { Indicator } from "mint-ui";
// import { Swipe, SwipeItem, Lazyload } from "mint-ui";
import {Swipe, SwipeItem} from 'mint-ui'
Vue.use(Swipe.name, Swipe);
Vue.use(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);

import { convertData, getTerminal } from "../components/js/common";
import Loading from "../components/package/loading";

// 引入轮播组件
import Carousel from "../components/package/carousel";
import config from '../components/js/config'
import {getBanner, getCommunityList} from '../components/js/api'

export default {
  name: "index",
  data() {
    return {
      languageCode: "",
      languageArea: "",
      bannerImgs: [],
      indexNumber: [],
      bannerTimes: 3000,
      itemList: [],
      loading: false, // 加载更多
      isLoading: false, // 加载提示
      // apiUrl: '/myApp/dist/',
      apiUrl: "/static/",
      terminal: ''
    };
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    "v-loading": Loading,
    // "v-carousel": Carousel
  },
  watch: {
    isLoading(val) {
      var index = document.getElementsByClassName("index")[0];
      if (val) {
        index.style.height = window.screen.height + "px";
        index.style.overflow = "hidden";
      } else {
        index.style.height = "auto";
        index.style.overflow = "auto";
      }
    }
  },
  created() {
    this.isLoading = true;
  },
  beforeMount() {
    this.terminal = getTerminal();
  },
  mounted() {
    this.$nextTick(function() {
		var index = document.getElementsByClassName("index")[0];
		this.getBanner();
		this.getList();
		this.getLanguage();

		// this.isLoading = false;
		// window.onload = () => {
		//   this.isLoading = false;
		// };
	   this.isLoading = false;
	   
    });
  },
  methods: {
    // 加载更多
    lazyLoad() {
      let _this = this;
      // let loading = false;
      var body = document.body,
        doc = document.documentElement;
      window.onscroll = function(e) {
        if (body.scrollHeight - (doc.scrollTop + window.screen.height) < 100) {
          e.stopPropagation();
          if (_this.loading) return;
          _this.loading = true;
          _this.getList(_this.loading); // 在请求成功之后把‘loading’设置为false
        } else {
          _this.loading = false;
        }
      };
    },
    getLanguage() {
      var query = this.$route.query;
      var lang = query.languageCode || query.LanguageCode;
      if (lang) {
        // 用户手动设置语言
        lang = lang.toLocaleLowerCase();
        if (lang == "zh" || lang == "cn") {
          this.languageCode = "cn";
          this.languageArea = "zh-CN";
        } else {
          this.languageCode = lang;
          this.languageArea = query.languageArea || query.LanguageArea;
        }
      } else {
        // 获取浏览器当前语言
        var type = navigator.appName;
        let lang;
        if (type == "Netscape") {
          lang = navigator.language;
        } else {
          lang = navigator.userLanguage;
        }
        this.languageCode = lang.substr(0, 2);
        this.languageArea = lang;
      }
    },
    getBanner() {
		const _this = this;
		getBanner().then(res=>{
			_this.bannerImgs = convertData(res.data, _this.languageCode);
			_this.bannerImgs.push(_this.bannerImgs[0])
			for (let i=0;i<_this.bannerImgs.length-1;i++) {
				_this.indexNumber.push(i+1)
			}
		})
    },
    goDetail: function(val, index) {
      window.sessionStorage.setItem("selected", JSON.stringify(val));
      var id = val.id;
      // var languageCode = window.sessionStorage.getItem('languageCode');
      // var languageArea = window.sessionStorage.getItem("languageArea");
      this.$router.push({
        path: "/detail",
        query: {
          ID: id,
          languageCode: this.languageCode,
          languageArea: this.languageArea
        }
      });
    },
    addLike: function(val, index) {
		if (val.isLike) {
			val.isLike = false;
			val.likeCount -= 1;
		} else if (!val.isLike) {
			val.isLike = true;
			val.likeCount += 1;
		}
    },
    getList: function(loading) {
		var _this = this;
		getCommunityList().then(res=>{
			// _this.itemList = convertData(res.data, _this.languageCode);
			var arr = convertData(res.data, _this.languageCode);
			_this.itemList.push.apply(_this.itemList, arr);
			if (loading) {
				_this.loading = false;
			}
			// _this.isLoading = false;
		})
    }
  }
};
</script>
