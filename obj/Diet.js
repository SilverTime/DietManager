/**
 * Created by mooshroom on 2016/2/1.
 * 食谱库
 * 减脂、增肌、塑性
 */
define('Diet',
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
                i:"Diet/add",
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
                i:"Diet/save",
                data:{
                    "DietID":ID,
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
                i:"Diet/get",
                data:{
                    "DietID":ID
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
                i:"Diet/gets",
                data:{
                    "DietIDs":IDs
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
                i:"Diet/search",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
    }
    return window['obj_Diet']=obj
})