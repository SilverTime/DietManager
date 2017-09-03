//Diet/DietDetails
/**
 * 食谱详情
 * 各个食材中确定具体的餐次，默认为正餐，可选 加餐，训练前
 * @package Diet\Object
 */
define('DietDetails',
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
DetailID:'',//详情编号  int(11) 必填:1 默认值:,
            DietID:'',//食谱编号  int(11) 必填:1 默认值:,
            MealID:'',//餐次编号  int(11) 必填:1 默认值:,
            FoodID:'',//食材编号  int(11) 必填:1 默认值:,
            Weight:'',//食材质量  double(15,8) 必填:1 默认值:,
            MealSign:'',//餐次标记 各个食材中确定具体的餐次，默认为正餐，可选 加餐，训练前 char(20) 必填:1 默认值:,
            Energy:'',//能量含量  double(15,8) 必填:1 默认值:,
            CHO:'',//碳水化合物  double(15,8) 必填:1 默认值:,
            DF:'',//膳食纤维  double(15,8) 必填:1 默认值:,
            Fat:'',//脂肪  double(15,8) 必填:1 默认值:,
            Protein:'',//蛋白质  double(15,8) 必填:1 默认值:,
            Unit:'',//食材单位  char(20) 必填:1 默认值:g,
            Name:'',//餐次名称  char(250) 必填:1 默认值:
},
            
get: function (DetailID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/DietDetails/get",
                    data:{
                        DetailID:DetailID
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
gets: function (DetailIDs,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/DietDetails/gets",
                    data:{
                        "Diet/DietDetails":DetailIDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
save: function (DetailID,Params,success,error) {
                var configFn={
                    success: success?success:function () {},
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:'Diet/DietDetails/save',
                    data:{
                        DetailID:DetailID,
                        Params:Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            
del: function (DetailID,success,error) {
                var configFn={
                    success: success?success:function () {},
                    
                    error: error?error:function (err) {tip.on(err)}
                }

                $$.call({
                    i:"Diet/DietDetails/del",
                    data:{
                        "DetailID":DetailID
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
                    i:"Diet/DietDetails/search",
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
                    i:'Diet/DietDetails/add',
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            }
        }
        return window['obj_Diet_DietDetails']=obj
    })