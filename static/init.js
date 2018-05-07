(function(doc, win) {
    var doc = doc.documentElement
    var resize = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var calc = function() {
        var w = doc.clientWidth
        doc.style.fontSize = 100 * (w / 750) + 'px'
    }
    window.addEventListener('DOMContentLoaded', calc, false)
    window.addEventListener(resize, calc, false)


    var languageCode = getQueryString('LanguageCode')
    var languageArea = getQueryString('LanguageAreaCode')

    var l = navigator.language
    var arr = l.split('-')

    if (languageCode === null) {
        languageCode = arr[1];
        languageArea = l;
        window.sessionStorage.setItem('languageCode', languageCode)
        window.sessionStorage.setItem('languageArea', languageArea)
    } else {
        window.sessionStorage.setItem('languageCode', languageCode)
        window.sessionStorage.setItem('languageArea', languageArea)
    }

})(document, window);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}