<style>
[v-clock] {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 300;
}
.loading-box {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon-loading {
  display: inline-block;
  font-size: 1.3rem;
  color: #f9f9f9;
  transform: rotate(360deg);
  animation: isloading 1.5s linear infinite;
}
@keyframes isloading {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="loading">
      <div class="loading-box">
        <i class="iconfont icon-loading"></i>
      </div>
    </div>
</template>

