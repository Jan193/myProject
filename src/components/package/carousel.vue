<style sscoped lang="less">
#slider {
  //   width: 375px;
  height: 200px;
  position: relative;
  overflow: hidden;
}

#imgs {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

#imgs li {
  float: left;
  //   width: 375px;
  height: 100%;
  overflow: hidden;
}

#imgs li a {
  display: block;
  height: 100%;
}

#imgs li a img {
    // width: 100%;
    // height: 100%;
  width: 130%;
  height: 110%;
  margin-left: -15%;
  margin-top: -5%;
}

#prev,
#next {
  position: absolute;
  top: 130px;
  width: 40px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
}

#prev {
  left: 0;
}

#next {
  right: 0;
}

ul#index {
  height: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

ul#index > li {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 10px;
  float: left;
}

#index li.active {
  background-color: red;
}
</style>
<template>
  <div id="slider">
        <ul id="imgs">
            <li v-for="(val,index) in imgList" :key="index">
                <a href="javascript:;">
                    <img :src="apiUrl+val.imgUrl" alt="">
                </a>
            </li>
        </ul>
        <!-- <a id="prev">&lt;</a>
        <a id="next">&gt;</a> -->
        <ul id="index">
            <li v-for="(val,index) in indexNumber" :data-index="val" class="" :key="index"></li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    imgList: {
      type: Array,
      // validator: function(val){
      //   if(val.length > 0) {
      //     val.push(val[val.length-1])
      //   }
      // }
    },
    indexNumber: {
      type: Array
    }
  },
  data() {
    return {
      slider: "",
      imgs: "",
      lis: "",
      liWidth: "",
      index_li: "",
      timer: null,
      time: 3000,
      n: 0,
      apiUrl: "/static/",
      // indexNumber: []
    };
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.getWidth();
        this.init();
      }, 10);
      
    });
  },
  methods: {
    getWidth() {
      let width = document.documentElement.clientWidth;
      this.slider = document.getElementById("slider");
      this.imgs = document.getElementById("imgs");
      var lis = this.imgs;
      this.lis = this.imgs.getElementsByTagName("li");
      this.liWidth = width;

      this.imgs.style.width = this.lis.length * width + "px";
      for (let i=0; i<this.lis.length; i++) {
          this.lis[i].style.width = width + 'px';
      }

      var index_ul = document.getElementById("index");
      this.index_li= index_ul.children;
      index_ul.children[0].classList.add('active')
    },
    init: function() {
      this.autoPlay();
      this.slide();
      this.select();
    },
    autoPlay: function() {
      var _this = this;
      this.timer = setInterval(function() {
        _this.n++;
        _this.move();
      }, _this.time);
    },
    move: function() {
      if (this.n == this.lis.length) {
        this.imgs.style.left = 0;
        this.n = 1;
      } else if (this.n == -1) {
        this.imgs.style.left = -(this.lis.length - 1) * this.liWidth + "px";
        this.n = this.lis.length - 2;
      }

      for (let i = 0; i < this.index_li.length; i++) {
        this.index_li[i].classList.remove("active");
      }
      if (this.n < this.lis.length - 1) {
        this.index_li[this.n].classList.add("active");
      } else if (this.n == this.lis.length - 1) {
        this.index_li[0].classList.add("active");
      }
      this.doMove(this.imgs, -this.n * this.liWidth);
    },
    doMove: function(dom, offset) {
      var _this = this;
      clearInterval(dom.timer);
      dom.timer = setInterval(function() {
        var left = parseInt(_this.getStyle(dom));

        var speed = (offset - left) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (left == offset) {
          clearInterval(dom.timer);
        } else {
          dom.style.left = left + speed + "px";
        }
      }, 10);
    },
    getStyle: function(dom) {
      return dom.currentStyle
        ? dom.currentStyle["left"]
        : getComputedStyle(dom)["left"];
    },
    slide: function() {
      var _this = this;
      var start, end;
      this.imgs.addEventListener("touchstart", function(e) {
        e.preventDefault();
        start = parseInt(e.targetTouches[0].pageX);
      });
      this.imgs.addEventListener("touchmove", function(e) {
        e.preventDefault();
        end = parseInt(e.targetTouches[0].pageX);
      });
      this.imgs.addEventListener("touchend", function(e) {
        clearInterval(_this.timer);
        if (end - start > 0) {
          setTimeout(function() {
            _this.n--;
            _this.move();
          }, 500);
        } else if (end - start < 0) {
          _this.n++;
          _this.move();
        }
        _this.autoPlay();
      });
    },
    select: function() {
      var _this = this;
      this.imgs.onmouseover = function() {
        clearInterval(_this.timer);
      };
      _this.imgs.onmouseout = function() {
        _this.autoPlay();
      };
      var index_ul = document.getElementById("index");
      index_ul.addEventListener(
        "click",
        function(e) {
          var index = e.target.getAttribute("data-index");
          _this.n = Number(index) - 1;
          _this.move();
        },
        false
      );
    }
  }
};
</script>
