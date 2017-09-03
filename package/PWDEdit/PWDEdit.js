/*
修改密码 内在灵魂，沉稳坚毅
 生成时间：Fri Jun 24 2016   破门狂人R2-D2为您服务！
*/
define('PWDEdit',[
    'avalon',
    'text!../../package/PWDEdit/PWDEdit.html',
    'css!../../package/PWDEdit/PWDEdit.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"PWDEdit",
        ready: function (i) {
            //if(!i>0){
            //    history.go(-1)
            //    return
            //}
            vm.reset()
            index.html=html

            //以及其他方法
            vm.uid=i

        },
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                uid:"",
                pwd:'',
                repwd:"",
                Code:"",
            })
        },
        uid:"",
        pwd:'',
        repwd:"",
        Code:"",

        save: function () {
            if(vm.pwd!=vm.repwd){
                alert('两次输入不一致，请确认你输入了正确的密码')
                vm.pwd=vm.repwd=''
                return
            }
            $$.call({
                i:"Diet/User/resetPWD",
                data:{
                    UID: vm.uid,
                    PWD: vm.pwd,
                    Code: vm.Code,
                    Account: cache.go('Account')
                },
                success: function (res) {
                    vm.reset()
                    alert('修改成功,请重新登录')
                    index.logout()
                },
                error: function (err) {
                    tip.on(err)
                }
            })



        }

    })
    window[vm.$id]=vm
})