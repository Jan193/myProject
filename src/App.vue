<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!-- <keep-alive> -->
        <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "../static/fonts/iconfont.css";
  /* body,html,div {
      -webkit-overflow-scrolling:touch;
  } */
  /* body, p, ul, li,h1, h2, h3, h4, input, textarea, button {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
} */
body {
    background-color: #fff;
}
i {
    font-style: normal;
}
img {
    font-size: 0;
    vertical-align: middle;
}
a,button,input,select,img,label{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color:transparent;
    outline:medium none;
}
a {
    text-decoration: none;
    color: #333;
}
a:hover {
    color: #333;
}
a:visited {
    background-color: transparent;
}
.clearfix:after {
    content: "";
    clear: both;
    display: block;
}

button {
    border-radius: 5px;
}
input, textarea, button {
    border:none;
    outline: none;
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#ccc;
}
input:-moz-placeholder,textarea:-moz-placeholder{
    color:#ccc;
}
</style>
