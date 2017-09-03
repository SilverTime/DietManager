/*
 {{name}} 内在灵魂，沉稳坚毅
 生成时间：{{date}}   破门狂人R2-D2为您服务！
 */
define('addCookingTip',[
    'avalon',
    'text!../../package/MemberDiet/addCookingTip.html',
    //'css!../../package/addCookingTip/addCookingTip.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"addCookingTip",
        ready: function (week,logid,tip) {
            vm.reset()
            pop.open(html)
            //以及其他方法
            vm.week=week;
            vm.LogID=logid;
            vm.tip=tip
        },
        reset: function () {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
            })
        },
        week:"",
        tip:"",
        LogID:"",

        //添加备注
        save: function () {
            var data={
                LogID:vm.LogID,
                CookingTip:vm.tip,
            }

            require(['../../obj/bridge/MemberDiet.js'], function (obj) {
                obj.save(vm.LogID,{
                    CookingTip:vm.tip
                }, function (res) {
                    tip.on('添加成功',1)
                    pop.close()
                    MemberDiet.getDiet(MemberDiet.week)
                })
            })

        }

    })
    window[vm.$id]=vm
})