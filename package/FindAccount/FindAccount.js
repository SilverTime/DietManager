/*
找回密码 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 25 2016   破门狂人R2-D2为您服务！
*/
define('FindAccount',[
    'avalon',
    'text!../../package/FindAccount/FindAccount.html',
    'css!../../package/FindAccount/FindAccount.css',
    '../../obj/bridge/User.js',
    '../../plugins/isIt/isIt.js'
], function (avalon, html, css,User,isIt) {
    var vm=avalon.define({
        $id:"FindAccount",
        ready: function (i) {
            vm.reset()
            index.html=html

            //以及其他方法

        },
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                Email:"",
                Code:"",
                PWD:"",
            })
        },

        Email:"",
        Code:"",
        PWD:"",
        UID:"",
        Account:"",

        wait:0,

        TimeoutResend:'',
        //发送验证码
        sendVerify: function () {
            if(vm.Email==''){
                tip.on('还没有填写邮箱地址')
                return
            }
            if(!isIt.email(vm.Email)){
                return
            }

            //先获取到账户
            User.findAccount(vm.Email, function (res) {
                if(res==null){
                    tip.on('该邮箱未注册')
                    return
                }

                //记录账户信息
                vm.UID=res.UID
                vm.Account=res.Account

                //发送验证码
                User.sendVerify(res.UID,vm.Email,'Email', function (res) {
                    tip.on('已发送验证码到您的邮箱',1)
                    vm.setResend()
                })
            })


        },


        setResend: function () {
            vm.wait=30
            vm.TimeoutResend=setInterval(function () {
                vm.wait--
                if(vm.wait==0){
                    clearInterval(vm.TimeoutResend)
                }
            },1000)
        },

        //重置密码
        resetPWD: function () {
            if(vm.PWD==''){
                tip.on('还没有填写新的密码')
                return
            }
            if(vm.Code==''){
                tip.on('还没有填写验证码')
                return
            }
            if(!isIt.pwd(vm.PWD)){
                return
            }
            User.resetPWD(vm.UID,vm.PWD,vm.Code,vm.Account, function (res) {
                tip.on('成功修改密码！请使用新密码进行登录',1)
                goto('#!/Login/0')
            })
        }


    })
    window[vm.$id]=vm
})