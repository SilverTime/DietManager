//Diet/FoodType
/**
 * 食材类别
 * 
 * @package Diet\Object
 */
define('FoodType',
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
TypeID:'',//类别编号  int(11) 必填:1 默认值:,
            Name:'',//类别名称  char(250) 必填:1 默认值:
},
            
get: function (TypeID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/FoodType/get",
                    data:{
                        TypeID:TypeID
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
gets: function (TypeIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/FoodType/gets",
                    data:{
                        "Diet/FoodType":TypeIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (TypeID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/FoodType/save',
                    data:{
                        TypeID:TypeID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (TypeID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/FoodType/del",
                    data:{
                        "TypeID":TypeID
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
                    i:"Diet/FoodType/search",
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
                    i:'Diet/FoodType/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_FoodType']=obj
    })