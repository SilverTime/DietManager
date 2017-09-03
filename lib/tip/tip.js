/**
 * Created by mooshroom on 2015-06-12.
 * 版本：V3.0.0
 * 使用avalon组件模式重构
 */
define([
        //引入所依赖的文件
        "avalon",
        'text!../../lib/tip/tip.html',
        'css!../../lib/tip/tip.css'
    ],
    function (avalon, html) {

        var vmodel
        avalon.component("tsy:tip", {
            id: "tip",

            //使用$init可以让avalon自动在加载成功之后执行里面的方法
            $init: function () {
                vmodel = this
                window[vmodel.id] = vmodel

            },
            $template: html,

            $ready:function(){
                //vmodel.on("欢迎回来！",1,3000)
            },
            //并不知道有什么用，但是规范上面说要有这个方法（囧）
            onInit: function () {

            },

            /********以下是正常的组件的各个属性********/

            tips: [],    //要显示的提示信息
            tipsError: [],  //要显示的错误提示信息
            //isShow: false,  // 控制提示框的出现
            //提示信息
            infoObject: {
                login: '登录中。。。。。。',
                search: '搜索中。。。。。。',
                data: '数据加载中。。。。。。',
                submit: '提交中。。。。。。',
                register: '注册成功！！！',
                loginIn: '登录成功！！！',
                loginOut: '退出登录成功！！！'
            },
//错误提示信息
            errorObject: {
                login: '登录失败！！！',
                register: '注册失败！！！',
                submit: '提交失败！！！',
                loginOut: '未登录，请登录！！！',
                system: '系统错误！！！'
            },

            //message: 为提示的信息，id: 1为正常消息提示 0为错误消息提示
            on: function (message, id, time) {

                var id = id || 0
                vmodel.tips.push({
                    msg: message,
                    type: id
                });
                if (time != null) {
                    setTimeout(function () {
                        vmodel.off(message, id);
                    }, time);
                }
                else {
                    //设置提示关闭默认时间
                    setTimeout(function () {
                        vmodel.off(message, id);
                    }, 10000);
                }
            },

            off: function (message, id) {

                if (message == '') {
                    vmodel.tips = [];
                }
                for (var i = 0; i < vmodel.tips.length; i++) {
                    if (vmodel.tips[i].msg == message && vmodel.tips[i].type == id) {
                        break;
                    }
                }
                vmodel.tips.splice(i, 1);

            },

            //手动关闭
            close: function (index) {

                //判断是正常提示消息还是错误提示消息（1为正常0为错误）
                vmodel.tips.splice(index, 1);
            }
            /********以上是正常的组件的各个属性********/
        })


    })