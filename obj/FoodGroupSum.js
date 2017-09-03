/**
 * Created by mooshroom on 2016/2/1.
 * 食物分类合计
 * false
 */
define('FoodGroupSum',
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
                i:"FoodGroupSum/add",
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
                i:"FoodGroupSum/save",
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
                i:"FoodGroupSum/get",
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
                i:"FoodGroupSum/gets",
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
                i:"FoodGroupSum/search",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
    }
    return window['obj_FoodGroupSum']=obj
})