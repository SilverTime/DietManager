/**
 * Created by mooshroom on 2016/3/23.
 * # Gate 门禁系统2.0
 BY mooshroom 2016年3月23日

 ---
 ## 功能
 前端权限控制模块，对用户页面访问进行权限限制，可通过配置满足不同的项目需求

 ## 传入参数
 1. 自动登陆接口名称
 1. 默认成功登陆的回调函数
 1. 默认登陆失败的回调函数
 */

define('Gate', [
    'avalon',
    'mmRequest'
], function () {
    return newGate = function (opt) {
        //加载参数
        var steinsGate = avalon.mix(true, {}, {
            id: "steinsGate",//一切都是命运石之门的选择（逃
            autoLoginAPI: "",
            locked: true,
            logined: false,
            haveLogin: function (res) {

            },
            notLogin: function (res) {

            },
            lastData: "",

        }, opt)

        //重置
        steinsGate.reset = function () {
            avalon.mix(steinsGate, {
                locked: true,
                logined: false,
                lastData: "",
            })
            //执行未登录的预定动作
            try {
                cache.go(JSON.parse(cache.go('steinsGateReset')))
            } catch (err) {
                console.log('可能还没有成功登陆过，不需要重置用户缓存')
            }
        }

        //验证方法
        steinsGate.comeIn = function (fn) {

            //执行动作配置
            var active = avalon.mix(true, {}, {
                haveLogin: steinsGate.haveLogin,
                notLogin: steinsGate.notLogin
            }, fn);


            //判断是刷新还是跳转
            if (steinsGate.locked == true) {

                //判断为刷新，使用请求验证登录
                require(['mmRequest'], function () {
                    $$.call({
                        i: steinsGate.autoLoginAPI,
                        data: {},
                        error: function () {
                            steinsGate.reset()
                            active.notLogin('登录错误')
                        },
                        success: function (data,alldata) {
                            steinsGate.lastData = data
                            steinsGate.locked = false;
                            //错误判断
                            if (data.UID == null) {
                                steinsGate.reset()
                                active.notLogin(data)
                                return
                            }

                            //成功判断
                            steinsGate.logined = true;

                            //抓取G
                            if(data.G==undefined){
                                data.G=alldata.G
                            }

                            //保存缓存目标
                            var resetData = {}
                            for (var x in data) {
                                resetData[x] = ''
                            }
                            cache.go({steinsGateReset: JSON.stringify(resetData)})
                            //执行已经登录的预定动作
                            cache.go(data)
                            active.haveLogin(data);

                        }

                    });
                });
            }
            else {
                //判断为跳转，使用内存抓取验证登录
                if (steinsGate.logined == true) {
                    //判断为已经登录，执行已登录动作
                    active.haveLogin(steinsGate.lastData);
                }
                else {

                    //执行未登录动作
                    active.notLogin(steinsGate.lastData);

                }
            }
        }

        //保持心跳,目前10分钟
        steinsGate.heart= setInterval(function () {
            steinsGate.comeIn()

            console.log('来自'+new Date()+'的心跳,噗通~')
        },600000)

        return steinsGate
    }
})

