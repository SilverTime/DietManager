//Diet/AteLog
/**
 * 会员就餐记录
 * 添加人编号
 * @package Diet\Object
 */
define('AteLog',
    ['avalon'],
    function () {
        var obj = {
            obj: {
                UID: '',//UID  int(11) 必填:1 默认值:,
                LogID: '',//记录编号  int(11) 必填:1 默认值:,
                Date: '',//日期  int(8) 必填:1 默认值:,
                CTime: '',//添加时间  int(10) 必填:1 默认值:,
                CUID: '',//添加人 添加人编号 int(11) 必填:1 默认值:,
                TargetEnerge: '',//目标能量  double(15,8) 必填:1 默认值:,
                ActualEnerge: '',//实际能量  double(15,8) 必填:1 默认值:,
                DIF: '',//差值  double(15,8) 必填:1 默认值:,
                Protein: '',//蛋白质  double(15,8) 必填:1 默认值:,
                Fat: '',//脂肪  double(15,8) 必填:1 默认值:,
                CHO: '',//碳水化合物  double(15,8) 必填:1 默认值:,
                DF: '',//膳食纤维  double(15,8) 必填:1 默认值:,
                Details: [
                    {
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
                        DF: '',//膳食纤维  double(15,8) 必填:1 默认值:
                    }
                ],
                MealID: '',//餐次编号  int(11) 必填:1 默认值:,
                Name: '',//姓名  char(250) 必填:1 默认值:,
                Account: '',//Account  char(250) 必填:1 默认值:,
                PWD: '',//PWD  char(250) 必填:1 默认值:,
                Status: '',//Status 1正常0禁止 tinyint(2) 必填:1 默认值:,
                Sex: '',//性别  tinyint(2) 必填:1 默认值:,
                ClubID: '',//俱乐部编号  int(11) 必填:1 默认值:,
                Tel: '',//电话  char(20) 必填:1 默认值:
            },
            /**
             * 食用记录的添加
             * @param Date
             * @param UID
             * @param Foods
             * @return |
             */
            add: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Diet/AteLog/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 按周查询
             * @param Week
             * @param UID
             * @return
             */
            getDietByWeek: function (Week, UID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/AteLog/getDietByWeek",
                    data: {
                        Week: Week,
                        UID: UID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
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
            /**
             * @param  UIDs
             * @param  LogIDs
             * @param  P
             * @param  N
             * @return |
             */
            obj: function (UIDs, LogIDs, P, N, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Diet/AteLog/obj",
                    data: {
                        UIDs: UIDs,
                        LogIDs: LogIDs,
                        P: P,
                        N: N
                    },
                    success: configFn.success,
                    error: configFn.error
                })
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
                    i: "Diet/AteLog/get",
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
                    i: "Diet/AteLog/gets",
                    data: {
                        "Diet/AteLog": LogIDs,
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
                    i: 'Diet/AteLog/save',
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
                    i: "Diet/AteLog/del",
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
                    i: "Diet/AteLog/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Diet_AteLog'] = obj
    })