<style scoped>
/* import commentVue from './comment.vue'; */
/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal {
  width: 100%;
  position: absolute;
  bottom: 4rem;
  top: 0;
}
.mask .box {
  width: 100%;
  height: 4.5rem;
  background-color: #fff;
  position: absolute;
  bottom: 0;
}

.box .btns {
  padding: 0.2rem 0.4rem;
  border-bottom: 1px solid #bbb;
}
.box button {
  padding: 0.1rem 0.2rem;
  font-size: 0.3rem;
  color: #fff;
}
.box button:first-child {
  /* margin-left: 20px; */
  float: left;
}
.box button:last-child {
  float: right;
  background-color: #bbb;
}
.box button.btn-true {
  background-color: #33cd5f;
}
.input-area {
  height: 100%;
  /* padding: 0.2rem; */
}
.input-area textarea {
  width: 100%;
  height: 100%;
  font-size: 0.28rem;
  color: #666;
  padding: 0.2rem;
}

.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
@-webkit-keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
}

@-webkit-keyframes slideOutDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes slideOutDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

.slideOutDown {
  -webkit-animation-name: slideOutDown;
  animation-name: slideOutDown;
}
</style>
<template>
  <div id="mask">
      <!-- <transition name="slide-fade"> -->
            <div class="mask animated slideInUp" @touchmove.prevent>
                <div class="modal" @click="hideMask" ></div>
                <div class="box">
                    <div class="btns clearfix">
                        <!--<button @click="hideMask">{{cancel}}</button>-->
                        <button @click="addComment" :class="commentValue.length > 0 ? 'btn-true' : ''" v-cloak  v-text="maskData"></button>
                    </div>
                    <div class="input-area">
                        <textarea ref="comment" v-model="commentValue" class="comment-area" maxlength="150" placeholder="限150字以内"></textarea>
                    </div>
                </div>
            </div>
        <!-- </transition> -->
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  props: {
    maskData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMask: true,
      textarea: "",
      commentValue: "",
      replase: "replase"
      // maskData2: this.maskData
    };
  },
  watch: {
    //   maskData2 (val) {
    //       console.log(val)
    //   }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.showMask);
    });
  },
  methods: {
    hideMask: function() {
      this.showMask = false;
      console.log(this.showMask);
      this.$emit("isMask", { commentValue: "" });
    },
    addComment: function() {
      if (this.commentValue.length <= 0) {
          Toast({
            message: "说点什么吧",
            // iconClass: 'icon icon-success',
            duration: 2000
          });
      } else {
        this.showMask = false;
        this.$emit("isMask", { commentValue: this.commentValue });
      }
    }
  }
};
</script>