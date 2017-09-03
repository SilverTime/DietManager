/**
 * Created by mooshroom on 2016/11/10.
 */
define('EditAlipay', [
    'avalon',
    'text!../../package/Home/EditAlipay.html',
    //'css!../../package/EditBase/EditBase.css'
    //'../../lib/select/select.js',
    '../../plugins/isIt/isIt.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "EditAlipay",
        ready: function (i) {
            vm.reset()
            //以及其他方法
            pop2.open(html)

            try{
                vm.Alipay=Home.Coach.Alipay
                vm.UID=Home.Coach.UID
            }catch (err){
                //todo 通过请求获取教练资料
                console.log('todo 通过ajax获取教练资料')
            }

        },
        Alipay:"",
        UID:"",
        reset: function () {
            avalon.mix(vm,{
                Alipay:"",
                UID:"",
            })
        },

        save: function () {
            require(['../../obj/bridge/Coach'], function (Coach) {


                //验证
                if(vm.Alipay==''){
                    return tip.on('支付宝帐号不能为空')
                }


                //提交
                Coach.save(vm.UID,{Alipay:vm.Alipay}, function (res) {
                    pop2.close()
                    try{
                        res.StartTime=avalon.filters.date(Number(res.StartTime)*1000,'yyyy-MM-dd')
                        avalon.mix(Home.Coach,res)
                    }catch (err){}
                }, function (err) {
                    tip.on(err)
                })

            })


        },


    })
    return window[vm.$id] = vm
})