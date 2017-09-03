//Diet/MemberDiet
/**
 * 会员食谱
 * 减脂、增肌、塑性
 * @package Diet\Object
 */
define('MemberDiet',
    ['avalon'],
    function () {
        var obj = {
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
            obj: {
                LogID: '',//记录编号  int(11) 必填:1 默认值:,
                Date: '',//日期  int(8) 必填:1 默认值:,
                UID: '',//用户编号  int(11) 必填:1 默认值:,
                DietID: '',//食谱编号  int(11) 必填:1 默认值:,
                Target: '',//食谱目的 减脂、增肌、塑性 tinyint(2) 必填:1 默认值:,
                Energy: '',//能量含量  double(15,8) 必填:1 默认值:,
                Status: '',//食谱状态  tinyint(2) 必填:1 默认值:,
                CTime: '',//添加日期  int(10) 必填:1 默认值:,
                CUID: '',//添加人 添加人编号 int(11) 必填:1 默认值:,
                CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                REI: '',//推荐能量摄入  double(15,8) 必填:1 默认值:,
                NE: '',//营养素供能比 以逗号分隔的碳水化合物：蛋白质：脂肪 char(50) 必填:1 默认值:,
                CookingTip: '',//烹饪建议 烹饪建议 char(250) 必填:1 默认值:,
                MemberDietDetails: [
                    {
                        DetailID: '',//详情编号  int(11) 必填:1 默认值:,
                        LogID: '',//记录编号  int(11) 必填:1 默认值:,
                        MealID: '',//餐次编号  int(11) 必填:1 默认值:,
                        FoodID: '',//食材编号  int(11) 必填:1 默认值:,
                        Weight: '',//食材质量  double(15,8) 必填:1 默认值:,
                        MealSign: '',//餐次标记 各个食材中确定具体的餐次，默认为正餐，可选 加餐，训练前 char(20) 必填:1 默认值:,
                        Energy: '',//能量含量  double(15,8) 必填:1 默认值:,
                        CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                        DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                        Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                        Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                        Unit: '',//食材单位  char(20) 必填:1 默认值:g
                    }
                ],
                Typed: [
                    {
                        FGSID: '',//分类合计编号  int(11) 必填:1 默认值:,
                        TypeID: '',//食材类别编号  int(11) 必填:1 默认值:,
                        LogID: '',//记录编号  int(11) 必填:1 默认值:,
                        DailyWeight: '',//每日平均摄入量  double(15,8) 必填:1 默认值:
                    }
                ],
                MealID: '',//餐次编号  int(11) 必填:1 默认值:,
                Name: '',//餐次名称  char(250) 必填:1 默认值:
            },

            get: function (LogID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/MemberDiet/get",
                    data: {
                        LogID: LogID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 获取对象的列表
             * @param  IDs 参数为各自对象的主键 此处不做限制
             * @param  Properties 限定取出属性范围
             * @return |
             */
            gets: function (LogIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/MemberDiet/gets",
                    data: {
                        "Diet/MemberDiet": LogIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (LogID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/MemberDiet/save',
                    data: {
                        LogID: LogID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (LogID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/MemberDiet/del",
                    data: {
                        "LogID": LogID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            search: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/MemberDiet/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },

            add: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/MemberDiet/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_MemberDiet'] = obj
    })