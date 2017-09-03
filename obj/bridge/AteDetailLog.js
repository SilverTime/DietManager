//Diet/AteDetailLog
/**
 * 就餐记录详情
 *
 * @package Diet\Object
 */
define('AteDetailLog',
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
                LogDetailID: '',//详情编号  int(11) 必填:1 默认值:,
                MealID: '',//餐次编号  int(11) 必填:1 默认值:,
                FoodID: '',//食物编号  int(11) 必填:1 默认值:,
                Weight: '',//质量  double(15,8) 必填:1 默认值:,
                Energy: '',//能量含量  double(15,8) 必填:1 默认值:,
                CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                Unit: '',//食材单位  char(20) 必填:1 默认值:g,
                Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                TypeID: '',//食材类别编号  int(11) 必填:1 默认值:,
                Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                Name: '',//餐次名称  char(250) 必填:1 默认值:
            },

            get: function (LogDetailID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/AteDetailLog/get",
                    data: {
                        LogDetailID: LogDetailID
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
            gets: function (LogDetailIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/AteDetailLog/gets",
                    data: {
                        "Diet/AteDetailLog": LogDetailIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (LogDetailID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/AteDetailLog/save',
                    data: {
                        LogDetailID: LogDetailID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (LogDetailID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/AteDetailLog/del",
                    data: {
                        "LogDetailID": LogDetailID
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
                    i: "Diet/AteDetailLog/search",
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
                    i: 'Diet/AteDetailLog/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_AteDetailLog'] = obj
    })