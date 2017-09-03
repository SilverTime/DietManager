/**
 * Created by lili on 2015/3/30.
 */
var $ = {};
$$.call = function (config) {
    avalon.ready(function () {
        require(["mmRequest"],function(){
            var url = $$.call.makeUrl(config.i);
            config.url = url;
            avalon.ajax(config);
        })

    })

};
$$.call.makeUrl = function (i) {
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


