/**
 * 门禁系统，设计者：mooshroom
 * 当前版本，v0.1.5
 * 20150501
 *
 * 完整的门禁涉及到：
 * 1. 直接进来的时候
 * 2. 登录的时候
 * 3. 登出的时候
 *
 * 以上3处都要做相应的逻辑处理，特别是登出,以及登陆失效的时候，一定要将door的locked设置为true！！！！（非常重要
 */

//验证是否为登陆状态

define("door", function () {
    //

    return door = {
        locked: true,//门禁状态
        logined: false,//用户登录状态
        hearting: false,
        //登录判断开始
        comeIn: function (fn) {

            //执行动作配置
            var active = {
                haveLogin: function () {
                },
                notLogin: function () {
                }
            };
            avalon.mix(active, fn)

            //判断是刷新还是跳转
            if (door.locked == true) {

                //判断为刷新，使用请求验证登录
                require(['mmRequest'], function () {
                    $$.call({
                        i: "Coach/autoLogin",
                        data: {},
                        error: function () {

                        },
                        success: function (data,fullData) {
                            door.locked = false;
                            if (data.UID == null) {
                                door.locked = true
                                door.logined = false;
                                //执行未登录的预定动作

                                cache.go({
                                    "tsy": "",
                                    "un": "",
                                    "UID": "",
                                    "g": "",
                                    "G": ""

                                })
                                active.notLogin();
                            }
                            else {
                                door.logined = true;
                                //login.getStart()
                                //执行已经登录的预定动作


                                cache.go({
                                    "tsy": fullData.tsy,
                                    "un": data.Name,
                                    "UID": data.UID,
                                    "g": fullData.G,
                                    "G": fullData.G

                                })


                                active.haveLogin();


                            }
                        }

                    });
                });
            }
            else {
                //判断为跳转，使用内存抓取验证登录
                if (door.logined == true) {
                    //判断为已经登录，执行已登录动作
                    active.haveLogin();
                }
                else {

                    //执行未登录动作
                    active.notLogin();

                }
            }


        }
    }
});


