/**
 * Created by lili on 2015/3/10.
 */
(function ($) {

    $$.call = function (config) {
        var url = makeUrl(config.i);
        // code for IE7, IE8 , IE9
        if (window.XDomainRequest && judgeBower()) {
            var str;
            if (config.data instanceof Object)
                str = formatData(config.data);
            else
                str = null;

            var xdr = new XDomainRequest();
            xdr.onload = function () {
                var data = '';
                try {
                    data = JSON.parse(xdr.responseText);
                } catch (e) {
                    config.error(e);
                }
                config.success(data);

            };
            if (config.error instanceof Function) {
                xdr.onerror = config.error;
            }
            var method = config.type.toUpperCase();
            xdr.open(method, url, true);
            xdr.send(str);

        }
        else {
            config.url = url;
            avalon.ajax(config);
        }
    };
    function makeUrl(i) {
        var tsy = cache.go("tsy");
        var urlV;
        if (tsy != 'null' && tsy != null && tsy != '') {
            urlV = apiURL + i + '&tsy=' + tsy;
        }
        else {
            urlV = apiURL + i;
        }
        return urlV;
    };
    function formatData(data) {
        var paramArray = [];
        var params = data;
        for (var opt in params) {
            var value = params[opt];
            paramArray.push(opt + "=" + value);
        }
        return paramArray.join("&");
    };
    //判断浏览器ie 7 8 9
    function judgeBower() {
        var browser = navigator.appName;//浏览器名称
        var isIE = (browser == "Microsoft Internet Explorer");//判断ie
        if (isIE) {
            var ieVersion = getIEVer();//获得ie版本号
            if (ieVersion >= 7 && ieVersion < 10) {
                return true;
            }
        }
        else
            return false;

    };
    //获得ie浏览器版本号
    function getIEVer() {
        var ua = navigator.userAgent; //获取用户端信息
        var b = ua.indexOf("MSIE"); //检测特殊字符串"MSIE "的位置
        if (b < 0) {
            return 0;
        }
        return parseInt(ua.substring(b + 5, ua.indexOf(";", b))); //截取版本号字符串，并转换为数值
    }


})(jQuery);

