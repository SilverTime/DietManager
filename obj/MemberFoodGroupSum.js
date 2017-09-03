/**
 * Created by mooshroom on 2016/2/1.
 * 会员食物分类合计
 * false
 */
define('MemberFoodGroupSum',
    ['avalon'],
    function () {
    var obj={
        add: function (data,callback) {
            var configFn={
                success: function () {},
                error: function (err) {tip.on(err)}
            }
            avalon.mix(configFn,callback)
            $$.call({
                i:"MemberFoodGroupSum/add",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
        save: function (ID,Params,callback) {
            var configFn={
                success: function () {},
                error: function (err) {tip.on(err)}
            }
            avalon.mix(configFn,callback)
            $$.call({
                i:"MemberFoodGroupSum/save",
                data:{
                    "FGSID":ID,
                    "Params":Params
                },
                success:configFn.success,
                error:configFn.error
            })
        },
        get: function (ID,callback) {
            var configFn={
                success: function () {},
                error: function (err) {tip.on(err)}
            }
            avalon.mix(configFn,callback)
            $$.call({
                i:"MemberFoodGroupSum/get",
                data:{
                    "FGSID":ID
                },
                success:configFn.success,
                error:configFn.error
            })
        },
        gets: function (IDs,callback) {
            var configFn={
                success: function () {},
                error: function (err) {tip.on(err)}
            }
            avalon.mix(configFn,callback)
            $$.call({
                i:"MemberFoodGroupSum/gets",
                data:{
                    "FGSIDs":IDs
                },
                success:configFn.success,
                error:configFn.error
            })
        },
        search: function (data,callback) {
            var configFn={
                success: function () {},
                error: function (err) {tip.on(err)}
            }
            avalon.mix(configFn,callback)
            $$.call({
                i:"MemberFoodGroupSum/search",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
    }
    return window['obj_MemberFoodGroupSum']=obj
})