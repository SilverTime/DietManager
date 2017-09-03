//Diet/MemberFoodGroupSum
/**
 * 会员食物分类合计
 * 
 * @package Diet\Object
 */
define('MemberFoodGroupSum',
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
FGSID:'',//分类合计编号  int(11) 必填:1 默认值:,
            TypeID:'',//类别编号  int(11) 必填:1 默认值:,
            LogID:'',//记录编号  int(11) 必填:1 默认值:,
            DailyWeight:'',//每日平均摄入量  double(15,8) 必填:1 默认值:,
            Name:'',//类别名称  char(250) 必填:1 默认值:
},
            
get: function (FGSID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberFoodGroupSum/get",
                    data:{
                        FGSID:FGSID
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
gets: function (FGSIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberFoodGroupSum/gets",
                    data:{
                        "Diet/MemberFoodGroupSum":FGSIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (FGSID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/MemberFoodGroupSum/save',
                    data:{
                        FGSID:FGSID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (FGSID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/MemberFoodGroupSum/del",
                    data:{
                        "FGSID":FGSID
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
                    i:"Diet/MemberFoodGroupSum/search",
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
                    i:'Diet/MemberFoodGroupSum/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_MemberFoodGroupSum']=obj
    })