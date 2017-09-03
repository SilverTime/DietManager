/**
 * Created by lili on 2015/3/30.
 */
var $$ = {};
$$.times=0
$$.call = function (config) {
    avalon.ready(function () {
        require(["mmRequest"],function(){
            var url = $$.call.makeUrl(config.i);
            config.url = url;

            //开启进度条
            try {
                pb.startT()
            } catch (err) {
            }
            $$.times++

            avalon.ajax({
                url:url,
                type:"post",
                data:config.data,
                success:function(res){

                    //进度条控制
                    $$.times--
                    if($$.times<=0){
                        $$.times=0
                        //结束进度条
                        try {
                            pb.endT()
                        } catch (err) {
                        }
                    }

                    //如果自动转换失败则手动转换一次json
                    if(typeof res=="string"){
                        res=JSON.parse(res)
                    }

                    if(!res.err&&res.d !== false){
                        //执行成功
                        config.success(res.d,res)
                    }
                    else{
                        //执行失败
                        config.error(res.err)
                        console.log('服务端执行错误：'+res.m)
                        console.log(res)
                    }

                    //缓存tsy
                    if(res.tsy){
                        cache.go({tsy:res.tsy})
                    }

                    //缓存用户登录信息
                    if(res.UID>0){
                        //已登录状态
                        cache.go({
                            uid:res.UID,
                            un:res.UN
                        })
                        try{Gate.logined=true}catch(err){}
                    }else{
                        //未登录或登陆已失效
                        try{Gate.reset()}catch(err){}
                        index.uid=0
                    }
                }
            });
        })

    })

};
$$.call.makeUrl = function (i) {
    var tsy = cache.go("tsy");
    var urlV;
    //if (tsy != 'null' && tsy != null && tsy != '') {
    //    urlV = apiURL + i + '&tsy=' + tsy;
    //}
    //else {
        urlV = apiURL + i;
    //}
    if(window.location.href.indexOf('debug')){
        //return urlV+"&XDEBUG_SESSION_START=12520";
    }

    return urlV
};


