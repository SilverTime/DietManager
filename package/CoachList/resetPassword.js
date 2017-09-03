/**
 * Created by ANNNI on 2016/3/16.
 */
define('resetPassword',[
    'avalon',
    'text!../../package/CoachList/resetPassword.html',
    '../../plugins/isIt/isIt.js'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"resetPassword",
        ready: function (i,account) {
            vm.UID=i
            vm.Account=account
            vm.reset();
            //以及其他方法
            pop.open(html);
        },
        reset: function () {
            avalon.mix({
                //要重置的东西最后都放回到这里
                newPassword:"",
                repeatPassword:"",
                UID:"",
                Account:"",
            })
        },
        closePop:function(){
            vm.reset();
            window.location.reload(true);
        },
        newPassword:"",
        repeatPassword:"",
        UID:"",
        Account:"",
        resetPassword:function(){
            if(vm.newPassword==""){
                tip.on("请输入新密码");
                return;
            }
            if(vm.repeatPassword==""){
                tip.on("请确认输入新密码");
                return;
            }
            if(vm.newPassword!=vm.repeatPassword){
                tip.on("两次输入的密码不一致");
                return;
            }
            //正则验证
            if(isIt.pwd(vm.newPassword,"您输入的")==false){
                return;
            }
            if(isIt.pwd(vm.repeatPassword,"您输入的")==false){
                return;
            }

            if(vm.newPassword!=""&&vm.repeatPassword!=""){


                $$.call({
                    i: "Diet/User/resetPWD",
                    data: {
                        UID: vm.UID,
                        PWD: vm.newPassword,
                        Account:vm.Account,
                    },
                    success: function (res) {
                        vm.reset();
                        tip.on("重置成功",1);
                        setTimeout("window.location.reload(true);vm.reset();", 1000)
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })

            }
        }

    });
    window[vm.$id]=vm
});