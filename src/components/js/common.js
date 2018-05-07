export let convertData = function(data, languageCode) {
  var languageCode = languageCode.toLowerCase(); // 把语言转成小写
  var res;
  if (languageCode === "cn" || languageCode === "zh") {
    res = data.cn;
  } else if (languageCode === "en") {
    res = data.en;
  }
  return res;
};

export let getQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); // 匹配目标参数
  var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
  if (result != null) {
    return decodeURIComponent(result[2]);
  } else {
    return null;
  }
};

export let getTerminal = function() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  var terminal;
  //PC终端
  var PC = true;
  //android终端
  var isAndroid =
    userAgentInfo.indexOf("Android") > -1 || userAgentInfo.indexOf("Adr") > -1;
  //ios终端
  var isiOS = !!userAgentInfo.match(
    /\(i[^;]+;( userAgentInfo;)? CPU.+Mac OS X/
  );
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      PC = false;
      break;
    }
  }
  //-----------PC-----------
  if (PC) {
    terminal = "pc";
    return terminal;
  }
  //-----------Android/ios-----------
  if (PC === false) {
    if (isAndroid) {
      terminal = "Android";
      return terminal;
    }
    //-----------ios-----------
    if (isiOS) {
      terminal = "ios";
      return terminal;
    }
  }
  return terminal;
};
