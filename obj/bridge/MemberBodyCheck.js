//Diet/MemberBodyCheck
/**
 * 会员身体检查项
 * 
 * @package Diet\Object
 */
define('MemberBodyCheck',
    ['avalon'],
    function () {
        var obj={      
            /**
     * 解除绑定多对多属性到关联表
     * @param  Property 属性名称
     * @param  Data 绑定数据
     * @param  PKID 主键ID
     * @return ||mixed
     */
/**
     * 绑定多对多属性到关联表
     * @param  Property 属性名称
     * @param  Data 绑定数据
     * @param  PKID 主键ID
     * @return ||mixed
     */
obj:{
UID:'',//用户编号  int(11) 必填:1 默认值:,
            LogID:'',//记录编号  int(11) 必填:1 默认值:,
            CheckID:'',//检查项编号  int(11) 必填:1 默认值:
},
            
get: function (LogID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberBodyCheck/get",
                    data:{
                        LogID:LogID
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            /**
     * 获取对象的列表
     * @param  IDs 参数为各自对象的主键 此处不做限制
     * @param  Properties 限定取出属性范围
     * @return |
     */
gets: function (LogIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberBodyCheck/gets",
                    data:{
                        "Diet/MemberBodyCheck":LogIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (LogID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/MemberBodyCheck/save',
                    data:{
                        LogID:LogID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (LogID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberBodyCheck/del",
                    data:{
                        "LogID":LogID
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
search: function (data,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberBodyCheck/search",
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
add: function (data,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/MemberBodyCheck/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_MemberBodyCheck']=obj
    })