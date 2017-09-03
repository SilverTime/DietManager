/**
 * Created by mooshroom on 2016/2/1.
 * 会员身体检查项
 * false
 */
define('MemberBodyCheck',
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
                i:"MemberBodyCheck/add",
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
                i:"MemberBodyCheck/save",
                data:{
                    "LogID":ID,
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
                i:"MemberBodyCheck/get",
                data:{
                    "LogID":ID
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
                i:"MemberBodyCheck/gets",
                data:{
                    "LogIDs":IDs
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
                i:"MemberBodyCheck/search",
                data:data,
                success:configFn.success,
                error:configFn.error
            })
        },
    }
    return window['obj_MemberBodyCheck']=obj
})