//Diet/CheckupDic
/**
 * 检查项字典
 * 
 * @package Diet\Object
 */
define('CheckupDic',
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
CheckupID:'',//检查项编号  int(11) 必填:1 默认值:,
            Part:'',//部位  char(20) 必填:1 默认值:,
            ClinicalFeature:'',//临床表现  char(250) 必填:1 默认值:,
            NutritionalDeficiency:'',//可能的营养素缺乏  char(250) 必填:1 默认值:
},
            
get: function (CheckupID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/CheckupDic/get",
                    data:{
                        CheckupID:CheckupID
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
gets: function (CheckupIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/CheckupDic/gets",
                    data:{
                        "Diet/CheckupDic":CheckupIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (CheckupID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/CheckupDic/save',
                    data:{
                        CheckupID:CheckupID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (CheckupID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/CheckupDic/del",
                    data:{
                        "CheckupID":CheckupID
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
                    i:"Diet/CheckupDic/search",
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
                    i:'Diet/CheckupDic/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_CheckupDic']=obj
    })