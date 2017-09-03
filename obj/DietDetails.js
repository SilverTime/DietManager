/**
 * Created by mooshroom on 2016/2/1.
 * 食谱详情
 * 各个食材中确定具体的餐次，默认为正餐，可选 加餐，训练前
 */
define('DietDetails',
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
                i:"DietDetails/add",
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
                i:"DietDetails/save",
                data:{
                    "DetailID":ID,
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
                i:"DietDetails/get",
                data:{
                    "DetailID":ID
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
                i:"DietDetails/gets",
                data:{
                    "DetailIDs":IDs
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
                i:"DietDetails/search",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
    }
    return window['obj_DietDetails']=obj
})